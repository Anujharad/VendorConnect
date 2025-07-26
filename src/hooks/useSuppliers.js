// src/hooks/useSuppliers.js
import { useState, useEffect } from 'react';
import { getSuppliers, getSuppliersByCategory } from '../services/firestore';

export const useSuppliers = (category = null) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let result;
        if (category) {
          result = await getSuppliersByCategory(category);
        } else {
          result = await getSuppliers();
        }
        
        if (result.success) {
          setSuppliers(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Failed to fetch suppliers');
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [category]);

  return { suppliers, loading, error, refetch: () => fetchSuppliers() };
};