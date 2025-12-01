# backend/app/agents/vulneye/cve_correlator.py
import requests
from typing import List, Dict
from app.core.config import settings

NVD_BASE = getattr(settings, "CVE_API", "https://services.nvd.nist.gov/rest/json/cves/2.0")

def lookup_cves(keyword: str, limit: int = 3) -> List[Dict]:
    if not keyword:
        return []
    params = {"keywordSearch": keyword, "resultsPerPage": limit}
    try:
        r = requests.get(NVD_BASE, params=params, timeout=15)
        if r.status_code == 200:
            j = r.json()
            vulns = []
            for item in j.get("vulnerabilities", [])[:limit]:
                entry = item.get("cve") or item
                vulns.append(entry)
            return vulns
        else:
            return [{"error": f"nvd_status_{r.status_code}"}]
    except Exception as e:
        return [{"error": str(e)}]
