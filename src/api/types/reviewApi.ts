import type { Review } from "../../types/catalog";

export type ApiReviewDto = Partial<Review> & Pick<Review, "id">;
