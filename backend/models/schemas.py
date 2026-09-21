from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    name: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserOut(UserBase):
    id: str


class ScanRecord(BaseModel):
    crop: str | None = None
    disease: str | None = None
    pest: str | None = None
    confidence: float | None = None
    severity: str | None = None
    image: str | None = None


class DetectionResult(BaseModel):
    crop: str
    disease: str | None = None
    pest: str | None = None
    confidence: float
    severity: str
    advisory: str | None = None
