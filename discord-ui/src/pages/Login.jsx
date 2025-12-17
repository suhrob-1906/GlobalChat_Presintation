import { useState } from "react";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Login({ onSwitch }) {
  const { loginUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const data = await login(username, password);
    if (data.access) {
      loginUser(data.access, data.refresh);
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={submit}>Login</button>

      <p>
        No account?{" "}
        <span onClick={onSwitch} style={{ color: "#5865f2", cursor: "pointer" }}>
          Register
        </span>
      </p>
    </div>
  );
}
