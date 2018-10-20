from django.urls import include, path
from . import views

urlpatterns = [
    path('profile', views.Doctor_profile_view.as_view()),
    path('appointments', views.Doctor_appointment_view.as_view()),
    path('bookings', views.Doctor_bookings_view.as_view()),
    path('reviews', views.Doctor_reviews_view.as_view()),
    
]
