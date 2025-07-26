// src/components/common/Header.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { logoutUser } from '../../services/auth';
import { Menu, X, User, LogOut, Heart, Home } from 'lucide-react';

const Header = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      navigate('/');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VS</span>
            </div>
            <span className="text-xl font-bold text-gray-800">VendorSupply</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link to="/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                  <Home size={16} />
                  <span>Dashboard</span>
                </Link>
                <Link to="/suppliers" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                  Suppliers
                </Link>
                <Link to="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                  <User size={16} />
                  <span>{userProfile?.name || 'Profile'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 px-3 py-2 rounded-md"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              {currentUser ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Home size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <Link 
                    to="/suppliers" 
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Suppliers
                  </Link>
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User size={16} />
                    <span>{userProfile?.name || 'Profile'}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-left w-full"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 block text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;