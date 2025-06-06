  // src/features/auth/LoginPage.tsx
  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useLogin } from '@features/auth/hooks/useLogin';
  import { LoginCredentialsSchema } from '@features/auth/services/auth.service';
  import { useAuthStore } from '@features/auth/store/auth.store';
  import { useRememberEmail } from '../../features/auth/hooks/useRememberEmail';
  // <-- IMPORTA LA FUNCIÓN DE UTILIDAD Y EL TIPO DE ERRORES
  import { validateFormData, type FormErrors } from '../../features/auth/utils/formValidationLogin'; 

  export const LoginPage = () => {
    const { mutate: performLogin, isPending, error } = useLogin();
    const { email, setEmail, rememberMe, setRememberMe, handleRememberEmail } = useRememberEmail(); 
    
    const [password, setPassword] = useState('');
    // Usa el tipo FormErrors para tu estado de errores
    const [formErrors, setFormErrors] = useState<FormErrors<typeof LoginCredentialsSchema._type>>({}); 
    // Nota: typeof LoginCredentialsSchema._type infiere el tipo de las credenciales (email, password)

    const navigate = useNavigate();
    const { accessToken } = useAuthStore();

    // Lógica para redirigir si el usuario ya está logeado
    useEffect(() => {
      if (accessToken) {
        navigate('/home', { replace: true });
      }
    }, [accessToken, navigate]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFormErrors({});

      const credentials = { email, password };
      
      // <-- USA LA FUNCIÓN DE UTILIDAD PARA LA VALIDACIÓN
      const errors = validateFormData(LoginCredentialsSchema, credentials);

      if (errors) { // Si hay errores, actualiza el estado y detiene el envío
        setFormErrors(errors);
        return;
      }

      // Llama a la función del hook para guardar/eliminar el email
      handleRememberEmail(email, rememberMe);

      performLogin(credentials);
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Iniciar Sesión
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>
            </div>

            {/* Campo de Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
              </div>
            </div>
            
            {/* Checkbox "Recordar email" */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Recordar email
                </label>
              </div>
            </div>
            
            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                <p>Error: Credenciales incorrectas o problema con el servidor.</p>
              </div>
            )}
            
            <div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {isPending ? 'Ingresando...' : 'Iniciar Sesión'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };