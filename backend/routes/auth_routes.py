from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr

from services.auth_service import authenticate_user, create_user, create_access_token, get_current_user

router = APIRouter()


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


@router.post("/login")
def login(payload: LoginRequest):
    user = authenticate_user(payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token({"sub": user["id"]})
    return {"token": token, "user": {"id": user["id"], "name": user["name"], "email": user["email"]}}


@router.post("/register", status_code=201)
def register(payload: RegisterRequest):
    existing = create_user(payload.name, payload.email, payload.password)
    if existing is None:
        raise HTTPException(status_code=409, detail="Email already registered")
    token = create_access_token({"sub": existing["id"]})
    return {"token": token, "user": {"id": existing["id"], "name": existing["name"], "email": existing["email"]}}


@router.get("/me")
def me(current_user: dict = Depends(get_current_user)):
    return {"id": current_user["id"], "name": current_user["name"], "email": current_user["email"]}
