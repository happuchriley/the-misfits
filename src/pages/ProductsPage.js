import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../supabase/products';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then(({ data, error }) => {
      if (error) {
        setProducts([]);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="bg-white p-4 rounded shadow">
          {product.image_url && (
            <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
          )}
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-gray-700">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
