from services.user_service import (
    get_all_users,
    create_user,
    update_user,
    delete_user
)


def get_users_controller():
    return get_all_users()


def create_user_controller(user):
    return create_user(user)


def update_user_controller(email, user):
    return update_user(email, user)


def delete_user_controller(email):
    return delete_user(email)