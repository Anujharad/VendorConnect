// src/components/auth/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import { registerUser } from '../../services/auth';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    setLoading(true);
    setError('');

    const result = await registerUser(formData.email, formData.password, {
      name: formData.name,
      phone: formData.phone,
      userType: formData.userType,
      businessName: formData.businessName,
      address: formData.address,
      city: formData.city,
      category: formData.category,
      description: formData.description,
      rating: 0,
      reviewCount: 0,
      isVerified: false
    });

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">VS</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <AuthForm 
            type="register" 
            onSubmit={handleRegister} 
            loading={loading} 
          />
        </div>
      </div>
    </div>
  );
};

export default Register;