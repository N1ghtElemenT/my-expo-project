import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { getUserId } from "../utils/userId";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

interface FavoriteEntry {
  id: string;
  userId: string;
  productId: string;
}

interface FavoritesContextType {
  favorites: Set<string>;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: new Set(),
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      const id = await getUserId();
      setUserId(id);
      await loadFavorites(id);
    })();
  }, []);

  const loadFavorites = async (uid: string) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/favorites?userId=${encodeURIComponent(uid)}`,
      );
      if (!res.ok) return;
      const data: FavoriteEntry[] = await res.json();
      setFavorites(new Set(data.map((f) => f.productId)));
    } catch (err) {
      console.error("Failed to load favorites:", err);
    }
  };

  const toggleFavorite = useCallback(
    async (productId: string) => {
      if (!userId) return;

      const wasFavorite = favorites.has(productId);

      setFavorites((prev) => {
        const next = new Set(prev);
        if (wasFavorite) {
          next.delete(productId);
        } else {
          next.add(productId);
        }
        return next;
      });

      try {
        if (wasFavorite) {
          const res = await fetch(
            `${API_BASE_URL}/favorites?userId=${encodeURIComponent(userId)}&productId=${encodeURIComponent(productId)}`,
          );
          if (res.ok) {
            const entries: FavoriteEntry[] = await res.json();
            for (const entry of entries) {
              await fetch(`${API_BASE_URL}/favorites/${entry.id}`, {
                method: "DELETE",
              });
            }
          }
        } else {
          await fetch(`${API_BASE_URL}/favorites`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, productId }),
          });
        }
      } catch (err) {
        console.error("Failed to toggle favorite:", err);
        setFavorites((prev) => {
          const next = new Set(prev);
          if (wasFavorite) {
            next.add(productId);
          } else {
            next.delete(productId);
          }
          return next;
        });
      }
    },
    [userId, favorites],
  );

  const isFavorite = useCallback(
    (productId: string) => favorites.has(productId),
    [favorites],
  );

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
