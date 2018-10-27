from django.contrib import admin
from .models import Doctor_profile
from .models import Booking
from .models import Doctor_appointments

# Register your models here.
admin.site.register(Doctor_profile)
admin.site.register(Booking)
admin.site.register(Doctor_appointments)