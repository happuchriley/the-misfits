import { ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-brand-primary">
          Elevate
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/products" className="hover:text-brand-primary">
            Shop
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>
          <Link to="/account">
            <User className="w-5 h-5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
