// src/shared/components/molecules/NavMenu/NavList.tsx
import React from "react";
import { NavLinkItem } from "./NavLinkItem"; // Importa el átomo NavLinkItem

interface NavListProps {
  items: { href: string; text: string }[];
  className?: string;
}

export const NavList: React.FC<NavListProps> = ({ items, className }) => {
  return (
    <ul className={`space-y-2 ${className || ""}`}>
      {items.map((item, index) => (
        <NavLinkItem key={index} href={item.href} text={item.text} />
      ))}
    </ul>
  );
};
