// src/services/firestore.js
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from './firebase';

// Get all suppliers
export const getSuppliers = async () => {
  try {
    const suppliersRef = collection(db, 'suppliers');
    const snapshot = await getDocs(suppliersRef);
    const suppliers = [];
    
    snapshot.forEach((doc) => {
      suppliers.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: suppliers };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get suppliers by category
export const getSuppliersByCategory = async (category) => {
  try {
    const suppliersRef = collection(db, 'suppliers');
    const q = query(suppliersRef, where('category', '==', category));
    const snapshot = await getDocs(q);
    const suppliers = [];
    
    snapshot.forEach((doc) => {
      suppliers.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: suppliers };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get single supplier
export const getSupplier = async (supplierId) => {
  try {
    const docRef = doc(db, 'suppliers', supplierId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: 'Supplier not found' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Add supplier to favorites
export const addToFavorites = async (userId, supplierId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const favorites = userData.favorites || [];
      
      if (!favorites.includes(supplierId)) {
        favorites.push(supplierId);
        await updateDoc(userRef, { favorites });
      }
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Remove from favorites
export const removeFromFavorites = async (userId, supplierId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const favorites = userData.favorites || [];
      const updatedFavorites = favorites.filter(id => id !== supplierId);
      
      await updateDoc(userRef, { favorites: updatedFavorites });
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get user favorites
export const getUserFavorites = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return { success: true, data: userData.favorites || [] };
    }
    
    return { success: true, data: [] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};