from django.http import JsonResponse
import pickle
import os
from .settings import BASE_DIR
from django.views.decorators.csrf import csrf_protect
from rest_framework.decorators import api_view
from .authentication import authenticate
from .model import User, Class

db_path = os.path.join(BASE_DIR, r'database\users\database.pkl')
db = None

with open(db_path, 'rb') as file:
    db = pickle.load(file)


@csrf_protect
@api_view(['POST'])
def login_page(request):
    if request.method == 'POST':
        input = request.data
        res = authenticate(
            input['username'],
            input['password']
        )

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
        fullname = input['fullname']

        if (db.get(username) != None):
            res['success'] = False
            res['message'] = "Username is taken"

        else:
            res['message'] = "User sucessfully created"
            u = User(username, fullname, password)
            db[username] = u
            save(db)

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


def save(new_db):
    db = new_db
    with open(db_path, 'wb') as file:
        pickle.dump(db, file)
