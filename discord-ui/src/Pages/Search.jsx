import { useState } from "react";
import { searchUsers, sendFriendRequest } from "../api/users";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/search.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.length < 2) return;

    setLoading(true);
    try {
      const data = await searchUsers(query);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = async (userId) => {
    try {
      await sendFriendRequest(userId);
      alert("Запрос на дружбу отправлен");
    } catch (err) {
      alert("Ошибка при отправке запроса");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Поиск пользователя по username..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Поиск</button>
        </form>

        {loading && <p>Загрузка...</p>}

        <div className="search-results">
          {results.map((user) => (
            <div key={user.id} className="user-card">
              <img 
                src={user.avatar || "/default-avatar.png"} 
                alt={user.username}
                onClick={() => navigate(`/profile/${user.id}`)}
                style={{ cursor: "pointer" }}
              />
              <div className="user-info">
                <h3>{user.nickname || user.username}</h3>
                <p>@{user.username}</p>
                <p className="bio">{user.bio || "Нет описания"}</p>
              </div>
              <button onClick={() => handleAddFriend(user.id)}>
                Добавить в друзья
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}