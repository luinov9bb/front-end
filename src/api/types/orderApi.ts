export interface OrderItemDto {
  id: number;
  orderId: number;
  price: number;
  bookInfo: string;
  quantity: number;
}

export interface OrderDto {
  id: number;
  userId: number;
  items: OrderItemDto[];
  orderDate: string;
  total: number;
  status: number;
  isDeleted: boolean;
}
