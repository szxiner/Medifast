from django.shortcuts import render
from rest_framework.views import APIView
from .models import Patient_profile, Patient_history
from .serializers import Patient_profile_serializer, Patient_history_serializer
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status
from Doctor_profile.models import Booking, Doctor_profile
from Doctor_profile.serializers import Bookings_serializer, Doctor_profile_serializer
from django.http import HttpResponse
from rest_framework import status
import datetime
import calendar

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

# Patient Booking History
class Patient_booking_history(APIView):
    def get(self, request, format=None):
        todays_date = datetime.date.today()
        if request.GET !={}:
            history = Booking.objects.filter(patientusername=request.GET.get('username'))
            appointments_serializer = Bookings_serializer(history, many=True)
            patient = Patient_profile.objects.filter(username=request.GET.get('username'))
            Patient_serializer = Patient_profile_serializer(patient, many=True)
            charge_sheet = list()
            for each in appointments_serializer.data:
                doctor_names = Doctor_profile.objects.filter(username=each['docusername'])
                doctor_names_serialzer = Doctor_profile_serializer(doctor_names, many=True)
                temp = [each['ref_no'],doctor_names_serialzer.data[0]['First_name'],
                        doctor_names_serialzer.data[0]['Last_Name'],each['bdate'],
                        doctor_names_serialzer.data[0]['hourly_charge'],
                        each['bill'],
                        Patient_serializer.data[0]['company'],
                        Patient_serializer.data[0]['plan']]
                charge_sheet.append(temp)
            return Response({'charge_sheet':charge_sheet})
        else:
            history = Booking.objects.all()
            serializer = Bookings_serializer(history, many=True)
            return Response(serializer.data)
            
    def post(self, request, format=None):
        todays_date = datetime.date.today()
        if request.GET !={}:
            booking = Booking.objects.get(ref_no=request.GET['ref_no'])
            booking.bill = 'P'
            booking.save()
            return HttpResponse('Success', status=status.HTTP_200_OK)
        else:
            return HttpResponse('Failure', status=status.HTTP_400_BAD_REQUEST)


# Deleting an appointment
def delete_booking(request):
    if request.GET != {}:
        appointment = Booking.objects.filter(ref_no=request.GET['ref_no'])
        serializer = Bookings_serializer(appointment, many=True)
        appointment.delete()
        return HttpResponse('Success', status=status.HTTP_200_OK)
    else:
        return HttpResponse('Failure', status=status.HTTP_400_BAD_REQUEST)