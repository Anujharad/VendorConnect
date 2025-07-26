// src/components/supplier/SupplierCard.js
import React from 'react';
import { Star, MapPin, Phone, Heart } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';
import { useAuth } from '../../contexts/AuthContext';

const SupplierCard = ({ supplier, onClick }) => {
  const { currentUser } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click
    if (currentUser) {
      toggleFavorite(supplier.id);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
      onClick={() => onClick && onClick(supplier)}
    >
      <div className="p-6">
        {/* Header with name and favorite button */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 flex-1">
            {supplier.name}
          </h3>
          {currentUser && (
            <button
              onClick={handleFavoriteClick}
              className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Heart 
                className={`h-5 w-5 ${
                  isFavorite(supplier.id) 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-gray-400 hover:text-red-500'
                }`}
              />
            </button>
          )}
        </div>

        {/* Category */}
        <div className="mb-3">
          <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
            {supplier.category}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {renderStars(supplier.rating)}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {supplier.rating} ({supplier.reviewCount || 0} reviews)
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {supplier.address?.city}, {supplier.address?.state}
          </span>
        </div>

        {/* Phone */}
        <div className="flex items-center text-gray-600 mb-3">
          <Phone className="h-4 w-4 mr-1" />
          <span className="text-sm">{supplier.phone}</span>
        </div>

        {/* Description */}
        {supplier.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {supplier.description}
          </p>
        )}

        {/* Products */}
        {supplier.products && supplier.products.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Products:</p>
            <div className="flex flex-wrap gap-1">
              {supplier.products.slice(0, 3).map((product, index) => (
                <span 
                  key={index}
                  className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                >
                  {product}
                </span>
              ))}
              {supplier.products.length > 3 && (
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  +{supplier.products.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors">
            Contact Supplier
          </button>
          <button className="flex-1 border border-orange-500 text-orange-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-50 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierCard;