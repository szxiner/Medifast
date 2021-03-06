from django.shortcuts import render
from rest_framework.views import APIView
from .models import Doctor_profile,Doctor_appointments,Doctor_reviews,Booking
from Patient_profile.models import Patient_profile
from users.models import Account
from users.serializers import AccountSerializer
from .serializers import Doctor_profile_serializer,Doctor_appointment_serializer,Doctor_reviews_serializer,Bookings_serializer
from Patient_profile.serializers import Patient_profile_serializer, Patient_history_serializer
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status
from .email_info import *
import datetime
import calendar
import smtplib


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


class Doctor_appointment_view(APIView):
    def  get(self,request, format=None):
        if request.GET != {}:
            requested_date = datetime.datetime.strptime(request.GET['date'],'%y-%m-%d').date()
            todays_date = datetime.date.today()
            if requested_date < todays_date:
                return Response('Past Date', status=status.HTTP_400_BAD_REQUEST)
            day = calendar.day_name[requested_date.weekday()]
            profile = Doctor_appointments.objects.filter(username=request.GET['username'])
            serializer = Doctor_appointment_serializer(profile, many=True)
            days = serializer.data[0]['workingdays']
            if day in days:
                timings = serializer.data[0]['time']
                appointments = Booking.objects.filter(bdate=requested_date,docusername=request.GET['username'])
                bookingserializer = Bookings_serializer(appointments, many=True)
                if bookingserializer.data != []:
                    Booked_times = [i['btime'][0] for i in bookingserializer.data]
                    Available_times = [i for i in timings if i not in Booked_times]
                    return Response(Available_times)
                else:
                    return Response(timings)
            else:
                return Response('No schedule for this day')
        else:
            appointments = Doctor_appointments.objects.all()
            serializer = Doctor_appointment_serializer(appointments, many=True)
            return Response(serializer.data)

    def post(self, request, format=None):
        serializer = Doctor_appointment_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(True, status=status.HTTP_201_CREATED)
        else:
            return Response(False, status=status.HTTP_400_BAD_REQUEST)


class Doctor_bookings_view(APIView):
    def get(self, request, format=None):
        my_patients = []
        if request.GET != {}:
            appointments = Booking.objects.filter(docusername=request.GET['docusername'])
            serializer = Bookings_serializer(appointments, many=True)
            for each in serializer.data:
                if each['patientusername'] not in my_patients:
                    my_patients.append(each['patientusername'])
            patients = Patient_profile.objects.filter(username__in=my_patients)
            p_serializer = Patient_profile_serializer(patients, many=True)
            return Response(p_serializer.data)
        else:
            appointments = Booking.objects.all()
        serializer = Bookings_serializer(appointments, many=True)
        return Response(serializer.data)
		
    def post(self, request, format=None):
        serializer = Bookings_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            time = serializer.data['btime']
            date = serializer.data['bdate']
            message = 'Congratulations! Your appointment is confirmed for ' + str(date) + ' at ' + str(time[0])
            profile = Account.objects.filter(username=request.data['docusername'])
            D_serial = AccountSerializer(profile, many=True)
            Doc = Doctor_profile.objects.filter(username=request.data['docusername'])
            Doc_ser = Doctor_profile_serializer(Doc, many=True)
            patient = Account.objects.filter(username=request.data['patientusername'])
            P_serial = AccountSerializer(patient, many=True)
            email_id = [D_serial.data[0]['email'],P_serial.data[0]['email']]
            self.send_email(message,email_id)
            history = {'username':request.data['patientusername'],'issue':request.data['issue'],'date':request.data['bdate'],'expenditure':Doc_ser.data[0]['hourly_charge'],'doctor':request.data['docusername']}
            patient_history_serializer = Patient_history_serializer(data=history)
            if patient_history_serializer.is_valid():
                patient_history_serializer.save()
            return Response(True, status=status.HTTP_201_CREATED)
        else:
            return Response(False, status=status.HTTP_400_BAD_REQUEST)

    def send_email(self,message,email):
            subject = 'Appointment Confirmation'
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

            
class Doctor_reviews_view(APIView):
    def  get(self,request, format=None):
        reviews = Doctor_reviews.objects.all()
        serializer = Doctor_reviews_serializer(reviews, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = Doctor_reviews_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(True, status=status.HTTP_201_CREATED)
        else:
            return Response(False, status=status.HTTP_400_BAD_REQUEST)

class Doc_future_app(APIView):
    def get(self, request, format=None):
        if request.GET != {}:
            appointments = Booking.objects.filter(docusername=request.GET['docusername'])
            serializer = Bookings_serializer(appointments, many=True)
            todays_date = datetime.date.today()
            ref_no = []
            for each in serializer.data:
                if datetime.datetime.strptime(each['bdate'],'%Y-%m-%d').date() > todays_date:
                    ref_no.append(each['ref_no'])
            future_apps = Booking.objects.filter(ref_no__in=ref_no)
            serializer = Bookings_serializer(future_apps, many=True)
            return Response(serializer.data)
        else:
            return Response(False, status=status.HTTP_400_BAD_REQUEST)