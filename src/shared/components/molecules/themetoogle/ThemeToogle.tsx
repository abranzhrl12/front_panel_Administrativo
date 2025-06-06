import {useState} from 'react'
import { useTheme } from "@providers/ThemeProvider";
import { Switch } from '@headlessui/react'

export const ThemeToogle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";
   const [enabled, setEnabled] = useState(false)
  return (
    <div  className="flex gap-1 items-center">
      <svg width={25} height={25} className="stroke-cyan-50">
        <use href="src/shared/assets/icons/sprite.svg#icon-sun" onClick={toggleTheme} />
      </svg>

        <Switch
        checked={isDarkMode} // El estado del switch ahora se basa en 'isDarkMode'
        onChange={toggleTheme} // Cuando el switch cambia, llama a 'toggleTheme'
        className="group inline-flex h-6 w-11 items-center rounded-full bg-border-color transition
                   data-[checked]:bg-highlight-color shadow-xs bg-black"
        // bg-black y data-checked:bg-black no son tus colores personalizados.
        // Usa bg-border-color para el rizo (cuando no está marcado)
        // y data-[checked]:bg-highlight-color para el rizo (cuando está marcado)
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
      </Switch>

    <svg width={25} height={25} className="stroke-cyan-50 stroke-10">
        <use href="src/shared/assets/icons/sprite.svg#icon-moon" onClick={toggleTheme} />
      </svg>
    </div>
  );
};
