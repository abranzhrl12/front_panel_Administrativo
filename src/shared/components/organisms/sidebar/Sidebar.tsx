import { useTheme } from "@providers/ThemeProvider";
import { ThemeToogle } from "@shared/components/molecules"

export const Sidebar = () => {
  const { theme } = useTheme();
  return (
    <div  className={`
        w-64 h-screen  flex flex-col p-4 shadow-md
        border-r border-border-color
        transition-colors duration-300 ease-in-out
        ${theme === 'dark' ? 'bg-amber-600' : 'bg-blue-600'}
      `}>
    <div className="block w-full h-18 text-2xl font-bold p-6 bg-blue-500 mt-6 flex items-center justify-center text-white">
        <span className="block mt-6 bg-amber-600 pd-2">Panel Salazar</span> 
      
    </div>
      <div>
        Dashboard
        <div>hola</div>
      </div>
      <ul >
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <ThemeToogle/>
    </div>
  )
}
