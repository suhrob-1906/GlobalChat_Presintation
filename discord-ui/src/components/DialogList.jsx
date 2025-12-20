import { useState, useEffect } from "react";
import { searchUsers } from "../api/users";
import "../styles/dialogList.css";

export default function DialogList({ dialogs, selectedDialog, onSelectDialog }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = async (query) => {
    setSearch(query);
    if (query.length > 2) {
      try {
        const results = await searchUsers(query);
        setSearchResults(results);
        setShowSearch(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      setSearchResults([]);
      setShowSearch(false);
    }
  };

  const handleSelectDialog = (dialog) => {
    onSelectDialog(dialog);
    setSearch("");
    setSearchResults([]);
    setShowSearch(false);
  };

  return (
    <div className="dialog-list">
      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => search.length > 0 && setShowSearch(true)}
          onBlur={() => setTimeout(() => setShowSearch(false), 200)}
        />
      </div>

      {showSearch && searchResults.length > 0 ? (
        <div className="search-results">
          {searchResults.map((user) => (
            <div key={user.id} className="search-result-item">
              <img 
                src={user.avatar || "/default-avatar.png"} 
                alt={user.username}
              />
              <div className="user-info">
                <p className="username">{user.username}</p>
                <p className="nickname">{user.nickname}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="dialogs">
          {dialogs && dialogs.length > 0 ? (
            dialogs.map((dialog) => (
              <div
                key={dialog.id}
                className={`dialog-item ${selectedDialog?.id === dialog.id ? "active" : ""}`}
                onClick={() => handleSelectDialog(dialog)}
              >
                <img 
                  src={dialog.avatar || dialog.members?.[0]?.avatar || "/default-avatar.png"} 
                  alt={dialog.name}
                />
                <div className="dialog-info">
                  <h4>{dialog.title || dialog.name}</h4>
                  <p>{dialog.last_message?.text || "Нет сообщений"}</p>
                </div>
                {dialog.unread_count > 0 && (
                  <span className="unread-badge">{dialog.unread_count}</span>
                )}
              </div>
            ))
          ) : (
            <div style={{ padding: "20px", textAlign: "center", color: "#72767d" }}>
              Нет диалогов
            </div>
          )}
        </div>
      )}
    </div>
  );
}