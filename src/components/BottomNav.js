import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaShoppingBag, FaUser, FaCheck } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import Modal from './Modal';
import { useState, useRef, useEffect } from 'react';

const navItems = [
  { to: '/', icon: <FaHome />, label: 'Home' },
  { to: '/cart', icon: <FaShoppingBag />, label: 'Cart' },
  { to: '/account', icon: <FaUser />, label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();
  const { cartCount } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [added, setAdded] = useState({});
  const [filtered, setFiltered] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    fetch('/products/products.json')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  useEffect(() => {
    if (!query) {
      setFiltered([]);
      return;
    }
    const q = query.toLowerCase();
    setFiltered(
      products.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q))
      )
    );
  }, [query, products]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleAddToCart = (product) => {
    setAdded(prev => ({ ...prev, [product.id]: true }));
    if (typeof window !== 'undefined') {
      // Use context if available, otherwise fallback
      if (window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('addToCart', { detail: product }));
      }
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex justify-between items-center max-w-md mx-auto px-4 py-2">
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center flex-1 text-xs font-semibold py-1 px-2 rounded transition-colors duration-200 ${location.pathname === '/' ? 'text-[#FF6F3C]' : 'text-gray-700 hover:text-[#FF6F3C]'}`}
        >
          <span className="text-lg md:text-xl"><FaHome /></span>
          <span className="mt-1">Home</span>
        </Link>
        {/* Search (button) */}
        <button
          className="flex flex-col items-center flex-1 text-xs font-semibold py-1 px-2 rounded transition-colors duration-200 text-gray-700 hover:text-[#FF6F3C]"
          onClick={() => setIsSearchOpen(true)}
        >
          <span className="text-lg md:text-xl"><FaSearch /></span>
          <span className="mt-1">Search</span>
        </button>
        {/* Cart */}
        <Link
          to="/cart"
          className={`flex flex-col items-center flex-1 text-xs font-semibold py-1 px-2 rounded transition-colors duration-200 ${location.pathname === '/cart' ? 'text-[#FF6F3C]' : 'text-gray-700 hover:text-[#FF6F3C]'}`}
        >
          <div className="relative">
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF6F3C] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
            <span className="text-lg md:text-xl"><FaShoppingBag /></span>
          </div>
          <span className="mt-1">Cart</span>
        </Link>
        {/* Profile */}
        <Link
          to="/account"
          className={`flex flex-col items-center flex-1 text-xs font-semibold py-1 px-2 rounded transition-colors duration-200 ${location.pathname === '/account' ? 'text-[#FF6F3C]' : 'text-gray-700 hover:text-[#FF6F3C]'}`}
        >
          <span className="text-lg md:text-xl"><FaUser /></span>
          <span className="mt-1">Profile</span>
        </Link>
      </div>
      {/* Search Modal */}
      <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} title="Search" size="full" slideFrom="top">
        <div className="flex items-center gap-2 mb-6">
          <FaSearch className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            ref={inputRef}
            placeholder="Search for products or categories..."
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6F3C] bg-gray-50 text-gray-900"
          />
        </div>
        {query && filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">No products found for "{query}".</div>
        )}
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((product, idx) => (
            <div key={product.id} className="relative bg-white rounded-2xl shadow-md overflow-hidden group">
              <Link to={`/products/${product.id}`} onClick={() => setIsSearchOpen(false)}>
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base font-semibold text-gray-900 line-clamp-1">{product.name}</span>
                    <span className="text-[#FF6F3C] font-bold text-base">${product.price.toFixed(2)}</span>
                  </div>
                </div>
              </Link>
              <div className="px-3 pb-3">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!!added[product.id]}
                  className={`w-full mt-2 py-2 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
                    ${added[product.id] ? 'bg-[#FF6F3C] text-white cursor-not-allowed' : 'bg-black text-white hover:bg-[#FF6F3C] hover:text-black'}`}
                >
                  {added[product.id] ? <><FaCheck className="inline" /> Added!</> : 'Add to Bag'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </nav>
  );
} 