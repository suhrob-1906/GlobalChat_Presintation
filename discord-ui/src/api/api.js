export const API_BASE = "http://127.0.0.1:8000/api"; // для локальной разработки

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("access_token");
  const headers = {
    ...(options.headers || {}),
  };

  if (!(options.body instanceof FormData) && options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(API_BASE + path, {
    ...options,
    headers,
  });

  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();
  const data = contentType.includes("application/json") ? JSON.parse(text || "{}") : text;

  if (!res.ok) {
    const err = new Error(data.detail || data.error || "API error");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}