// src/pages/Suppliers.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../hooks/useFavorites';
import SupplierFilters from '../components/supplier/SupplierFilters';
import SupplierCard from '../components/supplier/SupplierCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getSuppliers } from '../services/firestore';

const Suppliers = ({ favoritesOnly = false }) => {
  const { currentUser } = useAuth();
  const { favorites, loading: favoritesLoading } = useFavorites();
  
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    rating: ''
  });

  // Fetch suppliers from Firestore
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        setError('');
        
        if (favoritesOnly) {
          // Show favorites only
          if (currentUser && !favoritesLoading) {
            setSuppliers(favorites);
            setFilteredSuppliers(favorites);
          }
        } else {
          // Fetch all suppliers
          const suppliersData = await getSuppliers();
          setSuppliers(suppliersData);
          setFilteredSuppliers(suppliersData);
        }
      } catch (err) {
        setError('Failed to load suppliers. Please try again.');
        console.error('Error fetching suppliers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, [favoritesOnly, currentUser, favorites, favoritesLoading]);

  // Apply filters and search
  const applyFilters = () => {
    let filtered = [...suppliers];

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(supplier => 
        supplier.name.toLowerCase().includes(searchLower) ||
        supplier.category.toLowerCase().includes(searchLower) ||
        (supplier.products && supplier.products.some(product => 
          product.toLowerCase().includes(searchLower)
        )) ||
        (supplier.description && supplier.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(supplier => supplier.category === filters.category);
    }

    // Apply city filter
    if (filters.city) {
      filtered = filtered.filter(supplier => supplier.address?.city === filters.city);
    }

    // Apply rating filter
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(supplier => supplier.rating >= minRating);
    }

    setFilteredSuppliers(filtered);
  };

  // Handle supplier card click
  const handleSupplierClick = (supplier) => {
    // TODO: Navigate to supplier detail page or open modal
    console.log('Clicked supplier:', supplier);
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading suppliers..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {favoritesOnly ? 'Your Favorite Suppliers' : 'Find Suppliers'}
        </h1>
        <p className="text-gray-600">
          {favoritesOnly 
            ? 'Manage your saved suppliers and connect with them easily'
            : 'Discover trusted local suppliers for your business needs'
          }
        </p>
      </div>

      {/* Show filters only if not favorites page */}
      {!favoritesOnly && (
        <SupplierFilters
          filters={filters}
          onFilterChange={setFilters}
          onSearch={applyFilters}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      )}

      {/* Search for favorites page */}
      {favoritesOnly && (
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search your favorite suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
            <div className="absolute left-3 top-2.5">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          {filteredSuppliers.length === 0 
            ? 'No suppliers found'
            : `Showing ${filteredSuppliers.length} supplier${filteredSuppliers.length !== 1 ? 's' : ''}`
          }
          {filters.category || filters.city || filters.rating || searchTerm ? ' matching your criteria' : ''}
        </p>
      </div>

      {/* Suppliers Grid */}
      {filteredSuppliers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {favoritesOnly ? 'No favorite suppliers yet' : 'No suppliers found'}
          </h3>
          <p className="text-gray-500 mb-4">
            {favoritesOnly 
              ? 'Start adding suppliers to your favorites to see them here'
              : 'Try adjusting your search criteria or filters'
            }
          </p>
          {favoritesOnly && (
            <button
              onClick={() => window.location.href = '/suppliers'}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              Browse All Suppliers
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <SupplierCard
              key={supplier.id}
              supplier={supplier}
              onClick={handleSupplierClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Suppliers;