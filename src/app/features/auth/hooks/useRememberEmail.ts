// src/app/hooks/useRememberEmail.ts
import { useState, useEffect, useCallback } from 'react';

interface UseRememberEmailReturn {
  email: string;
  setEmail: (email: string) => void;
  rememberMe: boolean;
  setRememberMe: (checked: boolean) => void;
  // Función para guardar/eliminar el email en localStorage
  handleRememberEmail: (currentEmail: string, shouldRemember: boolean) => void;
}

export const useRememberEmail = (): UseRememberEmailReturn => {
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Efecto para cargar el email guardado del localStorage al iniciar la página
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true); // Marca el checkbox si hay un email guardado
    }
  }, []); // Se ejecuta solo una vez al montar el componente

  // Función memoizada para manejar el guardado/eliminado del email en localStorage
  const handleRememberEmail = useCallback((currentEmail: string, shouldRemember: boolean) => {
    if (shouldRemember) {
      localStorage.setItem('rememberedEmail', currentEmail);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  }, []);

  return {
    email,
    setEmail,
    rememberMe,
    setRememberMe,
    handleRememberEmail,
  };
};