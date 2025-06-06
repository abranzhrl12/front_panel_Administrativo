import {  Route, Routes } from "react-router-dom";


import { LoginPage } from "@features/auth/LoginPage";
import { Home } from "@features/home/home";
export const AppRoutes: React.FC = () => {
  return (

      <Routes>
      
        {/* Ruta para una página de error 404 */}
        <Route path="/login" element={<LoginPage />} />
         <Route path="/home" element={<Home />} />
      </Routes>
  
  );
};