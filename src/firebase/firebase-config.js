import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCC4nuPYrQKSWUlYymOSGpnoLBoTSysQiM",
  authDomain: "react-app-cursos-ebed6.firebaseapp.com",
  projectId: "react-app-cursos-ebed6",
  storageBucket: "react-app-cursos-ebed6.appspot.com",
  messagingSenderId: "1094954860167",
  appId: "1:1094954860167:web:c43d5c0a7517bb339f0222"
};

initializeApp(firebaseConfig);

const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider
}