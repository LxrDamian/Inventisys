import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePurchases } from '../hooks/usePurchases';
import { useAuth } from '../hooks/useAuth';

export const MisVentas = () => {
  const navigate = useNavigate();
  const { myPurchases, loading, error, loadMyPurchases } = usePurchases();
  const { logout, user } = useAuth();

  useEffect(() => {
    loadMyPurchases();
  }, [loadMyPurchases]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(amount);
  };

  const getTotalGastado = () => {
    return myPurchases.reduce((sum, purchase) => sum + (purchase.total || 0), 0);
  };

  return (
    <div>


      <div className="container mt-4">
        <h1 className="mb-4">Mis Compras</h1>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Resumen */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card bg-primary text-white">
              <div className="card-body">
                <h5 className="card-title">Total Compras</h5>
                <h2>{myPurchases.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">Total Gastado</h5>
                <h2>{formatCurrency(getTotalGastado())}</h2>
              </div>
            </div>
          </div>
        </div>

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
                  <th>Fecha</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unit.</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {myPurchases.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No has realizado compras aún
                    </td>
                  </tr>
                ) : (
                  myPurchases.map((purchase) => (
                    <tr key={purchase.id}>
                      <td>{formatDate(purchase.fechaHora)}</td>
                      <td>{purchase.productoNombre}</td>
                      <td>{purchase.cantidad}</td>
                      <td>{formatCurrency(purchase.precio)}</td>
                      <td className="fw-bold">{formatCurrency(purchase.total)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

