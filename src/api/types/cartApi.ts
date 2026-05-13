export interface CartItemDto {
  id: number;
  cartId: number;
  bookId: number;
  quantity: number;
  bookTitle?: string | null;
}

export interface CartDto {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt?: string | null;
  items: CartItemDto[];
}
