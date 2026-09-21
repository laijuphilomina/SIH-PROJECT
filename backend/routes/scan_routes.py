from fastapi import APIRouter, Depends

from services.scan_service import save_scan, list_scans
from services.auth_service import get_current_user

router = APIRouter()


@router.post("", status_code=201)
def upload_scan(payload: dict, current_user: dict = Depends(get_current_user)):
    scan = save_scan(current_user["id"], payload)
    return {"id": scan["id"], "synced": True}


@router.get("")
def get_scans(current_user: dict = Depends(get_current_user)):
    return list_scans(current_user["id"])
