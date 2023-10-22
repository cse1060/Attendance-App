from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, parser_classes
from model.models import Tokens, Classes, UserProfile, StudentData
from .serializers import UserProfileSerializer
import hashlib
import os
from PIL import Image
from rest_framework.parsers import MultiPartParser, FormParser


@csrf_protect
@api_view(['POST'])
def login_page(request):
    data = request.data
    print(data)
    user = authenticate(username=data['username'], password=data['password'])

    if (user is not None):
        token = hashlib.sha512(
            os.urandom(256)
        ).hexdigest()

        obj = Tokens.objects.get(username=data["username"])
        obj.token = token
        obj.save()

        print(token)

        return JsonResponse({"error": 0, "success": True, "verifyToken": token})

    else:
        return JsonResponse({"error": 1, "success": False})


@csrf_protect
@api_view(("GET", "POST"))
def signup(req):
    if req.method == "POST":
        try:
            data = req.data

            u = User.objects.create_user(
                data["username"], data["email"], data["password"])
            u.save()

            Tokens.objects.create(username=data["username"], token="")
            print(Tokens.objects.all())

            print(User.objects.all())
            return JsonResponse({"success": True})
        except Exception as e:
            print(e, "---errrors")
            return JsonResponse({"success": False})
    elif req.method == "GET":
        return JsonResponse({"name": "pratham"})


@csrf_protect
@api_view(['POST'])
def verify_user(request):

    data = request.data

    username = data["username"]
    token = data["verifyToken"]

    tk = Tokens.objects.get(username=username).token

    if tk != "" and token == tk:
        return JsonResponse(
            {
                "success": True
            }
        )

    else:
        return JsonResponse(
            {
                "success": False
            }
        )


@csrf_protect
@api_view(['POST', 'GET'])
def create_profile(request, slug):
    if request.method == "POST":
        # print(request.data)
        data = request.data["user"]
        img = request.data["img"]
        print(img)
        username = data["username"]
        name = data["name"]
        identity = data["iden"]
        department = data["department"]
        type = data["userType"]

        prevUser = UserProfile.objects.filter(username=username)
        if len(prevUser) > 0:
            return JsonResponse({"success": False, "message": "User already exists ."})

        user = UserProfile.objects.create(
            username=username, name=name, iden=identity, department=department, type=type)

        if type == "Student":
            year = int(data["year"])
            course = data["course"]

            student = StudentData.objects.create(
                username=username, rollno=identity, year=year, course=course, image_urls={'urls': [img]})

        return JsonResponse({"success": True})
    else:
        # print(slug)
        prevUser = UserProfile.objects.filter(username=slug)
        if len(prevUser) > 0:
            serializer = UserProfileSerializer(prevUser[0])
            print(serializer.data)
            return JsonResponse({"isNew": False, "message": "User already exists .", "user": serializer.data})
        return JsonResponse({"isNew": True})


@csrf_protect
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def take_attendance(request):
    file_obj = request.data['image']
    img = Image.open(file_obj)
    img.show()
    print(request.data)
    print(file_obj)
    return JsonResponse({"success": True})


@csrf_protect
@api_view(['POST', "GET"])
def get_user(request, slug):
    if request.method == "GET":
        User = UserProfile.objects.filter(username=slug)
        serializer = UserProfileSerializer(User[0])
        print(serializer.data, "***")
        return (JsonResponse({"user": serializer.data}))


@csrf_protect
@api_view(['POST'])
def create_class(request):
    if request.method == "POST":
        details = request.body

        # check if the given class is new or not
        classRoom = Classes.objects.filter(
            Owner_username=details["owner"], name=details["name"])
        if (len(classRoom) > 0):
            return (JsonResponse({"success": False, "message": "The classroom already exists, changee the classroom name"}))
        # Set a class_id accordingly --- sam
        else:
            Classes.objects.create(
                Owner_username=details["owner"], name=details["name"], description=details["description"])
            return (JsonResponse({"success": True, "message": "Class created successfully"}))
    else:
        return (JsonResponse({"success": True}))
