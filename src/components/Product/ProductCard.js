import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProductCard({ product, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!product.inStock || isAdded) return;

    setIsAdded(true);
    
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image || "/placeholder-product.jpg"}
            alt={product.name}
            className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        {!product.inStock && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
            Out of Stock
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
            New
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link
          to={`/products/${product.id}`}
          className="group-hover:text-blue-600"
        >
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center mb-2">
            {/* Star Rating */}
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < (product.rating || 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviewCount || 0})
            </span>
          </div>
        </Link>

        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform ${
              isAdded
                ? 'bg-green-500 text-white shadow-lg scale-105 ring-2 ring-green-300 ring-opacity-50'
                : product.inStock
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-md'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            disabled={!product.inStock || isAdded}
            onClick={handleAddToCart}
          >
            {isAdded ? (
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Added!</span>
              </div>
            ) : product.inStock ? (
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                <span>Add to Cart</span>
              </div>
            ) : (
              "Sold Out"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    inStock: PropTypes.bool,
    isNew: PropTypes.bool,
    originalPrice: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func,
};

ProductCard.defaultProps = {
  product: {
    image: "/placeholder-product.jpg",
    rating: 0,
    reviewCount: 0,
    inStock: true,
    isNew: false,
  },
  onAddToCart: () => {},
};
// Example usage:
// <ProductCard product={{
//   id: 1,
//   name: "Stylish T-Shirt",
//   price: 29.99,
//   image: "/images/tshirt.jpg",
//   rating: 4.5,
//   reviewCount: 120,
//   inStock: true,
//   isNew: true,
//   originalPrice: 39.99
// }} />
// This component can be used in a ProductsPage or similar to display a list of products.
// Ensure to replace the placeholder image path with actual product images in your project.
