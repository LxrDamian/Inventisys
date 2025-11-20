import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const NavBar = () => {
  const navigate = useNavigate();
  const { logout, user, hasRole } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const goInicio = () => navigate('/inicio');
  const goProductos = () => navigate('/producto');
  const goUsuarios = () => navigate('/usuarios');
  const goDashboard = () => navigate('/dashboard');
  const goVentas = () => navigate('/ventas');
  const goMisCompras = () => navigate('/mis-compras');
  const goCart = () => navigate('/carrito');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        <span className="navbar-brand">InventiSys</span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Menú a la izquierda */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* Siempre puede ir a inicio */}
            <li className="nav-item">
              <button className="btn btn-link nav-link text-white" onClick={goInicio}>
                <i className="bi bi-house-door"></i> Inicio
              </button>
            </li>

            {/* Ambos ADMIN y USER pueden ver Productos */}
            <li className="nav-item">
              <button className="btn btn-link nav-link text-white" onClick={goProductos}>
                <i className="bi bi-box-seam"></i> Productos
              </button>
            </li>

            {/* SOLO ADMIN: Dashboard */}
            {hasRole('ADMIN') && (
              <li className="nav-item">
                <button className="btn btn-link nav-link text-white" onClick={goDashboard}>
                  <i className="bi bi-speedometer2"></i> Dashboard
                </button>
              </li>
            )}

            {/* SOLO ADMIN: Usuarios */}
            {hasRole('ADMIN') && (
              <li className="nav-item">
                <button className="btn btn-link nav-link text-white" onClick={goUsuarios}>
                  <i className="bi bi-people"></i> Usuarios
                </button>
              </li>
            )}

            {/* SOLO ADMIN: Ventas */}
            {hasRole('ADMIN') && (
              <li className="nav-item">
                <button className="btn btn-link nav-link text-white" onClick={goVentas}>
                  <i className="bi bi-receipt"></i> Ventas
                </button>
              </li>
            )}

            {/* SOLO USER: Mis Compras */}
            {hasRole('USER') && !hasRole('ADMIN') && (
              <li className="nav-item">
                <button className="btn btn-link nav-link text-white" onClick={goMisCompras}>
                  <i className="bi bi-bag-check"></i> Mis compras
                </button>
              </li>
            )}

            {/* SOLO USER: Carrito */}
            {hasRole('USER') && !hasRole('ADMIN') && (
              <li className="nav-item">
                <button className="btn btn-link nav-link text-white" onClick={goCart}>
                  <i className="bi bi-cart"></i> Carrito
                </button>
              </li>
            )}

          </ul>

          {/* Info usuario + Logout a la derecha */}
          <div className="d-flex align-items-center gap-3">
            <span className="nav-link text-white mb-0">
              <i className="bi bi-person-circle"></i> {user?.nombre}
            </span>

            <button
              className="btn btn-danger btn-sm"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
