from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse("<h1>Login Homepage</h1>")
#def index(request):
 #   r = requests.get('http://httpbin.org/status/418')
  #  print(r.text)
   # return HttpResponse('<pre>' + r.text + '</pre>')