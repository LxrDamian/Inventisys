import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/products');
      setProducts(response.data);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/products/${id}`);
      return response.data;
    } catch (err) {
      setError('Error al obtener el producto');
      console.error('Error getting product:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (product) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/api/products', product);
      setProducts(prev => [...prev, response.data]);
      setSuccess('Producto creado correctamente');
      setTimeout(() => setSuccess(''), 3000);
      return response.data;
    } catch (err) {
      setError('Error al crear el producto');
      console.error('Error creating product:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id, product) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/api/products/${id}`, product);
      setProducts(prev => 
        prev.map(p => p.id === id ? response.data : p)
      );
      setSuccess('Producto actualizado correctamente');
      setTimeout(() => setSuccess(''), 3000);
      return response.data;
    } catch (err) {
      setError('Error al actualizar el producto');
      console.error('Error updating product:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/api/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
      setSuccess('Producto eliminado correctamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al eliminar el producto');
      console.error('Error deleting product:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    success,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: loadProducts
  };
};
