import { useState } from "react";
import ProductCard from "../../components/Product/ProductCard";
import { useCart } from "../../context/CartContext";

// Mock data (would typically come from an API in a real app)
const mockProducts = [
  {
    id: 1,
    name: "Classic White Tee",
    price: 29.99,
    image: "/placeholder.jpg",
    colors: ["white", "black", "gray"],
    rating: 4.5,
    inStock: true,
  },
  {
    id: 2,
    name: "Premium Denim Jeans",
    price: 89.99,
    image: "/placeholder.jpg",
    colors: ["blue", "black"],
    rating: 4.8,
    inStock: true,
  },
  {
    id: 3,
    name: "Casual Sneakers",
    price: 59.99,
    image: "/placeholder.jpg",
    colors: ["white", "black"],
    rating: 4.2,
    inStock: false,
  },
];

export default function ProductsPage() {
  const [products] = useState(mockProducts);
  const [filter, setFilter] = useState("all");
  const { addToCart } = useCart();

  // Filter products based on selection
  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((product) =>
          filter === "in-stock" ? product.inStock : !product.inStock
        );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Our Collection</h1>

        <div className="mt-4 md:mt-0 flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-md ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setFilter("in-stock")}
            className={`px-4 py-2 rounded-md ${
              filter === "in-stock" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            In Stock
          </button>
          <button
            onClick={() => setFilter("out-of-stock")}
            className={`px-4 py-2 rounded-md ${
              filter === "out-of-stock"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Out of Stock
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            No products found matching your criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
