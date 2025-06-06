// src/shared/components/molecules/FormFieldLogin/FormField.tsx
import React from "react";
import { InputText } from "../../atoms/Inputs/InputText"; // <--- Ajusta la ruta a tu InputText
import { FormErrorText } from "../../atoms/FormErrorText/FormErrorText"; // <--- Ajusta la ruta a tu FormErrorText

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  id,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <InputText id={id} {...rest} />
        <FormErrorText message={error} />
      </div>
    </div>
  );
};
