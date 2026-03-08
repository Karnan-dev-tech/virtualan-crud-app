from fastapi import APIRouter
from models.user_model import User
from database.mongo import collection

router = APIRouter()

@router.get("/users")
def get_users():
    users = list(collection.find({}, {"_id": 0}))
    return users

@router.post("/users")
def create_user(user: User):
    collection.insert_one(user.dict())
    return {"message": "User added successfully"}

@router.put("/users/{email}")
def update_user(email: str, user: User):
    collection.update_one(
        {"email": email},
        {"$set": user.dict()}
    )
    return {"message": "User updated successfully"}


@router.delete("/users/{email}")
def delete_user(email: str):
    collection.delete_one({"email": email})
    return {"message": "User deleted successfully"}