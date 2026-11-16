import React from "react";
import { useCart } from "../context/CartContext";

export default function CartIcon() {
  const { cartCount } = useCart();
  return <a className="cart-icon-simple" href="/cart" aria-label="Shopping Cart">🛒{cartCount > 0 && <span>{cartCount}</span>}</a>;
}
