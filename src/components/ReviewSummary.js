import React from 'react';
import RatingStars from './RatingStars';

const ReviewSummary = ({ reviews = [], averageRating = 0, totalReviews = 0 }) => {
  const ratingDistribution = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  };

  // Calculate rating distribution
  reviews.forEach(review => {
    if (ratingDistribution.hasOwnProperty(review.rating)) {
      ratingDistribution[review.rating]++;
    }
  });

  const getPercentage = (count) => {
    return totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
  };

  const getRatingText = (rating) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Average';
    if (rating >= 2.0) return 'Below Average';
    return 'Poor';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Reviews</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="mb-4">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <RatingStars rating={averageRating} size="lg" />
            <p className="text-sm text-gray-600 mt-1">{getRatingText(averageRating)}</p>
          </div>
          
          <div className="text-sm text-gray-500">
            Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
          </div>
          
          {totalReviews > 0 && (
            <div className="mt-4">
              <div className="text-xs text-gray-500 mb-2">Rating Distribution</div>
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center space-x-2 mb-1">
                  <span className="text-xs text-gray-600 w-4">{rating}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${getPercentage(ratingDistribution[rating])}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 w-8">
                    {ratingDistribution[rating]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Review Highlights */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Review Highlights</h4>
          
          {totalReviews === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-gray-500">No reviews yet</p>
              <p className="text-sm text-gray-400">Be the first to review this product!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Positive Highlights */}
              {reviews.filter(r => r.rating >= 4).slice(0, 3).map((review, index) => (
                <div key={index} className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 line-clamp-2">
                        "{review.content}"
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <RatingStars rating={review.rating} size="xs" />
                        <span className="text-xs text-gray-500">- {review.userName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Negative Highlights (if any) */}
              {reviews.filter(r => r.rating <= 2).slice(0, 1).map((review, index) => (
                <div key={index} className="bg-red-50 p-3 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 line-clamp-2">
                        "{review.content}"
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <RatingStars rating={review.rating} size="xs" />
                        <span className="text-xs text-gray-500">- {review.userName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Stats */}
      {totalReviews > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalReviews}</div>
              <div className="text-sm text-gray-500">Total Reviews</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {Math.round((reviews.filter(r => r.rating >= 4).length / totalReviews) * 100)}%
              </div>
              <div className="text-sm text-gray-500">Would Recommend</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {reviews.filter(r => r.verifiedPurchase).length}
              </div>
              <div className="text-sm text-gray-500">Verified Purchases</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {reviews.filter(r => r.images && r.images.length > 0).length}
              </div>
              <div className="text-sm text-gray-500">With Photos</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSummary;
