import { create } from "zustand";
import { AuthState } from "../interfaces/interface";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      authUser: null,
      setAuthUser: (user) => set({ authUser: user }),
      clearAuthUser: () => set({ authUser: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
