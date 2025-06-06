// src/shared/providers/QueryProvider.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react'; // React 19 no requiere explícitamente React para JSX, pero no molesta.

// Crea una única instancia de QueryClient. Este es el Singleton.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Datos considerados "frescos" por 5 minutos
      refetchOnWindowFocus: false, // Deshabilita refetch automático al enfocar la ventana
      retry: 2, // Número de reintentos para queries fallidas
    },
    mutations: {
      // Opciones por defecto para mutaciones si las necesitas
    }
  },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Las herramientas de desarrollo de React Query, ¡muy útiles! */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}