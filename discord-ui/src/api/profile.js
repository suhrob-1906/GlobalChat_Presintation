const API_URL = "http://127.0.0.1:8001";

export async function uploadAvatar(file, token) {
  const form = new FormData();
  form.append("avatar", file);

  const res = await fetch(`${API_URL}/api/profile/avatar/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  return res.json();
}
