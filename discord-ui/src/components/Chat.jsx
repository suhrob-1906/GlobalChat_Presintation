import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMessages } from "../api/messages";

export default function Chat({ channel }) {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    if (!channel) return;

    getMessages(channel.id, token).then(setMessages);

    ws.current = new WebSocket(
      `ws://127.0.0.1:8002/ws/chat/?token=${token}`
    );

    ws.current.onmessage = (e) => {
      setMessages(m => [...m, JSON.parse(e.data)]);
    };

    return () => ws.current.close();
  }, [channel?.id]);

  function send(e) {
    if (e.key !== "Enter") return;

    ws.current.send(JSON.stringify({
      channel_id: channel.id,
      text: e.target.value,
    }));

    e.target.value = "";
  }

  return (
    <div>
      <h4>{channel.name}</h4>
      {messages.map((m, i) => (
        <div key={i}><b>{m.user}</b>: {m.text}</div>
      ))}
      <input onKeyDown={send} />
    </div>
  );
}
