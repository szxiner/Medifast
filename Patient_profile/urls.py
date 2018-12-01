from django.urls import include, path
from . import views

urlpatterns = [
    path('profile', views.Patient_profile_view.as_view()),
    path('history', views.Patient_history_view.as_view()),
    path('bill', views.Patient_booking_history.as_view()),
    path('delete', views.delete_booking),
]
