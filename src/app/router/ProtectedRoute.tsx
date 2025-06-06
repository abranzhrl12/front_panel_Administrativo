// src/app/router/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store/auth.store'; // Asegúrate que la ruta a tu store sea correcta

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Obtenemos el estado de autenticación de tu store de Zustand
  const { accessToken } = useAuthStore(); // Usamos 'accessToken' para determinar si el usuario está autenticado

  // Si no hay un token de acceso, el usuario no está logueado
  if (!accessToken) {
    // Redirige al usuario a la página de login
    // 'replace' asegura que la página de login reemplace la entrada actual en el historial del navegador,
    // para que el usuario no pueda simplemente darle a "atrás" y saltarse el login.
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado (existe un accessToken), renderiza los componentes hijos
  return <>{children}</>;
};