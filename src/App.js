import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import SearchPage from "./pages/SearchPage";
import { useAuth } from './context/AuthContext';

// Import all pages
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/Products/ProductsPage";
import ProductDetailPage from "./pages/Products/ProductDetailPage";
import CategoryPage from "./pages/Products/CategoryPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import AccountPage from "./pages/Account/AccountPage";
import OrderHistoryPage from "./pages/Account/OrderHistoryPage";
import WishlistPage from "./pages/Account/WishlistPage";
import SettingsPage from "./pages/Account/SettingsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ShippingReturnsPage from "./pages/Legal/ShippingReturnsPage";
import PrivacyPolicyPage from "./pages/Legal/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/Legal/TermsOfServicePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import ProfilePage from './pages/ProfilePage';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="text-center py-12">Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-[80vh]">
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Products */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />

          {/* Cart */}
          <Route path="/cart" element={<CartPage />} />
          {/* Checkout */}
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Account (protected) */}
          <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
          <Route path="/account/orders" element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} />
          <Route path="/account/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
          <Route path="/account/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

          {/* Content Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />

          {/* Legal */}
          <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />

          {/* Search */}
          <Route path="/search" element={<SearchPage />} />

          {/* Order Confirmation */}
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />

          {/* Profile */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* 404 Page (Add this last) */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
      <BottomNav />
    </Router>
  );
}

export default App;
