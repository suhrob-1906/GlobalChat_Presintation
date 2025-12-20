import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [form, setForm] = useState({
    username: "",
    nickname: "",
    password: "",
    phone: "",
    bio: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Если есть аватар - используем FormData
      if (avatar) {
        const formData = new FormData();
        formData.append("username", form.username);
        formData.append("nickname", form.nickname);
        formData.append("password", form.password);
        formData.append("phone", form.phone);
        formData.append("bio", form.bio);
        formData.append("avatar", avatar);

        await register(formData);
      } else {
        // Если нет аватара - отправляем JSON
        await register(form);
      }

      navigate("/");
    } catch (err) {
      setError(err.message || "Ошибка при регистрации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Создать аккаунт</h1>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            type="text"
            placeholder="Nickname"
            required
            value={form.nickname}
            onChange={(e) => setForm({ ...form, nickname: e.target.value })}
          />

          <input
            type="password"
            placeholder="Пароль"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <input
            type="tel"
            placeholder="Номер телефона"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <textarea
            placeholder="О себе"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files?.[0])}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Загрузка..." : "Зарегистрироваться"}
          </button>
        </form>

        <p>
          Уже есть аккаунт? <Link to="/login">Вход</Link>
        </p>
      </div>
    </div>
  );
}