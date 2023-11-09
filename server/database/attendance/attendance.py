from data import student_list
from classes import Class
import pickle
from datetime import date
from random import randint

print(student_list)

c = Class(
    student_list=student_list,
    teacher_name="Chandresh",
    class_name="CS203_2023"
)

l = [False]*86

for i in range(86):
    l[i] = bool(randint(0, 1))

print(l, '\n')

c.mark_attendance(date(2023, 8, 9), l)

print(c.attendance_data)

print(c.get_attendance('2023-08-09'), '\n')
print(c.get_attendance('2023-08-09', asbool=True))

print(c)
c.save()

# file = open(r"classes_data/CS203_2023.pkl", "rb")

# print(pickle.load(file))
