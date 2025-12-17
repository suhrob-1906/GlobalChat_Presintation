import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Servers from "./components/Servers";
import Channels from "./components/Channels";
import Chat from "./components/Chat";
import { getServers, getChannels } from "./api/servers";

export default function App() {
  const { token } = useAuth();
  const [servers, setServers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [activeServer, setActiveServer] = useState(null);
  const [activeChannel, setActiveChannel] = useState(null);

  useEffect(() => {
    if (!token) return;
    getServers(token).then(setServers);
  }, [token]);

  useEffect(() => {
    if (!activeServer) return;
    getChannels(activeServer.id, token).then(setChannels);
  }, [activeServer]);

  if (!token) {
    return <>
      <Register />
      <Login />
    </>;
  }

  return (
    <div style={{ display: "flex" }}>
      <Servers servers={servers} setActive={setActiveServer} />
      <Channels channels={channels} setActive={setActiveChannel} />
      {activeChannel && <Chat channel={activeChannel} />}
    </div>
  );
}
