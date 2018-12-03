from rest_framework import serializers
from .models import Insurance_recommendation

class Insurance_recommendation_serializer(serializers.ModelSerializer):
    class Meta:
        model = Insurance_recommendation
        fields = ('patient_username','insurance_plan')