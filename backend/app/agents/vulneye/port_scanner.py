# backend/app/agents/vulneye/port_scanner.py
# Note: this scans 127.0.0.1 — safe, local-only. If you want to scan other local interfaces, we can enumerate local IPs and run nmap against them (option later).
import subprocess
from typing import Tuple

def scan_local_ports(top_ports: int = 100) -> Tuple[bool, str]:
    """
    Run nmap against the host's local IPs using -sV and return (ok, xml_text or error).
    We do not accept user targets; this runs against local interfaces only (caller must pass IPs if needed).
    """
    # Use --top-ports when scanning loopback/local IP to reduce runtime
    # Caller should restrict the IPs scanned (we will call it with localhost / host IP)
    cmd = ["nmap", "-sV", "-T4", f"--top-ports", str(top_ports), "127.0.0.1", "-oX", "-"]
    try:
        output = subprocess.check_output(cmd, stderr=subprocess.STDOUT, timeout=90)
        return True, output.decode(errors="replace")
    except subprocess.CalledProcessError as e:
        return False, e.output.decode(errors="replace") if e.output else str(e)
    except Exception as e:
        return False, str(e)
