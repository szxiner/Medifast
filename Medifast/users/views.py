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

    #def get(self, request, format=None):
    #    accounts = Account.objects.all()
    #    serializer = AccountSerializer(accounts, many=True)
    #    return Response(serializer.data)

    def post(self, request, format=None):
        #serializer = AccountSerializer(data=request.data)
        if self.verifiedInDB(request.data):
            #It was not in database
            #if serializer.is_valid():
            #    serializer.save()
            #return Response(True, serializer.data,status=status.HTTP_201_CREATED)
            return Response(True, status=status.HTTP_201_CREATED)
        #if serializer.is_valid():
        #    pass
        return Response(False, status=status.HTTP_400_BAD_REQUEST)
        
    def verifiedInDB(self, user):
        username = user['username']
        a = Account.objects.raw('select username from users_account %s', [username])
        if a == username:
            return True
        return False
        #try:
        #    a = Account.objects.get(username='username')
        #    return False
        #except Account.DoesNotExist:
        #    return True

'''
class AccountDetails(APIView):

    def get_object(self, pk):
        try:
            return Account.objects.get(pk=pk)
        except Account.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        account = self.get_object(pk)
        serializer = AccountSerializer(account)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        account = self.get_object(pk)
        serializer = AccountSerializer(account, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        account = self.get_object(pk)
        account.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)'''
