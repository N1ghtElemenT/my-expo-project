import { create } from "zustand";

type CounterStore = {
  count: number;
  up: (step: number) => void;
  down: (step: number) => void;
  reset: () => void;
};

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  up: (step) => set((state) => ({ count: state.count + step })),
  down: (step) => set((state) => ({ count: Math.max(0, state.count - step) })),
  reset: () => set({ count: 0 }),
}));
