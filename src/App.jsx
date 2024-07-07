import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import { consultarProductos } from './firebase';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await consultarProductos();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const addToCart = (item) => {
    setCartItems([...cartItems, { ...item, id: cartItems.length + 1, price: item.price }]);
  };

  const removeFromCart = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ItemListContainer products={products} />} />
        <Route path="/category/:id" element={<ItemListContainer products={products} />} />
        <Route path="/item/:id" element={<ItemDetailContainer addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
}

export default App;
