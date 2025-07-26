// src/components/supplier/SupplierList.js
import React, { useState, useEffect } from 'react';
import SupplierCard from './SupplierCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { calculateDistance } from '../../utils/helpers';

const SupplierList = ({ suppliers, loading, filters }) => {
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [sortBy, setSortBy] = useState('rating'); // 'rating', 'distance', 'name'

  useEffect(() => {
    let filtered = [...suppliers];

    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(supplier =>
        supplier.businessName.toLowerCase().includes(searchTerm) ||
        supplier.name.toLowerCase().includes(searchTerm) ||
        supplier.description?.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.category) {
      filtered = filtered.filter(supplier => supplier.category === filters.category);
    }

    if (filters.city) {
      filtered = filtered.filter(supplier => supplier.city === filters.city);
    }

    if (filters.rating) {
      filtered = filtered.filter(supplier => supplier.rating >= filters.rating);
    }

    if (filters.verifiedOnly) {
      filtered = filtered.filter(supplier => supplier.isVerified);
    }

    // Apply distance filter (mock implementation)
    if (filters.distance) {
      filtered = filtered.map(supplier => ({
        ...supplier,
        distance: Math.random() * 50 // Mock distance for demo
      })).filter(supplier => supplier.distance <= filters.distance);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          return (a.distance || 0) - (b.distance || 0);
        case 'name':
          return a.businessName.localeCompare(b.businessName);
        default:
          return 0;
      }
    });

    setFilteredSuppliers(filtered);
  }, [suppliers, filters, sortBy]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="large" text="Loading suppliers..." />
      </div>
    );
  }

  return (
    <div>
      {/* Sort Controls */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-600">
            Showing {filteredSuppliers.length} supplier{filteredSuppliers.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="rating">Rating</option>
            <option value="distance">Distance</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Suppliers Grid */}
      {filteredSuppliers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m12 0a1 1 0 011 1v6M7 5a1 1 0 00-1 1v6a1 1 0 001 1" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No suppliers found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters or search criteria to find more suppliers.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map(supplier => (
            <SupplierCard key={supplier.id} supplier={supplier} />
          ))}
        </div>
      )}

      {/* Load More Button (for pagination in real app) */}
      {filteredSuppliers.length > 0 && filteredSuppliers.length % 9 === 0 && (
        <div className="text-center mt-8">
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors">
            Load More Suppliers
          </button>
        </div>
      )}
    </div>
  );
};

export default SupplierList;