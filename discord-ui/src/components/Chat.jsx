import { useEffect, useRef } from "react";
import Header from "./Header";
import Message from "./Message";

export default function Chat({ channel, messages, sendMessage }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        {messages.length === 0 ? (
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
          messages.map((msg, idx) => <Message key={idx} message={msg} />)
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
