import { useAuth } from "../context/AuthContext";
import { uploadAvatar } from "../api/profile";

export default function UserPanel() {
  const { user } = useAuth();
  const token = localStorage.getItem("access");

  const changeAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    await uploadAvatar(file, token);
    window.location.reload();
  };

  return (
    <div className="user-panel">
      <label>
        <img
          src={user.avatar || "/default-avatar.png"}
          className="avatar"
        />
        <input type="file" hidden onChange={changeAvatar} />
      </label>

      <span>{user.username}</span>
    </div>
  );
}
