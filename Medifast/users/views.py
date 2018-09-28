from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Account
from .serializers import AccountSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import generics
from django.http import Http404

# Lists all accounts
# /users

'''
class AccountView(viewsets.ModelViewSet):
    pass
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def checkInDB(self, request, password):
        try:
            Account.objects.get(password=password)
            return True
        except Account.DoesNotExist:
            return False
'''

class AccountList(APIView):

    def get(self, request, format=None):
        accounts = Account.objects.all()
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AccountSerializer(data=request.data)
        if not self.verifiedInDB(request.data):
            #It was not in database
            if serializer.is_valid():
                serializer.save()
                #Return True if post was successful
                return Response(True, status=status.HTTP_201_CREATED)
            return Response(False, status=status.HTTP_400_BAD_REQUEST)
        return Response(False)

    #Checks if the user is already in the database
    #Returns True if they are found
    def verifiedInDB(self, user):
        name = user['username']
        a = Account.objects.filter(username=name).exists()
        if a == True:
            return True
        return False

'''
class AccountView(generics.RetrieveDestroyAPIView):

    queryset = Account.objects.all()
    serializer_class = AccountSerializer
'''
'''
    def delete(self,request):
        user = request.data
        name = user['username']
        password = user['password']
        type = user['typeOfUser']
        a = Account.objects.filter(username=name,password=password,type=type).exists()
        if a == True:
            #a.delete()
            return Response(True)
        return Response(False)
'''

'''
class AccountDetails(APIView):

    def get_object(self, user):
        name = user['username']
        password = user['password']
        type = user['typeOfUser']
        a = Account.objects.filter(username=name,password=password,typeOfUser=type).exists()
        b = Account.objects.filter(username=name,password=password,typeOfUser=type)
        if a:
            return b
        raise Http404

    def get(self, user, format=None):
        account = self.get_object(user)
        serializer = AccountSerializer(account)
        return Response(serializer.data)

    def put(self, request, format=None):
        user = request.data
        account = self.get_object(user)
        serializer = AccountSerializer(account, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        user = request.data
        account = self.get_object(user)
        account.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)'''