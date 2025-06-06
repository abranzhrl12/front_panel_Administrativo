// src/shared/components/molecules/NavMenu/NavLinkItem.tsx
import React from "react";
import { useTheme } from "@providers/ThemeProvider";

interface NavLinkItemProps {
  href: string;
  text: string;
  className?: string;
}

export const NavLinkItem: React.FC<NavLinkItemProps> = ({
  href,
  text,
  className,
}) => {
  const { theme } = useTheme();

  return (
    <li>
      <a
        href={href}
        className={`
          flex justify-center  items-center p-3 rounded-md text-lg font-medium h-16 w-52
          ${
            theme === "dark"
              ? "text-gray-300 hover:bg-gray-700"
              : "text-gray-700 hover:bg-gray-100"
          }
          transition-colors duration-200
          ${className || ""}
        `}
      >
        {text}
      </a>
    </li>
  );
};
