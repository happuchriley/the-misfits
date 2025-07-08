export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">How do I place an order?</h3>
          <p className="text-gray-600">
            Browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">What is your return policy?</h3>
          <p className="text-gray-600">
            We accept returns within 30 days of purchase. Items must be unworn and in original condition with tags attached.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">How long does shipping take?</h3>
          <p className="text-gray-600">
            Standard shipping typically takes 3-5 business days. Express shipping is available for faster delivery.
          </p>
        </div>
      </div>
    </div>
  );
}
