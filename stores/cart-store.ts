import { create } from "zustand";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartStore = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        const items = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
        return {
          items,
          totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
          totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        };
      }
      const items = [...state.items, item];
      return {
        items,
        totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    }),
  removeItem: (id) =>
    set((state) => {
      const items = state.items.filter((i) => i.id !== id);
      return {
        items,
        totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    }),
  updateQuantity: (id, quantity) =>
    set((state) => {
      const items = quantity <= 0
        ? state.items.filter((i) => i.id !== id)
        : state.items.map((i) => (i.id === id ? { ...i, quantity } : i));
      return {
        items,
        totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    }),
  clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
}));
