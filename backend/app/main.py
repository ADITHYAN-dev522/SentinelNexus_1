# backend/app/main.py
from fastapi import FastAPI
from app.routes import vulneye_status# adjust import path if needed (app.routes.vulneye_status)
from app.tasks.scheduler import start_scheduler
from app.core.db import init_db

app = FastAPI(title="SentinelNexus API", version="0.1-MVP")

# init DB
init_db()

# include router (adjust import path to match your package layout)
app.include_router(vulneye_status.router)

# start scheduler when app launches
@app.on_event("startup")
def startup_event():
    # start scheduler in background (do not run immediate scan here; scheduler will run)
    start_scheduler(run_immediately=False)
