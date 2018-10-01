from django.contrib import admin
from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

#router = routers.DefaultRouter()
#router.register('users', views.AccountList.as_view())
#router.register('userdeets', views.AccountDetails.as_view())

urlpatterns = [
    #path('', include(router.urls)),
    path('users', views.AccountList.as_view()),
    path('auth', views.AuthAccount.as_view()),

    # not using the below api currently but will need them if we are doing jwt
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
]