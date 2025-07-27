import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Package,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useCompare } from "../contexts/CompareContext";
import { formatPhoneNumber } from "../utils/helpers";

const CompareMetric = ({ label, values }) => (
  <div className="border-b py-4">
    <div className="font-medium text-gray-700 mb-2">{label}</div>
    <div className="grid grid-cols-4 gap-4">
      {values.map((value, index) => (
        <div key={index} className="text-sm text-gray-600">
          {value}
        </div>
      ))}
    </div>
  </div>
);

const Compare = () => {
  const navigate = useNavigate();
  const { comparedSuppliers, clearCompare } = useCompare();

  if (comparedSuppliers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          No Suppliers to Compare
        </h2>
        <p className="text-gray-600 mb-6">
          Add some suppliers to compare them.
        </p>
        <button
          onClick={() => navigate("/suppliers")}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Browse Suppliers
        </button>
      </div>
    );
  }

  const metrics = [
    {
      label: "Rating",
      values: comparedSuppliers.map((s) => (
        <div className="flex items-center space-x-1">
          <Star className="text-yellow-400" size={16} />
          <span>
            {s.rating.toFixed(1)} ({s.reviewCount} reviews)
          </span>
        </div>
      )),
    },
    {
      label: "Location",
      values: comparedSuppliers.map((s) => (
        <div className="flex items-center space-x-1">
          <MapPin size={16} />
          <span>{s.city}</span>
        </div>
      )),
    },
    {
      label: "Contact",
      values: comparedSuppliers.map((s) => (
        <div className="flex items-center space-x-1">
          <Phone size={16} />
          <span>{formatPhoneNumber(s.phone)}</span>
        </div>
      )),
    },
    {
      label: "Delivery Time",
      values: comparedSuppliers.map((s) => (
        <div className="flex items-center space-x-1">
          <Clock size={16} />
          <span>{s.deliveryTime || "Not specified"}</span>
        </div>
      )),
    },
    {
      label: "Minimum Order",
      values: comparedSuppliers.map((s) => (
        <div className="flex items-center space-x-1">
          <Package size={16} />
          <span>{s.minOrder || "Not specified"}</span>
        </div>
      )),
    },
    {
      label: "Verification",
      values: comparedSuppliers.map((s) => (
        <div className="flex items-center space-x-1">
          <CheckCircle
            size={16}
            className={s.isVerified ? "text-green-500" : "text-gray-400"}
          />
          <span>{s.isVerified ? "Verified" : "Unverified"}</span>
        </div>
      )),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Compare Suppliers
            </h1>
          </div>
          <button
            onClick={clearCompare}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Clear All
          </button>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Supplier Names */}
          <div className="grid grid-cols-4 gap-4 mb-6 pb-4 border-b">
            {comparedSuppliers.map((supplier) => (
              <div key={supplier.id}>
                <h3 className="font-semibold text-gray-900">
                  {supplier.businessName}
                </h3>
                <p className="text-sm text-gray-600">{supplier.category}</p>
              </div>
            ))}
          </div>

          {/* Metrics */}
          {metrics.map((metric, index) => (
            <CompareMetric key={index} {...metric} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Compare;
