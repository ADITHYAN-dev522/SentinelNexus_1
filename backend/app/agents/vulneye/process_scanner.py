# backend/app/agents/vulneye/process_scanner.py
import psutil
from typing import List, Dict

def list_processes(limit: int = 200) -> List[Dict]:
    """
    Returns a list of running processes with basic metadata and listening connections.
    """
    procs = []
    for p in psutil.process_iter(['pid', 'name', 'exe', 'cmdline', 'username', 'create_time']):
        try:
            info = p.info
            # listening connections for this pid
            lcons = []
            try:
                for c in p.connections(kind="inet"):
                    if c.status == psutil.CONN_LISTEN:
                        lcons.append({"laddr": c.laddr, "raddr": c.raddr, "type": c.type})
            except Exception:
                lcons = []
            info['listening'] = lcons
            procs.append(info)
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue
        if len(procs) >= limit:
            break
    return procs
