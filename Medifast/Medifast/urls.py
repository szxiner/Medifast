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
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
#from twofa import views as twofa_views
#from phone_verification import views as verify_views

urlpatterns = [

    path('api-auth', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('patient_profile',include('Patient_profile.urls')),
    path('users-api/', include('users.urls')),
    path('patient/',include('Patient_profile.urls')),
    path('', include('users.urls')),
    path('doctor/',include('Doctor_profile.urls')),


    path('phone/', include('phone_verification.urls'))

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


#urlpatterns = format_suffix_patterns(urlpatterns)
