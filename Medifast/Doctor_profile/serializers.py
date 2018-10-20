from rest_framework import serializers
from .models import Doctor_profile,Doctor_appointments,Doctor_reviews,Booking

class Doctor_profile_serializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor_profile
        fields = ('username','email','First_name','Last_Name','gender','DOB','specialization','Hospital','rating','hourly_charge','location')

class Doctor_appointment_serializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor_appointments
        fields = ('username','workingdays','time')

class Bookings_serializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('docusername','patientusername','bdate','btime')

class Doctor_reviews_serializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor_reviews
        fields = ('username','reviews')