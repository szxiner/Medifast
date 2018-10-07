from django.urls import include, path
from . import views

urlpatterns = [
    path('', views.Patient_profile_view.as_view()),

]
