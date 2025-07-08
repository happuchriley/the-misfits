import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck } from 'react-icons/fa';
import { useCart } from "../../context/CartContext";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [added, setAdded] = useState({});
  const { addToCart } = useCart();

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
    <div className="min-h-screen bg-white pb-24 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pt-6">
        <h1 className="text-3xl font-bold text-gray-900">Our Collection</h1>
      </div>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No products found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {products.map((product, idx) => (
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
      )}
    </div>
  );
}
