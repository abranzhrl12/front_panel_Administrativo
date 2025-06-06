import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login, type LoginCredentials } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";

export const useLogin = () => {
  // 1. Obtenemos la función para guardar los datos del usuario de nuestro store.
  const { setAuth } = useAuthStore();

  // 2. Obtenemos la función para navegar a otras páginas.
  const navigate = useNavigate();

  // 3. Usamos `useMutation` de React Query para manejar la llamada a la API.
  //    Una "mutación" es cualquier operación que cambia datos en el servidor (POST, PUT, DELETE).
  return useMutation({
    // Le decimos a React Query qué función debe ejecutar para hacer el login.
    mutationFn: (credentials: LoginCredentials) => login(credentials),

    // `onSuccess` se ejecuta automáticamente si la `mutationFn` tiene éxito.
    onSuccess: (data) => {
      // Guardamos el token y los datos del usuario en nuestro store global.
      setAuth(data);

      // Llevamos al usuario a una página protegida, como el dashboard.
      // (Asegúrate de tener una ruta '/dashboard' en tu router).
      navigate("/home");
    },

    // `onError` se ejecuta si la `mutationFn` falla (ej: contraseña incorrecta).
    onError: (error) => {
      console.error("Login fallido:", error);
      // Aquí podrías mostrar una notificación de error al usuario.
    },
  });
};
