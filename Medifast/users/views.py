from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Account
from .serializers import AccountSerializer
from .serializers import SocialSerializer
from django.core import serializers
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import generics
from django.http import Http404
from django.contrib.auth.hashers import check_password
from authy.api import AuthyApiClient
from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, redirect
from .forms import TokenVerificationForm
from .decorators import twofa_required
from rest_framework.test import APIRequestFactory
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from social_django.utils import psa
from requests.exceptions import HTTPError




# Lists all accounts
# /users
authy_api = AuthyApiClient(settings.ACCOUNT_SECURITY_API_KEY)
authy_id = None
username = None

# OAuth2 API
@api_view(http_method_names=['POST'])
@permission_classes([AllowAny])
@psa()
def exchange_token(request, backend):
    """
    Exchange an OAuth2 access token for one for this site
    ## Request format
    Requests must include the following field
    - `access_token`: The OAuth2 access token provided by the auth provider
    """
    serializer = SocialSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):

        try:
            nfe = settings.NON_FIELD_ERRORS_KEY
        except AttributeError:
            nfe = 'non_field_errors'

        try:
            # this line, plus the psa decorator above, are all that's necessary to
            # get and populate a user object for any properly enabled/configured backend
            # which python-social-auth can handle.
            user = request.backend.do_auth(serializer.validated_data['access_token'])
        except HTTPError as e:
            # An HTTPError bubbled up from the request to the social auth provider.
            # This happens every time you send a malformed or incorrect access key.
            return Response(
                {'errors': {
                    'token': 'Invalid token',
                    'detail': str(e),
                }},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user:
            if user.is_active:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({'token': token.key})
            else:
                # user is not active; at some point they deleted their account,
                # or were banned by a superuser. They can't just log in with their
                # normal credentials anymore, so they can't log in with social
                # credentials either.
                return Response(
                    {'errors': {nfe: 'This user account is inactive'}},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            # Unfortunately, PSA swallows any information the backend provider
            # generated as to why specifically the authentication failed;
            # this makes it tough to debug except by examining the server logs.
            return Response(
                {'errors': {nfe: "Authentication Failed"}},
                status=status.HTTP_400_BAD_REQUEST,
            )


# API to authorize user when logging in
class AuthAccount(APIView):
    def post(self, request, format=None):
        if self.verifiedInDB(request.data):
            users = Account.objects.filter(username=request.data['username'])
            user = users.first()
            global authy_id
            global username
            username = request.data['username']
            authy_id = user.authy_id
            return Response(True, status=status.HTTP_200_OK)
        return Response(False, status=status.HTTP_400_BAD_REQUEST)


    # Check if there is an username matches in the database
    # if true check if the password matches
    def verifiedInDB(self, user):
        name = user['username']
        a = Account.objects.filter(username=name)
        for instance in a:
            print(user["password"])
            if check_password(user["password"], instance.password):
                return True
            return False

# API to get, update, delete specific user
class AccountDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def put(self, request, format=None):
        users = Account.objects.filter(username=request.data['username'])
        if len(users) != 0:
            user = users.first()
            serializer = AccountSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(True, status=status.HTTP_200_OK)
        return Response(False, status=status.HTTP_400_BAD_REQUEST)


# API to register new user to the database
class AccountList(APIView):
    def get(self, request, format=None):
        accounts = Account.objects.all()
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):

        serializer = AccountSerializer(data=request.data)
        a = Account.objects.filter(username=request.data['username'])
        if serializer.is_valid() & len(a)==0:

            #Create authy user
            authy_user = authy_api.users.create(
                serializer.validated_data['email'],
                serializer.validated_data['phone_number'],
                #serializer.validated_data['country_code'],
                '+1'
            )
            #If the user is okay, we redirect to duo auth
            if authy_user.ok():
                #Update the user's authy id
                serializer.save(authy_id=authy_user.id)
                #Create User in our db
                serializer.save()
                global authy_id
                global username
                username = serializer.validated_data['username']
                authy_id = authy_user.id
                return Response(False, status=status.HTTP_201_CREATED)
                # return redirect('2fa')

        return Response(False, status=status.HTTP_400_BAD_REQUEST)

class twofa(APIView):
    def post(self, request, format=None):
        pass
        global authy_id
        global username
        verification = authy_api.tokens.verify(authy_id, request.data["token"])
        if verification.ok():
            request.session['authy'] = True
            #Return true for Frontend to take over
            authy_id = None
            username = None
            return Response(True, status=status.HTTP_200_OK)
        else:
            return Response(False, status=status.HTTP_400_BAD_REQUEST)


#Creates the form for the users to verify through sms/call/push
# @api_view(('GET','POST',))
# def twofa(request,):
#     pass
#     global authy_id
#     global username
#     if request.method == 'POST':
#         form = TokenVerificationForm(request.POST)
#         if form.is_valid(authy_id):
#             request.session['authy'] = True
#             #Return true for Frontend to take over
#             authy_id = None
#             username = None
#             return Response(True, status=status.HTTP_200_OK)
#     else:
#         form = TokenVerificationForm()
#     return render(request, '2fa.html', {'form': form})


#sends the user a text
def token_sms(request,):
    sms = authy_api.users.request_sms(authy_id, {'force': True})
    if sms.ok():
        return HttpResponse('SMS request successful', status=200)
    else:
        return HttpResponse('SMS request failed', status=503)

#calls the user
def token_voice(request,):
    call = authy_api.users.request_call(authy_id, {'force': True})
    if call.ok():
        return HttpResponse('Call request successfull', status=200)
    else:
        return HttpResponse('Call request failed', status=503)


#Sends one touch notification to user
def token_onetouch(request,):

    details = {
        'Authy ID': str(authy_id),
        'Username': str(username),
        'Reason': 'Medifast Security'
    }

    hidden_details = {
        'test': 'This is a'
    }

    response = authy_api.one_touch.send_request(
        int(authy_id),
        message='Login requested for Account Security account.',
        seconds_to_expire=120,
        details=details,
#        hidden_details=hidden_details
    )
    if response.ok():
        request.session['onetouch_uuid'] = response.get_uuid()
        return HttpResponse('OneTouch request successfull', status=200)
    else:
        return HttpResponse('OneTouch request failed', status=503)

#Status of one touch
def onetouch_status(request,):
    uuid = request.session['onetouch_uuid']
    approval_status = authy_api.one_touch.get_approval_status(uuid)
    if approval_status.ok():
        if approval_status['approval_request']['status'] == 'approved':
            request.session['authy'] = True
        return HttpResponse(
            approval_status['approval_request']['status'],
            status=200
        )
    else:
        return HttpResponse(approval_status.errros(), status=503)
