export default function ShippingReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shipping & Returns</h1>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <p className="text-gray-700 mb-4">
            We offer standard shipping (3-5 business days) and express shipping (1-2 business days) options.
          </p>
          <p className="text-gray-700">
            Free shipping is available on orders over $50.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
          <p className="text-gray-700 mb-4">
            We accept returns within 30 days of purchase. Items must be unworn and in original condition with all tags attached.
          </p>
          <p className="text-gray-700">
            Return shipping is free for items that arrive damaged or defective.
          </p>
        </div>
      </div>
    </div>
  );
}
