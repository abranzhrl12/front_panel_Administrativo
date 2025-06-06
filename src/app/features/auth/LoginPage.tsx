// src/features/auth/LoginPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@features/auth/hooks/useLogin";
import {
  LoginCredentialsSchema,
  type LoginCredentials,
} from "@features/auth/services/auth.service"; // Usar 'type' para LoginCredentials
import { useAuthStore } from "@features/auth/store/auth.store";
import { useRememberEmail } from "@features/auth/hooks/useRememberEmail"; // Ruta a tu hook compartido
import {
  validateFormData,
  type FormErrors,
} from "@shared/utils/FormErrors/formValidation"; // Usar 'type' para FormErrors
import { LoginForm } from "@shared/components/organisms"; // Ruta a tu organismo LoginForm

export const LoginPage = () => {
  const { mutate: performLogin, isPending, error } = useLogin();
  const { email, setEmail, rememberMe, setRememberMe, handleRememberEmail } =
    useRememberEmail();

  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors<LoginCredentials>>(
    {}
  );

  const navigate = useNavigate();
  const { accessToken } = useAuthStore();

  // Lógica para redirigir si el usuario ya está logeado
  useEffect(() => {
    if (accessToken) {
      navigate("/home", { replace: true });
    }
  }, [accessToken, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormErrors({}); // Limpia errores anteriores

    const credentials: LoginCredentials = { email, password };

    // Usa la función de utilidad para la validación
    const errors = validateFormData(LoginCredentialsSchema, credentials);

    if (errors) {
      setFormErrors(errors);
      return;
    }

    // Llama a la función del hook para guardar/eliminar el email
    handleRememberEmail(email, rememberMe);

    // Realiza la mutación (petición de login)
    performLogin(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>
        {/* Renderiza el LoginForm y pásale todas las props necesarias */}
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          formErrors={formErrors}
          isPending={isPending}
          loginError={!!error} // Convierte 'error' (que puede ser null o un objeto) a un booleano
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
