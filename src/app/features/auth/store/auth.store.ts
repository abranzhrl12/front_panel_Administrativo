// src/features/auth/store/auth.store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // <-- Importa createJSONStorage

interface User {
  role: string;
  isActive: boolean;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  lastActivityTimestamp: number | null;
  logoutReason: string | null;

  setAuth: (data: { accessToken: string; user: User }) => void;
  logout: (reason?: string) => void;
  setLastActivityTimestamp: (timestamp: number) => void;
  setLogoutReason: (reason: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      lastActivityTimestamp: null,
      logoutReason: null,

      setAuth: ({ accessToken, user }) => set({ accessToken, user, lastActivityTimestamp: Date.now(), logoutReason: null }),
      logout: (reason?: string) => set({ accessToken: null, user: null, lastActivityTimestamp: null, logoutReason: reason || null }),
      setLastActivityTimestamp: (timestamp: number) => set({ lastActivityTimestamp: timestamp }),
      setLogoutReason: (reason: string | null) => set({ logoutReason: reason }),
    }),
    {
      name: 'auth-storage',
      // ¡CORRECCIÓN CLAVE AQUÍ! Usa createJSONStorage(localStorage)
      storage: createJSONStorage(() => localStorage), // <--- Esto resuelve el error de tipo
    }
  )
);