import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Book } from "../types/catalog";
import type { BookId } from "../types/catalog";
import { fetchBooks } from "../api/books";
import {
  addToCartRequest,
  clearCartRequest,
  fetchCartByUser,
  removeCartItemRequest,
  updateCartItemRequest,
} from "../api/cart";
import type { CartDto } from "../api/types/cartApi";
import { useAuth } from "./AuthContext";

export type CartItem = {
  id: BookId;
  cartItemId?: number | null;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: BookId) => void;
  updateQuantity: (productId: BookId, quantity: number) => void;
  clearCart: () => void;
  refreshCart: () => Promise<void>;
  totalPrice: number;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function buildCartItems(cart: CartDto, books: Book[]): CartItem[] {
  const byId = new Map(books.map((b) => [b.id, b]));
  return cart.items.map((ci) => {
    const book = byId.get(ci.bookId);
    return {
      id: ci.bookId,
      cartItemId: ci.id,
      name: (ci.bookTitle && ci.bookTitle.trim()) || book?.title || `Книга #${ci.bookId}`,
      price: book?.price ?? 0,
      image: book?.coverImageUrl ?? "",
      quantity: ci.quantity,
    };
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { currentUser, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const cartItemsRef = useRef<CartItem[]>([]);

  useEffect(() => {
    cartItemsRef.current = cartItems;
  }, [cartItems]);

  const refreshCart = useCallback(async () => {
    const uid = currentUser?.id;
    if (!uid) {
      return;
    }
    const [cart, books] = await Promise.all([fetchCartByUser(uid), fetchBooks()]);
    setCartItems(buildCartItems(cart, books));
  }, [currentUser?.id]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await Promise.resolve();
      if (cancelled) {
        return;
      }
      if (isAuthenticated && currentUser) {
        await refreshCart();
      } else {
        setCartItems([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, currentUser, refreshCart]);

  const addToCart = (product: CartItem) => {
    const qty = product.quantity > 0 ? product.quantity : 1;
    const bookId = Number(product.id);
    if (!Number.isFinite(bookId)) {
      return;
    }

    if (isAuthenticated && currentUser) {
      void (async () => {
        try {
          const res = await addToCartRequest({
            userId: currentUser.id,
            bookId,
            quantity: qty,
          });
          if (res.isSuccess) {
            await refreshCart();
          }
        } catch {
          await refreshCart();
        }
      })();
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => String(item.id) === String(product.id));
      if (existing) {
        return prev.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + qty }
            : item,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          cartItemId: null,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: qty,
        },
      ];
    });
  };

  const removeFromCart = (productId: BookId) => {
    if (isAuthenticated && currentUser) {
      void (async () => {
        const line = cartItemsRef.current.find((item) => String(item.id) === String(productId));
        const cid = line?.cartItemId;
        if (cid == null) {
          await refreshCart();
          return;
        }
        try {
          const res = await removeCartItemRequest(currentUser.id, cid);
          if (res.isSuccess) {
            await refreshCart();
          }
        } catch {
          await refreshCart();
        }
      })();
      return;
    }

    setCartItems((prev) => prev.filter((item) => String(item.id) !== String(productId)));
  };

  const updateQuantity = (productId: BookId, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (isAuthenticated && currentUser) {
      void (async () => {
        const line = cartItemsRef.current.find((item) => String(item.id) === String(productId));
        const cid = line?.cartItemId;
        if (cid == null) {
          await refreshCart();
          return;
        }
        try {
          const res = await updateCartItemRequest({
            userId: currentUser.id,
            cartItemId: cid,
            quantity,
          });
          if (res.isSuccess) {
            await refreshCart();
          }
        } catch {
          await refreshCart();
        }
      })();
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => (String(item.id) === String(productId) ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    if (isAuthenticated && currentUser) {
      void (async () => {
        try {
          const res = await clearCartRequest(currentUser.id);
          if (res.isSuccess) {
            setCartItems([]);
          } else {
            await refreshCart();
          }
        } catch {
          await refreshCart();
        }
      })();
      return;
    }

    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
