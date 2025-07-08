import { useCart } from "../context/CartContext";
import Navigation from "./Navigation";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <Navigation 
      cartCount={cartCount}
      user={null} // You can pass user data here when authentication is implemented
    />
  );
}
