// src/shared/utils/formValidation.ts
import { ZodSchema, ZodError } from "zod";

/**
 * Tipo genérico para errores de formulario.
 * Mapea las claves de un tipo `T` (que debe ser un objeto) a mensajes de error de tipo string.
 * Ejemplo: Para un tipo { email: string, password: string }, FormErrors<T> será { email?: string, password?: string }.
 */
export type FormErrors<T extends object> = {
  [K in keyof T]?: string;
};

/**
 * Valida los datos de un formulario utilizando un esquema Zod.
 *
 * @param schema El esquema Zod a utilizar para la validación.
 * @param data Los datos del formulario a validar.
 * @returns Un objeto `FormErrors<T>` con los errores de validación, o `null` si la validación es exitosa.
 */
export const validateFormData = <T extends object>(
  schema: ZodSchema<T>,
  data: T
): FormErrors<T> | null => {
  try {
    schema.parse(data);
    return null; // Si no hay errores, retorna null
  } catch (error) {
    if (error instanceof ZodError) {
      // Mapea los errores de Zod a nuestro tipo FormErrors
      const errors: FormErrors<T> = {};
      error.errors.forEach((err) => {
        // Asegúrate de que path[0] exista y sea una clave de T
        if (err.path.length > 0 && typeof err.path[0] === "string") {
          errors[err.path[0] as keyof T] = err.message;
        }
      });
      return errors;
    }
    // Si no es un error de Zod, puedes manejarlo o relanzarlo
    console.error("Error inesperado en la validación:", error);
    // Para errores inesperados, podrías retornar un error general
    return {
      general: "Ocurrió un error inesperado durante la validación.",
    } as FormErrors<T>;
  }
};
