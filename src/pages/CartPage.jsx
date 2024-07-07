import React, { useContext } from 'react';
import Cart from '../components/Cart';
import { CartContext } from '../context/CartContext';

function CartPage() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="container mt-5">
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
}

export default CartPage;
