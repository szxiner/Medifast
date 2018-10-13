from django.urls import include, path
from . import views

urlpatterns = [
    path('profile', views.Doctor_profile_view.as_view()),

]
