import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import Item from './Item';

function ItemListContainer() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getFirestore();
      const productsCollection = collection(db, 'productos');
      let productsQuery = productsCollection;

      if (id === 'Cerdos' || id === 'Aves') {
        productsQuery = query(productsCollection, where('category', '==', id));
      }

      try {
        const querySnapshot = await getDocs(productsQuery);
        const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5 pt-3">
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <Item item={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;
