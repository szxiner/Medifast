from rest_framework import serializers
from .models import Insurance_recommendation

class Insurance_recommendation_serializer(serializers.ModelSerializer):
    class Meta:
        model = Insurance_recommendation
        fields = ('username','insurance_plan')
		
class Insurance_details_serializer(serializers.ModelSerializer):
    class Meta:
        model = Insurance_details
        fields = ('company','plan','coverage')