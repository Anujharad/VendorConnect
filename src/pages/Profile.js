// src/pages/Profile.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import VendorProfile from '../components/vendor/VendorProfile';
import { USER_TYPES } from '../utils/constants';

const Profile = () => {
  const { userProfile } = useAuth();

  // For now, we'll use the same profile component for both vendors and suppliers
  // You could create separate components for different user types if needed
  return <VendorProfile />;
};

export default Profile;