const API = "http://127.0.0.1:8002";

export async function getProfile(token) {
  const res = await fetch(`${API}/api/profile/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Profile error");
  }

  return res.json();
}
