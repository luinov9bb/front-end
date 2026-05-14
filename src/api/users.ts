import { apiFetch } from "./client";

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
