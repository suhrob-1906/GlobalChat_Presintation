const API_URL = "http://127.0.0.1:8001";

export async function fetchMessages(channelId, token) {
  const res = await fetch(
    `${API_URL}/api/messages/?channel_id=${channelId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.json();
}
