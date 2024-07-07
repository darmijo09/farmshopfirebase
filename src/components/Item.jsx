import React from 'react';
import { Link } from 'react-router-dom';

function Item({ item }) {
  return (
    <div className="card">
      <img src={item.image} className="card-img-top" alt={item.name} />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>
        <Link to={`/item/${item.id}`} className="btn btn-primary">Ver detalle</Link>
      </div>
    </div>
  );
}

export default Item;
