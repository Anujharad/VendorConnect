// src/components/supplier/SupplierProfile.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Phone,
  Star,
  Heart,
  CheckCircle,
  MessageCircle,
  ArrowLeft,
  Clock,
  Award,
} from "lucide-react";
import { getSupplier } from "../../services/firestore";
import {
  formatPhoneNumber,
  generateStarRating,
  formatDate,
} from "../../utils/helpers";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";
import { LOYALTY_BADGES } from "../../utils/constants";
import LoyaltyBadge from "../common/LoyaltyBadge";

const SupplierProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSupplier = async () => {
      setLoading(true);
      const result = await getSupplier(id);

      if (result.success) {
        setSupplier(result.data);
      } else {
        setError(result.error);
      }

      setLoading(false);
    };

    if (id) {
      fetchSupplier();
    }
  }, [id]);

  const handleFavoriteClick = () => {
    if (currentUser && supplier) {
      toggleFavorite(supplier.id);
    }
  };

  const handleContactClick = () => {
    if (supplier) {
      // In a real app, this would open a messaging interface
      alert(`Contact ${supplier.businessName} at ${supplier.phone}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner size="large" text="Loading supplier profile..." />
      </div>
    );
  }

  if (error || !supplier) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Supplier Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The supplier you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/suppliers")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Suppliers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {supplier.businessName}
                    </h1>
                    {supplier.isVerified && (
                      <CheckCircle size={24} className="text-green-500" />
                    )}
                  </div>
                  <p className="text-lg text-gray-600 mb-2">{supplier.name}</p>
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {supplier.category}
                  </span>
                </div>

                {currentUser && (
                  <button
                    onClick={handleFavoriteClick}
                    className={`p-3 rounded-full transition-colors ${
                      isFavorite(supplier.id)
                        ? "text-red-500 bg-red-50 hover:bg-red-100"
                        : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                    }`}
                  >
                    <Heart
                      size={24}
                      fill={isFavorite(supplier.id) ? "currentColor" : "none"}
                    />
                  </button>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400 text-xl">
                    {generateStarRating(supplier.rating)}
                  </span>
                  <span className="text-lg font-semibold text-gray-800">
                    {supplier.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-600">
                  ({supplier.reviewCount} reviews)
                </span>
              </div>

              {/* Description */}
              {supplier.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    About
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {supplier.description}
                  </p>
                </div>
              )}

              {/* Contact Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone size={20} className="text-gray-500" />
                    <span className="text-gray-700">
                      {formatPhoneNumber(supplier.phone)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin size={20} className="text-gray-500" />
                    <div>
                      <p className="text-gray-700">{supplier.address}</p>
                      <p className="text-gray-600 text-sm">{supplier.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            {currentUser && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Get in Touch
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={handleContactClick}
                    className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
                  >
                    <MessageCircle size={20} />
                    <span>Send Message</span>
                  </button>
                  <button
                    onClick={() => window.open(`tel:${supplier.phone}`)}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Phone size={20} />
                    <span>Call Now</span>
                  </button>
                </div>
              </div>
            )}

            {/* Stats Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Supplier Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="text-yellow-400" />
                    <span className="font-medium">
                      {supplier.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Reviews</span>
                  <span className="font-medium">{supplier.reviewCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{supplier.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      supplier.isVerified
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {supplier.isVerified ? "Verified" : "Unverified"}
                  </span>
                </div>
                {supplier.createdAt && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-medium">
                      {formatDate(supplier.createdAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Loyalty Status Card */}
            {supplier.loyaltyBadge && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Loyalty Status
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <LoyaltyBadge type={supplier.loyaltyBadge} showDetails />
                  </div>

                  <div className="text-sm text-gray-600 mt-2">
                    <p>
                      Partnership Duration:{" "}
                      {LOYALTY_BADGES[supplier.loyaltyBadge].requirement}
                    </p>
                    <p>
                      Current Discount:{" "}
                      {LOYALTY_BADGES[supplier.loyaltyBadge].discount}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Next Tier Benefits
                    </h4>
                    {supplier.loyaltyBadge !== "LEGENDARY" ? (
                      <div className="text-sm text-gray-600">
                        <p>
                          Continue partnership to unlock higher discounts and
                          benefits!
                        </p>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600">
                        <p>You've reached the highest loyalty tier! 🎉</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Info */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Quick Tips</h4>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Contact suppliers directly for best prices</li>
                <li>• Check ratings and reviews before ordering</li>
                <li>• Verified suppliers are more reliable</li>
                <li>• Ask about bulk discounts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
