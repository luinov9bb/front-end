import { apiFetch } from "./client";
import { mapApiBookToBook } from "./mappers/book";
import type { Book } from "../types/catalog";
import type { ApiBookDto } from "./types/bookApi";

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
