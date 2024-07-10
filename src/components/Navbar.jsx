import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import animalfeedlogo from '../assets/animalfeedlogo.jpeg'; 

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={animalfeedlogo} alt="Logo" height="40" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/category/Cerdos">
                Cerdos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/Aves">
                Aves
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} /> Carrito
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
