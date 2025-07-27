import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [comparedSuppliers, setComparedSuppliers] = useState([]);
  const { currentUser } = useAuth();

  const addToCompare = (supplier) => {
    if (comparedSuppliers.length >= 4) {
      throw new Error("Cannot compare more than 4 suppliers");
    }
    if (!comparedSuppliers.find((s) => s.id === supplier.id)) {
      setComparedSuppliers([...comparedSuppliers, supplier]);
    }
  };

  const removeFromCompare = (supplierId) => {
    setComparedSuppliers((prev) => prev.filter((s) => s.id !== supplierId));
  };

  const clearCompare = () => {
    setComparedSuppliers([]);
  };

  return (
    <CompareContext.Provider
      value={{
        comparedSuppliers,
        addToCompare,
        removeFromCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
