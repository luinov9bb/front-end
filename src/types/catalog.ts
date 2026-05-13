export type BookId = string | number;

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  isDeleted: boolean;
  coverImageUrl: string | null;
}

export function bookCategoryLabels(category: string | undefined | null): string[] {
  const raw = typeof category === "string" ? category : "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export interface Review {
  id: number;
  userId: number;
  username: string;
  bookId: number;
  bookTitle: string;
  rating: number;
  text: string;
  createdAt: string;
  updatedAt?: string | null;
  isApproved: boolean;
}
