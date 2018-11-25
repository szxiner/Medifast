from django.contrib import admin
from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from rest_framework import routers
from phone_verification import views as verify_views

urlpatterns = [
    #path('', include(router.urls)),
    path('verification/', verify_views.phone_verification, name='phone_verification'),  # noqa: E501
    path('verification/token/', verify_views.token_validation, name='token_validation'),  # noqa: E501
    path('verified/', verify_views.verified, name='verified'),
]