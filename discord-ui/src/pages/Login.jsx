import { useState } from "react";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Login({ onSwitch }) {
  const { loginUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await login(username, password);
      if (data.access) {
        loginUser(data.access, data.refresh);
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
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

        {error && (
          <div
            style={{
              background: "rgba(237, 66, 69, 0.1)",
              color: "var(--danger)",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

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

        <button onClick={submit} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <button className="auth-link" onClick={onSwitch}>
          Need an account? Register
        </button>
      </div>
    </div>
  );
}
