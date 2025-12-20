import { useState, useEffect } from "react";
import { getDialogMessages } from "../api/messages";
import { useNavigate } from "react-router-dom";
import "../styles/messageList.css";

export default function MessageList({ dialogId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!dialogId) return;

    const loadMessages = async () => {
      try {
        setLoading(true);
        const data = await getDialogMessages(dialogId);
        setMessages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [dialogId]);

  if (loading) return <div className="loading">Загрузка сообщений...</div>;

  return (
    <div className="message-list">
      {messages && messages.length > 0 ? (
        messages.map((msg) => (
          <div key={msg.id} className="message">
            <img 
              src={msg.author.avatar || "/default-avatar.png"} 
              alt={msg.author.username}
              onClick={() => navigate(`/profile/${msg.author.id}`)}
              style={{ cursor: "pointer" }}
            />
            <div className="message-content">
              <div className="message-header">
                <span 
                  className="username"
                  onClick={() => navigate(`/profile/${msg.author.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  {msg.author.username}
                </span>
                <span className="timestamp">
                  {new Date(msg.created_at).toLocaleTimeString()}
                </span>
              </div>
              <p>{msg.text}</p>
              {msg.file && (
                <a href={msg.file} target="_blank" rel="noopener noreferrer">
                  📎 Скачать файл
                </a>
              )}
            </div>
          </div>
        ))
      ) : (
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          height: "100%",
          color: "#72767d"
        }}>
          Нет сообщений
        </div>
      )}
    </div>
  );
}