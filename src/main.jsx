import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { initializeApp } from 'firebase/app';
import 'firebase/analytics'; // Importa el módulo de Analytics si lo estás utilizando
import 'bootstrap/dist/css/bootstrap.min.css';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC7mViK8v3CaAA2zfgE0Wp-fkl1VChLY8",
  authDomain: "farmshop-9ab3a.firebaseapp.com",
  databaseURL: "https://farmshop-9ab3a-default-rtdb.firebaseio.com",
  projectId: "farmshop-9ab3a",
  storageBucket: "farmshop-9ab3a.appspot.com",
  messagingSenderId: "731917345540",
  appId: "1:731917345540:web:51a50cc37df6838b596651",
  measurementId: "G-499RQT9991"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
