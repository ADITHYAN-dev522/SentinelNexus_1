# backend/app/services/vulneye_autonomous.py
from datetime import datetime
import uuid
from app.agents.vulneye.port_scanner import scan_local_ports
from app.agents.vulneye.process_scanner import list_processes
from app.agents.vulneye.package_scanner import get_os_packages
from app.agents.vulneye.cve_correlator import lookup_cves
from app.core.db import insert_scan, list_scans, get_scan

def build_scan_payload() -> dict:
    ts = datetime.utcnow().isoformat() + "Z"
    scan_id = str(uuid.uuid4())
    payload = {
        "id": scan_id,
        "timestamp": ts,
        "host": None,
        "port_scan": None,
        "processes": None,
        "packages": None,
        "cve_enrichment": {},
    }

    # port scan (local only)
    ok, xml = scan_local_ports(top_ports=100)
    payload["port_scan"] = {"ok": ok, "raw": xml if ok else xml}

    # processes
    try:
        payload["processes"] = list_processes(limit=300)
    except Exception as e:
        payload["processes"] = {"error": str(e)}

    # packages
    try:
        payload["packages"] = get_os_packages()
    except Exception as e:
        payload["packages"] = {"error": str(e)}

    # quick CVE enrichment: sample a few package names and process exe names
    enrichment = {}
    try:
        # sample from pip packages
        pip = payload["packages"].get("pip", []) if isinstance(payload["packages"], dict) else []
        for pkg in pip[:5]:
            name = pkg.split("==")[0] if "==" in pkg else pkg
            enrichment[name] = lookup_cves(name, limit=2)

        # sample process names
        procs = payload.get("processes", []) or []
        for p in procs[:5]:
            nm = (p.get("name") or "").split()[0]
            if nm and nm not in enrichment:
                enrichment[nm] = lookup_cves(nm, limit=1)
    except Exception:
        pass

    payload["cve_enrichment"] = enrichment

    # persist
    try:
        insert_scan(scan_id, "localhost", ts, payload)
    except Exception:
        # swallow persistence errors for now
        pass

    return payload

def perform_autoscan() -> dict:
    """
    Public entrypoint used by scheduler or force-scan endpoint.
    """
    return build_scan_payload()

def list_history(limit: int = 50):
    return list_scans(limit=limit)

def get_scan_by_id(scan_id: str):
    return get_scan(scan_id)
