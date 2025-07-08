import React, { useEffect, useState } from 'react';
import { fetchCart, removeFromCart } from '../supabase/cart';
import { getCurrentUser } from '../supabase/auth';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getCurrentUser().then(({ data }) => {
      setUserId(data?.user?.id || null);
    });
  }, []);

  useEffect(() => {
    if (userId) {
      fetchCart(userId).then(({ data }) => {
        setCart(data || []);
        setLoading(false);
      });
    }
  }, [userId]);

  const handleRemove = async (id) => {
    await removeFromCart(id);
    setCart(cart.filter(item => item.id !== id));
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!userId) return <div className="text-center mt-10">Please log in to view your cart.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.id} className="flex items-center justify-between mb-4 bg-white p-4 rounded shadow">
              <div>
                <div className="font-bold">{item.products?.name}</div>
                <div>Qty: {item.quantity}</div>
              </div>
              <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => handleRemove(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
