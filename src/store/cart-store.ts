import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TMDBMovie } from "@/types/movie";

interface CartItem {
  movie: TMDBMovie;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (movie: TMDBMovie) => void;
  removeItem: (movieId: number) => void;
  clear: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (movie) =>
        set((state) => {
          const exists = state.items.find((i) => i.movie.id === movie.id);
          if (exists) {
            return {
              items: state.items.map((i) =>
                i.movie.id === movie.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { movie, quantity: 1 }] };
        }),
      removeItem: (movieId) =>
        set((state) => ({
          items: state.items.filter((i) => i.movie.id !== movieId),
        })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.quantity * 9.9, 0),
    }),
    { name: "cinespoilers-cart" }
  )
);