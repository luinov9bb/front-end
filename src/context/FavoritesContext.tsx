import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { BookId } from "../types/catalog";
import { addFavoriteRequest, deleteFavoriteRequest, fetchFavoritesByUser } from "../api/favorites";
import { useAuth } from "./AuthContext";

type FavoriteEntry = {
  bookId: BookId;
  favoriteId: number | null;
};

type FavoritesContextType = {
  favoriteIds: Set<BookId>;
  toggleFavorite: (productId: BookId) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { currentUser, isAuthenticated } = useAuth();
  const [entries, setEntries] = useState<FavoriteEntry[]>([]);
  const entriesRef = useRef<FavoriteEntry[]>([]);

  useEffect(() => {
    entriesRef.current = entries;
  }, [entries]);

  const refreshFavorites = useCallback(async () => {
    const uid = currentUser?.id;
    if (!uid) {
      return;
    }
    const list = await fetchFavoritesByUser(uid);
    setEntries(list.map((f) => ({ bookId: f.bookId, favoriteId: f.id })));
  }, [currentUser?.id]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await Promise.resolve();
      if (cancelled) {
        return;
      }
      if (isAuthenticated && currentUser) {
        await refreshFavorites();
      } else {
        setEntries([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, currentUser, refreshFavorites]);

  const favoriteIds = useMemo(() => new Set<BookId>(entries.map((e) => e.bookId)), [entries]);

  const toggleFavorite = (productId: BookId) => {
    const bid = Number(productId);
    if (!Number.isFinite(bid)) {
      return;
    }

    if (isAuthenticated && currentUser) {
      void (async () => {
        const existing = entriesRef.current.find((e) => String(e.bookId) === String(productId));
        try {
          if (existing?.favoriteId != null) {
            const res = await deleteFavoriteRequest(existing.favoriteId);
            if (res.isSuccess) {
              await refreshFavorites();
            }
          } else {
            const res = await addFavoriteRequest({ userId: currentUser.id, bookId: bid });
            if (res.isSuccess) {
              await refreshFavorites();
            }
          }
        } catch {
          await refreshFavorites();
        }
      })();
      return;
    }

    setEntries((prev) => {
      const existing = prev.find((e) => String(e.bookId) === String(productId));
      if (existing) {
        return prev.filter((e) => String(e.bookId) !== String(productId));
      }
      return [...prev, { bookId: productId, favoriteId: null }];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
