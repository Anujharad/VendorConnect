// src/components/vendor/VendorDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  Star, 
  TrendingUp, 
  Users, 
  ShoppingBag,
  Plus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../hooks/useFavorites';
import { useSuppliers } from '../../hooks/useSuppliers';
import SupplierCard from '../supplier/SupplierCard';
import LoadingSpinner from '../common/LoadingSpinner';

const VendorDashboard = () => {
  const { userProfile } = useAuth();
  const { favorites } = useFavorites();
  const { suppliers, loading } = useSuppliers();
  const [favoriteSuppliers, setFavoriteSuppliers] = useState([]);

  useEffect(() => {
    if (suppliers.length > 0 && favorites.length > 0) {
      const favSuppliers = suppliers.filter(supplier => 
        favorites.includes(supplier.id)
      );
      setFavoriteSuppliers(favSuppliers);
    }
  }, [suppliers, favorites]);

  const stats = [
    {
      title: 'Favorite Suppliers',
      value: favorites.length,
      icon: Heart,
      color: 'text-red-500 bg-red-50',
      link: '/suppliers?favorites=true'
    },
    {
      title: 'Available Suppliers',
      value: suppliers.length,
      icon: Users,
      color: 'text-blue-500 bg-blue-50',
      link: '/suppliers'
    },
    {
      title: 'Categories',
      value: '9+',
      icon: ShoppingBag,
      color: 'text-green-500 bg-green-50',
      link: '/suppliers'
    },
    {
      title: 'Average Rating',
      value: '4.2',
      icon: Star,
      color: 'text-yellow-500 bg-yellow-50',
      link: '/suppliers'
    }
  ];

  const recentSuppliers = suppliers.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userProfile?.name}!
          </h1>
          <p className="text-gray-600">
            Manage your supplier relationships and discover new opportunities for your business.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/suppliers"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <Search className="text-blue-600" size={24} />
              <div>
                <h3 className="font-medium text-gray-900">Find Suppliers</h3>
                <p className="text-sm text-gray-600">Search for new suppliers</p>
              </div>
            </Link>
            
            <Link
              to="/suppliers?favorites=true"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
            >
              <Heart className="text-red-600" size={24} />
              <div>
                <h3 className="font-medium text-gray-900">My Favorites</h3>
                <p className="text-sm text-gray-600">View saved suppliers</p>
              </div>
            </Link>
            
            <Link
              to="/profile"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <Plus className="text-green-600" size={24} />
              <div>
                <h3 className="font-medium text-gray-900">Update Profile</h3>
                <p className="text-sm text-gray-600">Manage your information</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Suppliers */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Suppliers</h2>
              <Link
                to="/suppliers"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            
            {loading ? (
              <LoadingSpinner size="medium" text="Loading suppliers..." />
            ) : (
              <div className="space-y-4">
                {recentSuppliers.length > 0 ? (
                  recentSuppliers.map(supplier => (
                    <div key={supplier.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{supplier.businessName}</h3>
                          <p className="text-sm text-gray-600">{supplier.category}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star size={14} className="text-yellow-400" />
                            <span className="text-sm text-gray-600">
                              {supplier.rating.toFixed(1)} ({supplier.reviewCount} reviews)
                            </span>
                          </div>
                        </div>
                        <Link
                          to={`/supplier/${supplier.id}`}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center py-4">No suppliers found. Start exploring!</p>
                )}
              </div>
            )}
          </div>

          {/* Favorite Suppliers */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Favorite Suppliers</h2>
              <Link
                to="/suppliers?favorites=true"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            
            <div className="space-y-4">
              {favoriteSuppliers.length > 0 ? (
                favoriteSuppliers.slice(0, 3).map(supplier => (
                  <div key={supplier.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{supplier.businessName}</h3>
                        <p className="text-sm text-gray-600">{supplier.category}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star size={14} className="text-yellow-400" />
                          <span className="text-sm text-gray-600">
                            {supplier.rating.toFixed(1)} ({supplier.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/supplier/${supplier.id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Heart size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No favorite suppliers yet</p>
                  <Link
                    to="/suppliers"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Discover Suppliers
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Tips for Success</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <TrendingUp className="text-blue-600 mt-1" size={20} />
              <div>
                <h4 className="font-medium text-blue-900">Build Relationships</h4>
                <p className="text-blue-800 text-sm">Regular communication with suppliers leads to better deals and service.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Star className="text-blue-600 mt-1" size={20} />
              <div>
                <h4 className="font-medium text-blue-900">Check Reviews</h4>
                <p className="text-blue-800 text-sm">Always read reviews and ratings before choosing new suppliers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;