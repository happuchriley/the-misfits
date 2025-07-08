import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};
export const getCart = async (userId) => {
  try {
    const response = await api.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};
export const addToCart = async (userId, productId, quantity) => {
  try {
    const response = await api.post(`/cart/${userId}`, { productId, quantity });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};
export const updateCartItem = async (userId, itemId, quantity) => {
  try {
    const response = await api.put(`/cart/${userId}/item/${itemId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};
export const removeFromCart = async (userId, itemId) => {
  try {
    const response = await api.delete(`/cart/${userId}/item/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

export const getUserOrders = async (userId) => {
  try {
    const response = await api.get(`/orders/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};
export const placeOrder = async (userId, orderData) => {
  try {
    const response = await api.post(`/orders/${userId}`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};
export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await api.put(`/users/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    console.error("Error in forgot password:", error);
    throw error;
  }
};
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};
export const getBlogPosts = async () => {
  try {
    const response = await api.get("/blog/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
};
export const getBlogPostBySlug = async (slug) => {
  try {
    const response = await api.get(`/blog/posts/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw error;
  }
};
export const getFAQs = async () => {
  try {
    const response = await api.get("/faqs");
    return response.data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    throw error;
  }
};
export const getShippingReturnsInfo = async () => {
  try {
    const response = await api.get("/legal/shipping-returns");
    return response.data;
  } catch (error) {
    console.error("Error fetching shipping and returns info:", error);
    throw error;
  }
};
export const getPrivacyPolicy = async () => {
  try {
    const response = await api.get("/legal/privacy-policy");
    return response.data;
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    throw error;
  }
};
export const getTermsOfService = async () => {
  try {
    const response = await api.get("/legal/terms-of-service");
    return response.data;
  } catch (error) {
    console.error("Error fetching terms of service:", error);
    throw error;
  }
};
export const getContactInfo = async () => {
  try {
    const response = await api.get("/contact");
    return response.data;
  } catch (error) {
    console.error("Error fetching contact info:", error);
    throw error;
  }
};
export const submitContactForm = async (formData) => {
  try {
    const response = await api.post("/contact", formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};
export const getAboutInfo = async () => {
  try {
    const response = await api.get("/about");
    return response.data;
  } catch (error) {
    console.error("Error fetching about info:", error);
    throw error;
  }
};
export const getWishlist = async (userId) => {
  try {
    const response = await api.get(`/wishlist/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};
export const addToWishlist = async (userId, productId) => {
  try {
    const response = await api.post(`/wishlist/${userId}`, { productId });
    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};
export const removeFromWishlist = async (userId, productId) => {
  try {
    const response = await api.delete(`/wishlist/${userId}/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
};
export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/orders/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  }
};
export const cancelOrder = async (orderId) => {
  try {
    const response = await api.delete(`/orders/cancel/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error canceling order:", error);
    throw error;
  }
};
export const getOrderStatus = async (orderId) => {
  try {
    const response = await api.get(`/orders/status/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order status:", error);
    throw error;
  }
};
export const trackOrder = async (trackingNumber) => {
  try {
    const response = await api.get(`/orders/track/${trackingNumber}`);
    return response.data;
  } catch (error) {
    console.error("Error tracking order:", error);
    throw error;
  }
};
export const getOrderHistory = async (userId) => {
  try {
    const response = await api.get(`/orders/history/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw error;
  }
};
export const getOrderDetails = async (orderId) => {
  try {
    const response = await api.get(`/orders/details/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};
export const getOrderItems = async (orderId) => {
  try {
    const response = await api.get(`/orders/items/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order items:", error);
    throw error;
  }
};
export const getOrderTotal = async (orderId) => {
  try {
    const response = await api.get(`/orders/total/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order total:", error);
    throw error;
  }
};
export const getOrderShippingInfo = async (orderId) => {
  try {
    const response = await api.get(`/orders/shipping/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order shipping info:", error);
    throw error;
  }
};
export const getOrderBillingInfo = async (orderId) => {
  try {
    const response = await api.get(`/orders/billing/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order billing info:", error);
    throw error;
  }
};
export const getOrderPaymentInfo = async (orderId) => {
  try {
    const response = await api.get(`/orders/payment/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order payment info:", error);
    throw error;
  }
};
export const getOrderDiscounts = async (orderId) => {
  try {
    const response = await api.get(`/orders/discounts/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order discounts:", error);
    throw error;
  }
};
export const getOrderCoupons = async (orderId) => {
  try {
    const response = await api.get(`/orders/coupons/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order coupons:", error);
    throw error;
  }
};
export const getOrderGiftCards = async (orderId) => {
  try {
    const response = await api.get(`/orders/gift-cards/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order gift cards:", error);
    throw error;
  }
};
export const getOrderInvoices = async (orderId) => {
  try {
    const response = await api.get(`/orders/invoices/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order invoices:", error);
    throw error;
  }
};
export const getOrderReceipts = async (orderId) => {
  try {
    const response = await api.get(`/orders/receipts/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order receipts:", error);
    throw error;
  }
};
export const getOrderTrackingInfo = async (orderId) => {
  try {
    const response = await api.get(`/orders/tracking/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order tracking info:", error);
    throw error;
  }
};
export const getOrderReturnInfo = async (orderId) => {
  try {
    const response = await api.get(`/orders/returns/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order return info:", error);
    throw error;
  }
};

export const getOrderExchangeInfo = async (orderId) => {
  try {
    const response = await api.get(`/orders/exchanges/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order exchange info:", error);
    throw error;
  }
};
export const getOrderRefundInfo = async (orderId) => {
  try {
    const response = await api.get(`/orders/refunds/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order refund info:", error);
    throw error;
  }
};
export const getOrderCancellationInfo = async (orderId) => {
  try {
    const response = await api.get(`/orders/cancellations/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order cancellation info:", error);
    throw error;
  }
};
export const getOrderStatusHistory = async (orderId) => {
  try {
    const response = await api.get(`/orders/status-history/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order status history:", error);
    throw error;
  }
};
export const getOrderNotes = async (orderId) => {
  try {
    const response = await api.get(`/orders/notes/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order notes:", error);
    throw error;
  }
};
export const getOrderMessages = async (orderId) => {
  try {
    const response = await api.get(`/orders/messages/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order messages:", error);
    throw error;
  }
};
export const getOrderNotifications = async (orderId) => {
  try {
    const response = await api.get(`/orders/notifications/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order notifications:", error);
    throw error;
  }
};

export const getOrderAlerts = async (orderId) => {
  try {
    const response = await api.get(`/orders/alerts/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order alerts:", error);
    throw error;
  }
};
export const getOrderReminders = async (orderId) => {
  try {
    const response = await api.get(`/orders/reminders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order reminders:", error);
    throw error;
  }
};
export const getOrderRecommendations = async (orderId) => {
  try {
    const response = await api.get(`/orders/recommendations/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order recommendations:", error);
    throw error;
  }
};
export const getOrderSuggestions = async (orderId) => {
  try {
    const response = await api.get(`/orders/suggestions/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order suggestions:", error);
    throw error;
  }
};
export const getOrderTips = async (orderId) => {
  try {
    const response = await api.get(`/orders/tips/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order tips:", error);
    throw error;
  }
};
export const getOrderGuides = async (orderId) => {
  try {
    const response = await api.get(`/orders/guides/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order guides:", error);
    throw error;
  }
};
export const getOrderFAQs = async (orderId) => {
  try {
    const response = await api.get(`/orders/faqs/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order FAQs:", error);
    throw error;
  }
};
export const getOrderResources = async (orderId) => {
  try {
    const response = await api.get(`/orders/resources/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order resources:", error);
    throw error;
  }
};
export const getOrderSupport = async (orderId) => {
  try {
    const response = await api.get(`/orders/support/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order support:", error);
    throw error;
  }
};
export const getOrderHelp = async (orderId) => {
  try {
    const response = await api.get(`/orders/help/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order help:", error);
    throw error;
  }
};
export const getOrderAssistance = async (orderId) => {
  try {
    const response = await api.get(`/orders/assistance/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order assistance:", error);
    throw error;
  }
};
export const getOrderCustomerService = async (orderId) => {
  try {
    const response = await api.get(`/orders/customer-service/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer service:", error);
    throw error;
  }
};
export const getOrderCustomerSupport = async (orderId) => {
  try {
    const response = await api.get(`/orders/customer-support/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer support:", error);
    throw error;
  }
};
export const getOrderCustomerCare = async (orderId) => {
  try {
    const response = await api.get(`/orders/customer-care/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer care:", error);
    throw error;
  }
};
export const getOrderCustomerRelations = async (orderId) => {
  try {
    const response = await api.get(`/orders/customer-relations/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer relations:", error);
    throw error;
  }
};
export const getOrderCustomerExperience = async (orderId) => {
  try {
    const response = await api.get(`/orders/customer-experience/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer experience:", error);
    throw error;
  }
};
export const getOrderCustomerFeedback = async (orderId) => {
  try {
    const response = await api.get(`/orders/customer-feedback/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer feedback:", error);
    throw error;
  }
};
export const getOrderCustomerReviews = async (orderId) => {
  try {
    const response = await api.get(`/orders/customer-reviews/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer reviews:", error);
    throw error;
  }
};
export const getOrderCustomerRatings = async (orderId) => {
  try {
    const response = await api.get(`/orders/customer-ratings/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer ratings:", error);
    throw error;
  }
};
export const getOrderCustomerSatisfaction = async (orderId) => {
  try {
    const response = await api.get(`/orders/customer-satisfaction/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer satisfaction:", error);
    throw error;
  }
};
export const getOrderCustomerLoyalty = async (orderId) => {
  try {
    const response = await api.get(`/orders/customer-loyalty/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer loyalty:", error);
    throw error;
  }
};
export const getOrderCustomerRetention = async (orderId) => {
  try {
    const response = await api.get(`/orders/customer-retention/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer retention:", error);
    throw error;
  }
};
export const getOrderCustomerAcquisition = async (orderId) => {
  try {
    const response = await api.get(`/orders/customer-acquisition/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer acquisition:", error);
    throw error;
  }
};
export const getOrderCustomerEngagement = async (orderId) => {
  try {
    const response = await api.get(`/orders/customer-engagement/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer engagement:", error);
    throw error;
  }
};
export const getOrderCustomerJourney = async (orderId) => {
  try {
    const response = await api.get(`/orders/customer-journey/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer journey:", error);
    throw error;
  }
};

export const getOrderCustomerTouchpoints = async (orderId) => {
  try {
    const response = await api.get(`/orders/customer-touchpoints/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer touchpoints:", error);
    throw error;
  }
};
export const getOrderCustomerInteractions = async (orderId) => {
  try {
    const response = await api.get(`/orders/customer-interactions/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer interactions:", error);
    throw error;
  }
};
export const getOrderCustomerSupportTickets = async (orderId) => {
  try {
    const response = await api.get(
      `/orders/customer-support-tickets/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer support tickets:", error);
    throw error;
  }
};
export const getOrderCustomerServiceRequests = async (orderId) => {
  try {
    const response = await api.get(
      `/orders/customer-service-requests/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer service requests:", error);
    throw error;
  }
};
export const getOrderCustomerServiceInteractions = async (orderId) => {
  try {
    const response = await api.get(
      `/orders/customer-service-interactions/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer service interactions:", error);
    throw error;
  }
};
export const getOrderCustomerServiceFeedback = async (orderId) => {
  try {
    const response = await api.get(
      `/orders/customer-service-feedback/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer service feedback:", error);
    throw error;
  }
};
export const getOrderCustomerServiceRatings = async (orderId) => {
  try {
    const response = await api.get(
      `/orders/customer-service-ratings/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer service ratings:", error);
    throw error;
  }
};
export const getOrderCustomerServiceSatisfaction = async (orderId) => {
  try {
    const response = await api.get(
      `/orders/customer-service-satisfaction/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer service satisfaction:", error);
    throw error;
  }
};
export const getOrderCustomerServiceLoyalty = async (orderId) => {
  try {
    const response = await api.get(
      `/orders/customer-service-loyalty/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer service loyalty:", error);
    throw error;
  }
};
export const getOrderCustomerServiceRetention = async (orderId) => {
  try {
    const response = await api.get(
      `/orders/customer-service-retention/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer service retention:", error);
    throw error;
  }
};
export const getOrderCustomerServiceAcquisition = async (orderId) => {
  try {
    const response = await api.get(
      `/orders/customer-service-acquisition/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer service acquisition:", error);
    throw error;
  }
};
export const getOrderCustomerServiceEngagement = async (orderId) => {
  try {
    const response = await api.get(
      `/orders/customer-service-engagement/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer service engagement:", error);
    throw error;
  }
};
export const getOrderCustomerServiceJourney = async (orderId) => {
  try {
    const response = await api.get(
      `/orders/customer-service-journey/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer service journey:", error);
    throw error;
  }
};
export const getOrderCustomerServiceTouchpoints = async (orderId) => {
  try {
    const response = await api.get(
      `/orders/customer-service-touchpoints/${orderId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order customer service touchpoints:", error);
    throw error;
  }
};
