import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Details</h1>
      <p className="text-gray-600">Product ID: {id}</p>
      <p className="text-gray-600">Product detail page coming soon...</p>
    </div>
  );
}
