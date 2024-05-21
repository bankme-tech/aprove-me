import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  token: string;
  setToken: (user: string) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        isAuthenticated: false,
        setToken: (token: string) => set({ token, isAuthenticated: true }),
      }),
      {
        name: "auth-store",
      },
    ),
  ),
);

export const setToken = useAuthStore.getState().setToken;
