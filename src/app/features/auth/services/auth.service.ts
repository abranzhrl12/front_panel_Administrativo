// src/features/auth/services/auth.service.ts
import { graphqlClient } from "@shared/api/graphql-client";
import { z } from "zod";
import { gql } from "graphql-request";

// 1. Esquema de validación para los datos que el usuario introduce en el formulario.
export const LoginCredentialsSchema = z.object({
  email: z.string().email("Por favor, introduce un email válido."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
});

// Creamos un tipo de TypeScript a partir del esquema para usarlo en nuestros componentes.
export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>; // <-- Esto es correcto y necesario

// 2. Esquema para validar que la respuesta del servidor es la que esperamos.
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
export const login = async (credentials: LoginCredentials) => {
  LoginCredentialsSchema.parse(credentials);

  const variables = { loginInput: credentials };

  const response = await graphqlClient.request(USER_LOGIN_MUTATION, variables);

  const validatedResponse = LoginResponseSchema.parse(response);

  return validatedResponse.login;
};
