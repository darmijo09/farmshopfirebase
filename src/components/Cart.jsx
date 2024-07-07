import React from 'react';

function Cart({ cartItems, removeFromCart }) {
  const handleRemove = (item) => {
    removeFromCart(item);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart-container">
      <div className="cart">
        <div className="cart-header">
          <h2>Carrito de Compras</h2>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>El carrito está vacío.</p>
            </div>
          ) : (
            <div className="cart-grid">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} className="cart-item-img" alt={item.name} />
                  <div className="cart-item-details">
                    <h5>{item.name}</h5>
                    <p>${item.price}</p>
                    <button className="btn btn-danger" onClick={() => handleRemove(item)}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <hr />
          <h4>Total: ${cartTotal.toFixed(2)}</h4>
          <button className="btn btn-primary">Proceder al Pago</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
