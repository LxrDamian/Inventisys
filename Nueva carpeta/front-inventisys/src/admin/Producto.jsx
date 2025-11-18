import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { usePurchases } from '../hooks/usePurchases';

export const Producto = () => {

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
    } catch (err) {
    }
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

  // Abrir modal para crear
  const handleCreate = () => {
    setCurrentProduct(null);
    setFormData({ nombre: '', cantidad: 0, precio: 0 });
    setShowModal(true);
  };

  // Abrir modal para editar
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      nombre: product.nombre,
      cantidad: product.cantidad,
      precio: product.precio
    });
    setShowModal(true);
  };

  // Eliminar con confirmación
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      await deleteProduct(id);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cantidad' ? parseInt(value) || 0 :
        name === 'precio' ? parseFloat(value) || 0 : value
    }));
  };

  // Guardar producto (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentProduct) {
        await updateProduct(currentProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      setShowModal(false);
    } catch (err) {
      // Error manejado por el hook
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">InventiSys - Gestión de Productos</h1>

      {/* Alertas */}
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

      {/* Botón crear */}
      <button className="btn btn-success mb-3" onClick={handleCreate}>
        <i className="bi bi-plus-circle"></i> Nuevo Producto
      </button>

      {/* Loading spinner */}
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      {/* Tabla de productos */}
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
                  <td colSpan="4" className="text-center">
                    No hay productos registrados
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.nombre}</td>
                    <td>{product.cantidad}</td>
                    <td>${product.precio.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleBuy(product)}
                      >
                        <i className="bi bi-cart-plus"></i> Comprar
                      </button>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(product)}
                      >Editar
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product.id)}
                      >Borrar
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {showBuyModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Comprar Producto</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowBuyModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <h6>{productToBuy?.nombre}</h6>
                <p>Precio: ${productToBuy?.precio?.toFixed(2)}</p>
                <p>Disponible: {productToBuy?.cantidad}</p>

                <div className="mb-3">
                  <label className="form-label">Cantidad</label>
                  <input
                    type="number"
                    className="form-control"
                    value={buyQuantity}
                    onChange={(e) => setBuyQuantity(parseInt(e.target.value) || 1)}
                    min="1"
                    max={productToBuy?.cantidad}
                  />
                </div>

                <h5>Total: ${(productToBuy?.precio * buyQuantity).toFixed(2)}</h5>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowBuyModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleConfirmBuy}
                >
                  Confirmar Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de formulario */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleSubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {currentProduct ? 'Editar Producto' : 'Nuevo Producto'}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Nombre del producto"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Cantidad</label>
                      <input
                        type="number"
                        className="form-control"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleChange}
                        placeholder="Cantidad en inventario"
                        required
                        min="0"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Precio</label>
                      <input
                        type="number"
                        className="form-control"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        placeholder="Precio del producto"
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

