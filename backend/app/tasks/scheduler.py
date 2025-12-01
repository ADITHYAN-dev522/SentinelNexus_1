# backend/app/tasks/scheduler.py
from apscheduler.schedulers.background import BackgroundScheduler
from app.services.vulneye_autonomous import perform_autoscan
from datetime import datetime
import logging

logger = logging.getLogger("scheduler")

_scheduler = None

def start_scheduler(run_immediately: bool = True):
    global _scheduler
    if _scheduler:
        return _scheduler
    _scheduler = BackgroundScheduler()
    # Add job to run every hour
    _scheduler.add_job(lambda: _job_wrapper(), 'interval', hours=1, id='vulneye_hourly', next_run_time=datetime.utcnow())
    _scheduler.start()
    logger.info("VulnEye scheduler started (hourly).")
    if run_immediately:
        try:
            _job_wrapper()
        except Exception as e:
            logger.exception("Initial run failed: %s", e)
    return _scheduler

def _job_wrapper():
    logger.info("VulnEye scheduled scan starting.")
    try:
        res = perform_autoscan()
        logger.info("VulnEye scheduled scan finished: id=%s", res.get("id"))
    except Exception:
        logger.exception("VulnEye scheduled scan failed.")
