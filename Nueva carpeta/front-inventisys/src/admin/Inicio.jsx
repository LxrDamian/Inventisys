import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Inicio = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div>


            <div className="container mt-4">
                <h1 className="text-center mb-4">Bienvenido a InventiSys</h1>

                <div className="row mt-5">
                    <div className="col-md-6 mb-4">
                        <div className="card shadow h-100">
                            <div className="card-body text-center">
                                <i className="bi bi-box-seam display-1 text-primary"></i>
                                <h3 className="card-title mt-3">Productos</h3>
                                <p className="card-text">Gestiona tu inventario de productos</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate('/producto')}
                                >
                                    Ir a Productos
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="card shadow h-100">
                            <div className="card-body text-center">
                                <i className="bi bi-people display-1 text-success"></i>
                                <h3 className="card-title mt-3">Usuarios</h3>
                                <p className="card-text">Administra los usuarios del sistema</p>
                                <button
                                    className="btn btn-success"
                                    onClick={() => navigate('/usuarios')}
                                >
                                    Ir a Usuarios
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card shadow h-100">
                            <div className="card-body text-center">
                                <i className="bi bi-people display-1 text-success"></i>
                                <h3 className="card-title mt-3">Dashboard</h3>
                                <p className="card-text">Mira las estadísticas del negocio</p>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => navigate('/dashboard')}
                                >
                                    Ir a Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card shadow h-100">
                            <div className="card-body text-center">
                                <i className="bi bi-people display-1 text-success"></i>
                                <h3 className="card-title mt-3">Ventas</h3>
                                <p className="card-text">Mira las estadísticas del negocio</p>
                                <button
                                    className="btn btn-info"
                                    onClick={() => navigate('/ventas')}
                                >
                                    Ir a Ventas
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-6 mb-4">
                        <div className="card shadow h-100">
                            <div className="card-body text-center">
                                <i className="bi bi-bag-check display-1 text-info"></i>
                                <h3 className="card-title mt-3">Mis Compras</h3>
                                <p className="card-text">Revisa tu historial de compras</p>
                                <button
                                    className="btn btn-info"
                                    onClick={() => navigate('/mis-compras')}
                                >
                                    Ver Mis Compras
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>



        </div>
    );
};


