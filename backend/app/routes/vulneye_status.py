# backend/app/routes/vulneye_status.py
from fastapi import APIRouter, HTTPException
from app.services.vulneye_autonomous import (
    perform_autoscan,
    list_history,
    get_scan_by_id
)
from app.core.db import init_db
from app.tasks.scheduler import start_scheduler

router = APIRouter(prefix="/vulneye", tags=["VulnEye"])

# ensure DB and scheduler start on import
init_db()
start_scheduler(run_immediately=False)  # don't force immediate run unless desired

@router.get("/status")
def status():
    # return latest scan summary
    history = list_history(limit=1)
    if not history:
        return {"message": "no scans yet"}
    return history[0]

@router.post("/force_scan")
def force_scan():
    # trigger synchronous autoscan now and return payload
    res = perform_autoscan()
    return res

@router.get("/history")
def history(limit: int = 50):
    return list_history(limit=limit)

@router.get("/{scan_id}")
def get_scan(scan_id: str):
    s = get_scan_by_id(scan_id)
    if s is None:
        raise HTTPException(status_code=404, detail="scan not found")
    return s
