import { useState } from "react";
import { sendMessage } from "../api/messages";
import "../styles/messageInput.css";

export default function MessageInput({ dialogId, onMessageSent }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !file) return;

    setSending(true);
    try {
      await sendMessage(dialogId, text, file);
      setText("");
      setFile(null);
      onMessageSent?.();
    } catch (err) {
      console.error(err);
      alert("Ошибка при отправке сообщения");
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="file"
        id="file-input"
        onChange={(e) => setFile(e.target.files?.[0])}
        style={{ display: "none" }}
      />
      <label htmlFor="file-input" className="file-btn">
        📎
      </label>

      <input
        type="text"
        placeholder="Введите сообщение..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={sending}
      />

      {file && <span className="file-name">{file.name}</span>}

      <button type="submit" disabled={sending || (!text.trim() && !file)}>
        {sending ? "⏳" : "➤"}
      </button>
    </form>
  );
}