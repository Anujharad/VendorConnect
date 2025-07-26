// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Users, 
  Shield, 
  Star, 
  ArrowRight, 
  CheckCircle,
  MapPin,
  Phone
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: Search,
      title: 'Easy Discovery',
      description: 'Find suppliers by category, location, and rating with powerful search filters.'
    },
    {
      icon: Shield,
      title: 'Verified Suppliers',
      description: 'All suppliers go through verification process to ensure quality and reliability.'
    },
    {
      icon: Users,
      title: 'Direct Connection',
      description: 'Connect directly with suppliers without any middlemen or commission fees.'
    },
    {
      icon: Star,
      title: 'Rating System',
      description: 'Make informed decisions with our comprehensive rating and review system.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Verified Suppliers' },
    { number: '1000+', label: 'Happy Vendors' },
    { number: '50+', label: 'Cities Covered' },
    { number: '4.8', label: 'Average Rating' }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      business: 'Kumar Vegetable Store',
      city: 'Mumbai',
      text: 'VendorSupply helped me find reliable suppliers for my shop. The quality is consistent and prices are competitive.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      business: 'Fresh Fruits Corner',
      city: 'Delhi',
      text: 'Amazing platform! I can easily compare suppliers and choose the best ones for my business needs.',
      rating: 5
    },
    {
      name: 'Mohammed Ali',
      business: 'Ali Spice Market',
      city: 'Bangalore',
      text: 'The verification system gives me confidence in choosing suppliers. Great service and support.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connect with
              <span className="block text-yellow-300">Trusted Suppliers</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Find reliable suppliers for your street vendor business. Get fresh raw materials at competitive prices from verified local suppliers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {currentUser ? (
                <>
                  <Link
                    to="/suppliers"
                    className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center justify-center"
                  >
                    Find Suppliers
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                  <Link
                    to="/dashboard"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center justify-center"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                  <Link
                    to="/suppliers"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors"
                  >
                    Browse Suppliers
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose VendorSupply?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make it easy for street vendors to connect with reliable suppliers and grow their business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Create Account
              </h3>
              <p className="text-gray-600">
                Sign up as a vendor or supplier and complete your profile with business details.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Search & Connect
              </h3>
              <p className="text-gray-600">
                Use filters to find suppliers by category, location, and rating. Contact them directly.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Build Relationships
              </h3>
              <p className="text-gray-600">
                Maintain long-term relationships with trusted suppliers for consistent quality and pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Hear from vendors who have transformed their business with VendorSupply
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400" size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.business}</div>
                  <div className="text-sm text-gray-500">{testimonial.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of vendors and suppliers who are already using VendorSupply to build successful partnerships.
          </p>
          
          {!currentUser && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center justify-center"
              >
                Start Free Today
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;