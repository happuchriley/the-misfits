import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    // Show toast notification
    setToastMessage(`${product.name} added to cart!`);
    setShowToast(true);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount: cart.reduce((count, item) => count + item.quantity, 0),
        showToast,
        setShowToast,
        toastMessage,
      }}
    >
      {children}
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
export function CartConsumer({ children }) {
  return <CartContext.Consumer>{children}</CartContext.Consumer>;
}
export function withCart(Component) {
  return function WrappedComponent(props) {
    return (
      <CartConsumer>
        {(cartContext) => <Component {...props} cart={cartContext} />}
      </CartConsumer>
    );
  };
}
export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
export function CartContextProvider({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
export function CartContextConsumer({ children }) {
  return <CartConsumer>{children}</CartConsumer>;
}
export function withCartContext(Component) {
  return function WrappedComponent(props) {
    return (
      <CartContextConsumer>
        {(cartContext) => <Component {...props} cart={cartContext} />}
      </CartContextConsumer>
    );
  };
}
export function useCartProvider() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartProvider must be used within a CartProvider");
  }
  return context;
}
