# Generated by Django 2.1.1 on 2018-09-27 04:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(default='DEFAULT VALUE1', max_length=200)),
                ('password', models.CharField(default='DEFAULT VALUE1', max_length=200)),
                ('typeOfUser', models.CharField(default='DEFAULT VALUE1', max_length=100)),
            ],
        ),
    ]
