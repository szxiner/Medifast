from django.urls import include, path
from . import views

urlpatterns = [
    path('recommend/', views.Insurance_recommendation_view.as_view()),
	path('details', views.Insurance_details_view.as_view()),
]