import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function ItemDetailContainer({ addToCart }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad de productos

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsLoading(true);
        const db = getFirestore();
        const itemDoc = await getDoc(doc(db, 'productos', id));
        if (itemDoc.exists()) {
          setItem({ id: itemDoc.id, ...itemDoc.data(), quantity }); // Incluir la cantidad en el estado del producto
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching item:', error);
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id, quantity]); // Agregar quantity como dependencia para refrescar cuando cambia

  const handleAddToCart = () => {
    if (item) {
      addToCart({ ...item, quantity }); // Pasar el objeto completo con la cantidad
      alert(`${item.name} fue añadido al carrito.`);
      setQuantity(1); // Reiniciar la cantidad después de agregar al carrito
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
  };

  if (isLoading) return <p>Cargando...</p>;
  if (!item) return <p>Item no encontrado.</p>;

  return (
    <div className="container mt-5 pt-3">
      <div className="row">
        <div className="col-md-6">
          <img src={item.image} className="img-fluid" alt={item.name} />
        </div>
        <div className="col-md-6">
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>Precio: ${item.price}</p>
          <div className="mb-3">
            <label className="form-label">Cantidad:</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              step="1"
            />
          </div>
          <button className="btn btn-primary" onClick={handleAddToCart}>Añadir al carrito</button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailContainer;
