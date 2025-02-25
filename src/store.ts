import { create } from "zustand";

// Define the store's state and actions
interface StoreState {
  count: number;
  setCount: (value: number) => void;
}

// Create the Zustand store
export const useCountStore = create<StoreState>()((set) => ({
  count: 1_000,
  setCount: (value) => set({ count: value }),
}));
