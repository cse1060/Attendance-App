from django.db import models

# Create your models here.


class Tokens(models.Model):
    username = models.CharField(max_length=256)
    token = models.CharField(max_length=256)

    def _str_(self):
        return f"username : {self.username}, token : {self.token}"


def f1():
    return {"classes": []}


def f2():
    return {"students": []}


def f3():
    return {"urls": []}


class UserProfile(models.Model):
    username = models.CharField(max_length=256)
    name = models.CharField(max_length=256)
    iden = models.CharField(max_length=256)
    type = models.CharField(max_length=32)
    department = models.CharField(max_length=256)
    classes = models.JSONField(default=f1)


class StudentData(models.Model):
    username = models.CharField(max_length=256)
    institute = models.CharField(max_length=256)
    rollno = models.CharField(max_length=9)
    image_urls = models.JSONField(default=f3)
    year = models.IntegerField()
    course = models.CharField(max_length=10)


class Classes(models.Model):
    class_id = models.CharField(max_length=10)
    Owner_username = models.CharField(max_length=256)
    name = models.CharField(max_length=256)
    description = models.CharField(max_length=512)
    students = models.JSONField(default=f2)
    join_token = models.CharField(max_length=256)
    join_password = models.CharField(max_length=256)
