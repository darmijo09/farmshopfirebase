import React, { useState } from 'react';
import { agregarOrden } from '../utils/firebaseFunctions'; // Ajusta la ruta según la estructura de tu proyecto

function CheckoutForm({ cartItems }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      buyer: {
        name: name,
        address: address,
        email: email
      },
      items: cartItems
    };

    try {
      const orderId = await agregarOrden(orderData);
      console.log('Orden creada con ID: ', orderId);
      // Lógica adicional después de crear la orden, como limpiar el carrito o redirigir a una página de confirmación
    } catch (error) {
      console.error('Error al procesar la orden: ', error);
      // Manejo de errores según tu lógica de aplicación
    }
  };

  return (
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
    </form>
  );
}

export default CheckoutForm;
