from database.mongo import collection


def get_all_users():
    users = list(collection.find({}, {"_id": 0}))
    return users


def create_user(user):
    collection.insert_one(user)
    return {"message": "User created successfully"}


def update_user(email, user):
    collection.update_one(
        {"email": email},
        {"$set": user}
    )
    return {"message": "User updated successfully"}


def delete_user(email):
    collection.delete_one({"email": email})
    return {"message": "User deleted successfully"}