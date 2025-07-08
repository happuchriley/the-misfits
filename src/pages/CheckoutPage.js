import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder } from '../supabase/orders';
import { useNavigate } from 'react-router-dom';

const PAYSTACK_PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxx';

export default function CheckoutPage() {
  const { cart, cartTotal, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    name: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setShipping(s => ({
        ...s,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: user.email || '',
        phone: user.phone || '',
      }));
    }
  }, [user]);

  const handleShippingChange = e => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePaystack = () => {
    setError(null);
    setSuccess(null);
    setPaying(true);
    const handler = window.PaystackPop && window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: shipping.email,
      amount: cartTotal * 100, // kobo
      currency: 'NGN',
      ref: 'MISFITS_' + Date.now(),
      callback: async function(response) {
        setPaying(false);
        setSuccess('Payment successful! Ref: ' + response.reference);
        // Save order to Supabase with payment details
        try {
          await placeOrder(user ? user.id : null, {
            cart,
            shipping,
            paymentRef: response.reference,
            paymentMethod,
            payment_status: 'paid',
            payment_provider: 'paystack',
            payment_details: response
          }, cartTotal);
          navigate('/order-confirmation', { state: { paymentRef: response.reference } });
        } catch (err) {
          setError('Order could not be saved. Please contact support.');
        }
        // Clear cart after payment
        cart.forEach(item => removeFromCart(item.id));
      },
      onClose: function() {
        setPaying(false);
        setError('Payment cancelled.');
      },
      metadata: {
        custom_fields: [
          { display_name: 'Mobile Number', variable_name: 'mobile_number', value: shipping.phone },
        ],
      },
    });
    if (handler) handler.openIframe();
    else setError('Paystack script not loaded.');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!shipping.name || !shipping.email || !shipping.phone || !shipping.address) {
      setError('Please fill all shipping fields.');
      return;
    }
    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    handlePaystack();
  };

  // Load Paystack script
  useEffect(() => {
    if (!window.PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Info */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-3">
              <input name="name" value={shipping.name} onChange={handleShippingChange} className="w-full border px-3 py-2 rounded" placeholder="Full Name" />
              <input name="email" value={shipping.email} onChange={handleShippingChange} className="w-full border px-3 py-2 rounded" placeholder="Email" type="email" />
              <input name="phone" value={shipping.phone} onChange={handleShippingChange} className="w-full border px-3 py-2 rounded" placeholder="Phone Number" />
              <input name="address" value={shipping.address} onChange={handleShippingChange} className="w-full border px-3 py-2 rounded" placeholder="Address" />
              <input name="city" value={shipping.city} onChange={handleShippingChange} className="w-full border px-3 py-2 rounded" placeholder="City" />
              <input name="country" value={shipping.country} onChange={handleShippingChange} className="w-full border px-3 py-2 rounded" placeholder="Country" />
            </div>
          </div>
          {/* Order Summary & Payment */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <ul className="mb-4 divide-y">
              {cart.map(item => (
                <li key={item.id} className="py-2 flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₦{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="font-bold text-lg mb-4">Total: ₦{cartTotal}</div>
            <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                Visa/Mastercard
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="paymentMethod" value="momo" checked={paymentMethod === 'momo'} onChange={() => setPaymentMethod('momo')} />
                MoMo
              </label>
            </div>
            <button type="submit" className="w-full bg-[#FF6F3C] text-white py-3 rounded font-bold mt-2 disabled:opacity-50" disabled={paying}>{paying ? 'Processing...' : 'Pay Now'}</button>
            {error && <div className="mt-4 text-red-600 text-center text-sm">{error}</div>}
            {success && <div className="mt-4 text-green-600 text-center text-sm">{success}</div>}
          </div>
        </form>
      </div>
    </div>
  );
} 