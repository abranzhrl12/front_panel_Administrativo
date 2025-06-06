// src/shared/components/molecules/DashboardSection/DashboardSection.tsx
import React from "react";
import { useTheme } from "@providers/ThemeProvider"; // Asumo que ThemeProvider es global

interface DashboardSectionProps {
  className?: string;
  welcomeMessage?: string;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({
  className,
  welcomeMessage = "¡Bienvenido!",
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`
        p-3 rounded-md text-lg font-medium cursor-pointer
        ${
          theme === "dark"
            ? "text-gray-300 hover:bg-gray-700"
            : "text-gray-700 hover:bg-gray-100"
        }
        transition-colors duration-200
        ${className || ""}
      `}
    >
      Dashboard
      <div className="text-sm text-gray-500 mt-1">{welcomeMessage}</div>
    </div>
  );
};
