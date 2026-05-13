import type { Review } from "../../types/catalog";
import type { ApiReviewDto } from "../types/reviewApi";

export function mapApiReviewToReview(dto: ApiReviewDto): Review {
  return {
    id: Number(dto.id),
    userId: Number(dto.userId ?? 0),
    username: dto.username ?? "",
    bookId: Number(dto.bookId ?? 0),
    bookTitle: dto.bookTitle ?? "",
    rating: Number(dto.rating ?? 0),
    text: dto.text ?? "",
    createdAt: dto.createdAt ?? "",
    updatedAt: dto.updatedAt ?? null,
    isApproved: Boolean(dto.isApproved),
  };
}
