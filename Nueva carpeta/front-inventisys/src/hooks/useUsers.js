import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/admin/users');
      setUsers(response.data);
    } catch (err) {
      setError('Error al cargar los usuarios');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/admin/users/${id}`);
      return response.data;
    } catch (err) {
      setError('Error al obtener el usuario');
      console.error('Error getting user:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar usuario
  const updateUser = useCallback(async (id, user) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/api/admin/users/${id}`, user);
      setUsers(prev => 
        prev.map(u => u.id === id ? response.data : u)
      );
      setSuccess('Usuario actualizado correctamente');
      setTimeout(() => setSuccess(''), 3000);
      return response.data;
    } catch (err) {
      setError('Error al actualizar el usuario');
      console.error('Error updating user:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar usuario
  const deleteUser = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/api/admin/users/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
      setSuccess('Usuario eliminado correctamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al eliminar el usuario');
      console.error('Error deleting user:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    error,
    success,
    getUserById,
    updateUser,
    deleteUser,
    refreshUsers: loadUsers
  };
};
