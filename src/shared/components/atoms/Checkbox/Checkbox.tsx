// src/shared/components/atoms/Checkbox/Checkbox.tsx
import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Puedes añadir props específicas
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  return (
    <input
      type="checkbox"
      {...props}
      className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ${
        props.className || ""
      }`}
    />
  );
};
