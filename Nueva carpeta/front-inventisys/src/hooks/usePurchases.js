import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';

export const usePurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [myPurchases, setMyPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  // Cargar todas las compras (admin)
  const loadAllPurchases = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/purchases');
      setPurchases(response.data);
    } catch (err) {
      setError('Error al cargar las compras');
      console.error('Error loading purchases:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar mis compras (usuario autenticado)
  const loadMyPurchases = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/purchases/my-purchases');
      setMyPurchases(response.data);
    } catch (err) {
      setError('Error al cargar tus compras');
      console.error('Error loading my purchases:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear compra
  const createPurchase = useCallback(async (productId, cantidad) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/api/purchases', {
        productId,
        cantidad
      });
      setSuccess('Compra realizada exitosamente');
      setTimeout(() => setSuccess(''), 3000);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error al realizar la compra');
      console.error('Error creating purchase:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    purchases,
    myPurchases,
    loading,
    error,
    success,
    createPurchase,
    loadAllPurchases,
    loadMyPurchases
  };
};
