import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login({ onSwitch }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
    login();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Welcome back!</h2>
        <p>We're so excited to see you again!</p>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <button onClick={submit}>Login</button>

        <button className="auth-link" onClick={onSwitch}>
          Need an account? Register
        </button>
      </div>
    </div>
  );
}
