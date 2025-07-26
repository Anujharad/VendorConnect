// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../hooks/useFavorites';
import { Heart, Search, User, TrendingUp, Star, MapPin } from 'lucide-react';
import SupplierCard from '../components/supplier/SupplierCard';
import { getSuppliers } from '../services/firestore';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const { currentUser, userProfile } = useAuth();
  const { favorites, loading: favoritesLoading } = useFavorites();
  const [recentSuppliers, setRecentSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentSuppliers = async () => {
      try {
        setLoading(true);
        // Get recent suppliers (you can modify this logic based on your needs)
        const suppliers = await getSuppliers();
        // Show only top 6 suppliers for dashboard
        setRecentSuppliers(suppliers.slice(0, 6));
      } catch (error) {
        console.error('Error fetching recent suppliers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentSuppliers();
  }, []);

  const stats = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: 'Favorite Suppliers',
      value: favorites.length,
      description: 'Suppliers you\'ve saved',
      link: '/favorites'
    },
    {
      icon: <Search className="h-8 w-8 text-blue-500" />,
      title: 'Recent Searches',
      value: '5',
      description: 'This week',
      link: '/suppliers'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-500" />,
      title: 'Profile Views',
      value: '12',
      description: 'This month',
      link: '/profile'
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: 'Reviews Given',
      value: '3',
      description: 'Total reviews',
      link: '/profile'
    }
  ];

  const quickActions = [
    {
      title: 'Find Suppliers',
      description: 'Search for new suppliers in your area',
      icon: <Search className="h-6 w-6" />,
      link: '/suppliers',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'View Favorites',
      description: 'Check your saved suppliers',
      icon: <Heart className="h-6 w-6" />,
      link: '/favorites',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      title: 'Update Profile',
      description: 'Keep your information current',
      icon: <User className="h-6 w-6" />,
      link: '/profile',
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  if (loading || favoritesLoading) {
    return <LoadingSpinner size="lg" text="Loading dashboard..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {userProfile?.name || 'User'}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your supplier connections today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">
                  {stat.description}
                </p>
              </div>
              <div className="ml-4">
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`${action.color} text-white rounded-lg p-4 transition-colors`}
            >
              <div className="flex items-center">
                {action.icon}
                <div className="ml-3">
                  <h3 className="font-semibold">
                    {action.title}
                  </h3>
                  <p className="text-sm opacity-90">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Profile Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your Profile
            </h2>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <span className="capitalize">{userProfile?.userType}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{userProfile?.address?.city}, {userProfile?.address?.state}</span>
              </div>
            </div>
          </div>
          <Link
            to="/profile"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Recent Suppliers */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Suppliers
          </h2>
          <Link
            to="/suppliers"
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            View All →
          </Link>
        </div>
        
        {recentSuppliers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No suppliers found yet
            </h3>
            <p className="text-gray-500 mb-4">
              Start exploring suppliers to see them here
            </p>
            <Link
              to="/suppliers"
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors inline-block"
            >
              Browse Suppliers
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentSuppliers.map((supplier) => (
              <SupplierCard
                key={supplier.id}
                supplier={supplier}
                onClick={(supplier) => console.log('Clicked:', supplier)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Favorite Suppliers Preview */}
      {favorites.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Favorites
            </h2>
            <Link
              to="/favorites"
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.slice(0, 3).map((supplier) => (
              <SupplierCard
                key={supplier.id}
                supplier={supplier}
                onClick={(supplier) => console.log('Clicked:', supplier)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;