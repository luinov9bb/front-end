import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { BookId } from "../mock/mockDB";

type FavoritesContextType = {
  favoriteIds: Set<BookId>;
  toggleFavorite: (productId: BookId) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<Set<BookId>>(new Set());

  const toggleFavorite = (productId: BookId) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      const existingId = Array.from(next).find(
        (id) => String(id) === String(productId)
      );

      if (typeof existingId !== "undefined") {
        next.delete(existingId);
      } else {
        next.add(productId);
      }

      return next;
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
