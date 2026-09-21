# Database layer (in-memory for now).
# TODO: replace with SQLite/PostgreSQL and SQLAlchemy/SQLModel.

_USERS = {}
_SCANS = {}
_NEXT_USER_ID = [1]
_NEXT_SCAN_ID = [1]


def init_db():
    """Create tables / run migrations. Placeholder for now."""
    pass


def insert_user(name: str, email: str, password_hash: str):
    if email in _USERS:
        return None
    user = {"id": str(_NEXT_USER_ID[0]), "name": name, "email": email, "password_hash": password_hash}
    _NEXT_USER_ID[0] += 1
    _USERS[email] = user
    return user


def find_user_by_email(email: str):
    return _USERS.get(email)


def insert_scan(user_id: str, data: dict):
    scan = {"id": _NEXT_SCAN_ID[0], "user_id": user_id, **data}
    _NEXT_SCAN_ID[0] += 1
    _SCANS.setdefault(user_id, []).append(scan)
    return scan


def list_scans_for_user(user_id: str):
    return list(_SCANS.get(user_id, []))
