from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Account
from .serializers import AccountSerializer
from rest_framework import viewsets

# Lists all profiles
# /profiles
class AccountView(viewsets.ModelViewSet):
    pass
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
