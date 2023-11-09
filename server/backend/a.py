from models import User, Class
import pickle

db_path = r'server\database\users\database.pkl'

# pickle.dump(
#     dict(),
#     open(r'server\database\users\users.pkl', 'wb')
# )

u = User("sfa", "aaaaa", "12345")

u.save()

with open(db_path, 'rb') as file:
    print(pickle.load(file))
