const API_URL = "http://127.0.0.1:8001";

export async function register(username, password) {
  const res = await fetch(`${API_URL}/api/auth/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return res.json();
}

export async function login(username, password) {
  const res = await fetch(`${API_URL}/api/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return res.json();
}

export async function getMe(token) {
  const res = await fetch(`${API_URL}/api/auth/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
