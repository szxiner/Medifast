# Generated by Django 2.1.1 on 2018-10-20 21:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Doctor_profile', '0012_remove_booking_b_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='B_Time',
        ),
        migrations.AddField(
            model_name='booking',
            name='b_date',
            field=models.DateField(null=True),
        ),
    ]
