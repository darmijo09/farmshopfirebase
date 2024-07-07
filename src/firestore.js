import { firestore } from './firebase';

// Aquí puedes definir funciones para interactuar con Firestore, como guardar órdenes, consultar productos, etc.
import { firestore } from './firebase';

// Función para guardar una orden en Firestore
export const guardarOrden = async (orderData) => {
  try {
    const ordersRef = firestore.collection('orders');
    const docRef = await ordersRef.add(orderData);
    return docRef.id; // Retorna el ID del documento creado
  } catch (error) {
    console.error('Error al guardar la orden:', error);
    throw new Error('No se pudo guardar la orden');
  }
};

// Función para consultar productos
export const consultarProductos = async () => {
  try {
    const productsRef = firestore.collection('products');
    const snapshot = await productsRef.get();
    if (snapshot.empty) {
      console.log('No hay productos disponibles.');
      return [];
    }
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return products;
  } catch (error) {
    console.error('Error al consultar productos:', error);
    throw new Error('No se pudo obtener la lista de productos');
  }
};

// Otras funciones necesarias según las operaciones que necesites realizar con Firestore
