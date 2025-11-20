import { Routes, Route, Navigate } from 'react-router-dom';

import { Login } from '../main/Login.jsx';
import { Register } from '../main/Register.jsx';
import { InicioRoute } from './InicioRoute.jsx';
import { DashboardRoute } from './DashboardRoute.jsx';
import { ProductoRoute } from './ProductoRoute.jsx';
import { UsuarioRoute } from './UsuarioRoute.jsx';
import { VentasRoute } from './VentasRoute.jsx';
import { MisVentasRoute } from './MisVentasRoute.jsx';
import { CartRoute } from './CartRoute.jsx';

// ⚠️ OJO: estos guards NO usan useAuth, leen directamente de sessionStorage

const RequireAuth = ({ children }) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const RequireRole = ({ role, children }) => {
  const token = sessionStorage.getItem('token');
  const rolesRaw = sessionStorage.getItem('roles');

  let roles = [];
  if (rolesRaw) {
    try {
      roles = JSON.parse(rolesRaw);
    } catch {
      roles = [];
    }
  }

  const normalizedRole = role.startsWith('ROLE_') ? role : `ROLE_${role}`;

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!roles.includes(normalizedRole)) {
    // No tiene el rol → lo mandamos al inicio
    return <Navigate to="/inicio" replace />;
  }

  return children;
};

export const Mainroutes = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Solo autenticados (ADMIN o USER) */}
      <Route
        path="/inicio"
        element={
          <RequireAuth>
            <InicioRoute />
          </RequireAuth>
        }
      />

      {/* Productos: ambos roles, lógica de botones ya está en Producto.jsx */}
      <Route
        path="/producto"
        element={
          <RequireAuth>
            <ProductoRoute />
          </RequireAuth>
        }
      />

      {/* Solo ADMIN */}
      <Route
        path="/dashboard"
        element={
          <RequireRole role="ADMIN">
            <DashboardRoute />
          </RequireRole>
        }
      />

      <Route
        path="/usuarios"
        element={
          <RequireRole role="ADMIN">
            <UsuarioRoute />
          </RequireRole>
        }
      />

      <Route
        path="/ventas"
        element={
          <RequireRole role="ADMIN">
            <VentasRoute />
          </RequireRole>
        }
      />

      {/* Solo USER */}
      <Route
        path="/mis-compras"
        element={
          <RequireRole role="USER">
            <MisVentasRoute />
          </RequireRole>
        }
      />

      <Route
        path="/carrito"
        element={
          <RequireRole role="USER">
            <CartRoute />
          </RequireRole>
        }
      />

      {/* Cualquier otra cosa */}
      <Route
        path="*"
        element={
          <RequireAuth>
            <Navigate to="/inicio" replace />
          </RequireAuth>
        }
      />
    </Routes>
  );
};
