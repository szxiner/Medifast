from django.db import models


class Patient_profile(models.Model):
    username = models.CharField(max_length=100, primary_key=True) 
    email = models.EmailField(null=True)
    First_name = models.CharField(max_length=100, null=True)
    Last_Name = models.CharField(max_length=100, null=True)
    gender = models.CharField(max_length=10, null=True)
    DOB = models.DateField(null=True)
    company = models.CharField(max_length=100, default = 'Medicare')
    plan = models.CharField(max_length=100, default = 'standard')
    salary = models.BigIntegerField(null=True)
    def __str__(self):
        return self.username

class Patient_history(models.Model):
    username = models.CharField(max_length=100)
    issue = models.CharField(max_length=200, null=True)
    doctor = models.CharField(max_length=100, null=True)
    expenditure = models.IntegerField(null=True)
    date = models.DateField(null=True)

    def __str__(self):
        return self.username


