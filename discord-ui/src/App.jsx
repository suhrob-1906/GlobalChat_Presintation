import { useEffect, useRef, useState } from "react";
import Servers from "./components/Servers";
import Channels from "./components/Channels";
import Chat from "./components/Chat";
import { useAuth } from "./context/AuthContext";
import { fetchServers, fetchChannels } from "./api/servers";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const { user } = useAuth();
  const token = localStorage.getItem("access");

  const [servers, setServers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [activeServer, setActiveServer] = useState(null);
  const [activeChannel, setActiveChannel] = useState(null);
  const [messages, setMessages] = useState([]);

  const socketRef = useRef(null);

  // 🔌 WebSocket (JWT)
  useEffect(() => {
    if (!token) return;

    socketRef.current = new WebSocket(
      `ws://127.0.0.1:8001/ws/chat/?token=${token}`
    );

    socketRef.current.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      setMessages((prev) => [...prev, msg]);
    };

    socketRef.current.onerror = (e) => {
      console.error("WebSocket error", e);
    };

    return () => {
      socketRef.current.close();
    };
  }, [token]);

  // 📡 Load servers
  useEffect(() => {
    if (!token) return;

    fetchServers(token).then((data) => {
      setServers(data);
      setActiveServer(data[0] || null);
    });
  }, [token]);

  // 📡 Load channels for server
  useEffect(() => {
    if (!activeServer || !token) return;

    fetchChannels(activeServer.id, token).then((data) => {
      setChannels(data);
      setActiveChannel(data[0] || null);
      setMessages([]);
    });
  }, [activeServer, token]);

  // 📤 Send message
  const sendMessage = (text) => {
    if (!socketRef.current || !activeChannel) return;

    socketRef.current.send(
      JSON.stringify({
        channel_id: activeChannel.id,
        text,
      })
    );
  };

  const [showRegister, setShowRegister] = useState(false);

if (!user) {
  return showRegister ? (
    <Register onSwitch={() => setShowRegister(false)} />
  ) : (
    <Login onSwitch={() => setShowRegister(true)} />
  );
}


  return (
    <div className="app">
      <Servers
        servers={servers}
        activeServer={activeServer}
        setActiveServer={setActiveServer}
      />
      <Channels
        channels={channels}
        activeChannel={activeChannel}
        setActiveChannel={setActiveChannel}
      />
      {activeChannel && (
        <Chat
          channel={activeChannel}
          messages={messages}
          sendMessage={sendMessage}
        />
      )}
    </div>
  );
}
