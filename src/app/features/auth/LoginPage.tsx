import React, { useState } from 'react';
import { useLogin } from '@features/auth/hooks/useLogin'; // Nuestro hook con la lógica.
import { LoginCredentialsSchema } from '@features/auth/services/auth.service'; // El esquema para validar

// Asumo que tienes un componente ButtonBasic. Si no, puedes usar un <button> normal por ahora.
// import { ButtonBasic } from '@/shared/components/atoms/ButtonBasic';

export const LoginPage = () => {
  // 1. Conectamos nuestro hook. Nos da:
  //    - performLogin: la función para ejecutar el login.
  //    - isPending: un booleano que es `true` mientras la petición está en curso.
  //    - error: un objeto de error si la petición falla.
  const { mutate: performLogin, isPending, error } = useLogin();

  // 2. Estados locales para guardar lo que el usuario escribe.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // 3. Esta función se ejecuta cuando el usuario envía el formulario.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que la página se recargue.
    setFormErrors({}); // Limpia errores de validación anteriores.

    const credentials = { email, password };

    // Validamos los datos con Zod ANTES de enviarlos a la API.
    const validationResult = LoginCredentialsSchema.safeParse(credentials);

    if (!validationResult.success) {
      // Si la validación falla, actualizamos el estado de errores del formulario.
      const newErrors: { [key: string]: string } = {};
      validationResult.error.issues.forEach(issue => {
        newErrors[issue.path[0]] = issue.message;
      });
      setFormErrors(newErrors);
      return; // No continuamos si hay errores.
    }

    // Si la validación es exitosa, llamamos a la función de nuestro hook.
    performLogin(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        {/* 4. Conectamos la función handleSubmit al formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              {/* 5. Conectamos los inputs al estado local */}
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
              {/* Mostramos el error de validación si existe */}
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
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
          
          {/* 6. Mostramos un error general si la API falla (ej: contraseña incorrecta) */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <p>Error: Credenciales incorrectas o problema con el servidor.</p>
            </div>
          )}
          
          <div>
            {/* 7. El botón ahora es dinámico */}
            <button
              type="submit"
              disabled={isPending} // Se deshabilita mientras carga
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isPending ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
            {/* Si tienes tu ButtonBasic, asegúrate de pasarle `type="submit"` y `disabled={isPending}` */}
            {/* <ButtonBasic text={isPending ? 'Ingresando...' : 'Iniciar Sesión'} type="submit" disabled={isPending} /> */}
          </div>
        </form>
      </div>
    </div>
  );
};