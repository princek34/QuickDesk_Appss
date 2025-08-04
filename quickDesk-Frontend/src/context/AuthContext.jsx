import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const getStoredUser = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!storedUser || !storedToken) {
      return { user: null, token: null };
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      return { user: parsedUser, token: storedToken };
    } catch {
      return { user: null, token: null };
    }
  };

  const [user, setUser] = useState(() => getStoredUser().user);
  const [token, setToken] = useState(() => getStoredUser().token);

  const login = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
