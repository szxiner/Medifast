# Generated by Django 2.1.1 on 2018-10-20 21:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Doctor_profile', '0014_booking_b_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='b_Time',
        ),
        migrations.RemoveField(
            model_name='booking',
            name='b_date',
        ),
    ]
