// src/components/common/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VC</span>
              </div>
              <span className="text-xl font-bold">Vendor Connect</span>
            </div>
            <p className="text-gray-300 text-sm">
              Connecting Indian street vendors with trusted local suppliers for fresh raw materials.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/suppliers" className="hover:text-white">Find Suppliers</Link></li>
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><span className="hover:text-white cursor-pointer">Vegetables</span></li>
              <li><span className="hover:text-white cursor-pointer">Fruits</span></li>
              <li><span className="hover:text-white cursor-pointer">Grains</span></li>
              <li><span className="hover:text-white cursor-pointer">Dairy</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Email: support@vendorconnect.com</p>
              <p>Phone: +91 98765 43210</p>
              <p>Address: Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2025 Vendor Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;