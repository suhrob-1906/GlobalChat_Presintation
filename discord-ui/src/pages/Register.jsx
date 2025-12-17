import { useState } from "react";
import { register } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Register({ onSwitch }) {
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

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await register(username, password);
      if (data.access) {
        loginUser(data.access, data.refresh);
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      setError("Username already exists or registration failed");
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
        <h2>Create an account</h2>
        <p>Join our community today!</p>

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
          {loading ? "Creating account..." : "Create account"}
        </button>

        <button className="auth-link" onClick={onSwitch}>
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}
