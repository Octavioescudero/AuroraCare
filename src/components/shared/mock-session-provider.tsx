"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { MockUser } from "@/lib/auth/mock-session";

interface MockSessionCtx {
  user: MockUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
}

const MockSessionContext = createContext<MockSessionCtx | null>(null);

export function useMockSession() {
  const ctx = useContext(MockSessionContext);
  if (!ctx) throw new Error("useMockSession must be inside MockSessionProvider");
  return ctx;
}

export function MockSessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      return body?.error ?? "Credenciales inválidas";
    }
    const data = await res.json();
    setUser(data.user);
    return null;
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  return (
    <MockSessionContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </MockSessionContext.Provider>
  );
}
