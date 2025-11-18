import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePurchases } from '../hooks/usePurchases';
import { useAuth } from '../hooks/useAuth';

export const Ventas = () => {
  const navigate = useNavigate();
  const { purchases, loading, error, success, loadAllPurchases } = usePurchases();
  const { logout, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPurchases, setFilteredPurchases] = useState([]);

  useEffect(() => {
    loadAllPurchases();
  }, [loadAllPurchases]);

  useEffect(() => {
    if (purchases) {
      const filtered = purchases.filter(purchase =>
        purchase.nombreCliente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.correoCliente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.productoNombre?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPurchases(filtered);
    }
  }, [purchases, searchTerm]);

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

  const getTotalVentas = () => {
    return filteredPurchases.reduce((sum, purchase) => sum + (purchase.total || 0), 0);
  };

  return (
    <div>
 

      <div className="container mt-4">
        <h1 className="mb-4">Gestión de Ventas</h1>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
          </div>
        )}
        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {success}
            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
          </div>
        )}

        {/* Estadísticas */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card bg-primary text-white">
              <div className="card-body">
                <h5 className="card-title">Total Ventas</h5>
                <h2>{filteredPurchases.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">Total Ingresos</h5>
                <h2>{formatCurrency(getTotalVentas())}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-info text-white">
              <div className="card-body">
                <h5 className="card-title">Productos Vendidos</h5>
                <h2>{filteredPurchases.reduce((sum, p) => sum + (p.cantidad || 0), 0)}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Búsqueda */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por cliente, correo o producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                  <th>Cliente</th>
                  <th>Correo</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unit.</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredPurchases.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No hay ventas registradas
                    </td>
                  </tr>
                ) : (
                  filteredPurchases.map((purchase) => (
                    <tr key={purchase.id}>
                      <td>{formatDate(purchase.fechaHora)}</td>
                      <td>{purchase.nombreCliente}</td>
                      <td>{purchase.correoCliente}</td>
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

