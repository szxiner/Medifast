# Generated by Django 2.1.1 on 2018-10-07 20:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Patient_profile', '0003_patient_profile_gender'),
    ]

    operations = [
        migrations.CreateModel(
            name='Patient_history',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('issue', models.CharField(max_length=200, null=True)),
                ('doctor', models.CharField(max_length=100, null=True)),
                ('expenditure', models.IntegerField(null=True)),
                ('date', models.DateField(null=True)),
            ],
        ),
    ]
