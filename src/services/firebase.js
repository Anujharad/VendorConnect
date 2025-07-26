// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace with your Firebase config from Project Settings
const firebaseConfig = {
  apiKey: "AIzaSyAS1vUJTvKb4quTfxKJ6eUEnyJL4oFlaP8",
  authDomain: "vendor-supplier-platform-99365.firebaseapp.com",
  projectId: "vendor-supplier-platform-99365",
  storageBucket: "vendor-supplier-platform-99365.firebasestorage.app",
  messagingSenderId: "999452203611",
  appId: "1:999452203611:web:3d2b734dbe84bc6e9c3d7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;