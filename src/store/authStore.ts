import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
interface AuthState {
  token: string | null;
  user: { email: string } | null;
  login: (token: string, user: { email: string }) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      login: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      isAuthenticated: () => !!get().token,
    }),
    {
      name: 'stellarframe-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);