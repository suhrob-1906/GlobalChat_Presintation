import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../api/auth";
import { getUser } from "../api/users";
import "../styles/profile.css";

export default function Profile() {
  const { userId } = useParams();
  const { user: currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = !userId || userId === currentUser?.id;

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        if (isOwnProfile) {
          setUser(currentUser);
          setForm(currentUser || {});
        } else {
          const data = await getUser(userId);
          setUser(data);
          setForm(data || {});
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId, isOwnProfile, currentUser]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const data = {
        nickname: form.nickname,
        bio: form.bio,
        phone: form.phone,
      };
      if (avatar) {
        data.avatar = avatar;
      }

      await updateProfile(data);
      setUser({ ...user, ...form });
      setIsEditing(false);
      alert("Профиль обновлён");
    } catch (err) {
      alert("Ошибка при обновлении профиля");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <div className="loading-screen"><div className="spinner"></div></div>;
  if (!user) return <div className="error">Пользователь не найден</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img 
            src={user.avatar || "/default-avatar.png"} 
            alt={user.username}
            className="profile-avatar"
          />
          <div className="profile-info">
            <h1>{user.nickname || user.username}</h1>
            <p className="username">@{user.username}</p>
            <p className="bio">{user.bio || "Нет описания"}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail">
            <span className="label">Телефон:</span>
            <span className="value">{user.phone || "Не указан"}</span>
          </div>
          <div className="detail">
            <span className="label">Username:</span>
            <span className="value">{user.username}</span>
          </div>
        </div>

        {isOwnProfile && (
          <div className="profile-actions">
            {isEditing ? (
              <form onSubmit={handleSave} className="edit-form">
                <input
                  type="text"
                  placeholder="Nickname"
                  value={form.nickname || ""}
                  onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                />
                <textarea
                  placeholder="О себе"
                  value={form.bio || ""}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Номер телефона"
                  value={form.phone || ""}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files?.[0])}
                />
                <button type="submit">Сохранить</button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="cancel"
                >
                  Отмена
                </button>
              </form>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  Редактировать профиль
                </button>
                <button onClick={handleLogout} className="logout-btn">
                  Выход
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}