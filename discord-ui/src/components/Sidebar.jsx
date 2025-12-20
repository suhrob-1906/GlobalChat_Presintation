import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="logo" onClick={() => navigate("/")}>
        <h1>💬</h1>
      </div>

      <nav className="nav-menu">
        <button 
          onClick={() => navigate("/")} 
          className="nav-item"
          title="Сообщения"
        >
          💬
        </button>
        <button 
          onClick={() => navigate("/search")} 
          className="nav-item"
          title="Поиск"
        >
          🔍
        </button>
      </nav>

      <div className="user-section">
        <div 
          className="user-card" 
          onClick={() => navigate(`/profile`)}
          title="Мой профиль"
        >
          <img 
            src={user?.avatar || "/default-avatar.png"} 
            alt={user?.username}
          />
        </div>
      </div>
    </aside>
  );
}