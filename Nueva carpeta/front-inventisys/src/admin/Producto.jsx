import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { usePurchases } from '../hooks/usePurchases';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export const Producto = () => {

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { hasRole } = useAuth();  // ⬅️ IMPORTANTE

  const { createPurchase } = usePurchases();
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [productToBuy, setProductToBuy] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(1);

  const handleBuy = (product) => {
    setProductToBuy(product);
    setBuyQuantity(1);
    setShowBuyModal(true);
  };

  const handleConfirmBuy = async () => {
    try {
      await createPurchase(productToBuy.id, buyQuantity);
      setShowBuyModal(false);
      loadProducts();
    } catch (err) {}
  };

  const {
    products,
    loading,
    error,
    success,
    createProduct,
    updateProduct,
    deleteProduct
  } = useProducts();

  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    cantidad: 0,
    precio: 0
  });

  const handleCreate = () => {
    setCurrentProduct(null);
    setFormData({ nombre: '', cantidad: 0, precio: 0 });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      nombre: product.nombre,
      cantidad: product.cantidad,
      precio: product.precio
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      await deleteProduct(id);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cantidad' ? parseInt(value) || 0 :
        name === 'precio' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentProduct) {
        await updateProduct(currentProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      setShowModal(false);
    } catch (err) {}
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">InventiSys - Gestión de Productos</h1>

      {/* SOLO USER VE EL CARRITO */}
      {hasRole("USER") && (
        <button
          className="btn btn-warning mb-3"
          onClick={() => navigate('/carrito')}
        >
          <i className="bi bi-cart"></i> Ver carrito
        </button>
      )}

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {success}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}

      {/* SOLO ADMIN VE "NUEVO PRODUCTO" */}
      {hasRole("ADMIN") && (
        <button className="btn btn-success mx-4 mb-3" onClick={handleCreate}>
          <i className="bi bi-plus-circle"></i> Nuevo Producto
        </button>
      )}

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      {!loading && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">No hay productos registrados</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.nombre}</td>
                    <td>{product.cantidad}</td>
                    <td>${product.precio.toFixed(2)}</td>
                    <td>

                      {/* USER puede Añadir al carrito */}
                      {hasRole("USER") && (
                        <>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => addToCart(product.id, 1)}
                          >
                            <i className="bi bi-cart-plus"></i> Añadir al carrito
                          </button>

                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleBuy(product)}
                          >
                            <i className="bi bi-cart-plus"></i> Comprar
                          </button>
                        </>
                      )}

                      {/* ADMIN puede Editar y Borrar */}
                      {hasRole("ADMIN") && (
                        <>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleEdit(product)}
                          >
                            Editar <i className="bi bi-pencil-fill"></i>
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(product.id)}
                          >
                            Borrar <i className="bi bi-trash-fill"></i>
                          </button>
                        </>
                      )}

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODALES SIGUEN IGUAL */}
      {/* ... */}
      
    </div>
  );
};
