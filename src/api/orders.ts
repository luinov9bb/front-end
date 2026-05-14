import { apiFetch } from "./client";
import type { ResponceMsg } from "./types/authApi";
import type { OrderDto } from "./types/orderApi";

export async function checkoutFromCartRequest(payload: { userId: number }): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>("/api/Orders/checkout-from-cart", {
    method: "POST",
    jsonBody: { userId: payload.userId },
  });
}

export async function fetchOrdersByUser(userId: number): Promise<OrderDto[]> {
  const list = await apiFetch<unknown>(`/api/Orders/user/${userId}`);
  if (!Array.isArray(list)) {
    return [];
  }
  return list.map((row) => normalizeOrder(row as Record<string, unknown>));
}

export async function fetchAllOrders(): Promise<OrderDto[]> {
  const list = await apiFetch<unknown>("/api/Orders");
  if (!Array.isArray(list)) {
    return [];
  }
  return list.map((row) => normalizeOrder(row as Record<string, unknown>));
}

export async function adminUpdateOrderStatusRequest(order: OrderDto, nextStatus: number): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>("/api/Orders", {
    method: "PUT",
    jsonBody: {
      id: order.id,
      userId: order.userId,
      items: [],
      orderDate: order.orderDate,
      total: order.total,
      status: nextStatus,
      isDeleted: order.isDeleted,
    },
  });
}

export async function adminDeleteOrderRequest(orderId: number): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>(`/api/Orders/${orderId}`, {
    method: "DELETE",
  });
}

function normalizeOrder(r: Record<string, unknown>): OrderDto {
  const itemsRaw = r.items ?? r.Items;
  const items = Array.isArray(itemsRaw)
    ? itemsRaw.map((row) => {
        const x = row as Record<string, unknown>;
        return {
          id: Number(x.id ?? x.Id ?? 0),
          orderId: Number(x.orderId ?? x.OrderId ?? 0),
          price: Number(x.price ?? x.Price ?? 0),
          bookInfo: String(x.bookInfo ?? x.BookInfo ?? ""),
          quantity: Number(x.quantity ?? x.Quantity ?? 0),
        };
      })
    : [];
  return {
    id: Number(r.id ?? r.Id ?? 0),
    userId: Number(r.userId ?? r.UserId ?? 0),
    items,
    orderDate: String(r.orderDate ?? r.OrderDate ?? ""),
    total: Number(r.total ?? r.Total ?? 0),
    status: Number(r.status ?? r.Status ?? 0),
    isDeleted: Boolean(r.isDeleted ?? r.IsDeleted),
  };
}
