import json

from database import SessionLocal
from models import User


with open("seed.json", "r") as file:
    users = json.load(file)

db = SessionLocal()

for user_data in users:
    user = User(
        id=user_data["id"],
        username=user_data["username"]
    )

    db.add(user)

db.commit()

print("Users seeded successfully")