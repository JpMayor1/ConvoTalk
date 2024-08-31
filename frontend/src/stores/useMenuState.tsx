import { create } from "zustand";
import { MenuStateType } from "../interfaces/interface";

const useMenuState = create<MenuStateType>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export default useMenuState;
