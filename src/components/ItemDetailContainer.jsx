import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../firebase';

function ItemDetailContainer({ addToCart }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsLoading(true);
        const doc = await firestore.collection('products').doc(id).get();
        if (doc.exists) {
          setItem({ id: doc.id, ...doc.data() });
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching item:', error);
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = () => {
    if (item) {
      addToCart(item);
      alert(`${item.name} fue añadido al carrito.`);
    }
  };

  if (isLoading) return <p>Loading...</p>;
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
          <button className="btn btn-primary" onClick={handleAddToCart}>Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailContainer;
