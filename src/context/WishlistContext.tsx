import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface WishlistState {
  items: string[];
}

const WishlistContext = createContext<{
  state: WishlistState;
  addItem: (gameId: string) => void;
  removeItem: (gameId: string) => void;
  toggleItem: (gameId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (gameId: string) => boolean;
  count: number;
} | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("arcade-wishlist");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const addItem = useCallback((gameId: string) => {
    setItems((prev) => {
      if (prev.includes(gameId)) return prev;
      const next = [...prev, gameId];
      localStorage.setItem("arcade-wishlist", JSON.stringify(next));
      return next;
    });
  }, []);

  const removeItem = useCallback((gameId: string) => {
    setItems((prev) => {
      const next = prev.filter((id) => id !== gameId);
      localStorage.setItem("arcade-wishlist", JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleItem = useCallback((gameId: string) => {
    setItems((prev) => {
      const next = prev.includes(gameId) ? prev.filter((id) => id !== gameId) : [...prev, gameId];
      localStorage.setItem("arcade-wishlist", JSON.stringify(next));
      return next;
    });
  }, []);

  const clearWishlist = useCallback(() => {
    setItems([]);
    localStorage.removeItem("arcade-wishlist");
  }, []);

  const isInWishlist = useCallback((gameId: string) => items.includes(gameId), [items]);

  return (
    <WishlistContext.Provider
      value={{
        state: { items },
        addItem,
        removeItem,
        toggleItem,
        clearWishlist,
        isInWishlist,
        count: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}