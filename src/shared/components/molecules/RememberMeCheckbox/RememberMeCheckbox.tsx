// src/shared/components/molecules/RememberMeCheckbox/RememberMeCheckbox.tsx
import React from "react";
import { Checkbox } from "@shared/components/atoms"; // <--- Ajusta la ruta a tu Checkbox

interface RememberMeCheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string; // Opcional, por si quieres que sea configurable
}

export const RememberMeCheckbox: React.FC<RememberMeCheckboxProps> = ({
  checked,
  onChange,
  label = "Recordar email",
}) => {
  return (
    <div className="flex items-center">
      <Checkbox
        id="remember-me"
        name="remember-me"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
};
