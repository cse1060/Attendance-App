import os
import pickle
import datetime
import hashlib
from backend.settings import BASE_DIR

db_path = os.path.join(BASE_DIR, r'database/users/database.pkl')

d = None

# with open(db_path, 'rb') as file:
#     d = pickle.load(file)

# u = User("abc", "aaaa", "123")
# cl = Class("class1", "a", "b", ['1', '2', '3'])
# u.classes["class1"] = cl
# d['abc'] = u

# with open(db_path, 'wb') as file:
#     pickle.dump(d, file)


# with open(db_path, 'rb') as file:
#     d = pickle.load(file)

# print(d)
# print(d['abc'].__dict__)
# print(d['abc'].classes['class1'])
# print(d['abc'].classes['class1'].__dict__)
# print(d['abc'].classes['class1'].__getstate__())

with open(db_path, 'wb') as file:
    pickle.dump(dict(), file)
