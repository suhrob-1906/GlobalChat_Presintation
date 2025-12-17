const API = "http://127.0.0.1:8002";

export async function register(username, password) {
  const res = await fetch(`${API}/api/auth/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function login(username, password) {
  const res = await fetch(`${API}/api/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}
