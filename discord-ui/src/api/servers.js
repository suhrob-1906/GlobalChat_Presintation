const API = "http://127.0.0.1:8002";

export async function getServers(token) {
  const res = await fetch(`${API}/api/servers/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getChannels(serverId, token) {
  const res = await fetch(
    `${API}/api/servers/${serverId}/channels/`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.json();
}
