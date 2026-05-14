import { apiFetch } from "./client";
import type { Review } from "../types/catalog";
import type { ResponceMsg } from "./types/authApi";

function readStr(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function readNum(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function readBool(v: unknown): boolean {
  return Boolean(v);
}

function normalizeReview(dto: Record<string, unknown>): Review {
  return {
    id: readNum(dto.id ?? dto.Id),
    userId: readNum(dto.userId ?? dto.UserId),
    username: readStr(dto.username ?? dto.Username),
    bookId: readNum(dto.bookId ?? dto.BookId),
    bookTitle: readStr(dto.bookTitle ?? dto.BookTitle),
    rating: readNum(dto.rating ?? dto.Rating),
    text: readStr(dto.text ?? dto.Text),
    createdAt: readStr(dto.createdAt ?? dto.CreatedAt),
    updatedAt: (() => {
      const u = dto.updatedAt ?? dto.UpdatedAt;
      if (u == null || u === "") {
        return null;
      }
      return String(u);
    })(),
    isApproved: readBool(dto.isApproved ?? dto.IsApproved),
  };
}

export async function fetchReviewsByBookId(bookId: number): Promise<Review[]> {
  if (!Number.isFinite(bookId) || bookId <= 0) {
    return [];
  }
  const list = await apiFetch<unknown>(`/api/Reviews/book/${bookId}`);
  if (!Array.isArray(list)) {
    return [];
  }
  return list.map((item) => normalizeReview(item as Record<string, unknown>));
}

export async function fetchAllReviews(): Promise<Review[]> {
  const list = await apiFetch<unknown>("/api/Reviews");
  if (!Array.isArray(list)) {
    return [];
  }
  return list.map((item) => normalizeReview(item as Record<string, unknown>));
}

export async function adminSetReviewApprovalRequest(payload: {
  id: number;
  isApproved: boolean;
}): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>("/api/Reviews/approval", {
    method: "PUT",
    jsonBody: { id: payload.id, isApproved: payload.isApproved },
  });
}

export async function adminDeleteReviewRequest(reviewId: number): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>(`/api/Reviews/admin/${reviewId}`, {
    method: "DELETE",
  });
}

export async function createReview(payload: {
  userId: number;
  bookId: number;
  rating: number;
  text: string;
}): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>("/api/Reviews", {
    method: "POST",
    jsonBody: {
      userId: payload.userId,
      bookId: payload.bookId,
      rating: payload.rating,
      text: payload.text,
    },
  });
}
