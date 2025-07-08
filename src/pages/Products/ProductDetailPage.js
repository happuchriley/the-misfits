import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/products/products.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => String(p.id) === String(id));
        setProduct(found);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (isAdded) return;
    setIsAdded(true);
    if (product) addToCart(product);
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <span className="animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto pb-24 bg-white min-h-screen">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 pt-4">
        <Link to="/products" className="p-2 rounded-full hover:bg-gray-100 transition">
          <FaArrowLeft className="w-5 h-5 text-gray-900" />
        </Link>
        <span className="font-bold text-lg tracking-widest text-gray-900">THE-<span className="text-[#FF6F3C]">MISFITS</span></span>
        <div className="w-8" />
      </div>

      {/* Product Image */}
      <div className="mt-4 px-4">
        <img src={product.image} alt={product.name} className="w-full h-72 object-cover rounded-2xl shadow-md" />
      </div>

      {/* Info */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <span className="text-[#FF6F3C] text-xl font-extrabold">${product.price.toFixed(2)}</span>
        </div>
        <div className="flex gap-2 mb-4">
          <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded-full">NEW</span>
          <span className="bg-[#FF6F3C] text-white text-xs font-bold px-2 py-1 rounded-full">REGULAR FIT</span>
        </div>
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">DETAIL</h2>
          <p className="text-gray-600 text-sm">A creatively styled unisex hoodie by THE-MISFITS. This product is cut to a straight fit in premium fabric. (Demo description)</p>
        </div>
        <button
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all mt-4 shadow-lg flex items-center justify-center gap-2
            ${isAdded ? 'bg-[#FF6F3C] text-white cursor-not-allowed' : 'bg-black text-white hover:bg-[#FF6F3C] hover:text-black'}`}
          onClick={handleAddToCart}
          disabled={isAdded}
        >
          {isAdded ? <><FaCheck className="inline" /> Added!</> : 'Add to Bag'}
        </button>
      </div>
    </div>
  );
}
