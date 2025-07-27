// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CompareProvider } from "./contexts/CompareContext";
import Layout from "./components/layout/Layout";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Suppliers from "./pages/Suppliers";
import Profile from "./pages/Profile";
import Compare from "./pages/Compare";

// Auth Components
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import SupplierProfile from "./components/supplier/SupplierProfile";

// Components
import CompareBar from "./components/compare/CompareBar";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect to dashboard if logged in)
const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return !currentUser ? children : <Navigate to="/dashboard" />;
};

function AppContent() {
  return (
    <Router>
      <CompareProvider>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/suppliers"
            element={
              <Layout>
                <Suppliers />
              </Layout>
            }
          />
          <Route
            path="/supplier/:id"
            element={
              <Layout>
                <SupplierProfile />
              </Layout>
            }
          />

          {/* Auth Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/compare"
            element={
              <ProtectedRoute>
                <Layout>
                  <Compare />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <CompareBar />
      </CompareProvider>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
