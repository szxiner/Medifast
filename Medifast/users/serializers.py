from rest_framework import serializers
from .models import Account
from django.contrib.auth.hashers import make_password
import phonenumbers

from authy.api import AuthyApiClient
from django import forms
from django.conf import settings
from phonenumbers.phonenumberutil import NumberParseException

from .models import Account

authy_api = AuthyApiClient(settings.ACCOUNT_SECURITY_API_KEY)

class AccountSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.password = make_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.password = make_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance

    def cleanPhoneNumber(self):
        pass

    #Consider cleaning functions instead of using views to check this info
    '''
    def clean_username(self):
        username = self.cleaned_data['username']
        if Account.objects.filter(username=username).exists():
            self.add_error('username', 'Username is already taken')
        return username
    '''



    class Meta:
        model = Account
        #fields = ('id', 'username', 'password', 'typeOfUser', 'securityQ', 'securityAns', 'email', 'authy_id', 'phone_number')
        fields = '__all__'


