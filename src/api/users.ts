import { apiFetch } from "./client";
import type { ResponceMsg } from "./types/authApi";

export interface UserListDto {
  id: number;
  username: string;
  email: string;
  role: string;
  registeredOn: string;
  isActive: boolean;
}

function normalizeUser(r: Record<string, unknown>): UserListDto {
  return {
    id: Number(r.id ?? r.Id ?? 0),
    username: String(r.username ?? r.Username ?? ""),
    email: String(r.email ?? r.Email ?? ""),
    role: String(r.role ?? r.Role ?? ""),
    registeredOn: String(r.registeredOn ?? r.RegisteredOn ?? ""),
    isActive: Boolean(r.isActive ?? r.IsActive ?? true),
  };
}

export async function fetchAllUsers(): Promise<UserListDto[]> {
  const list = await apiFetch<unknown>("/api/Users");
  if (!Array.isArray(list)) {
    return [];
  }
  return list.map((row) => normalizeUser(row as Record<string, unknown>));
}

export type AdminUserUpdatePayload = {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  newPassword?: string;
};

export async function adminUpdateUser(payload: AdminUserUpdatePayload): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>(`/api/Users/${payload.id}`, {
    method: "PUT",
    jsonBody: {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      role: payload.role,
      isActive: payload.isActive,
      newPassword: payload.newPassword?.trim() ? payload.newPassword.trim() : null,
    },
  });
}

export async function adminSoftDeleteUser(id: number): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>(`/api/Users/${id}`, {
    method: "DELETE",
  });
}
