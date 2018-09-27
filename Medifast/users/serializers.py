from rest_framework import serializers
from .models import Account


class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ('url' ,'id', 'username', 'password', 'typeOfUser')
        #fields = '__all__'

