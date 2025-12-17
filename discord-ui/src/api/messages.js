const API = "http://127.0.0.1:8002";

export async function getMessages(channelId, token) {
  const res = await fetch(
    `${API}/api/messages/?channel=${channelId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.json();
}
