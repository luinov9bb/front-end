import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthUser } from "../types/user";
import { ApiError, AUTH_TOKEN_STORAGE_KEY, loginRequest, meRequest, registerRequest } from "../api";
import { mapApiUserToAuthUser } from "../api/mappers/user";

type AuthContextType = {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "bookstore_current_user";

function readApiErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    const body = error.body;
    if (typeof body === "object" && body !== null && "message" in body) {
      const m = (body as { message: unknown }).message;
      if (typeof m === "string" && m.trim()) {
        return m;
      }
    }
    return error.message;
  }
  return "Неизвестная ошибка";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    if (!token) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    let cancelled = false;
    meRequest()
      .then((u) => {
        const mapped = mapApiUserToAuthUser(u);
        if (!cancelled) {
          setCurrentUser(mapped);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
      })
      .catch(() => {
        localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
        localStorage.removeItem(STORAGE_KEY);
        if (!cancelled) {
          setCurrentUser(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const data = await loginRequest(username.trim(), password);
      if (!data.isSuccess || !data.token || !data.user) {
        return { success: false, error: data.message || "Ошибка входа" };
      }
      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, data.token);
      const mapped = mapApiUserToAuthUser(data.user);
      setCurrentUser(mapped);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
      return { success: true };
    } catch (e) {
      return { success: false, error: readApiErrorMessage(e) };
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const reg = await registerRequest(username.trim(), email.trim(), password);
      if (!reg.isSuccess) {
        return { success: false, error: reg.message || "Ошибка регистрации" };
      }
      return login(username.trim(), password);
    } catch (e) {
      return { success: false, error: readApiErrorMessage(e) };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  };

  const value: AuthContextType = {
    currentUser,
    isAuthenticated: currentUser !== null,
    isAdmin: currentUser?.role === "admin",
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
