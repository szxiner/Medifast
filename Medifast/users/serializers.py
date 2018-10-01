from rest_framework import serializers
from .models import Account
from bcrypt import gensalt, hashpw

class AccountSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.password = hashpw(password.encode('utf-8'), gensalt())
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.password = hashpw(value.encode('utf-8'), gensalt())
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance
    class Meta:
        model = Account
        fields = ('id', 'username', 'password', 'typeOfUser')
        #fields = '__all__'

