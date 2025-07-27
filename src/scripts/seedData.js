const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} = require("firebase/firestore");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS1vUJTvKb4quTfxKJ6eUEnyJL4oFlaP8",
  authDomain: "vendor-supplier-platform-99365.firebaseapp.com",
  projectId: "vendor-supplier-platform-99365",
  storageBucket: "vendor-supplier-platform-99365.firebasestorage.app",
  messagingSenderId: "999452203611",
  appId: "1:999452203611:web:3d2b734dbe84bc6e9c3d7e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample Data
const suppliers = [
  {
    id: "sup001",
    businessName: "Fresh Farms Direct",
    name: "Rahul Sharma",
    category: "Vegetables",
    description: "Premium quality vegetables directly from farms",
    phone: "9876543210",
    email: "rahul@freshfarms.com",
    city: "Mumbai",
    address: "123 Market Road, Andheri West",
    rating: 4.8,
    reviewCount: 156,
    isVerified: true,
    minOrder: 1000,
    maxDeliveryDistance: 25,
    deliveryTime: "24 hours",
    paymentTerms: "Net 30",
    registrationDate: serverTimestamp(),
    categories: ["Vegetables", "Fruits"],
    tags: ["organic", "fresh", "local"],
    operatingHours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "8:00 AM - 2:00 PM",
      sunday: "Closed",
    },
  },
  {
    id: "sup002",
    businessName: "Spice Haven",
    name: "Priya Patel",
    category: "Spices",
    description: "Authentic Indian spices and masalas",
    phone: "9876543211",
    email: "priya@spicehaven.com",
    city: "Delhi",
    address: "45 Spice Market, Chandni Chowk",
    rating: 4.5,
    reviewCount: 89,
    isVerified: true,
    minOrder: 500,
    maxDeliveryDistance: 15,
    deliveryTime: "48 hours",
    paymentTerms: "COD",
    registrationDate: serverTimestamp(),
    categories: ["Spices", "Dry Fruits"],
    tags: ["premium", "authentic", "wholesale"],
    operatingHours: {
      monday: "9:00 AM - 7:00 PM",
      tuesday: "9:00 AM - 7:00 PM",
      wednesday: "9:00 AM - 7:00 PM",
      thursday: "9:00 AM - 7:00 PM",
      friday: "9:00 AM - 7:00 PM",
      saturday: "9:00 AM - 5:00 PM",
      sunday: "Closed",
    },
  },
];

const users = [
  {
    id: "user001",
    name: "Amit Kumar",
    email: "amit@restaurant.com",
    phone: "9876543213",
    userType: "vendor",
    businessName: "Kumar's Restaurant",
    businessType: "Restaurant",
    city: "Mumbai",
    address: "78 Food Street, Bandra",
    registrationDate: serverTimestamp(),
    lastLoginDate: serverTimestamp(),
    isVerified: true,
    favorites: ["sup001"],
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      language: "en",
    },
  },
  {
    id: "user002",
    name: "Sneha Reddy",
    email: "sneha@hotel.com",
    phone: "9876543214",
    userType: "vendor",
    businessName: "Hotel Sunshine",
    businessType: "Hotel",
    city: "Bangalore",
    address: "23 MG Road",
    registrationDate: serverTimestamp(),
    lastLoginDate: serverTimestamp(),
    isVerified: true,
    favorites: ["sup002"],
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      language: "en",
    },
  },
];

const relationships = [
  {
    id: "user001_sup001",
    vendorId: "user001",
    supplierId: "sup001",
    startDate: serverTimestamp(),
    loyaltyBadge: "ELITE",
    totalOrders: 245,
    totalSpent: 450000,
    lastOrderDate: serverTimestamp(),
    orderFrequency: "weekly",
    preferredPaymentMethod: "NET30",
    notes: "Reliable long-term supplier",
    customTerms: {
      creditLimit: 100000,
      paymentDays: 30,
      specialDiscounts: true,
    },
  },
  {
    id: "user001_sup002",
    vendorId: "user001",
    supplierId: "sup002",
    startDate: serverTimestamp(),
    loyaltyBadge: "NEWCOMER",
    totalOrders: 12,
    totalSpent: 15000,
    lastOrderDate: serverTimestamp(),
    orderFrequency: "monthly",
    preferredPaymentMethod: "COD",
    notes: "New promising supplier",
    customTerms: {
      creditLimit: 25000,
      paymentDays: 15,
      specialDiscounts: false,
    },
  },
];

// Seeding Function
const seedDatabase = async () => {
  try {
    // Seed Suppliers
    console.log("Seeding suppliers...");
    for (const supplier of suppliers) {
      await setDoc(doc(db, "suppliers", supplier.id), supplier);
    }

    // Seed Users
    console.log("Seeding users...");
    for (const user of users) {
      await setDoc(doc(db, "users", user.id), user);
    }

    // Seed Relationships
    console.log("Seeding relationships...");
    for (const relationship of relationships) {
      await setDoc(doc(db, "relationships", relationship.id), relationship);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Execute seeding if this file is run directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  seedDatabase()
    .then(() => {
      console.log("Database seeded successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error seeding database:", error);
      process.exit(1);
    });
}

module.exports = {
  seedDatabase
};
