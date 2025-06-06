// src/shared/hooks/useInactivityLogout.ts
// Este hook gestiona el cierre de sesión por inactividad y la visualización del modal.

import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@features/auth/store/auth.store"; // Importa tu store de autenticación

interface UseInactivityLogoutReturn {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

// Tiempo de inactividad antes de cerrar sesión (10 segundos para pruebas)
// Ajusta a un valor más realista en producción (ej. 15 * 60 * 1000 para 15 minutos)
const INACTIVITY_TIMEOUT = 10 * 1000;

// Se añade un parámetro 'enabled' para activar o desactivar el hook.
export const useInactivityLogout = (
  enabled: boolean = false
): UseInactivityLogoutReturn => {
  const navigate = useNavigate();
  // Desestructura los estados y acciones necesarios del store de autenticación
  const {
    accessToken,
    logout, // La acción para cerrar sesión
    lastActivityTimestamp,
    logoutReason, // Razón del último cierre de sesión (observada por el modal)
    setLogoutReason, // Acción para limpiar la razón del logout
  } = useAuthStore();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Referencia mutable para el temporizador
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado local para controlar la visibilidad del modal

  // Función memoizada para cerrar el modal de notificación
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // IMPORTANTE: Limpia la razón de logout del store cuando el usuario cierra el modal.
    // Esto asegura que el modal no se vuelva a mostrar si el usuario permanece en /login
    // y la razón de logout aún está establecida.
    setLogoutReason(null);
  }, [setLogoutReason]); // Dependencia: setLogoutReason

  // Función memoizada que se ejecuta cuando se detecta inactividad y se debe cerrar la sesión.
  const performLogoutDueToInactivity = useCallback(() => {
    // Es crucial usar `useAuthStore.getState()` para obtener el estado más reciente del `accessToken`
    // en el momento de la ejecución de la función, ya que `accessToken` de las dependencias de `useCallback`
    // podría estar desactualizado si el logout se dispara por el temporizador.
    if (useAuthStore.getState().accessToken) {
      console.log("Inactividad detectada, cerrando sesión...");
      // Llama a la acción `logout` del store con la razón 'inactivity'.
      useAuthStore.getState().logout("inactivity");
      navigate("/login", { replace: true }); // Redirige al usuario a la página de login
    }
  }, [navigate]); // Dependencias: `navigate`

  // Función memoizada para iniciar o reiniciar el temporizador de inactividad.
  const startInactivityTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Limpia cualquier temporizador existente
    }
    // Establece un nuevo temporizador que ejecutará `performLogoutDueToInactivity` después del tiempo de inactividad.
    timeoutRef.current = setTimeout(
      performLogoutDueToInactivity,
      INACTIVITY_TIMEOUT
    );
  }, [performLogoutDueToInactivity]); // Dependencias: `performLogoutDueToInactivity`

  // Función memoizada para manejar los eventos de actividad del usuario (mouse, teclado, etc.).
  const handleUserActivity = useCallback(() => {
    // Solo actualiza el timestamp y reinicia el temporizador si el usuario *está* logeado.
    // Usa `getState()` para el valor más actual del accessToken.
    if (useAuthStore.getState().accessToken) {
      useAuthStore.getState().setLastActivityTimestamp(Date.now()); // Actualiza el timestamp de la última actividad
      startInactivityTimer(); // Reinicia el temporizador de inactividad
    }
  }, [startInactivityTimer]); // Dependencias: `startInactivityTimer`

  // Primer `useEffect`: Maneja la lógica de inactividad principal y los listeners de eventos.
  // Ahora, la lógica solo se ejecuta si `enabled` es `true`.
  useEffect(() => {
    if (!enabled) {
      // Si el hook no está habilitado, asegúrate de limpiar cualquier temporizador o listener activo.
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      const events = ["mousemove", "keydown", "click", "scroll"];
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
      setIsModalOpen(false); // Asegura que el modal esté cerrado si se deshabilita
      setLogoutReason(null); // Limpia cualquier razón de logout pendiente
      return; // Sale del efecto temprano si no está habilitado.
    }

    // Si el usuario está logeado (hay un accessToken en el store)
    if (accessToken) {
      // 1. Lógica para verificar el estado de la sesión al cargar la aplicación o al reabrir la pestaña.
      if (lastActivityTimestamp) {
        const timeSinceLastActivity = Date.now() - lastActivityTimestamp;
        if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
          console.log(
            "Sesión expirada por inactividad (al cargar/reabrir), cerrando sesión..."
          );
          // Llama a la acción `logout` del store con la razón 'inactivity'.
          logout("inactivity");
          navigate("/login", { replace: true }); // Redirige al login
          return; // Sale del `useEffect`, ya que la sesión ha expirado y se ha manejado.
        }
      }

      // 2. Si la sesión es válida, inicia el temporizador de inactividad al principio del efecto.
      startInactivityTimer();

      // Añade listeners para los eventos de actividad global al objeto `window`.
      const events = ["mousemove", "keydown", "click", "scroll"];
      events.forEach((event) => {
        window.addEventListener(event, handleUserActivity);
      });

      // Función de limpieza del `useEffect`: se ejecuta al desmontar el componente o cuando cambian las dependencias.
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current); // Limpia el temporizador pendiente.
        }
        // Remueve los listeners de eventos para evitar fugas de memoria.
        events.forEach((event) => {
          window.removeEventListener(event, handleUserActivity);
        });
      };
    } else {
      // Si el usuario NO está logeado (accessToken es null), asegura que no haya temporizadores ni listeners activos.
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      const events = ["mousemove", "keydown", "click", "scroll"];
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
      setIsModalOpen(false); // Asegura que el estado del modal se limpie.
      setLogoutReason(null); // Limpia la razón del logout si la sesión ya no está activa.
    }
  }, [
    enabled, // NUEVO: El efecto se dispara cuando `enabled` cambia.
    accessToken, // Dispara el efecto cuando el estado de autenticación cambia.
    navigate, // Necesario para la redirección.
    logout, // Necesario para llamar a la acción de logout.
    lastActivityTimestamp, // Necesario para la lógica de expiración al cargar/reabrir.
    startInactivityTimer, // La función memoizada para iniciar/reiniciar el temporizador.
    handleUserActivity, // La función memoizada para manejar la actividad del usuario.
    setLogoutReason, // Necesario para limpiar la razón del logout en el `else` branch.
  ]);

  // Segundo `useEffect`: Maneja la visualización del modal solo cuando la razón de logout es 'inactivity'.
  useEffect(() => {
    // Abrir el modal solo si la razón de logout es 'inactivity'
    // Y si el `accessToken` es `null` (lo que indica que el logout ya ocurrió).
    if (enabled && logoutReason === "inactivity" && !accessToken) {
      // NUEVO: También verifica `enabled`
      setIsModalOpen(true);
    }
  }, [enabled, logoutReason, accessToken]); // Observa cambios en `enabled`, `logoutReason` y `accessToken`.

  // El hook devuelve el estado del modal y la función para cerrarlo.
  return { isModalOpen, handleCloseModal };
};
