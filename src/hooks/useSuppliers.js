// src/hooks/useSuppliers.js
import { useState, useEffect, useCallback } from "react";
import {
  getSuppliers,
  getSuppliersByCategory,
  getRelationshipStatus,
  getVendorRelationships,
} from "../services/firestore";
import { useAuth } from "../contexts/AuthContext";

export const useSuppliers = (category = null) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  const fetchSuppliers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getSuppliers();

      if (result.success) {
        let suppliersData = result.data;

        // If user is logged in, fetch their relationships
        if (currentUser) {
          const relationshipsResult = await getVendorRelationships(
            currentUser.uid
          );
          if (relationshipsResult.success) {
            // Create a map of supplier relationships
            const relationshipMap = relationshipsResult.data.reduce(
              (acc, rel) => {
                acc[rel.supplierId] = rel;
                return acc;
              },
              {}
            );

            // Add relationship data to suppliers
            suppliersData = suppliersData.map((supplier) => ({
              ...supplier,
              relationship: relationshipMap[supplier.id] || null,
            }));
          }
        }

        setSuppliers(suppliersData);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to fetch suppliers");
    } finally {
      setLoading(false);
    }
  }, [currentUser, category]);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  return { suppliers, loading, error, refetch: fetchSuppliers };
};
