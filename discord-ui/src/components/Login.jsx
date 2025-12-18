// import { useState } from "react";
// import { login as apiLogin } from "../api/auth";
// import { useAuth } from "../context/AuthContext";

// export default function Login() {
//   const { login } = useAuth();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   async function submit() {
//     const data = await apiLogin(username, password);
//     if (data.access) login(data.access);
//   }

//   return (
//     <div>
//       <h3>Login</h3>
//       <input placeholder="username" onChange={e => setUsername(e.target.value)} />
//       <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
//       <button onClick={submit}>Login</button>
//     </div>
//   );
// }
