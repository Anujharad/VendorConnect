import React from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
import { useCompare } from "../../contexts/CompareContext";

const CompareBar = () => {
  const { comparedSuppliers, removeFromCompare } = useCompare();

  if (comparedSuppliers.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              {comparedSuppliers.length} supplier
              {comparedSuppliers.length !== 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center space-x-2">
              {comparedSuppliers.map((supplier) => (
                <div
                  key={supplier.id}
                  className="bg-gray-100 rounded-lg px-3 py-2 flex items-center space-x-2"
                >
                  <span className="text-sm font-medium">
                    {supplier.businessName}
                  </span>
                  <button
                    onClick={() => removeFromCompare(supplier.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/compare"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>Compare Now</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
