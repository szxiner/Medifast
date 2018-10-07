from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Account
from .serializers import AccountSerializer
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

# Lists all accounts
# /users
authy_api = AuthyApiClient(settings.ACCOUNT_SECURITY_API_KEY)


# API to authorize user when logging in
class AuthAccount(APIView):
    def post(self, request, format=None):
        if self.verifiedInDB(request.data):
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


# API to register new user to the database
class AccountList(APIView):
    def get(self, request, format=None):
        accounts = Account.objects.all()
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data
        serializer = AccountSerializer(data=request.data)
        a = Account.objects.filter(username=request.data['username'])
        if serializer.is_valid() & len(a)==0:
            #Create authy user
            authy_user = authy_api.users.create(
                serializer.validated_data['username'],
                serializer.validated_data['phone_number'],
                "+1"
            )

            #if authy_user.ok():
            serializer.save(authy_id=authy_user.id)
            #Create User in our db
            serializer.save()

            return redirect('2fa')
            #twofa(request)

            return Response(True, status=status.HTTP_201_CREATED)
        return Response(False, status=status.HTTP_400_BAD_REQUEST)

    #If everything else works, we will check if the phone number is 10 digits
    #disect phone number?
    def hasValidPhoneNumber(self, user):
        pass

# API to get, update, delete specific user
class AccountDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


#@login_required
def twofa(request):
    pass
    #user = request.data
    #name = user['username']
    #a = Account.objects.filter(username=name)
    #yes = a.first()
    if request.method == 'POST':
        form = TokenVerificationForm(request.POST)
        if form.is_valid(request.user.authy_id):
            request.session['authy'] = True
            #I think return true for Frontend to take over
            #Might need to do work in html file
            return redirect('protected')
    else:
        form = TokenVerificationForm()
    #
    return render(request, '2fa.html', {'form': form})


#@login_required
def token_sms(request):
    sms = authy_api.users.request_sms(request.user.authy_id, {'force': True})
    if sms.ok():
        return HttpResponse('SMS request successful', status=200)
    else:
        return HttpResponse('SMS request failed', status=503)

#@login_required
def token_voice(request):
    call = authy_api.users.request_call(request.user.authy_id, {'force': True})
    if call.ok():
        return HttpResponse('Call request successfull', status=200)
    else:
        return HttpResponse('Call request failed', status=503)

#@login_required
def token_onetouch(request):
    #user = request.data
    details = {
        'Authy ID': request.user.authy_id,
        'Username': request.user.username,
        'Reason': 'Medifast Security'
    }

    hidden_details = {
        'test': 'This is a'
    }

    response = authy_api.one_touch.send_request(
        int(request.user.authy_id),
        message='Login requested for Account Security account.',
        seconds_to_expire=120,
        details=details,
        hidden_details=hidden_details
    )
    if response.ok():
        request.session['onetouch_uuid'] = response.get_uuid()
        return HttpResponse('OneTouch request successfull', status=200)
    else:
        return HttpResponse('OneTouch request failed', status=503)

#@login_required
def onetouch_status(request):
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

#This will be gone
#@twofa_required
def protected(request):
    return render(request, 'protected.html')