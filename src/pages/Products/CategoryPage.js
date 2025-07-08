import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const categoryMap = {
  't-shirt': 'T-shirt',
  'hoodie': 'Hoodie',
  'hat': 'Hat',
  'shoes': 'Shoes',
};

export default function CategoryPage() {
  const { category } = useParams();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [added, setAdded] = useState({});

  useEffect(() => {
    fetch('/products/products.json')
      .then(res => res.json())
      .then(data => {
        // Filter by category (case-insensitive, fallback to all)
        const catName = categoryMap[category] || category;
        const filtered = data.filter(p => (p.category || '').toLowerCase() === catName.toLowerCase());
        setProducts(filtered);
      });
  }, [category]);

  const handleAddToCart = (product) => {
    setAdded(prev => ({ ...prev, [product.id]: true }));
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-white pb-24 px-4">
      <div className="flex items-center justify-between mb-6 pt-6">
        <h1 className="text-2xl font-bold text-gray-900 capitalize">{categoryMap[category] || category}</h1>
        <Link to="/products" className="text-[#FF6F3C] text-sm font-semibold hover:underline">All Products</Link>
      </div>
      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No products found in this category.</div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
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
      )}
    </div>
  );
}
