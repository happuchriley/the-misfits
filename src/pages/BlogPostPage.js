import { useParams } from "react-router-dom";

export default function BlogPostPage() {
  const { slug } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Post</h1>
      <p className="text-gray-600">Blog post: {slug}</p>
      <p className="text-gray-500 mt-2">Blog post content coming soon...</p>
    </div>
  );
}
