import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const { paymentRef } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        {paymentRef && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Payment Details</h3>
            <p className="text-sm text-gray-600">Payment Reference: <span className="font-mono">{paymentRef}</span></p>
            <p className="text-sm text-green-600 font-medium">Payment Status: Paid</p>
          </div>
        )}

        <div className="space-y-4">
          <p className="text-gray-600">You will receive an email confirmation shortly with your order details.</p>
          <p className="text-gray-600">We'll notify you when your order ships.</p>
        </div>

        <div className="mt-8 space-y-3">
          <Link to="/account/orders" className="block w-full bg-[#FF6F3C] text-white py-3 px-6 rounded font-medium hover:bg-[#e55a2b] transition-colors">
            View Order History
          </Link>
          <Link to="/" className="block w-full bg-gray-200 text-gray-800 py-3 px-6 rounded font-medium hover:bg-gray-300 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
} 