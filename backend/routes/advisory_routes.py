from fastapi import APIRouter, Depends

from services.advisory_service import get_latest_advisory, get_advisory_for_crop
from services.auth_service import get_current_user

router = APIRouter()


@router.get("/latest")
def latest(current_user: dict = Depends(get_current_user)):
    return get_latest_advisory()


@router.get("/{crop}")
def by_crop(crop: str, current_user: dict = Depends(get_current_user)):
    return get_advisory_for_crop(crop)
