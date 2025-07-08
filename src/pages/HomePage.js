import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FaCheck } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { FaTshirt } from 'react-icons/fa';
import { GiHoodie, GiClothes, GiConverseShoe } from 'react-icons/gi';
import { MdOutlineLocalOffer } from 'react-icons/md';

const categories = [
  { name: 'T-shirt', icon: <FaTshirt className="w-6 h-6" />, path: '/category/t-shirt' },
  { name: 'Hoodie', icon: <GiHoodie className="w-6 h-6" />, path: '/category/hoodie' },
  { name: 'Hat', icon: <GiClothes className="w-6 h-6" />, path: '/category/hat' },
  { name: 'Shoes', icon: <GiConverseShoe className="w-6 h-6" />, path: '/category/shoes' },
];

export default function HomePage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [added, setAdded] = useState({});

  useEffect(() => {
    fetch('/products/products.json')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    setAdded(prev => ({ ...prev, [product.id]: true }));
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Promo Banner */}
      <section className="px-4 pt-6">
        <div className="rounded-2xl bg-gradient-to-tr from-[#FF6F3C] to-orange-200 flex items-center justify-center p-0 shadow-lg relative overflow-hidden animate-fade-in-up">
          <video
            src="/products/promo.mp4"
            className="w-full h-40 md:h-64 object-cover rounded-2xl"
            autoPlay
            loop
            muted
            playsInline
            poster="/products/jeans-blue1.jpg"
          >
            Sorry, your browser does not support embedded videos.
          </video>
        </div>
      </section>

      {/* Category Scroll */}
      <section className="mt-6 px-4">
        <div className="flex justify-between gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="flex-1 flex flex-col items-center bg-gray-50 rounded-xl p-3 shadow hover:bg-orange-50 transition-all border border-gray-100 mx-1 min-w-0"
              style={{ minWidth: 0 }}
            >
              <span className="mb-1 text-[#FF6F3C]">{cat.icon}</span>
              <span className="text-xs font-semibold text-gray-700 truncate">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrival Section */}
      <section className="mt-8 px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">New Arrival</h3>
          <Link to="/products" className="text-[#FF6F3C] text-sm font-semibold hover:underline">See all</Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {products.slice(0, 4).map((product, idx) => (
            <div key={product.id} className="relative bg-white rounded-2xl shadow-md overflow-hidden group">
              {/* Badges */}
              {idx === 0 && (
                <span className="absolute top-3 left-3 bg-[#FF6F3C] text-white text-xs font-bold px-2 py-1 rounded-full z-10">SALE -40%</span>
              )}
              {idx === 1 && (
                <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-1 rounded-full z-10">NEW</span>
              )}
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
      </section>
    </div>
  );
}
