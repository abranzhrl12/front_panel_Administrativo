// src/shared/components/atoms/Inputs/InputText.tsx
import React from "react";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Puedes añadir props específicas si necesitas alguna lógica especial
}

export const InputText: React.FC<InputTextProps> = (props) => {
  return (
    <input
      {...props}
      className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
        props.className || ""
      }`}
    />
  );
};
