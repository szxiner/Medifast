from django.db import models
from datetime import *

class Doctor_profile(models.Model):
    username = models.CharField(max_length=100, primary_key=True) 
    email = models.EmailField(null=True)
    First_name = models.CharField(max_length=100, null=True)
    Last_Name = models.CharField(max_length=100, null=True)
    gender = models.CharField(max_length=10, null=True)
    DOB = models.DateField(null=True)
    specialization = models.CharField(max_length=100, null=True)
    Hospital = models.CharField(max_length=100, null=True)
    rating = models.IntegerField( null=True)
    hourly_charge = models.IntegerField( null=True)
    location = models.CharField(max_length=100, null= True)

    def __str__(self):
        return self.username

class Doctor_appointment(models.Model):
    username = models.CharField(max_length=100, null=True)
    appointment = models.DateTimeField( null=True)

class Doctor_reviews(models.Model):
    username = models.CharField(max_length=100, null=True)
    reviews = models.CharField(max_length=1000, null=True)
