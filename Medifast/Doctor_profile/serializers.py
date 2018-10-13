from rest_framework import serializers
from .models import Doctor_profile

class Doctor_profile_serializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor_profile
        fields = ('username','email','First_name','Last_Name','gender','DOB','specialization','Hospital','rating','hourly_charge')
