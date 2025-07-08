import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCheck, FaSearch } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export default function SearchPage() {
  const { addToCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
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
    const params = new URLSearchParams(location.search);
    const q = params.get('query') || '';
    setQuery(q);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [location.search]);

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

  const handleAddToCart = (product) => {
    setAdded(prev => ({ ...prev, [product.id]: true }));
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-white pb-24 px-4">
      <div className="flex items-center gap-2 pt-6 mb-6">
        <FaSearch className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            navigate(`/search?query=${encodeURIComponent(e.target.value)}`);
          }}
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
            <Link to={`/products/${product.id}`}>
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
    </div>
  );
} 