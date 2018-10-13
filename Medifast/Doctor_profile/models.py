from django.db import models

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


    def __str__(self):
        return self.username
