# Generated by Django 4.2.6 on 2023-10-13 22:21

from django.db import migrations, models
import model.models


class Migration(migrations.Migration):

    dependencies = [
        ('model', '0002_classes_studentdata_userprofile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='studentdata',
            name='image_url',
        ),
        migrations.AddField(
            model_name='studentdata',
            name='image_urls',
            field=models.JSONField(null=True, verbose_name=model.models.f3),
        ),
    ]
