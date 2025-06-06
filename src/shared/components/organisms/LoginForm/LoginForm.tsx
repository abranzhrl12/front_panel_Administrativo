// src/features/auth/components/organisms/Login/LoginForm.tsx
import React from "react";
import { FormField } from "@shared/components/molecules/FormField"; // Ruta a tu FormField.tsx
import { RememberMeCheckbox } from "@shared/components/molecules/RememberMeCheckbox/RememberMeCheckbox"; // Ruta a tu RememberMeCheckbox.tsx
import { ButtonBasic } from "@shared/components/atoms/Buttons"; // Ruta a tu ButtonBasic.tsx
import type { FormErrors } from "@shared/utils/FormErrors"; // Ruta a tu archivo de utilidades de validación
import type { LoginCredentials } from "@features/auth/services/auth.service"; // Ruta a tu tipo LoginCredentials

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  rememberMe: boolean;
  setRememberMe: (checked: boolean) => void;
  formErrors: FormErrors<LoginCredentials>;
  isPending: boolean;
  loginError: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  formErrors,
  isPending,
  loginError,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Campo de Email */}
      <FormField
        id="email"
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={formErrors.email}
      />

      {/* Campo de Contraseña */}
      <FormField
        id="password"
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={formErrors.password}
      />

      {/* Checkbox "Recordar email" */}
      <div className="flex items-center justify-between">
        <RememberMeCheckbox
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          label="Recordar email" // Puedes hacer que el label sea una prop, o dejarlo fijo
        />
      </div>

      {/* Mensaje de error general del login (ej. credenciales incorrectas) */}
      {loginError && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p>Error: Credenciales incorrectas o problema con el servidor.</p>
        </div>
      )}

      {/* Botón de Iniciar Sesión */}
      <div>
        <ButtonBasic
          type="submit"
          disabled={isPending}
          text={isPending ? "Ingresando..." : "Iniciar Sesión"}
          // Las clases de Tailwind ya están definidas en ButtonBasic, así que puedes quitarlas aquí
          // className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          className="w-full" // Puedes dejar una clase simple si necesitas sobreescribir el ancho, etc.
        />
      </div>
    </form>
  );
};
