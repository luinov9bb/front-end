import type { Book } from "../../types/catalog";
import type { ApiBookDto } from "../types/bookApi";

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

function readNullableStr(v: unknown): string | null {
  if (v == null) {
    return null;
  }
  return typeof v === "string" ? v : null;
}

export function mapApiBookToBook(dto: ApiBookDto): Book {
  const r = dto as Record<string, unknown>;
  return {
    id: readNum(r.id ?? r.Id),
    title: readStr(r.title ?? r.Title),
    author: readStr(r.author ?? r.Author),
    category: readStr(r.category ?? r.Category),
    description: readStr(r.description ?? r.Description),
    price: readNum(r.price ?? r.Price),
    stock: readNum(r.stock ?? r.Stock),
    isDeleted: readBool(r.isDeleted ?? r.IsDeleted),
    coverImageUrl: readNullableStr(r.coverImageUrl ?? r.CoverImageUrl),
  };
}
