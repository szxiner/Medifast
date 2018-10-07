from rest_framework import serializers
from .models import Patient_profile

class Patient_profile_serializer(serializers.ModelSerializer):
    class Meta:
        model = Patient_profile
        fields = ('username','email','First_name','Last_Name','DOB')

