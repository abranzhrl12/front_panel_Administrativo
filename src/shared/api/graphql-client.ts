import { GraphQLClient } from 'graphql-request';

// Asegúrate de tener tu variable de entorno en el archivo .env
const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;

if (!endpoint) {
  throw new Error("La variable VITE_GRAPHQL_ENDPOINT no está definida en tu archivo .env");
}

// Creamos y exportamos una única instancia del cliente de GraphQL
export const graphqlClient = new GraphQLClient(endpoint);