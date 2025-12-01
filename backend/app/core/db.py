# backend/app/core/db.py
import sqlite3
import json
import os
from typing import Optional, Dict, Any

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "vulneye_scans.db")
DB_PATH = os.path.abspath(DB_PATH)

def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS scans (
        id TEXT PRIMARY KEY,
        target TEXT,
        timestamp TEXT,
        result_json TEXT
    )
    """)
    conn.commit()
    conn.close()

def insert_scan(scan_id: str, target: str, timestamp: str, result: Dict[str, Any]):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("INSERT OR REPLACE INTO scans (id, target, timestamp, result_json) VALUES (?, ?, ?, ?)",
                (scan_id, target, timestamp, json.dumps(result)))
    conn.commit()
    conn.close()

def get_scan(scan_id: str) -> Optional[Dict]:
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT id, target, timestamp, result_json FROM scans WHERE id = ?", (scan_id,))
    row = cur.fetchone()
    conn.close()
    if not row:
        return None
    return {"id": row[0], "target": row[1], "timestamp": row[2], "result": json.loads(row[3])}

def list_scans(limit: int = 50):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT id, target, timestamp, result_json FROM scans ORDER BY timestamp DESC LIMIT ?", (limit,))
    rows = cur.fetchall()
    conn.close()
    return [{"id": r[0], "target": r[1], "timestamp": r[2], "result": json.loads(r[3])} for r in rows]
