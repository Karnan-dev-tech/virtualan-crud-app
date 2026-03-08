# Virtualan CRUD Application

A full stack CRUD application built using:

Frontend: React (Vite)
Backend: FastAPI
Database: MongoDB Atlas

Architecture: Three Tier Architecture

Presentation Layer
React UI for managing users

Logic Layer
FastAPI REST APIs

Data Layer
MongoDB Atlas database


Features

Create User
View Users
Update User
Delete User


Backend Setup

cd backend

python -m venv venv

venv\Scripts\activate

pip install fastapi uvicorn pymongo python-dotenv

uvicorn main:app --reload

Create a .env file inside the backend folder and add your MongoDB connection string.

Frontend Setup

cd frontend

npm install

npm run dev


Backend runs at

http://127.0.0.1:8000

Swagger API docs

http://127.0.0.1:8000/docs


Frontend runs at

http://localhost:5173