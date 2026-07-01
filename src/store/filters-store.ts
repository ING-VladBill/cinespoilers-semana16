import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FiltersState {
  favorites: number[];
  toggleFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

export const useFiltersStore = create<FiltersState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (movieId) =>
        set((state) => ({
          favorites: state.favorites.includes(movieId)
            ? state.favorites.filter((id) => id !== movieId)
            : [...state.favorites, movieId],
        })),
      isFavorite: (movieId) => get().favorites.includes(movieId),
    }),
    { name: "cinespoilers-favorites" }
  )
);