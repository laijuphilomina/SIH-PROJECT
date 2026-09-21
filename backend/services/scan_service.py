from datetime import datetime

# TODO: replace in-memory store with the database layer
_SCANS = []
_NEXT_ID = [1]


def save_scan(user_id: str, payload: dict) -> dict:
    scan = {
        "id": _NEXT_ID[0],
        "user_id": user_id,
        "crop": payload.get("crop"),
        "disease": payload.get("disease"),
        "pest": payload.get("pest"),
        "confidence": payload.get("confidence"),
        "severity": payload.get("severity"),
        "image": payload.get("image"),
        "created_at": datetime.utcnow().isoformat(),
    }
    _NEXT_ID[0] += 1
    _SCANS.append(scan)
    return scan


def list_scans(user_id: str):
    return [s for s in _SCANS if s["user_id"] == user_id]
