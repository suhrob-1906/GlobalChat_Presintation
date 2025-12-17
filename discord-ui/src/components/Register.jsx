import { useState } from "react";
import { register } from "../api/auth";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    await register(username, password);
    alert("Registered, now login");
  }

  return (
    <div>
      <h3>Register</h3>
      <input onChange={e => setUsername(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={submit}>Register</button>
    </div>
  );
}
