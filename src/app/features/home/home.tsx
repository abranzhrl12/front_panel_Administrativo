// src/features/home/home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useAuthStore } from '../auth/store/auth.store'; // Asegúrate de que esta ruta a tu store sea correcta

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore(); // Obtenemos la acción 'logout' de nuestro store

  const handleLogout = () => {
    logout(); // Llama a la acción logout para limpiar el estado y localStorage
    navigate('/login', { replace: true }); // Redirige al usuario a la página de login
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#333' }}>¡Bienvenido a la página principal!</h1>
      <p style={{ color: '#555' }}>Estás logeado correctamente.</p>
      
      {/* Botón de Cerrar Sesión */}
      <button
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#dc3545', // Rojo para "cerrar sesión"
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c82333')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc3545')}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};