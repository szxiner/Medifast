from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=250)
    password = models.CharField(max_length=250)
    email = models.CharField(max_length=250)

class DuoAuth(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)