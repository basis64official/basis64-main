// apiClient.ts
const BASE_URL = "https://api.basis64computer.workers.dev/api";
const LOCAL_BASE_URL = "http://localhost:8787/api";
export async function apiFetch(endpoint: string, options?: RequestInit) {
  const url = `${LOCAL_BASE_URL}${endpoint}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res;
}
