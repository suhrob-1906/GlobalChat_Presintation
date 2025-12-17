import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMessages } from "../api/messages";

export default function Chat({ channel }) {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    getMessages(channel.id, token).then(setMessages);

    socket.current = new WebSocket(
      `ws://127.0.0.1:8002/ws/chat/?token=${token}`
    );

    socket.current.onmessage = (e) => {
      setMessages(prev => [...prev, JSON.parse(e.data)]);
    };

    return () => socket.current.close();
  }, [channel.id]);

  function send(text) {
    socket.current.send(JSON.stringify({
      channel_id: channel.id,
      text
    }));
  }

  return (
    <div>
      <h4>{channel.name}</h4>
      {messages.map((m, i) => (
        <div key={i}><b>{m.user}</b>: {m.text}</div>
      ))}
      <input onKeyDown={e => e.key === "Enter" && send(e.target.value)} />
    </div>
  );
}
