import os
from datetime import datetime, timedelta

import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer(auto_error=False)

SECRET_KEY = os.getenv("JWT_SECRET", "dev-secret-change-me")
ALGORITHM = "HS256"
TOKEN_EXPIRE_MINUTES = 60 * 24

# TODO: replace in-memory users with the real database layer
_USERS = {}
_NEXT_ID = [1]


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)


def create_user(name: str, email: str, password: str):
    if email in _USERS:
        return None
    user = {
        "id": str(_NEXT_ID[0]),
        "name": name,
        "email": email,
        "password_hash": hash_password(password),
    }
    _NEXT_ID[0] += 1
    _USERS[email] = user
    return user


def authenticate_user(email: str, password: str):
    user = _USERS.get(email)
    if not user or not verify_password(password, user["password_hash"]):
        return None
    return user


def create_access_token(payload: dict) -> str:
    data = {**payload, "exp": datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRE_MINUTES)}
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials is None:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    user = _USERS.get(payload.get("email") or "")
    if user is None:
        # TODO: load user from database by id (payload["sub"])
        raise HTTPException(status_code=401, detail="User not found")
    return user
