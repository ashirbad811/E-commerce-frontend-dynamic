import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthContext } from "./context/AuthContext";

// User Pages & Components
import UserNavbar from "./user/components/UserNavbar";
import Home from "./user/pages/Home";
import ProductListing from "./user/pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./user/pages/Cart";
import Checkout from "./user/pages/Checkout";
import UserDashboard from "./user/pages/UserDashboard";
import Wishlist from "./pages/Wishlist";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Pages & Components
import AdminLayout from "./admin/pages/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminCategories from "./admin/pages/AdminCategories";
import AdminUsers from "./admin/pages/AdminUsers";

// Footer Pages
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ShippingPolicy from "./pages/ShippingPolicy";
import Returns from "./pages/Returns";

// Shared Components
import Footer from "./pages/Footer";

// Protected Route Component
const RoleBasedRoute = ({ adminOnly = false, children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

function AppContent() {
  const { user, loading } = useContext(AuthContext);

  // Determine which navbar to show
  const isAdmin = user?.role === "admin";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <UserNavbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/shop" element={<ProductListing />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/checkout"
            element={
              <RoleBasedRoute adminOnly={false}>
                <Checkout />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RoleBasedRoute adminOnly={false}>
                <UserDashboard />
              </RoleBasedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <RoleBasedRoute adminOnly={true}>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <RoleBasedRoute adminOnly={true}>
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <RoleBasedRoute adminOnly={true}>
                <AdminLayout>
                  <AdminOrders />
                </AdminLayout>
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <RoleBasedRoute adminOnly={true}>
                <AdminLayout>
                  <AdminCategories />
                </AdminLayout>
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <RoleBasedRoute adminOnly={true}>
                <AdminLayout>
                  <AdminUsers />
                </AdminLayout>
              </RoleBasedRoute>
            }
          />

          {/* Footer Routes */}
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/shipping" element={<ShippingPolicy />} />
          <Route path="/returns" element={<Returns />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
