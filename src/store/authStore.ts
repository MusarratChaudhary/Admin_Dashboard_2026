import { create } from 'zustand';

interface AuthStore {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (email, name) => set({ isAuthenticated: true, user: { email, name } }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
