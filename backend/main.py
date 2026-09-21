from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth_routes import router as auth_router
from routes.scan_routes import router as scan_router
from routes.advisory_routes import router as advisory_router

app = FastAPI(title="AI Crop & Pest Detection API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(scan_router, prefix="/api/scans", tags=["scans"])
app.include_router(advisory_router, prefix="/api/advisory", tags=["advisory"])


@app.get("/health")
def health_check():
    return {"status": "ok"}
