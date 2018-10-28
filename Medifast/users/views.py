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
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password
from Doctor_profile.email_info import *
import string
import random
import smtplib

# Lists all accounts
# /users
authy_api = AuthyApiClient(settings.ACCOUNT_SECURITY_API_KEY)
authy_id = None
username = None

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

# API to get, update, delete specific user (Update using post)
class AccountDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    lookup_field = 'username'
    
    def post(self, request, username, format=None):
        print(request.data,"checking")
        print(Account.objects.filter(username=username),"users")

        users = Account.objects.filter(username=username)
        print(Account.objects.filter(username=username),"users")
        if len(users) != 0:
            user = users.first()
            serializer = AccountSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(True, status=status.HTTP_200_OK)
        return Response(False, status=status.HTTP_400_BAD_REQUEST)

    # def get_object(self, pk):
    #     return Account.objects.get(pk=pk)

    # def patch(self, request, pk):
    #     testmodel = self.get_object(pk)
    #     serializer = AccountSerializer(testmodel, data=request.data, partial=True) # set partial=True to update a data partially
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonReponse(code=201, data=serializer.data)
    #     return JsonResponse(code=400, data="wrong parameters")


'''
    def put(self, request, format=None):
        users = Account.objects.filter(username=request.data['username'])
        if len(users) != 0:
            user = users.first()
            serializer = AccountSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(True, status=status.HTTP_200_OK)
        return Response(False, status=status.HTTP_400_BAD_REQUEST)
'''



#class AccountUpdate():


# API to register new user to the database
class AccountList(APIView):
    def get(self, request, format=None):
        # accounts = Account.objects.all()
        if request.GET != {}:
            accounts = Account.objects.filter(username=request.GET['username'])
        else:
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
        try: 
            verification.ok()
            request.session['authy'] = True
            #Return true for Frontend to take over
            authy_id = None
            username = None
            return Response(True, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
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
		
class forgot_password(APIView):
    def post(self, request):
        profile = Account.objects.get(username=request.GET['username'])
        password = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        profile.password = make_password(password)
        profile.save()
        message = 'The Temporary password for user ' + profile.username + ' is ' + password
        email_id = profile.email
        self.send_email(message,email_id)
        return Response('Reset Successful')

    def send_email(self,message,email):
        subject = 'Temporary Password'
        To_list = ['medifastiu@gmail.com']
        To_list.extend(email)
        from_email = EMAIL_HOST_USER
        server = smtplib.SMTP('smtp.gmail.com:587')
        server.ehlo()
        server.starttls()
        server.login(EMAIL_HOST_USER,EMAIL_HOST_PASSWORD)
        msg = 'Subject: {}\n\n{}'.format(subject,message)
        server.sendmail(EMAIL_HOST_USER,To_list,msg)
        server.quit()
