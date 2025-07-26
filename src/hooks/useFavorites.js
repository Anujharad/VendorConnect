// src/hooks/useFavorites.js
import { useState, useEffect } from 'react';
import { getUserFavorites, addToFavorites, removeFromFavorites } from '../services/firestore';
import { useAuth } from '../contexts/AuthContext';

export const useFavorites = () => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetchFavorites();
    }
  }, [currentUser]);

  const fetchFavorites = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const result = await getUserFavorites(currentUser.uid);
      if (result.success) {
        setFavorites(result.data);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (supplierId) => {
    if (!currentUser) return;

    try {
      if (favorites.includes(supplierId)) {
        await removeFromFavorites(currentUser.uid, supplierId);
        setFavorites(prev => prev.filter(id => id !== supplierId));
      } else {
        await addToFavorites(currentUser.uid, supplierId);
        setFavorites(prev => [...prev, supplierId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const isFavorite = (supplierId) => {
    return favorites.includes(supplierId);
  };

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
    refetch: fetchFavorites
  };
};