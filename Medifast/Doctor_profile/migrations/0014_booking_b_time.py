# Generated by Django 2.1.1 on 2018-10-20 21:44

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Doctor_profile', '0013_auto_20181020_1744'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='b_Time',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.TimeField(), null=True, size=None),
        ),
    ]
