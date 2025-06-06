// src/app/router/AppRoutes.tsx

import React from "react"; // No necesitamos useRef, useState, useCallback aquí para la inactividad
import { Route, Routes, Navigate } from "react-router-dom"; // useNavigate se usa en el hook
import { LoginPage } from "../features/auth/LoginPage";
import { Home } from "../features/home/home";
import { ProtectedRoute } from "./ProtectedRoute";
import { ModalMessage } from "@shared/components/atoms"; // Importa tu Modal
import { useInactivityLogout } from "../features/auth/hooks/useInactivityLogout"; // <-- Importa el nuevo hook

export const AppRoutes: React.FC = () => {
  // Usa el hook personalizado para la lógica de inactividad

  const { isModalOpen, handleCloseModal } = useInactivityLogout();

  return (
    <>
      {" "}
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<LoginPage />} />{" "}
        {/* Agrega otras rutas públicas aquí como /register */}{" "}
        {/* Ruta Protegida: Home */}{" "}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />{" "}
            </ProtectedRoute>
          }
        />
        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Ruta 404 */}{" "}
        <Route path="*" element={<div>404 - Página no encontrada</div>} />{" "}
      </Routes>
      {/* Modal de notificación de cierre de sesión */}{" "}
      <ModalMessage
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Sesión Cerrada"
        message="Tu sesión ha sido cerrada debido a inactividad."
      />{" "}
    </>
  );
};
