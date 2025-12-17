const API_URL = "http://127.0.0.1:8001";

export async function fetchServers(token) {
  const res = await fetch(`${API_URL}/api/servers/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function fetchChannels(serverId, token) {
  const res = await fetch(
    `${API_URL}/api/servers/${serverId}/channels/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.json();
}
