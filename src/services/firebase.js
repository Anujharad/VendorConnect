// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBjR9GPKS1HedpoRQavl2pYJ1jvkyllYmc",
  authDomain: "vendor-supplier-platform.firebaseapp.com",
  projectId: "vendor-supplier-platform",
  storageBucket: "vendor-supplier-platform.firebasestorage.app",
  messagingSenderId: "966467897196",
  appId: "1:966467897196:web:0cb0712733591db862d549"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;