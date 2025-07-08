import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../supabase/orders';
import { getCurrentUser } from '../supabase/auth';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getCurrentUser().then(({ data }) => {
      setUserId(data?.user?.id || null);
    });
  }, []);

  useEffect(() => {
    if (userId) {
      fetchOrders(userId).then(({ data }) => {
        setOrders(data || []);
        setLoading(false);
      });
    }
  }, [userId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!userId) return <div className="text-center mt-10">Please log in to view your orders.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <div>You have no orders.</div>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id} className="mb-4 bg-white p-4 rounded shadow">
              <div className="font-bold">Order #{order.id}</div>
              <div>Total: ${order.total}</div>
              <div>Items: {Array.isArray(order.items) ? order.items.length : 0}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 