import { create } from "zustand";
import { persist } from "zustand/middleware";
import { signOut as betterSignOut } from "@/lib/auth/client";

interface User {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  emailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  lastChecked: number;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  checkAuth: (force?: boolean) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      lastChecked: 0,
      setUser: (user) =>
        set({ user, isAuthenticated: !!user, isLoading: false }),
      setLoading: (loading) => set({ isLoading: loading }),
      logout: async () => {
        try {
          await betterSignOut();
          set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
          console.error("Error during logout:", error);
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },
      checkAuth: async (force = false) => {
        try {
          const now = Date.now();
          const state = get();

          if (!force && (now - state.lastChecked < 10000 || state.isLoading)) {
            return;
          }

          set({ isLoading: true, lastChecked: now });

          const response = await fetch("/api/auth/me", {
            credentials: "include",
          });

          if (response.ok) {
            const userData = await response.json();
            set({
              user: userData,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({ user: null, isAuthenticated: false, isLoading: false });
          }
        } catch (error) {
          console.error("Error checking auth:", error);
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state: AuthState) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
