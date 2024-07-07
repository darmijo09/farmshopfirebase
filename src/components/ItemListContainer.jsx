import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from './Item';

function ItemListContainer({ products }) {
  const { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (id) {
      setItems(products.filter(product => product.category === id));
    } else {
      setItems(products);
    }
  }, [id, products]);

  return (
    <div className="container mt-5 pt-3">
      <h1>{id ? id : 'Todos los productos'}</h1>
      <div className="row">
        {items.map(item => (
          <div className="col-md-4" key={item.id}>
            <Item item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;
