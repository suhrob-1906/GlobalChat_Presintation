import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Register({ onSwitch }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
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
        <h2>Create an account</h2>
        <p>Join our community today!</p>

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

        <button onClick={submit}>Create account</button>

        <button className="auth-link" onClick={onSwitch}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}
