import { apiFetch } from "./client";
import type { ResponceMsg } from "./types/authApi";
import type { CartDto } from "./types/cartApi";

function readRecord(r: Record<string, unknown>): CartDto {
  const itemsRaw = r.items ?? r.Items;
  const items = Array.isArray(itemsRaw)
    ? itemsRaw.map((row) => {
        const x = row as Record<string, unknown>;
        return {
          id: Number(x.id ?? x.Id ?? 0),
          cartId: Number(x.cartId ?? x.CartId ?? 0),
          bookId: Number(x.bookId ?? x.BookId ?? 0),
          quantity: Number(x.quantity ?? x.Quantity ?? 0),
          bookTitle: (x.bookTitle ?? x.BookTitle) as string | null | undefined,
        };
      })
    : [];
  return {
    id: Number(r.id ?? r.Id ?? 0),
    userId: Number(r.userId ?? r.UserId ?? 0),
    createdAt: String(r.createdAt ?? r.CreatedAt ?? ""),
    updatedAt: (r.updatedAt ?? r.UpdatedAt) as string | null | undefined,
    items,
  };
}

export async function fetchCartByUser(userId: number): Promise<CartDto> {
  const raw = await apiFetch<unknown>(`/api/Cart/user/${userId}`);
  return readRecord(raw as Record<string, unknown>);
}

export async function addToCartRequest(payload: {
  userId: number;
  bookId: number;
  quantity: number;
}): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>("/api/Cart/add", {
    method: "POST",
    jsonBody: {
      userId: payload.userId,
      bookId: payload.bookId,
      quantity: payload.quantity,
    },
  });
}

export async function updateCartItemRequest(payload: {
  userId: number;
  cartItemId: number;
  quantity: number;
}): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>("/api/Cart/item", {
    method: "PUT",
    jsonBody: {
      userId: payload.userId,
      cartItemId: payload.cartItemId,
      quantity: payload.quantity,
    },
  });
}

export async function removeCartItemRequest(userId: number, cartItemId: number): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>(`/api/Cart/user/${userId}/item/${cartItemId}`, {
    method: "DELETE",
  });
}

export async function clearCartRequest(userId: number): Promise<ResponceMsg> {
  return apiFetch<ResponceMsg>(`/api/Cart/user/${userId}/clear`, {
    method: "DELETE",
  });
}
