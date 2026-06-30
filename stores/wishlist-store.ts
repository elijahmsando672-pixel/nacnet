import { create } from "zustand";
import type { Product } from "@/types/product";

type WishlistStore = {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      if (state.items.some((p) => p.id === product.id)) return state;
      return { items: [...state.items, product] };
    }),
  removeItem: (productId) =>
    set((state) => ({ items: state.items.filter((p) => p.id !== productId) })),
  isInWishlist: (productId) => get().items.some((p) => p.id === productId),
  clearWishlist: () => set({ items: [] }),
}));
