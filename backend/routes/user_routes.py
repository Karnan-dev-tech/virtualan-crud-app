from fastapi import APIRouter
from models.user_model import User
from controllers.user_controller import (
    get_users_controller,
    create_user_controller,
    update_user_controller,
    delete_user_controller
)

router = APIRouter()


@router.get("/users")
def get_users():
    return get_users_controller()


@router.post("/users")
def create_user(user: User):
    return create_user_controller(user.dict())


@router.put("/users/{email}")
def update_user(email: str, user: User):
    return update_user_controller(email, user.dict())


@router.delete("/users/{email}")
def delete_user(email: str):
    return delete_user_controller(email)