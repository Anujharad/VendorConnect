// src/pages/Dashboard.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import VendorDashboard from '../components/vendor/VendorDashboard';
import { USER_TYPES } from '../utils/constants';

const Dashboard = () => {
  const { userProfile } = useAuth();

  // For suppliers, you could create a SupplierDashboard component
  // For now, we'll show the vendor dashboard for all users
  return (
    <div>
      {userProfile?.userType === USER_TYPES.SUPPLIER ? (
        // Supplier Dashboard (you can create this component later)
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Supplier Dashboard</h2>
            <p className="text-gray-600 mb-6">
              Supplier dashboard is coming soon! For now, you can manage your profile and view supplier listings.
            </p>
            <div className="space-x-4">
              <a href="/profile" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Manage Profile
              </a>
              <a href="/suppliers" className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                View Suppliers
              </a>
            </div>
          </div>
        </div>
      ) : (
        // Vendor Dashboard
        <VendorDashboard />
      )}
    </div>
  );
};

export default Dashboard;