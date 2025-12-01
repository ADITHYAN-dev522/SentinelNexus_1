const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function getLatestScan() {
  const res = await fetch(`${BASE_URL}/vulneye/latest`);
  return res.json();
}

export async function getScanHistory() {
  const res = await fetch(`${BASE_URL}/vulneye/history`);
  return res.json();
}

export async function forceScan() {
  const res = await fetch(`${BASE_URL}/vulneye/force-scan`, {
    method: "POST",
  });
  return res.json();
}
