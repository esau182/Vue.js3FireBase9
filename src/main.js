// Importaciones principales
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Importaciones de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Nueva configuración de Firebase (la que te proporcionó Firebase recientemente)
const firebaseConfig = {
  apiKey: "AIzaSyDVkWJmuG-W7GLLN8IOQi-S5W-N-qyVsTs",
  authDomain: "autenticacion-7082f.firebaseapp.com",
  projectId: "autenticacion-7082f",
  storageBucket: "autenticacion-7082f.appspot.com",
  messagingSenderId: "1080793567491",
  appId: "1:1080793567491:web:db1b12ace2af24da5d1936",
  measurementId: "G-211RSVCKNT"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicializamos Firestore
export { db };

// Inicializa Analytics si es necesario
const analytics = getAnalytics(app);

// Configuración de autenticación de Firebase
const auth = getAuth(app); // Nos aseguramos de que `auth` está ligado a nuestra instancia `app`

// Verificamos el estado de autenticación y actualizamos el store
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
    const usuarioActivo = {
      email: user.email,
      uid: user.uid
    };
    store.dispatch('detectarUsuario', usuarioActivo);
    console.log(usuarioActivo);
  } else {
    console.log(user);
    store.dispatch('detectarUsuario', null);
  }
});

// Montamos la aplicación de Vue
createApp(App)
  .use(store)
  .use(router)
  .mount('#app');



