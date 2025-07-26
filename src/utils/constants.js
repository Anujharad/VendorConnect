// src/utils/constants.js

export const USER_TYPES = {
  VENDOR: 'vendor',
  SUPPLIER: 'supplier'
};

export const CATEGORIES = [
  'Vegetables',
  'Fruits',
  'Grains & Cereals',
  'Spices & Condiments',
  'Dairy Products',
  'Meat & Poultry',
  'Beverages',
  'Snacks & Sweets',
  'Oil & Ghee',
  'Others'
];

export const INDIAN_CITIES = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Surat',
  'Lucknow',
  'Kanpur',
  'Nagpur',
  'Indore',
  'Thane',
  'Bhopal',
  'Visakhapatnam',
  'Pimpri-Chinchwad',
  'Patna',
  'Vadodara',
  'Ghaziabad',
  'Ludhiana',
  'Agra',
  'Nashik',
  'Faridabad',
  'Meerut',
  'Rajkot',
  'Kalyan-Dombivali',
  'Vasai-Virar',
  'Varanasi'
];

export const RATING_OPTIONS = [
  { value: '', label: 'All Ratings' },
  { value: '4', label: '4+ Stars' },
  { value: '3', label: '3+ Stars' },
  { value: '2', label: '2+ Stars' }
];

export const SORT_OPTIONS = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name A-Z' },
  { value: 'distance', label: 'Nearest First' }
];