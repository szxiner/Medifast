from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

# Create your models here.
class Account(models.Model):

    username = models.CharField(max_length=200, default='DEFAULT VALUE')
    password = models.CharField(max_length=200, default='DEFAULT VALUE')
    typeOfUser = models.CharField(max_length=100, default='DEFAULT VALUE')
    phone_number = models.BigIntegerField(default='2197288966')
    authy_id = models.BigIntegerField(null=True, blank=True)
    email = models.EmailField(default='theemail@yahoo.com')
    securityQ = models.CharField(max_length=5000, default='What is your username?1')
    securityAns = models.CharField(max_length=5000, default='DEFAULT VALUE1')
    securityQ2 = models.CharField(max_length=5000, default='What is your username?1')
    securityAns2 = models.CharField(max_length=5000, default='DEFAULT VALUE1')
    #country_code = models.IntegerField(default='+1')

    def __str__(self):
        return self.username

