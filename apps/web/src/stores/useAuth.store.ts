import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

export type User = {
  id: string;
  name: string | null;
  role: 'TRAVELLER' | 'TENANT';
  is_verified: boolean;
  photo_url?: string;
};

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null, // Nilai awal user adalah null
      setToken: (token) => {
        Cookies.set('auth-token', token, { expires: 1, secure: true }); // Cookie 1 hari
        set({ token });
      },

      setUser: (user) => {
        set({ user });
      },

      logout: () => {
        Cookies.remove('auth-token');
        set({ token: null, user: null });
      },
    }),
    { name: 'auth-storage' },
  ),
);
