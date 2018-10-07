from django.db import models


class Patient_profile(models.Model):
    username = models.CharField(max_length=100, primary_key=True) 
    email = models.EmailField(null=True)
    First_name = models.CharField(max_length=100, null=True)
    Last_Name = models.CharField(max_length=100, null=True)
    DOB = models.DateField(null=True)

    def __str__(self):
        return self.email

