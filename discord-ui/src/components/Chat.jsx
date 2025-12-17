import { useEffect, useState } from "react";
import { fetchMessages } from "../api/messages";

export default function Chat({ channel, socket }) {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("access");

  // 📥 загрузка истории
  useEffect(() => {
    if (!channel) return;

    fetchMessages(channel.id, token).then((data) => {
      setMessages(data);
    });
  }, [channel]);

  // 📡 WebSocket
  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.channel === channel.id) {
        setMessages((prev) => [...prev, msg]);
      }
    };
  }, [socket, channel]);

  const sendMessage = (text) => {
    socket.send(
      JSON.stringify({
        channel_id: channel.id,
        text,
      })
    );
  };

  return (
    <div>
      <div>
        {messages.map((msg) => (
          <div key={msg.id}>
            <b>{msg.user}</b>: {msg.text}
          </div>
        ))}
      </div>

      <input
        placeholder="message"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(e.target.value);
            e.target.value = "";
          }
        }}
      />
    </div>
  );
}
