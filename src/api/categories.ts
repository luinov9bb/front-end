import { apiFetch } from "./client";
import type { ResponceMsg } from "./types/authApi";

export interface CategoryDto {
  id: number;
  name: string;
  isActive: boolean;
}

function normalizeCategory(r: Record<string, unknown>): CategoryDto {
  return {
    id: Number(r.id ?? r.Id ?? 0),
    name: String(r.name ?? r.Name ?? ""),
    isActive: Boolean(r.isActive ?? r.IsActive ?? true),
  };
}

export async function fetchCategories(): Promise<CategoryDto[]> {
  const list = await apiFetch<unknown>("/api/Categories");
  if (!Array.isArray(list)) {
    return [];
  }
  return list.map((row) => normalizeCategory(row as Record<string, unknown>));
}

function toCategoryJsonBody(dto: CategoryDto): Record<string, unknown> {
  return {
    id: dto.id,
    name: dto.name,
    isActive: dto.isActive,
  };
}

export async function adminCreateCategory(payload: { name: string; isActive: boolean }): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>("/api/Categories", {
    method: "POST",
    jsonBody: toCategoryJsonBody({
      id: 0,
      name: payload.name.trim(),
      isActive: payload.isActive,
    }),
  });
}

export async function adminUpdateCategory(dto: CategoryDto): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>("/api/Categories", {
    method: "PUT",
    jsonBody: toCategoryJsonBody(dto),
  });
}

export async function adminDeleteCategory(id: number): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>(`/api/Categories/${id}`, {
    method: "DELETE",
  });
}
