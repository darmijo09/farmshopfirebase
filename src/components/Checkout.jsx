import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { addDoc, Timestamp } from 'firebase/firestore';

function Checkout({ cartItems, setCartItems }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que se hayan completado todos los campos necesarios
    if (!name || !address || !email || cartItems.length === 0) {
      setError('Por favor, completa todos los campos y asegúrate de tener productos en el carrito.');
      return;
    }

    try {
      // Guardar la orden en Firestore
      const docRef = await addDoc(ordersCollection, {
        buyer: { name, address, email },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        date: Timestamp.fromDate(new Date()),
        status: 'pending'
      });

      // Limpiar el carrito después de completar la compra
      setCartItems([]);

      // Redirigir a la página de confirmación u otra página de éxito
      history.push('/confirmation');
    } catch (error) {
      console.error('Error al procesar la orden:', error);
      setError('Hubo un problema al procesar tu orden. Por favor, intenta nuevamente más tarde.');
    }
  };

  return (
    <div className="container mt-5 pt-3">
      <h1>Checkout</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
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
        <Link to="/cart" className="btn btn-secondary ms-2">Volver al Carrito</Link>
      </form>
    </div>
  );
}

export default Checkout;
