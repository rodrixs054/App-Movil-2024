//--------------------Instalamos firebase ------------------------------
//-------------------------Importamos firebase--------------------------
// import firebase from "firebase/app"

// var firebaseConfig = {
//     apiKey: "AIzaSyAE7-Nveohu5Gq0wUu0vJdPLhSUAjG8XDs",
//     authDomain: "proyectofinal-moviles-app.firebaseapp.com",
//     projectId: "proyectofinal-moviles-app",
//     storageBucket: "proyectofinal-moviles-app.appspot.com",
//     messagingSenderId: "416264041018",
//     appId: "1:416264041018:web:263029c3199961168b7b03"
//   };
//   // Initialize Firebase
// export default firebase.initializeApp(firebaseConfig);

// Importa las funciones necesarias de la versión modular de Firebase
import { initializeApp } from "firebase/app";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAE7-Nveohu5Gq0wUu0vJdPLhSUAjG8XDs",
    authDomain: "proyectofinal-moviles-app.firebaseapp.com",
    projectId: "proyectofinal-moviles-app",
    storageBucket: "proyectofinal-moviles-app.appspot.com",
    messagingSenderId: "416264041018",
    appId: "1:416264041018:web:263029c3199961168b7b03"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta la instancia de la app
export default app;