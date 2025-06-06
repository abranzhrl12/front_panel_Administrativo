// src/shared/components/organisms/Sidebar/Sidebar.tsx
import { useTheme } from "@providers/ThemeProvider";
import { ButtonBasic } from "@shared/components/atoms/"; // Ajusta la ruta si usas index.ts
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@features/auth/store/auth.store";

// Importa las moléculas que componen el Sidebar
import { BrandLogo } from "@shared/components/molecules/BrandLogo/BrandLogo";
import { DashboardSection } from "@shared/components/molecules/DashboardSection/DashboardSection";
import { NavList } from "@shared/components/molecules/NavMenu/NavList";
import { ThemeToogle } from "@shared/components/molecules/themetoogle/ThemeToogle"; // Asegúrate que esta ruta es correcta

export const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  // Función para manejar el cierre de sesión del usuario
  const handleLogout = () => {
    logout("manual"); // Llama a la acción logout con la razón 'manual'
    navigate("/login", { replace: true }); // Redirige al usuario a la página de login
  };

  const { theme } = useTheme(); // Obtiene el tema actual de ThemeProvider

  // Datos para la lista de navegación
  const navItems = [
    { href: "#", text: "Home" },
    { href: "#", text: "About" },
    { href: "#", text: "Contact" },
  ];

  return (
    <div
      className={`
        w-64 h-screen flex flex-col p-6 shadow-xl 
         border-gray-200 dark:border-gray-700
        transition-colors duration-300 ease-in-out
        ${
          theme === "dark"
            ? "bg-gray-800 text-gray-100"
            : "bg-white text-gray-800"
        }
      `}
    >
      {/* Sección del Logo de la Marca (Molécula) */}
      <BrandLogo />

      {/* Sección Principal de Navegación */}
      {/* CLASES ACTUALIZADAS: justify-center para centrado vertical y items-center para centrado horizontal */}
      <nav className="flex flex-col flex-grow space-y-4 justify-center items-center">
        {/* Sección de Dashboard (Molécula) */}
        <DashboardSection welcomeMessage="¡Bienvenido a tu panel!" />

        {/* Lista de Navegación (Molécula) */}
        <NavList items={navItems} />
      </nav>

      {/* Botón de Cerrar Sesión (Átomo con contenedor de diseño) */}
      {/* El mt-auto en este div empuja esta sección y la que le sigue al final del flex-col */}
      <div className="mt-auto pt-6">
        <div className="mt-4 flex justify-center">
          <ThemeToogle />
        </div>
        <ButtonBasic
          onClick={handleLogout}
          text="Cerrar Sesión"
          className="w-full" // Asegura que el botón ocupe todo el ancho dentro de su contenedor
        />
      </div>

      {/* Alternador de Tema (Molécula) */}
    </div>
  );
};
