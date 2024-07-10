import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Cart({ cartItems, removeFromCart, updateQuantity, checkout }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleQuantityChange = (item, newQuantity) => {
    updateQuantity(item, newQuantity);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !address || !email || cartItems.length === 0) {
      setError('Por favor, completa todos los campos y asegúrate de tener productos en el carrito.');
      return;
    }

    try {
      await checkout({ name, address, email });
      setShowCheckout(false); // Ocultar formulario después de enviar
    } catch (error) {
      console.error('Error al procesar la orden:', error);
      setError('Hubo un problema al procesar tu orden. Por favor, intenta nuevamente más tarde.');
    }
  };

  return (
    <div className="container mt-5 pt-3">
      <h1>Carrito de Compras</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="list-group">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <span>{item.name}</span>
                  <div className="input-group input-group-sm mt-2" style={{ maxWidth: '120px' }}>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="input-group-text">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span> {/* Precio subtotal */}
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => removeFromCart(item)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="mt-3">Total: ${totalPrice.toFixed(2)}</h2> {/* Mostrar el total con dos decimales */}
          {!showCheckout ? (
            <button className="btn btn-success mt-3" onClick={() => setShowCheckout(true)}>Proceder al Checkout</button>
          ) : (
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary">Finalizar Compra</button>
              <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowCheckout(false)}>Cancelar</button>
            </form>
          )}
          <Link to="/" className="btn btn-secondary mt-3 ms-2">Seguir Comprando</Link>
        </>
      )}
    </div>
  );
}

export default Cart;
