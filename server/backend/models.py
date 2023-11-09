import os
import pickle
import datetime
import hashlib

db_path = r'server\database\users\database.pkl'


class Class:
    class_name = None
    teacher_name = None
    teacher_username = None
    strength = None
    attendance_data = dict()
    student_list = None
    attendance_template = dict()

    def __init__(self, class_name, teacher_name, teacher_username, student_list):
        self.class_name = class_name
        self.teacher_name = teacher_name
        self.teacher_username = teacher_username
        self.student_list = student_list
        self.strength = len(student_list)

        for student in student_list:
            self.attendance_template[student] = False

    def __str__(self):
        res = f"""{self.__repr__()}\nName: {self.class_name}\nTeacher: {self.teacher_name} ({self.teacher_username})\nStrength: {self.strength}\nStudents: {" ".join(self.student_list) if self.strength<=3 else f"{self.student_list[0]} {self.student_list[1]} ..... {self.student_list[-1]}"}"""

        return res

    def mark_attendance(self, date, attendance):
        error_message = {
            "success": True,
            "message": []
        }

        if (type(attendance) != list and type(attendance) != tuple):
            error_message["success"] = False
            error_message['message'].append("Input must be a list or tuple")

        if (len(attendance) != self.strength):
            error_message["success"] = False
            error_message['message'].append(
                """Input's length must be equal to class's length""")

        if (type(date) != datetime.date):
            error_message["success"] = False
            error_message["message"].append(
                "Date must be python datetime.date")

        if (self.attendance_data.get(date.__str__()) != None):
            error_message["success"] = False
            error_message["message"].append(
                f"Attendance at {date.__str__()} already exists")

        if (error_message["success"]):
            att = self.attendance_template
            for i in range(len(attendance)):
                if (attendance[i]):
                    att[self.student_list[i]] = True
            self.attendance_data[date.__str__()] = att

        if (error_message['success']):
            print("Mark Attendance successfull\n")
        else:
            print("Mark Attendance failed: ")
            for error in error_message['message']:
                print('-', error)
            print()
        return error_message

    def get_attendance(self, date, asbool=False):
        if (type(date) == datetime.date):
            date = date.__str_()

        att = self.attendance_data.get(date)

        if (att == None):
            print("Get Attendance error:")
            print(f"- Date error: Attendance at {date} doesn't exist\n")
        else:
            print("Success\n")
            if (asbool):
                return list(att.values())
            return att


class User:
    username = None
    fullname = None
    password = None
    classes = dict()
    path = None

    def __init__(self, username: str, fullname: str, password: str):

        with open(db_path, 'rb') as file:
            d = pickle.load(file)
            if (d.get(username) != None):
                print("User already exists")
                return

        self.username = username
        self.fullname = fullname
        self.password = hashlib.sha256(
            bytes(password, "utf-8")
        ).digest()

        self.save()

    def __str__(self):
        return f"{self.username}"

    def add_class(self, classname: str, student_list: list[str]):
        self.classes[classname] = Class(
            classname, self.fullname, self.username, student_list
        )

    def save(self):
        user_dict = None

        # print(os.listdir(os.curdir))
        with open(db_path, 'rb') as file:
            user_dict = pickle.load(file)

        user_dict[self.username] = self

        with open(db_path, 'wb') as file:
            pickle.dump(user_dict, file)