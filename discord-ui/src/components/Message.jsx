export default function Message({ msg }) {
  return (
    <div className="message">
      <img
        src={msg.avatar || "/default-avatar.png"}
        className="message-avatar"
      />

      <div className="message-content">
        <span className="message-user">{msg.user}</span>
        <div className="message-text">{msg.text}</div>
      </div>
    </div>
  );
}
