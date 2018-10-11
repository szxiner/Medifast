from django.shortcuts import render
from rest_framework.views import APIView
from .models import Doctor_profile 
from .serializers import Doctor_profile_serializer
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status

class Doctor_profile_view(APIView):
    def get(self, request, format=None):
        if request.GET != {}:
            profile = Doctor_profile.objects.filter(username=request.GET['username'])
            serializer = Doctor_profile_serializer(profile, many=True)
            return Response(serializer.data)
        else:
            profile = Doctor_profile.objects.all()
            serializer = Doctor_profile_serializer(profile, many=True)
            return Response(serializer.data)

    def post(self, request, format=None):
        serializer = Doctor_profile_serializer(data=request.data)
        checkuser = Doctor_profile.objects.filter(username=request.data['username'])
        if len(checkuser) == 0:
            if serializer.is_valid():
                serializer.save()
                return Response(True, status=status.HTTP_201_CREATED)
            else:
                return Response(False, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(False, status=status.HTTP_409_CONFLICT)