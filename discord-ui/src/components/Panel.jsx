import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getServers, getChannels } from "../api/servers";
import Servers from "./Servers";
import Channels from "./Channels";
import Chat from "./Chat";

export default function Panel() {
  const { token } = useAuth();
  const [servers, setServers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [server, setServer] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    getServers(token).then(setServers);
  }, []);

  useEffect(() => {
    if (!server) return;
    getChannels(server.id, token).then(setChannels);
  }, [server]);

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <Servers servers={servers} setActive={setServer} />
      <Channels channels={channels} setActive={setChannel} />
      {channel && <Chat channel={channel} />}
    </div>
  );
}
