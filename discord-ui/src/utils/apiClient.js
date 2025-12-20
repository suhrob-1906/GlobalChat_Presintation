export const API_BASE = "https://globalchat-presintation.onrender.com/api";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("access_token");
  const headers = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    if (options.body !== undefined) {
      headers["Content-Type"] = "application/json";
    }
  }
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(API_BASE + path, {
      ...options,
      headers,
    });

    const contentType = res.headers.get("content-type") || "";
    const text = await res.text();
    
    let data;
    if (contentType.includes("application/json")) {
      data = text ? JSON.parse(text) : {};
    } else {
      data = text;
    }

    if (!res.ok) {
      const err = new Error(data.detail || data.error || data.message || "API error");
      err.status = res.status;
      err.data = data;
      throw err;
    }
    
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}