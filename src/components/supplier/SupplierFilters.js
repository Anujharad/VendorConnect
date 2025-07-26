// src/components/supplier/SupplierFilters.js
import React from 'react';
import { Filter, X } from 'lucide-react';
import { CATEGORIES, CITIES, RATING_OPTIONS, DISTANCE_OPTIONS } from '../../utils/constants';

const SupplierFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const handleInputChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== '' && value !== 0).length;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </div>
        
        {getActiveFiltersCount() > 0 && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-600"
          >
            <X size={16} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Suppliers
          </label>
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => handleInputChange('search', e.target.value)}
            placeholder="Search by name or business..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <select
            value={filters.city || ''}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Cities</option>
            {CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating
          </label>
          <select
            value={filters.rating || ''}
            onChange={(e) => handleInputChange('rating', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Rating</option>
            {RATING_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Distance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Distance
          </label>
          <select
            value={filters.distance || ''}
            onChange={(e) => handleInputChange('distance', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Distance</option>
            {DISTANCE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Verified Only */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.verifiedOnly || false}
              onChange={(e) => handleInputChange('verifiedOnly', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Verified suppliers only</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SupplierFilters;