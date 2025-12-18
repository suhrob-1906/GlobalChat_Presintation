import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Mock user for UI demo
const MOCK_USER = {
  id: 1,
  username: "DemoUser",
  avatar: null,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  function login() {
    setUser(MOCK_USER);
    setLoading(false);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
