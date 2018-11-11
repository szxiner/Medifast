from django.contrib import admin
from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from rest_framework import routers
#from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('social/<backend>/', views.oauth2),
    path('<username>/<password>/', views.AccountDetail.as_view()),
    path('<username>/', views.AccountDetail.as_view()),
    path('', views.AccountList.as_view()),
    path('auth', views.AuthAccount.as_view()),
    path('2fa', views.twofa.as_view()),
    path('token/sms/', views.token_sms, name='token-sms'),
    path('token/voice/', views.token_voice, name='token-voice'),
    path('token/onetouch/', views.token_onetouch, name='token-onetouch'),
    path('onetouch-status/', views.onetouch_status, name='onetouch-status'),
	path('forgot_password', views.forgot_password.as_view()),

    #For testing
#    path('register/', views.register, name='register'),


    # not using the below api currently but will need them if we are doing jwt
    #path('api/token/', TokenObtainPairView.as_view()),
    #path('api/token/refresh/', TokenRefreshView.as_view()),
]