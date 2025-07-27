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
  limit,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// Get all suppliers
export const getSuppliers = async () => {
  try {
    const suppliersRef = collection(db, "suppliers");
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
    const suppliersRef = collection(db, "suppliers");
    const q = query(suppliersRef, where("category", "==", category));
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
    const docRef = doc(db, "suppliers", supplierId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: "Supplier not found" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Add supplier to favorites
export const addToFavorites = async (userId, supplierId) => {
  try {
    const userRef = doc(db, "users", userId);
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
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const favorites = userData.favorites || [];
      const updatedFavorites = favorites.filter((id) => id !== supplierId);

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
    const userRef = doc(db, "users", userId);
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

// Update loyalty status
export const updateLoyaltyStatus = async (vendorId, supplierId) => {
  try {
    const relationshipRef = doc(
      db,
      "relationships",
      `${vendorId}_${supplierId}`
    );
    const relationshipDoc = await getDoc(relationshipRef);

    if (relationshipDoc.exists()) {
      const data = relationshipDoc.data();
      const startDate = data.startDate.toDate();
      const years = (new Date() - startDate) / (1000 * 60 * 60 * 24 * 365);

      let newBadge;
      if (years >= 10) newBadge = "LEGENDARY";
      else if (years >= 5) newBadge = "ELITE";
      else if (years >= 2) newBadge = "LOYAL";
      else if (years >= 1) newBadge = "REGULAR";
      else newBadge = "NEWCOMER";

      await updateDoc(relationshipRef, { loyaltyBadge: newBadge });
      return { success: true, data: newBadge };
    }

    return { success: false, error: "Relationship not found" };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Create or update vendor-supplier relationship
export const createRelationship = async (vendorId, supplierId) => {
  try {
    const relationshipRef = doc(db, "relationships", `${vendorId}_${supplierId}`);
    const relationshipDoc = await getDoc(relationshipRef);

    if (!relationshipDoc.exists()) {
      await setDoc(relationshipRef, {
        vendorId,
        supplierId,
        startDate: new Date(),
        loyaltyBadge: "NEWCOMER",
        totalOrders: 0,
        totalSpent: 0,
        lastOrderDate: null,
      });
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get relationship status
export const getRelationshipStatus = async (vendorId, supplierId) => {
  try {
    const relationshipRef = doc(db, "relationships", `${vendorId}_${supplierId}`);
    const relationshipDoc = await getDoc(relationshipRef);

    if (relationshipDoc.exists()) {
      return { success: true, data: relationshipDoc.data() };
    }

    return { success: false, error: "Relationship not found" };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update relationship metrics after order
export const updateRelationshipMetrics = async (vendorId, supplierId, orderAmount) => {
  try {
    const relationshipRef = doc(db, "relationships", `${vendorId}_${supplierId}`);
    const relationshipDoc = await getDoc(relationshipRef);

    if (relationshipDoc.exists()) {
      const data = relationshipDoc.data();
      await updateDoc(relationshipRef, {
        totalOrders: (data.totalOrders || 0) + 1,
        totalSpent: (data.totalSpent || 0) + orderAmount,
        lastOrderDate: new Date(),
      });

      // Update loyalty badge based on new metrics
      await updateLoyaltyStatus(vendorId, supplierId);
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
