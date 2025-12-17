import { useEffect, useState, useRef } from "react";
import { fetchMessages } from "../api/messages";
import Header from "./Header";
import Message from "./Message";

export default function Chat({ channel, messages, sendMessage }) {
  const [messageHistory, setMessageHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem("access");

  // 📥 Load message history
  useEffect(() => {
    if (!channel || !token) return;

    fetchMessages(channel.id, token)
      .then((data) => {
        setMessageHistory(data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch messages:", err);
        setMessageHistory([]);
      });
  }, [channel, token]);

  // Combine history + live messages
  const allMessages = [...messageHistory, ...messages];

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  const handleSendMessage = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      sendMessage(e.target.value.trim());
      e.target.value = "";
    }
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-chat)",
      }}
    >
      <Header channel={channel} />

      <div className="messages-container">
        {allMessages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">#</div>
            <div className="empty-state-title">
              Welcome to #{channel?.name || "channel"}
            </div>
            <div className="empty-state-text">
              This is the beginning of your conversation. Start chatting!
            </div>
          </div>
        ) : (
          allMessages.map((msg, idx) => <Message key={idx} message={msg} />)
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder={`Message #${channel?.name || "channel"}`}
          onKeyDown={handleSendMessage}
        />
      </div>
    </div>
  );
}
