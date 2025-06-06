import { graphqlClient } from '@shared/api/graphql-client';
import { z } from 'zod';
import { gql } from 'graphql-request';

// 1. Esquema de validación para los datos que el usuario introduce en el formulario.
//    Esto nos da autocompletado y seguridad de tipos.
export const LoginCredentialsSchema = z.object({
  email: z.string().email('Por favor, introduce un email válido.'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
});

// Creamos un tipo de TypeScript a partir del esquema para usarlo en nuestros componentes.
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;


// 2. Esquema para validar que la respuesta del servidor es la que esperamos.
//    Esto nos protege si la API cambia o envía datos incorrectos.
const LoginResponseSchema = z.object({
  login: z.object({
    accessToken: z.string(),
    user: z.object({
      role: z.string(),
      isActive: z.boolean(),
    }),
  }),
});


// 3. La mutación de GraphQL que nos diste, usando la utilidad `gql`.
const USER_LOGIN_MUTATION = gql`
  mutation UserLogin($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      user {
        role
        isActive
      }
    }
  }
`;


// 4. La función principal que nuestro hook usará.
//    Es 'async' porque las llamadas a la red toman tiempo.
export const login = async (credentials: LoginCredentials) => {
  // Primero, validamos que los datos del formulario son correctos antes de enviarlos.
  LoginCredentialsSchema.parse(credentials);

  const variables = { loginInput: credentials };

  // Usamos nuestro cliente para ejecutar la mutación.
  // Le pasamos la query y las variables que necesita.
  const response = await graphqlClient.request(USER_LOGIN_MUTATION, variables);
  
  // Validamos que la respuesta del servidor tenga la forma que esperamos.
  // Si no la tiene, Zod lanzará un error que podremos capturar.
  const validatedResponse = LoginResponseSchema.parse(response);

  // Devolvemos solo la parte de los datos que nos interesa.
  return validatedResponse.login;
};