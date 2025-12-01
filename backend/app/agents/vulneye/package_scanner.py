# backend/app/agents/vulneye/package_scanner.py
import subprocess
import platform
from typing import Dict, List

def get_os_packages() -> Dict[str, List[str]]:
    """
    Return a dict with lists of installed packages depending on OS (dpkg/rpm).
    This is best-effort and keeps output limited for MVP.
    """
    result = {"dpkg": [], "rpm": [], "pip": []}
    try:
        # pip packages (local venv and system pip)
        try:
            out = subprocess.check_output(["pip", "list", "--format=json"], stderr=subprocess.DEVNULL, timeout=30)
            import json
            pkgs = json.loads(out.decode())
            result["pip"] = [f'{p["name"]}=={p["version"]}' for p in pkgs]
        except Exception:
            result["pip"] = []

        # dpkg (Debian-based)
        if platform.system().lower() == "linux":
            try:
                out = subprocess.check_output(["dpkg-query", "-W", "-f=${Package} ${Version}\n"], stderr=subprocess.DEVNULL, timeout=60)
                lines = out.decode(errors="replace").splitlines()[:200]
                result["dpkg"] = lines
            except Exception:
                result["dpkg"] = []
            # rpm (RedHat-based)
            try:
                out = subprocess.check_output(["rpm", "-qa", "--queryformat", "%{NAME} %{VERSION}-%{RELEASE}\n"], stderr=subprocess.DEVNULL, timeout=60)
                lines = out.decode(errors="replace").splitlines()[:200]
                result["rpm"] = lines
            except Exception:
                result["rpm"] = []
    except Exception:
        pass
    return result
