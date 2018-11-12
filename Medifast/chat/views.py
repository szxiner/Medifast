from django.shortcuts import render
from chat.models.user import User
from chat.models.message import Message
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
# Create your views here.

@api_view(http_method_names=['GET'])
def last_read(request, username):
    name = username # request['username']
    users = User.objects.filter(username=name)
    user = users.first()
    lastRead = user.last_read_date
    return Response(lastRead, status=status.HTTP_200_OK)
