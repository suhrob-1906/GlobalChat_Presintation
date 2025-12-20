import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <h2>GlobalChat</h2>
      {user && (
        <div>
          <span>{user.username}</span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </header>
  );
}