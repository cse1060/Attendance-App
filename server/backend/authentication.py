import os
import hashlib
import pickle
from .settings import BASE_DIR

db_path = os.path.join(BASE_DIR, r'database\users\database.pkl')


def authenticate(username, password):
    res = {
        "success": True,
        "message": []
    }

    db = None

    with open(db_path, 'rb') as file:
        db = pickle.load(file)

    if (db.get(username) != None and db.get(username).password == hashlib.sha256(bytes(password, "utf-8")).hexdigest()):
        return {
            "user": db.get(username),
            "res": {
                "sucess": True,
                'message': []
            }
        }

    else:
        res['success'] = False
        res['message'].append("Invalid Credentials")
        return res
