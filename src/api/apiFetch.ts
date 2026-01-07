// apiClient.ts
const BASE_URL = "https://api.basis64.com/api";
// const LOCAL_BASE_URL = "http://localhost:46573/api";
export async function apiFetch(endpoint: string, options?: RequestInit) {
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, options);
  return res;
}
