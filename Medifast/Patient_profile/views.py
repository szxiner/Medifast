from django.shortcuts import render
from rest_framework.views import APIView
from .models import Patient_profile, Patient_history
from .serializers import Patient_profile_serializer, Patient_history_serializer
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status

class Patient_profile_view(APIView):
    def get(self, request, format=None):
        if request.GET != {}: 
            profile = Patient_profile.objects.filter(username=request.GET['username'])
            serializer = Patient_profile_serializer(profile, many=True)
            return Response(serializer.data)
        else:
            profile = Patient_profile.objects.all()
            serializer = Patient_profile_serializer(profile, many=True)
            return Response(serializer.data)

    def post(self, request, format=None):
        serializer = Patient_profile_serializer(data=request.data)
        checkuser = Patient_profile.objects.filter(username=request.data['username'])
        if len(checkuser) == 0:
            if serializer.is_valid():
                serializer.save()
                return Response(True, status=status.HTTP_201_CREATED)
            else:
                return Response(False, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(False, status=status.HTTP_409_CONFLICT)

class Patient_history_view(APIView):
    def get(self, request, format=None):
        if request.GET != {}:
            history = Patient_history.objects.filter(username=request.GET['username'])
            serializer = Patient_history_serializer(history, many=True)
            return Response(serializer.data)
        else:
            history = Patient_history.objects.all()
            serializer = Patient_history_serializer(history, many=True)
            return Response(serializer.data)

    def post(self, request, format=None):
        serializer = Patient_history_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(True, status=status.HTTP_201_CREATED)
        else:
            return Response(False, status=status.HTTP_400_BAD_REQUEST)