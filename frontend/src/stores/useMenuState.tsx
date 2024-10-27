import { create } from "zustand";
import { MenuStateType } from "../interfaces/interface";

const useMenuState = create<MenuStateType>((set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useMenuState;
