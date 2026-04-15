import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User } from "../mock/mockDB";
import { findUserByUsername, findUserById, addUser, getUsers } from "../mock/mockDB";

type AuthUser = Omit<User, "password">;

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setCurrentUser(parsed);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const user = findUserByUsername(username);

    if (!user) {
      return { success: false, error: "Пользователь не найден" };
    }

    if (user.password !== password) {
      return { success: false, error: "Неверный пароль" };
    }

    const { password: _, ...userWithoutPassword } = user;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));

    return { success: true };
  };

  const register = async (username: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Check if username already exists
    if (findUserByUsername(username)) {
      return { success: false, error: "Это имя пользователя уже занято" };
    }

    // Check if email already exists
    const users = getUsers();
    if (users.some((u) => u.email === email)) {
      return { success: false, error: "Этот email уже зарегистрирован" };
    }

    // Validate password
    if (password.length < 6) {
      return { success: false, error: "Пароль должен быть не менее 6 символов" };
    }

    // Create new user
    const newUser: User = {
      id: 0, // Will be assigned by addUser
      username,
      email,
      password,
      role: "user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    addUser(newUser);

    // Find the newly created user
    const createdUser = findUserByUsername(username);
    if (!createdUser) {
      return { success: false, error: "Ошибка при создании пользователя" };
    }

    const { password: _, ...userWithoutPassword } = createdUser;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value: AuthContextType = {
    currentUser,
    isAuthenticated: currentUser !== null,
    isAdmin: currentUser?.role === "admin",
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
