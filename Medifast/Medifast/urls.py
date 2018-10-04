"""Medifast URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from rest_framework.urlpatterns import format_suffix_patterns
from users import views
from pages.views import FrontendRenderView
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from twofa import views as twofa_views
from phone_verification import views as verify_views

urlpatterns = [

    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),

    path('register/', twofa_views.register, name='register'),
    path('2fa/', twofa_views.twofa, name='2fa'),
    path('token/sms', twofa_views.token_sms, name='token-sms'),
    path('token/voice', twofa_views.token_voice, name='token-voice'),
    path('token/onetouch', twofa_views.token_onetouch, name='token-onetouch'),  # noqa: E501
    path('protected/', twofa_views.protected, name='protected'),
    path('onetouch-status', twofa_views.onetouch_status, name='onetouch-status'),  # noqa: E501

    path('verification/', verify_views.phone_verification, name='phone_verification'),  # noqa: E501
    path('verification/token/', verify_views.token_validation, name='token_validation'),  # noqa: E501
    path('verified/', verify_views.verified, name='verified'),


    path('api-auth', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    #path('(?P<path>.*)', FrontendRenderView, name=home),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


#urlpatterns = format_suffix_patterns(urlpatterns)