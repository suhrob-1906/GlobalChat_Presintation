import { useState, useEffect } from "react";
import { getFriends, removeFriend } from "../api/friends";
import { useNavigate } from "react-router-dom";

export default function FriendsList() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = async () => {
    try {
      setLoading(true);
      const data = await getFriends();
      setFriends(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (friendId) => {
    try {
      await removeFriend(friendId);
      setFriends(friends.filter(f => f.id !== friendId));
    } catch (err) {
      alert("Ошибка при удалении друга");
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Друзья</h2>
      {friends.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {friends.map(friend => (
            <div 
              key={friend.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                background: "#2f3136",
                borderRadius: "4px",
                cursor: "pointer"
              }}
              onClick={() => navigate(`/profile/${friend.id}`)}
            >
              <img 
                src={friend.avatar || "/default-avatar.png"}
                alt={friend.username}
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: "600" }}>
                  {friend.username}
                </p>
                <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#72767d" }}>
                  {friend.nickname}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(friend.id);
                }}
                style={{
                  padding: "6px 12px",
                  background: "#f04747",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "#72767d" }}>Нет друзей</p>
      )}
    </div>
  );
}