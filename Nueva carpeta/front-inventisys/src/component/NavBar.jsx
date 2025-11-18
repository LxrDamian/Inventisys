import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const NavBar = () => {
    const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const Inicio = () => {
    
    navigate('/inicio');
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">InventiSys</span>
          <div className="navbar-nav ms-auto gap-3">
            <span className="nav-link text-white">
              <i className="bi bi-person-circle"></i> {user?.nombre}
            </span>
            <button 
              className="btn btn-success btn-sm"
              onClick={Inicio}
            >
              <i className="bi bi-box-arrow-right"></i> Inicio
            </button>
            
            <button 
              className="btn btn-danger btn-sm"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
            </button>

          </div>
        </div>
      </nav>
      </div>
  )
}
