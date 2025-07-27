// src/utils/constants.js

export const USER_TYPES = {
  VENDOR: "vendor",
  SUPPLIER: "supplier",
};

export const CATEGORIES = [
  "Vegetables",
  "Fruits",
  "Grains",
  "Dairy",
  "Meat",
  "Spices",
  "Beverages",
  "Snacks",
  "Other",
];

export const CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
];

export const RATING_OPTIONS = [
  { value: 1, label: "1+ Stars" },
  { value: 2, label: "2+ Stars" },
  { value: 3, label: "3+ Stars" },
  { value: 4, label: "4+ Stars" },
  { value: 5, label: "5 Stars" },
];

export const DISTANCE_OPTIONS = [
  { value: 1, label: "Within 1 km" },
  { value: 5, label: "Within 5 km" },
  { value: 10, label: "Within 10 km" },
  { value: 25, label: "Within 25 km" },
  { value: 50, label: "Within 50 km" },
];

export const LOYALTY_BADGES = {
  NEWCOMER: {
    name: "Newcomer",
    icon: "Sparkles",
    color: "text-gray-500",
    bgColor: "bg-gray-100",
    requirement: "< 1 year",
    discount: "0%",
  },
  REGULAR: {
    name: "Regular Customer",
    icon: "Star",
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    requirement: "1-2 years",
    discount: "5%",
  },
  LOYAL: {
    name: "Loyal Partner",
    icon: "Award",
    color: "text-purple-500",
    bgColor: "bg-purple-100",
    requirement: "2-5 years",
    discount: "10%",
  },
  ELITE: {
    name: "Elite Partner",
    icon: "Crown",
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
    requirement: "5-10 years",
    discount: "15%",
  },
  LEGENDARY: {
    name: "Legendary Partner",
    icon: "Diamond",
    color: "text-red-500",
    bgColor: "bg-red-100",
    requirement: "10+ years",
    discount: "20%",
  },
};
