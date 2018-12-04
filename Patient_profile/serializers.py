from rest_framework import serializers
from .models import Patient_profile, Patient_history

class Patient_profile_serializer(serializers.ModelSerializer):
    class Meta:
        model = Patient_profile
        fields = ('username','email','First_name','Last_Name','gender','DOB','company','plan','salary')

class Patient_history_serializer(serializers.ModelSerializer):
    class Meta:
        model = Patient_history
        fields = ('username','issue','doctor','expenditure','date')

