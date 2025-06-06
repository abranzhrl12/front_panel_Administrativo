// src/shared/components/atoms/buttons/ButtonBasic.tsx
import React from "react";

interface ButtonBasicProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string; // Propiedad para el texto del botón
}

export const ButtonBasic: React.FC<ButtonBasicProps> = ({ text, ...props }) => {
  return (
    <button
      {...props}
      className={`flex h-12 justify-center items-center py-2 px-4 border border-transparent cursor-pointer rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 w-full  disabled:cursor-not-allowed${
        props.className || ""
      }`}
    >
      {text}
    </button>
  );
};
