from django.http import JsonResponse
import pickle
import os
from .settings import BASE_DIR
from django.views.decorators.csrf import csrf_protect
from rest_framework.decorators import api_view, parser_classes
from .authentication import authenticate
from .model import User, Class
from random import randint
import hashlib
from PIL import Image
from rest_framework.parsers import MultiPartParser, FormParser
import cv2
import matplotlib.pyplot as plt

db_path = os.path.join(BASE_DIR, r'database\users\database.pkl')
db = None

with open(db_path, 'rb') as file:
    db = pickle.load(file)


@csrf_protect
@api_view(['POST'])
def login_page(request):
    if request.method == 'POST':
        input = request.data
        username = input['username']
        password = input['password']

        res = {
            "success": True,
            "message": []
        }

        user = db.get(username)

        if (user is not None and user.password == hashlib.sha256(bytes(password, "utf-8")).hexdigest()):
            token = hashlib.sha256(
                bytes(username+str(randint(int(1e20), int(1e40))), 'utf-8'),
                usedforsecurity=True
            ).hexdigest()

            user.token = token
            db[username] = user
            save(db)
            res['token'] = token

            return JsonResponse(res)

        else:
            res['success'] = False
            res['message'].append("Invalid Credentials")
            return JsonResponse(res)


@csrf_protect
@api_view(['POST'])
def signup_page(request):
    if request.method == 'POST':
        res = {
            "success": True,
            "message": []
        }

        input = request.data

        username = input['username']
        password = input['password']
        email = input['email']

        if (db.get(username) != None):
            res['success'] = False
            res['message'] = "Username is taken"

        else:
            res['message'] = "User sucessfully created"
            u = User(username, email, password)
            db[username] = u
            save(db)

        print(db)
        return JsonResponse(res)


@csrf_protect
@api_view(['POST'])
def get_classes(request):
    if (request.method == 'POST'):
        input = request.data
        username = input['username']
        print(username)

        user = db.get(username)
        print(user.classes)
        if user == None:
            return JsonResponse(
                {
                    "success": False,
                    "message": ["User doesn't exist"]
                }
            )

        else:
            print(user.classes)
            return JsonResponse(
                {
                    "success": True,
                    "message": [],
                    "classes": list(user.classes.keys())
                }
            )


@csrf_protect
@api_view(['POST'])
def get_class_details(request):
    if (request.method == 'POST'):
        input = request.data
        username = input['username']
        classname = input['classname']

        user = db.get(username)
        if user == None:
            return JsonResponse(
                {
                    "success": False,
                    "message": ["User doesn't exist"]
                }
            )

        else:
            cl = user.classes.get(classname)
            if cl is not None:
                return JsonResponse(
                    {
                        "success": True,
                        "message": [],
                        "class": {
                            "classname": cl.class_name,
                            "teacher_name": cl.teacher_name,
                            "teacher_username": cl.teacher_username,
                            "strength": cl.strength,
                            "student_list": cl.student_list,
                            "attendance_data": cl.attendance_data
                        }
                    }
                )
            else:
                return JsonResponse(
                    {
                        "sucess": False,
                        "message": ["Class doesn't exist"]
                    }
                )


@csrf_protect
@api_view(['POST'])
def create_class(request):
    if (request.method == 'POST'):
        input = request.data
        print(input)
        username = input['username']
        classname = input['classname']
        student_list = input['student_list']

        user = db.get(username)

        if user == None:
            return JsonResponse(
                {
                    "success": False,
                    "message": ["User doesn't exist"]
                }
            )

        else:
            cl = user.classes.get(classname)

            if cl is not None:
                return JsonResponse(
                    {
                        "success": False,
                        "message": ["Class already exists"],
                    }
                )
            else:
                user.classes[classname] = Class(
                    classname, user.fullname, username, student_list)

                print(user.username)

                db[username] = user
                save(db)

                return JsonResponse(
                    {
                        "success": True,
                        "message": []
                    }
                )


@csrf_protect
@api_view(['POST'])
def check_user(request):
    input = request.data
    print(input)
    username = input['username']
    token = input['token']

    user = db.get(username)

    res = {
        "success": True,
        "message": []
    }

    if (user is not None and user.token == token):
        return JsonResponse(res)
    else:
        res['success'] = False
        return JsonResponse(res)


def save(new_db):
    db = new_db
    with open(db_path, 'wb') as file:
        pickle.dump(db, file)


@csrf_protect
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def take_attendance(request):
    file_obj = request.data['image']
    # print(request.data['image'])
    print(type(file_obj))
    img = Image.open(file_obj)
    img.save("../result.png")
    return JsonResponse({"success": True})
