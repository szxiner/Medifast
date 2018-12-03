from django.db import models

# Create your models here.
class Insurance_recommendation(models.Model):

    #insurance_name = models.CharField(max_length=100, null=True)
    username = models.CharField(max_length=100, primary_key=True)
    insurance_plan = models.CharField(max_length=100, null=True)