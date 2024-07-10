import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (itemToAdd) => {
    // Verificar si el producto ya está en el carrito
    const existingItem = cartItems.find(item => item.id === itemToAdd.id);

    if (existingItem) {
      // Si existe, actualizar la cantidad
      const updatedCart = cartItems.map(item =>
        item.id === itemToAdd.id ? { ...item, quantity: item.quantity + itemToAdd.quantity } : item
      );
      setCartItems(updatedCart);
    } else {
      // Si no existe, agregarlo al carrito
      setCartItems([...cartItems, itemToAdd]);
    }
  };

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemToRemove.id);
    setCartItems(updatedCart);
  };

  const updateQuantity = (itemToUpdate, newQuantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === itemToUpdate.id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:id" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
      </Routes>
    </Router>
  );
}

export default App;
