import React, { createContext, useContext, useState } from "react";

const STATIC_USERS = [
  { email: "admin@assetflow.com", password: "admin123", name: "Admin User", role: "Administrator" },
  { email: "manager@assetflow.com", password: "manager123", name: "John Manager", role: "Manager" },
];

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { const s = localStorage.getItem("af_user"); return s ? JSON.parse(s) : null; }
    catch { return null; }
  });

  const login = (email, password) => {
    const found = STATIC_USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (found) {
      const userData = { email: found.email, name: found.name, role: found.role };
      setUser(userData); localStorage.setItem("af_user", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "Invalid email or password." };
  };

  const signup = (name, email, password) => {
    const exists = STATIC_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { success: false, error: "An account with this email already exists." };
    const userData = { email, name, role: "User" };
    setUser(userData); localStorage.setItem("af_user", JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => { setUser(null); localStorage.removeItem("af_user"); };

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
