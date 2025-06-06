// src/shared/components/atoms/FormErrorText/FormErrorText.tsx
import React from "react";

interface FormErrorTextProps {
  message?: string;
  className?: string;
}

export const FormErrorText: React.FC<FormErrorTextProps> = ({
  message,
  className,
}) => {
  if (!message) return null;
  return (
    <p className={`text-red-500 text-xs mt-1 ${className || ""}`}>{message}</p>
  );
};
