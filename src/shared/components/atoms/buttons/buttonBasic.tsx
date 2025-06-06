// src/shared/components/atoms/Button/ButtonBasic.tsx

// Importamos React, aunque con React 19 no es estrictamente necesario,
// lo mantengo por si la configuración de tu linter/TS aún lo requiere.


interface ButtonBasicProps {
  text: string;
  // Opcional: Prop para el manejo de clics
  onClick?: () => void;
  // Opcional: Prop para deshabilitar el botón
  disabled?: boolean;
  // Opcional: Prop para variar el estilo del botón (ej. 'primary', 'secondary', 'danger')
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  // Opcional: Prop para cambiar el tamaño
  size?: 'sm' | 'md' | 'lg';
  // Opcional: Prop para añadir clases adicionales
  className?: string;
  // Opcional: Tipo de botón para formularios
  type?: 'button' | 'submit' | 'reset';
}

export const ButtonBasic = ({
  text,
  onClick,
  disabled = false,
  variant = 'primary', // Valor por defecto
  size = 'md',        // Valor por defecto
  className = '',     // Clases adicionales
  type = 'button',    // Tipo por defecto
}: ButtonBasicProps) => {

  // Clases base para el botón
  const baseClasses = `
    font-semibold
    rounded-lg
    transition
    duration-200
    ease-in-out
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    shadow-sm
    active:scale-[0.98]
  `;

  // Clases para el tamaño
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Clases para el variante de color
  const variantClasses = {
    primary: `
      bg-indigo-600
      text-white
      hover:bg-indigo-700
      focus:ring-indigo-500
      shadow-indigo-500/50
    `,
    secondary: `
      bg-gray-200
      text-gray-800
      hover:bg-gray-300
      focus:ring-gray-400
      shadow-gray-300/50
    `,
    danger: `
      bg-red-600
      text-white
      hover:bg-red-700
      focus:ring-red-500
      shadow-red-500/50
    `,
    ghost: `
      bg-transparent
      text-indigo-600
      hover:bg-indigo-50
      focus:ring-indigo-500
      shadow-none
    `,
  };

  // Clases para el estado deshabilitado
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed shadow-none'
    : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabledClasses}
        ${className}
      `}
    >
      {text}
    </button>
  );
};