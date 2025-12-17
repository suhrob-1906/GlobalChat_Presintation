import { useAuth } from "../context/AuthContext";

export default function UserPanel() {
  const { user } = useAuth();

  if (!user) return null;

  const getInitials = (username) => {
    if (!username) return "?";
    return username[0].toUpperCase();
  };

  return (
    <div className="user-panel">
      <div className="user-info">
        <div className="user-avatar" title={user.username}>
          {getInitials(user.username)}
        </div>
        <div className="user-details">
          <div className="user-name">{user.username}</div>
          <div className="user-status">Online</div>
        </div>
      </div>

      <div className="user-actions">
        <button className="user-btn" title="Mute">
          🎤
        </button>
        <button className="user-btn" title="Deafen">
          🎧
        </button>
        <button className="user-btn" title="Settings">
          ⚙️
        </button>
      </div>
    </div>
  );
}
