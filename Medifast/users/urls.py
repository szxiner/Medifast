from django.contrib import admin
from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('users', views.AccountView)

urlpatterns = [
    path('', include(router.urls)),
]