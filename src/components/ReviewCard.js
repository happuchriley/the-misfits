import React from 'react';
import RatingStars from './RatingStars';

const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">
              {review.userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{review.userName}</h4>
            <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <RatingStars rating={review.rating} size="sm" />
          <span className="text-sm text-gray-500">({review.rating}/5)</span>
        </div>
      </div>

      {/* Review Title */}
      {review.title && (
        <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
      )}

      {/* Review Content */}
      <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="mb-4">
          <div className="flex space-x-2 overflow-x-auto">
            {review.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Review image ${index + 1}`}
                className="w-20 h-20 object-cover rounded-md flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}

      {/* Product Info */}
      {review.product && (
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={review.product.image}
              alt={review.product.name}
              className="w-12 h-12 object-cover rounded-md"
            />
            <div>
              <h6 className="font-medium text-gray-900">{review.product.name}</h6>
              <p className="text-sm text-gray-500">
                Size: {review.product.size} | Color: {review.product.color}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Review Helpful */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span>Helpful ({review.helpfulCount || 0})</span>
          </button>
          <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
            Report
          </button>
        </div>
        
        {/* Verified Purchase Badge */}
        {review.verifiedPurchase && (
          <div className="flex items-center space-x-1 text-green-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-medium">Verified Purchase</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
