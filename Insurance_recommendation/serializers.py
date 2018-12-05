from rest_framework import serializers
from .models import Insurance_recommendation, Insurance_details

class Insurance_recommendation_serializer(serializers.ModelSerializer):
    class Meta:
        model = Insurance_recommendation
        fields = ('insurance_name', 'username','insurance_plan', 'current_plan')
		
class Insurance_details_serializer(serializers.ModelSerializer):
    class Meta:
        model = Insurance_details
        fields = ('username', 'company','plan','coverage')