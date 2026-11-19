
import React from "react";
import { useCart } from "../context/CartContext";

type CartIconProps = {
  className?: string;
};

export default function CartIcon({ className = "" }: CartIconProps) {
  const { cartCount } = useCart();

  const itemLabel = `${cartCount} ${
    cartCount === 1 ? "item" : "items"
  }`;

  return (
    <a
      className={`cart-icon-simple ${className}`.trim()}
      href="/cart"
      aria-label={`Shopping cart, ${itemLabel}`}
      title={`Shopping cart (${cartCount})`}
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="20" r="1" />
        <circle cx="19" cy="20" r="1" />

        <path d="M2 3h2l2.2 11.2a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L21 7H5" />
      </svg>

      <span className="cart-count" aria-live="polite">
        {cartCount}
      </span>
    </a>
  );
}
