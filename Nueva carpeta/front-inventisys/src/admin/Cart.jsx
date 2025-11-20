import { useCart } from '../hooks/useCart';

export const Cart = () => {
  const {
    items,
    total,
    loading,
    error,
    success,
    updateItem,
    removeItem,
    clearCart,
    checkout,
  } = useCart();

  const handleChangeQty = (productId, newQty) => {
    const qty = parseInt(newQty, 10);
    if (isNaN(qty) || qty <= 0) return;
    updateItem(productId, qty);
  };

  const handleCheckout = async () => {
    try {
      await checkout();
      alert('Compra realizada correctamente');
    } catch {
      // el hook ya maneja el error
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Mi carrito</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}

      {loading && <p>Cargando...</p>}

      {items.length === 0 && !loading ? (
        <div className="alert alert-info">Tu carrito está vacío</div>
      ) : null}

      {items.length > 0 && (
        <>
          <div className="table-responsive mb-3">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.productId}>
                    <td>{item.productName}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td style={{ maxWidth: 120 }}>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleChangeQty(item.productId, e.target.value)
                        }
                      />
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeItem(item.productId)}
                      >
                        <i className="bi bi-trash"></i> Quitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <button
              className="btn btn-outline-danger"
              onClick={clearCart}
            >
              <i className="bi bi-trash3"></i> Vaciar carrito
            </button>

            <h4>Total: ${total.toFixed(2)}</h4>

            <button
              className="btn btn-primary"
              onClick={handleCheckout}
            >
              <i className="bi bi-credit-card"></i> Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};
