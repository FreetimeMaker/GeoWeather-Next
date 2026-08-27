"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@/lib/types";

interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);
const STORAGE_KEY = "geoweather:user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      try {
        if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        else localStorage.removeItem(STORAGE_KEY);
      } catch { /* ignore */ }
    }
  }, [user, loading]);

  const login = async (email: string, _password: string) => {
    // Simulate auth — in production, connect to Supabase/Firebase
    const u: User = { id: crypto.randomUUID(), email, name: email.split("@")[0] };
    setUser(u);
  };

  const signup = async (email: string, _password: string, name?: string) => {
    const u: User = { id: crypto.randomUUID(), email, name: name || email.split("@")[0] };
    setUser(u);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthCtx {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
