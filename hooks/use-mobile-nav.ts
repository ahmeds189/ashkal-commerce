import { create } from "zustand";

type MobileNavState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useMobileNav = create<MobileNavState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
