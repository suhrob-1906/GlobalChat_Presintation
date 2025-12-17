import { useState } from "react";
import { register } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Register({ onSwitch }) {
  const { loginUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const data = await register(username, password);
    if (data.access) {
      loginUser(data.access, data.refresh);
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <h2>Register</h2>

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

      <button onClick={submit}>Create account</button>

      <p>
        Already have an account?{" "}
        <span onClick={onSwitch} style={{ color: "#5865f2", cursor: "pointer" }}>
          Login
        </span>
      </p>
    </div>
  );
}
