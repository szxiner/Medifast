from django.shortcuts import render
from rest_framework.views import APIView
from .models import Insurance_recommendation, Insurance_details
from .serializers import Insurance_recommendation_serializer, Insurance_details_serializer
from rest_framework.response import Response
from rest_framework import status
from Patient_profile.models import Patient_history, Patient_profile
from Doctor_profile.models import Doctor_profile
from datetime import date
from rest_framework import generics

# Create your views here.
class Insurance_recommendation_view(generics.RetrieveUpdateDestroyAPIView):

    queryset = Insurance_recommendation.objects.all()
    serializer_class = Insurance_recommendation_serializer
    lookup_field = 'username'

    def post(self, request, username, format=None, ):

        users = Insurance_recommendation.objects.filter(username=username)
        user = users.first()
        serializer = Insurance_recommendation_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            
            #Get the past appts of this patient
            past_appts = Patient_history.objects.filter(username=username)
            number_of_appts = len(past_appts)
            #Get the patient's profile
            patients = Patient_profile.objects.filter(username=username)
            patient = patients.first()
            #Get the patient's current insurance info
            patient_insurances = Insurance_details.objects.filter(username=username)
            patient_insurance = patient_insurances.first()
            current_plan = patient_insurance.plan

            non_physicians = 0

            lifetime = 0
            medicare = 0
            recommended_company = ''

            #For each appointment, check the doctor's specialization, and their accepted insurance
            for appt in past_appts:
                docs = Doctor_profile.objects.filter(username=appt.doctor)
                doc = docs.first()
                if doc.specialization != 'Physician':
                    non_physicians += 1
                if doc.insurance_name == 'Medicare':
                    medicare += 1
                if doc.insurance_name == 'Lifetime':
                    lifetime += 1

            #Find which company is accepted more by the patient's doctors
            if medicare >= lifetime:
                serializer.save(insurance_name='Medicare')
                recommended_company = 'Medicare'
            else:
                serializer.save(insurance_name='Lifetime')
                recommended_company = 'Lifetime'


            score = 0
            ######Start calculation of score

            ###AGE
            try:
                age = date.today() - patient.DOB

                if age <= 27:
                    score += 0.3
                elif age <= 54:
                    score += 1
                elif age > 54:
                    score += 2
            except:
                pass
                score += 0.5


            ###Past Doctors
            try:
                if float(non_physicians)/float(number_of_appts) <= 0.25:
                    score += 0.5
                elif float(non_physicians)/float(number_of_appts) > .25 and float(non_physicians)/float(number_of_appts) < 0.75:
                    score += 1.5
                elif float(non_physicians)/float(number_of_appts) >= 0.75:
                    score += 2.5
            except:
                score += 0.5

            
            ###Salary
            try:
                if patient.salary < 35000:
                    score -= 0.5
                elif patient.salary < 50000:
                    score += 0.5
                elif patient.salary >= 50000:
                    score += 1.25
            except:
                pass
                score += 0.5

            ###Number of appts
            if number_of_appts <= 5:
                score += 0
            elif number_of_appts <= 10:
                score += 1
            elif number_of_appts > 10:
                score += 2

            #####End calculation of score

            ###Decide what plan to recommend based on score
            if score <= 2:
                plan = 'Standard'
            elif score <= 4:
                plan = 'Gold'
            elif score > 4:
                plan = 'Platinum'
        

            serializer.save(insurance_plan=plan)

            if plan != current_plan:
                serializer.save(current_plan=False)
            else:
                serializer.save(current_plan=True)
        
            serializer.save()

            return Response(True, status=status.HTTP_201_CREATED)
        else:
            return Response(False, status=status.HTTP_400_BAD_REQUEST)
			
class Insurance_details_view(APIView):
    def get(self, request, format=None):
        details = Insurance_details.objects.all()
        details_serializer = Insurance_details_serializer(details, many=True)
        return Response(details_serializer.data)