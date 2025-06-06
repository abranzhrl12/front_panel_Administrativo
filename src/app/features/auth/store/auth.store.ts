import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // Para guardar en localStorage

// 1. Definimos la forma de los datos del usuario que vienen de la API.
interface User {
  role: string;
  isActive: boolean;
}

// 2. Definimos la estructura completa de nuestro store de autenticación.
interface AuthState {
  accessToken: string | null;
  user: User | null;
  // Esta es una "acción": una función para actualizar el estado.
  setAuth: (data: { accessToken: string; user: User }) => void;
  // Otra acción para limpiar el estado al hacer logout.
  logout: () => void;
}

// 3. Creamos el hook del store usando Zustand.
export const useAuthStore = create<AuthState>()(
  // `persist` es un middleware que guarda automáticamente el estado en el localStorage
  // del navegador. Si el usuario recarga la página, su sesión seguirá activa.
  persist(
    (set) => ({
      // Estado inicial
      accessToken: null,
      user: null,

      // Implementación de las acciones
      setAuth: ({ accessToken, user }) => set({ accessToken, user }),
      logout: () => set({ accessToken: null, user: null }),
    }),
    {
      name: 'auth-storage', // Nombre de la clave que se usará en localStorage
    }
  )
);