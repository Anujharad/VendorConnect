// src/pages/Suppliers.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SupplierFilters from '../components/supplier/SupplierFilters';
import SupplierList from '../components/supplier/SupplierList';                                                                                                                                                                                             
import { useSuppliers } from '../hooks/useSuppliers';
import { useFavorites } from '../hooks/useFavorites';
import { Filter, X } from 'lucide-react';

const Suppliers = () => {
  const location = useLocation();
  const { suppliers, loading } = useSuppliers();
  const { favorites } = useFavorites();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    city: '',
    rating: 0,
    distance: 0,
    verifiedOnly: false
  });

  // Check if we should show only favorites
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('favorites') === 'true') {
      // Filter suppliers to show only favorites
      // This would be handled in the SupplierList component
    }
  }, [location]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      city: '',
      rating: 0,
      distance: 0,
      verifiedOnly: false
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filteredSuppliers = React.useMemo(() => {
    const params = new URLSearchParams(location.search);
    const showFavoritesOnly = params.get('favorites') === 'true';
    
    if (showFavoritesOnly) {
      return suppliers.filter(supplier => favorites.includes(supplier.id));
    }
    
    return suppliers;
  }, [suppliers, favorites, location.search]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {location.search.includes('favorites=true') ? 'Your Favorite Suppliers' : 'Find Suppliers'}
          </h1>
          <p className="text-gray-600">
            {location.search.includes('favorites=true') 
              ? 'Suppliers you have saved for quick access'
              : 'Discover trusted suppliers for your business needs'
            }
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleFilters}
              className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
            >
              <Filter size={16} />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={toggleFilters}>
                <div className="bg-white w-80 h-full p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <button onClick={toggleFilters}>
                      <X size={20} />
                    </button>
                  </div>
                  <SupplierFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              </div>
            )}
            
            <div className="hidden lg:block">
              <SupplierFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <SupplierList
              suppliers={filteredSuppliers}
              loading={loading}
              filters={filters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;