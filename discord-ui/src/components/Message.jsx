export default function Message({ message }) {
  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get initials for avatar
  const getInitials = (username) => {
    if (!username) return "?";
    return username[0].toUpperCase();
  };

  return (
    <div className="message">
      <div className="message-avatar" title={message.user || "User"}>
        {getInitials(message.user)}
      </div>
      <div className="message-content">
        <div className="message-header">
          <span className="message-user">{message.user || "Unknown User"}</span>
          <span className="message-timestamp">
            {formatTime(message.timestamp || new Date())}
          </span>
        </div>
        <div className="message-text">{message.text}</div>
      </div>
    </div>
  );
}
