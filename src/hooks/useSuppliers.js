// src/hooks/useSuppliers.js
import { useState, useEffect } from 'react';
import { getSuppliers } from '../services/firestore';

export const useSuppliers = (filters = {}) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        setError(null);
        const suppliersData = await getSuppliers(filters);
        setSuppliers(suppliersData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching suppliers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [filters.category, filters.city, filters.rating]);

  return { suppliers, loading, error, refetch: () => fetchSuppliers() };
};