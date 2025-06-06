// src/shared/components/molecules/BrandLogo/BrandLogo.tsx
import React from "react";
import { useTheme } from "@providers/ThemeProvider"; // Asumo que ThemeProvider es global

interface BrandLogoProps {
  // Puedes añadir props si el texto o el estilo base fueran dinámicos
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`
        w-full h-20 text-3xl font-extrabold flex items-center justify-center p-4 
        ${
          theme === "dark"
            ? "bg-indigo-700 text-white shadow-md"
            : "bg-indigo-500 text-white shadow-md"
        }
        ${className || ""}
      `}
    >
      <span className="block">Panel Salazar</span>
    </div>
  );
};
