// src/services/firestore.js
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from './firebase';

// User Profile Functions
export const createUserProfile = async (userId, userData) => {
  try {
    await setDoc(doc(db, 'users', userId), userData);
    return userData;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

// Supplier Functions
export const getSuppliers = async (filters = {}) => {
  try {
    let q = collection(db, 'suppliers');
    
    // Apply filters
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    
    if (filters.city) {
      q = query(q, where('address.city', '==', filters.city));
    }
    
    // Add ordering
    q = query(q, orderBy('rating', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const suppliers = [];
    
    querySnapshot.forEach((doc) => {
      suppliers.push({ id: doc.id, ...doc.data() });
    });
    
    return suppliers;
  } catch (error) {
    console.error('Error getting suppliers:', error);
    throw error;
  }
};

export const getSupplierById = async (supplierId) => {
  try {
    const docRef = doc(db, 'suppliers', supplierId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting supplier:', error);
    throw error;
  }
};

// Favorites Functions
export const addToFavorites = async (userId, supplierId) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      favorites: arrayUnion(supplierId)
    });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

export const removeFromFavorites = async (userId, supplierId) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      favorites: arrayRemove(supplierId)
    });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

// Get user's favorite suppliers
export const getFavoriteSuppliers = async (userId) => {
  try {
    const userProfile = await getUserProfile(userId);
    if (!userProfile?.favorites) return [];
    
    const favoriteSuppliers = [];
    for (const supplierId of userProfile.favorites) {
      const supplier = await getSupplierById(supplierId);
      if (supplier) {
        favoriteSuppliers.push(supplier);
      }
    }
    
    return favoriteSuppliers;
  } catch (error) {
    console.error('Error getting favorite suppliers:', error);
    throw error;
  }
};