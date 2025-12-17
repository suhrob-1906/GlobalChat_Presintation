import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../api/profile";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("access"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    getProfile(token)
      .then(setUser)
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [token]);

  function login(access) {
    localStorage.setItem("access", access);
    setToken(access);
  }

  function logout() {
    localStorage.clear();
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
