from django.db import models

# Create your models here.
class Account(models.Model):
    username = models.CharField(max_length=200, default='DEFAULT VALUE1')
    password = models.CharField(max_length=200, default='DEFAULT VALUE1')
    typeOfUser = models.CharField(max_length=100, default='DEFAULT VALUE1')
    securityQ = models.CharField(max_length=5000, default='What is your username?1')
    securityAns = models.CharField(max_length=5000, default='DEFAULT VALUE1')
    #theme = models.CharField(max_length=500)
    #type = models.ForeignKey(Type, on_delete=models.CASCADE)

    def __str__(self):
        return self.username

