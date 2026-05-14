import { apiFetch } from "./client";
import { mapApiBookToBook } from "./mappers/book";
import type { Book } from "../types/catalog";
import type { ApiBookDto } from "./types/bookApi";
import type { ResponceMsg } from "./types/authApi";

export interface FavoriteDto {
  id: number;
  userId: number;
  bookId: number;
  book?: Book | null;
}

function readFavorite(row: Record<string, unknown>): FavoriteDto {
  const bookRaw = row.book ?? row.Book;
  let book: Book | null | undefined;
  if (bookRaw && typeof bookRaw === "object") {
    book = mapApiBookToBook(bookRaw as ApiBookDto);
  }
  return {
    id: Number(row.id ?? row.Id ?? 0),
    userId: Number(row.userId ?? row.UserId ?? 0),
    bookId: Number(row.bookId ?? row.BookId ?? 0),
    book: book ?? null,
  };
}

export async function fetchFavoritesByUser(userId: number): Promise<FavoriteDto[]> {
  const list = await apiFetch<unknown>(`/api/Favorites/user/${userId}`);
  if (!Array.isArray(list)) {
    return [];
  }
  return list.map((item) => readFavorite(item as Record<string, unknown>));
}

export async function addFavoriteRequest(payload: { userId: number; bookId: number }): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>("/api/Favorites", {
    method: "POST",
    jsonBody: { userId: payload.userId, bookId: payload.bookId },
  });
}

export async function deleteFavoriteRequest(favoriteId: number): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>(`/api/Favorites/${favoriteId}`, {
    method: "DELETE",
  });
}
