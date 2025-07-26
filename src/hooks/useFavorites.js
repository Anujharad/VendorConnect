// src/hooks/useFavorites.js
import { useState, useEffect, useCallback } from 'react';
import { addToFavorites, removeFromFavorites, getFavoriteSuppliers } from '../services/firestore';
import { useAuth } from '../contexts/AuthContext';

export const useFavorites = () => {
  const { currentUser, userProfile } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check if a supplier is in favorites
  const isFavorite = useCallback((supplierId) => {
    return userProfile?.favorites?.includes(supplierId) || false;
  }, [userProfile?.favorites]);

  // Toggle favorite status
  const toggleFavorite = async (supplierId) => {
    if (!currentUser) return;

    try {
      setLoading(true);
      
      if (isFavorite(supplierId)) {
        await removeFromFavorites(currentUser.uid, supplierId);
      } else {
        await addToFavorites(currentUser.uid, supplierId);
      }
      
      // The userProfile will be updated through the AuthContext
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get all favorite suppliers
  const fetchFavorites = useCallback(async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      const favoriteSuppliers = await getFavoriteSuppliers(currentUser.uid);
      setFavorites(favoriteSuppliers);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    loading,
    refetch: fetchFavorites
  };
};