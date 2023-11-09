import os
import hashlib
import pickle

db_path = r'server\database\users\database.pkl'


def authenticate(username, password):
    res = {
        "success": True,
        "message": []
    }

    user_dict = None

    with open(db_path) as file:
        user_dict = pickle.load(file)

    if (user_dict.get(username) == None or user_dict.get(username) != hashlib.sha256(bytes(password, "utf-8")).hexdigest()):
        return False

    else:
        return True
