import { useState, useEffect, useCallback } from 'react';
import { jwtDecode } from "jwt-decode";
import api from '../api/api';

const extractRolesFromToken = (token) => {
  if (!token) return [];

  try {
    const decoded = jwtDecode(token);

    // Caso 1: roles = ["ADMIN", "USER"]
    if (Array.isArray(decoded.roles) && decoded.roles.length > 0 && typeof decoded.roles[0] === "string") {
      return decoded.roles.map(r =>
        r.startsWith("ROLE_") ? r : `ROLE_${r}`
      );
    }

    // Caso 2: roles = [{ authority: "ROLE_ADMIN" }, ...]
    if (Array.isArray(decoded.roles) && decoded.roles.length > 0 && typeof decoded.roles[0] === "object") {
      return decoded.roles.map(r => r.authority);
    }

    // Caso 3: authorities = [{ authority: "ROLE_ADMIN" }]
    if (Array.isArray(decoded.authorities) && decoded.authorities.length > 0) {
      return decoded.authorities.map(r => r.authority);
    }

    return [];
  } catch (e) {
    console.error("Error decodificando token JWT:", e);
    return [];
  }
};


export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const correo = sessionStorage.getItem('correo');
    const nombre = sessionStorage.getItem('nombre');
    const rolesFromStorage = sessionStorage.getItem('roles');

    let roles = [];
    if (rolesFromStorage) {
      try {
        roles = JSON.parse(rolesFromStorage);
      } catch {
        roles = [];
      }
    } else if (token) {
      roles = extractRolesFromToken(token);
    }

    if (token && correo && nombre) {
      setUser({ correo, nombre, roles });
    }
  }, []);

  const login = useCallback(async (correo, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/api/auth/login', { correo, password });

      const { token, correo: userCorreo, nombre, roles: rolesFromBackend } =
        response.data;

      sessionStorage.setItem('token', token);
      sessionStorage.setItem('correo', userCorreo);
      sessionStorage.setItem('nombre', nombre);

      let roles = [];
      if (Array.isArray(rolesFromBackend)) {
        roles = rolesFromBackend.map((r) =>
          r.startsWith('ROLE_') ? r : `ROLE_${r}`
        );
      } else {
        roles = extractRolesFromToken(token);
      }

      sessionStorage.setItem('roles', JSON.stringify(roles));

      setUser({ correo: userCorreo, nombre, roles });

      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
      console.error('Error login:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (nombre, correo, password) => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/api/auth/register', { nombre, correo, password });
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar usuario');
      console.error('Error register:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('correo');
    sessionStorage.removeItem('nombre');
    sessionStorage.removeItem('roles');
    setUser(null);
  }, []);

  // Helper: verificar rol
  const hasRole = useCallback(
    (role) => {
      if (!user?.roles) return false;
      const roleName = role.startsWith('ROLE_') ? role : `ROLE_${role}`;
      return user.roles.includes(roleName);
    },
    [user]
  );

  return {
    user,         
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    hasRole,       
  };
};
