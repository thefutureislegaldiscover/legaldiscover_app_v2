import { create } from "zustand";

export interface GlobalStore {
    allMatters: any[] | null;
    setAllMatters: (matters: any[]) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
    allMatters: null,
    setAllMatters: (matters) => set({ allMatters: matters }),
}));
