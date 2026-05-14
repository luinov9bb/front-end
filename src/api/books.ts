import { apiFetch } from "./client";
import { mapApiBookToBook } from "./mappers/book";
import type { Book } from "../types/catalog";
import type { ApiBookDto } from "./types/bookApi";
import type { ResponceMsg } from "./types/authApi";

export type BookWritePayload = {
  id: number;
  title: string;
  author: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  isDeleted: boolean;
  coverImageUrl?: string | null;
};

export async function fetchBooks(): Promise<Book[]> {
  const list = await apiFetch<ApiBookDto[]>("/api/Books");
  if (!Array.isArray(list)) {
    return [];
  }
  return list.map(mapApiBookToBook);
}

export async function fetchBookById(id: number): Promise<Book | null> {
  if (!Number.isFinite(id) || id <= 0) {
    return null;
  }
  try {
    const dto = await apiFetch<ApiBookDto>(`/api/Books/${id}`);
    return mapApiBookToBook(dto);
  } catch (e: unknown) {
    const status = typeof e === "object" && e !== null && "status" in e ? (e as { status: number }).status : 0;
    if (status === 404) {
      return null;
    }
    throw e;
  }
}

function toBookJsonBody(payload: BookWritePayload): Record<string, unknown> {
  return {
    id: payload.id,
    title: payload.title,
    author: payload.author,
    category: payload.category,
    description: payload.description,
    price: payload.price,
    stock: payload.stock,
    isDeleted: payload.isDeleted,
    coverImageUrl: payload.coverImageUrl ?? null,
  };
}

export async function adminCreateBook(payload: Omit<BookWritePayload, "id" | "isDeleted">): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>("/api/Books", {
    method: "POST",
    jsonBody: toBookJsonBody({
      id: 0,
      isDeleted: false,
      ...payload,
    }),
  });
}

export async function adminUpdateBook(payload: BookWritePayload): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>("/api/Books", {
    method: "PUT",
    jsonBody: toBookJsonBody(payload),
  });
}

export async function adminDeleteBook(id: number): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>(`/api/Books/${id}`, {
    method: "DELETE",
  });
}
