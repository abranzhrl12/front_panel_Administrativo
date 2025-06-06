// src/app/hooks/useInactivityLogout.ts

import { useEffect, useRef, useState, useCallback } from "react";

import { useNavigate } from "react-router-dom"; // Necesitamos useNavigate aquí

import { useAuthStore } from "@features/auth/store/auth.store"; // Importa tu store

interface UseInactivityLogoutReturn {
  isModalOpen: boolean;

  handleCloseModal: () => void;
}

export const useInactivityLogout = (): UseInactivityLogoutReturn => {
  const navigate = useNavigate(); // Obtén el hook de navegación dentro del custom hook

  const {
    accessToken,

    logout,

    lastActivityTimestamp,

    setLastActivityTimestamp,

    logoutReason,

    setLogoutReason,
  } = useAuthStore();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const INACTIVITY_TIMEOUT = 8 * 1000; // 10 segundos en milisegegundos

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado interno del modal en el hook // Función memoizada para ejecutar el cierre de sesión por inactividad

  const performLogoutDueToInactivity = useCallback(() => {
    // Es crucial usar getState() aquí para obtener el estado más reciente del accessToken

    // porque 'accessToken' en las dependencias de useCallback puede estar desactualizado

    if (useAuthStore.getState().accessToken) {
      console.log("Inactividad detectada, cerrando sesión...");

      logout("inactivity");

      navigate("/login", { replace: true });

      setIsModalOpen(true); // Abre el modal
    }
  }, [logout, navigate]); // Función memoizada para iniciar/reiniciar el temporizador de inactividad

  const startInactivityTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(
      performLogoutDueToInactivity,

      INACTIVITY_TIMEOUT
    );
  }, [performLogoutDueToInactivity]); // Función memoizada para manejar los eventos de actividad del usuario

  const handleUserActivity = useCallback(() => {
    // Solo actualiza el timestamp y reinicia el temporizador si el usuario está logeado

    if (useAuthStore.getState().accessToken) {
      setLastActivityTimestamp(Date.now());

      startInactivityTimer();
    }
  }, [setLastActivityTimestamp, startInactivityTimer]); // Efecto principal para manejar la lógica de inactividad y los listeners

  useEffect(() => {
    // Si el usuario está logeado (hay un accessToken)

    if (accessToken) {
      // 1. Lógica para verificar el estado de la sesión al cargar la app (o al reabrir la pestaña)

      if (lastActivityTimestamp) {
        const timeSinceLastActivity = Date.now() - lastActivityTimestamp;

        if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
          console.log(
            "Sesión expirada por inactividad (al cargar la app), cerrando sesión..."
          );

          logout("inactivity");

          navigate("/login", { replace: true });

          setIsModalOpen(true);

          return; // Sale del useEffect, ya que la sesión ha expirado
        }
      } // 2. Inicia el temporizador de inactividad al principio del efecto // Esto cubre el caso inicial cuando el usuario se loguea o reabre la app y la sesión es válida

      startInactivityTimer(); // Añade listeners para eventos de actividad global

      const events = ["mousemove", "keydown", "click", "scroll"];

      events.forEach((event) => {
        window.addEventListener(event, handleUserActivity);
      }); // Función de limpieza del useEffect: se ejecuta al desmontar o cuando cambian las dependencias

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current); // Limpia el temporizador pendiente
        } // Remueve los listeners de eventos para evitar fugas de memoria

        events.forEach((event) => {
          window.removeEventListener(event, handleUserActivity);
        });
      };
    } else {
      // Si el usuario no está logeado (accessToken es null), limpia temporizadores y listeners

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const events = ["mousemove", "keydown", "click", "scroll"];

      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      }); // Asegura que el estado del modal se limpie si el usuario no está logeado

      setIsModalOpen(false);

      setLogoutReason(null); // Limpia cualquier razón de logout anterior
    }
  }, [
    accessToken,

    navigate,

    logout,

    lastActivityTimestamp,

    setLastActivityTimestamp,

    startInactivityTimer,

    handleUserActivity,

    setLogoutReason,
  ]); // Efecto para manejar la visualización del modal si hubo un logout por inactividad

  useEffect(() => {
    // Solo abre el modal si la razón de logout es 'inactivity' y el usuario no está logeado

    if (logoutReason === "inactivity" && !accessToken) {
      setIsModalOpen(true);

      setLogoutReason(null); // Limpia la razón para que el modal no se muestre repetidamente
    }
  }, [logoutReason, accessToken, setLogoutReason]); // Función para cerrar el modal

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []); // El hook devuelve el estado del modal y la función para cerrarlo

  return { isModalOpen, handleCloseModal };
};
