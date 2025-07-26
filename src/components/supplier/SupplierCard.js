// src/components/supplier/SupplierCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Star, Heart, CheckCircle, MessageCircle } from 'lucide-react';
import { formatPhoneNumber, generateStarRating } from '../../utils/helpers';
import { useFavorites } from '../../hooks/useFavorites';
import { useAuth } from '../../contexts/AuthContext';

const SupplierCard = ({ supplier }) => {
  const { currentUser } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentUser) {
      toggleFavorite(supplier.id);
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // In a real app, this would open a messaging interface
    alert(`Contact ${supplier.businessName} at ${supplier.phone}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {supplier.businessName}
              </h3>
              {supplier.isVerified && (
                <CheckCircle size={16} className="text-green-500" />
              )}
            </div>
            <p className="text-sm text-gray-600">{supplier.name}</p>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
              {supplier.category}
            </span>
          </div>
          
          {currentUser && (
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-colors ${
                isFavorite(supplier.id)
                  ? 'text-red-500 bg-red-50 hover:bg-red-100'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart size={20} fill={isFavorite(supplier.id) ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">{generateStarRating(supplier.rating)}</span>
            <span className="text-sm text-gray-600">
              {supplier.rating.toFixed(1)} ({supplier.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Description */}
        {supplier.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {supplier.description}
          </p>
        )}

        {/* Location */}
        <div className="flex items-center space-x-2 text-gray-600 mb-3">
          <MapPin size={16} />
          <span className="text-sm">{supplier.city}</span>
          {supplier.distance && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {supplier.distance} km away
            </span>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex items-center space-x-2 text-gray-600 mb-4">
          <Phone size={16} />
          <span className="text-sm">{formatPhoneNumber(supplier.phone)}</span>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link
            to={`/supplier/${supplier.id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            View Profile
          </Link>
          
          {currentUser && (
            <button
              onClick={handleContactClick}
              className="flex items-center justify-center space-x-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <MessageCircle size={16} />
              <span>Contact</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierCard;