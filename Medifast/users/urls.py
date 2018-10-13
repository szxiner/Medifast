from django.contrib import admin
from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from rest_framework import routers
#from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

#router = routers.DefaultRouter()
#router.register('users', views.AccountList.as_view())
#router.register('userdeets', views.AccountDetails.as_view())

urlpatterns = [
    #path('', include(router.urls)),
    path('<int:pk>', views.AccountDetail.as_view()),
    path('', views.AccountList.as_view()),
    path('auth', views.AuthAccount.as_view()),
    path('2fa/', views.twofa, name='2fa'),
    path('token/sms/', views.token_sms, name='token-sms'),
    path('token/voice/', views.token_voice, name='token-voice'),
    path('token/onetouch/', views.token_onetouch, name='token-onetouch'),
    path('onetouch-status/', views.onetouch_status, name='onetouch-status'),

    #For testing
#    path('register/', views.register, name='register'),


    # not using the below api currently but will need them if we are doing jwt
    #path('api/token/', TokenObtainPairView.as_view()),
    #path('api/token/refresh/', TokenRefreshView.as_view()),
]