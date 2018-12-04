from django.shortcuts import render
from rest_framework.views import APIView
from .models import Insurance_recommendation, Insurance_details
from .serializers import Insurance_recommendation_serializer, Insurance_details_serializer
from rest_framework.response import Response
from rest_framework import status
from Patient_profile.models import Patient_history, Patient_profile
from Doctor_profile.models import Doctor_profile
from datetime import date

# Create your views here.
class Insurance_recommendation_view(APIView):
    def get(self, request, format=None):
        if request.GET != {}:
            recommendation = Insurance_recommendation.objects.filter(username=request.data['username'])
            serializer = Insurance_recommendation_serializer(recommendation, many=True)
            return Response(serializer.data)
        else :
            return Response(False, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):

        serializer = Insurance_recommendation_serializer(data=request.data)
        if serializer.is_valid():

            user = request.data['username']
            past_appts = Patient_history.objects.filter(username=user)
            number_of_appts = len(past_appts)
            patients = Patient_profile.objects.filter(username=user)
            patient = patients.first()

            non_physicians = 0

            lifetime = 0
            medicare = 0

            for appt in past_appts:
                docs = Doctor_profile.objects.filter(username=appt.doctor)
                doc = docs.first()
                if doc.specialization != 'Physician':
                    non_physicians += 1

                if doc.insurance_name == 'Medicare':
                    medicare += 1
                if doc.insurance_name == 'Lifetime':
                    lifetime += 1

            if medicare >= lifetime:
                serializer.save(insurance_name='Medicare')
            else:
                serializer.save(insurance_name='Lifetime')


            score = 0

            ###AGE
            try:
                age = date.today() - patient.DOB

                print(age)


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
                elif patien.salary >= 50000:
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


            if score <= 2:
                plan = 'Standard'
            elif score <= 4:
                plan = 'Gold'
            elif score > 4:
                plan = 'Platinum'

        
            
        
            serializer.save(insurance_plan=plan)
            #serialized_data = serializer.validated_data
            #serialized_data['insurance_plan'] = 'Platinum'

            serializer.save()
            

            return Response(True, status=status.HTTP_201_CREATED)
        else:
            return Response(False, status=status.HTTP_400_BAD_REQUEST)
			
class Insurance_details_view(APIView):
    def get(self, request, format=None):
        details = Insurance_details.objects.all()
        details_serializer = Insurance_details_serializer(details, many=True)
        return Response(details_serializer.data)