from rest_framework import serializers
from .models import Doctor_profile,Doctor_appointment,Doctor_reviews

class Doctor_profile_serializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor_profile
        fields = ('username','email','First_name','Last_Name','gender','DOB','specialization','Hospital','rating','hourly_charge','location')

class Doctor_appointment_serializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor_appointment
        fields = ('username','appointment')

class Doctor_reviews_serializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor_reviews
        fields = ('username','reviews')