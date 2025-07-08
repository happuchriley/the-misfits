import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { category } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Category: {category}</h1>
      <p className="text-gray-600">Category page coming soon...</p>
    </div>
  );
}
