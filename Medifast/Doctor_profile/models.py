from django.db import models
from datetime import *
from django.contrib.postgres.fields import ArrayField

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

class Doctor_appointments(models.Model):
    username = models.CharField(max_length=100, null=True)
    workingdays = ArrayField(models.CharField(max_length=100), null=True)
    time = ArrayField(models.TimeField(),null=True)

class Booking(models.Model):
    docusername = models.CharField(max_length=100, null=True)
    patientusername = models.CharField(max_length=100, null=True)
    bdate = models.DateField(null=True)
    btime = ArrayField(models.TimeField(),null=True)

class Doctor_reviews(models.Model):
    username = models.CharField(max_length=100, null=True)
    reviews = models.CharField(max_length=1000, null=True)
