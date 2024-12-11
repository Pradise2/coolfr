import { create } from "zustand";

type Click = {
  id: number;
  value: number;
  style: React.CSSProperties;
};

type ClicksStore = {
  clicks: Click[];
  addClick: (click: Click) => void;
  removeClick: (id: number) => void;
};

export const useClicksStore = create<ClicksStore>((set) => ({
  clicks: [],
  addClick: (click: Click) => {
    set((state) => ({
      clicks: [...state.clicks, click],
    }));
  },
  removeClick: (id) => {
    set((state) => ({
      clicks: state.clicks.filter((click) => click.id !== id),
    }));
  },
}));
