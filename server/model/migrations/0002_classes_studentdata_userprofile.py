# Generated by Django 4.2.6 on 2023-10-13 22:07

from django.db import migrations, models
import model.models


class Migration(migrations.Migration):

    dependencies = [
        ('model', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Classes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('class_id', models.CharField(max_length=10)),
                ('Owner_username', models.CharField(max_length=256)),
                ('name', models.CharField(max_length=256)),
                ('students', models.JSONField(default=model.models.f2)),
            ],
        ),
        migrations.CreateModel(
            name='StudentData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=256)),
                ('rollno', models.CharField(max_length=9)),
                ('image_url', models.CharField(max_length=512)),
                ('year', models.IntegerField()),
                ('course', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=256)),
                ('name', models.CharField(max_length=256)),
                ('iden', models.CharField(max_length=256)),
                ('type', models.CharField(max_length=32)),
                ('department', models.CharField(max_length=256)),
                ('classes', models.JSONField(default=model.models.f1)),
            ],
        ),
    ]