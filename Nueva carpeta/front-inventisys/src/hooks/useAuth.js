import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const correo = sessionStorage.getItem('correo');
    const nombre = sessionStorage.getItem('nombre');
    
    if (token && correo && nombre) {
      setUser({ correo, nombre });
    }
  }, []);

  const login = useCallback(async (correo, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/api/auth/login', { correo, password });
      const { token, correo: userCorreo, nombre } = response.data;
      
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('correo', userCorreo);
      sessionStorage.setItem('nombre', nombre);
      
      setUser({ correo: userCorreo, nombre });
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

  // Logout
  const logout = useCallback(() => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('correo');
    sessionStorage.removeItem('nombre');
    setUser(null);
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
};
