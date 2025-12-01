const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const api = {
  latestScan: async () =>
    fetch(`${BASE_URL}/vulneye/latest`).then((r) => r.json()),

  scanHistory: async () =>
    fetch(`${BASE_URL}/vulneye/history`).then((r) => r.json()),

  recentAlerts: async () =>
    fetch(`${BASE_URL}/alerts/recent`).then((r) => r.json()),
};
s
