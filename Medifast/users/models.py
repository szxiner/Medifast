from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from .managers import AccountUserManager

# Create your models here.
class Account(AbstractBaseUser, PermissionsMixin):

    username = models.CharField(max_length=200, unique=True, default='DEFAULT VALUE1')
    password = models.CharField(max_length=200, default='DEFAULT VALUE1')
    typeOfUser = models.CharField(max_length=100, default='DEFAULT VALUE1')
    phone_number = models.IntegerField(default='12345678901')
    authy_id = models.CharField(max_length=12, null=True, blank=True)
    email = models.EmailField(default='joemomma@yahoo.com')
    securityQ = models.CharField(max_length=5000, default='What is your username?1')
    securityAns = models.CharField(max_length=5000, default='DEFAULT VALUE1')
    country_code = models.CharField(max_length=5, default='+1')

    objects = AccountUserManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

    def __str__(self):
        return self.username

