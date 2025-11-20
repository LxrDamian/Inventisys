import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';

export const useCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const showSuccess = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 3000);
  };

  const loadCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/cart');
      setCart(res.data);
    } catch (err) {
      console.error('Error al cargar carrito', err);
      setError(err.response?.data?.message || 'Error al cargar el carrito');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = useCallback(
    async (productId, quantity = 1) => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.post('/api/cart/items', { productId, quantity });
        setCart(res.data);
        showSuccess('Producto añadido al carrito');
      } catch (err) {
        console.error('Error al añadir al carrito', err);
        setError(err.response?.data?.message || 'No se pudo añadir al carrito');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const updateItem = useCallback(async (productId, quantity) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.put(`/api/cart/items/${productId}`, { quantity });
      setCart(res.data);
      showSuccess('Cantidad actualizada');
    } catch (err) {
      console.error('Error al actualizar cantidad', err);
      setError(err.response?.data?.message || 'No se pudo actualizar la cantidad');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.delete(`/api/cart/items/${productId}`);
      setCart(res.data);
      showSuccess('Producto eliminado del carrito');
    } catch (err) {
      console.error('Error al eliminar del carrito', err);
      setError(err.response?.data?.message || 'No se pudo eliminar el producto');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await api.delete('/api/cart');
      setCart((prev) => (prev ? { ...prev, items: [] } : { items: [] }));
      showSuccess('Carrito vaciado');
    } catch (err) {
      console.error('Error al vaciar carrito', err);
      setError(err.response?.data?.message || 'No se pudo vaciar el carrito');
    } finally {
      setLoading(false);
    }
  }, []);

  // ⚠️ Este endpoint debe existir en el backend (/api/cart/checkout)
  const checkout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/api/cart/checkout');
      // Después de comprar, el backend debería vaciar el carrito
      await loadCart();
      showSuccess('Compra realizada correctamente');
      return res.data;
    } catch (err) {
      console.error('Error en checkout', err);
      setError(err.response?.data?.message || 'No se pudo completar la compra');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadCart]);

  const items = cart?.items ?? [];
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return {
    cart,
    items,
    total,
    loading,
    error,
    success,
    loadCart,
    addToCart,
    updateItem,
    removeItem,
    clearCart,
    checkout,
  };
};
