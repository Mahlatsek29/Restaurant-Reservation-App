// firebase config key setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCghmAv6CaxAVx6e_lVmjU9QkczaWpjVAo",
    authDomain: "restaurant-ddb93.firebaseapp.com",
    projectId: "restaurant-ddb93",
    storageBucket: "restaurant-ddb93.appspot.com",
    messagingSenderId: "287520520680",
    appId: "1:287520520680:web:c022fe2eb295e44d9e0c5d",
    measurementId: "G-NGQ8CHT6WB"
  }

  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export {firebase};