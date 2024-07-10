import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const productosCollection = collection(db, 'productos');

    getDocs(productosCollection)
      .then((snapshot) => {
        setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  return { products, loading };
};
