// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/firestore';

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
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
