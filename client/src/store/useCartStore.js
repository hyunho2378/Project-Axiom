import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  buyNowItem: null,

  addItem: (product) => set((state) => {
    const existing = state.items.find(i => i.id === product.id);
    if (existing) {
      return {
        items: state.items.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        ),
      };
    }
    return { items: [...state.items, { ...product, qty: 1 }] };
  }),

  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id),
  })),

  updateQty: (id, qty) => set((state) => ({
    items: qty <= 0
      ? state.items.filter(i => i.id !== id)
      : state.items.map(i => i.id === id ? { ...i, qty } : i),
  })),

  clear: () => set({ items: [] }),

  setBuyNow: (product) => set({ buyNowItem: { ...product, qty: 1 } }),
  clearBuyNow: () => set({ buyNowItem: null }),

  totalCount: () => get().items.reduce((s, i) => s + i.qty, 0),
  totalPrice: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
}));
