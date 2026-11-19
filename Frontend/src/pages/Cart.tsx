
import React from "react";
import { useCart } from "../context/CartContext";

function getCartImage(productName: string) {
  const name = String(productName || "").toLowerCase();
  const flavour = name.includes("kulfi") ? "kulfi" : "chocolate";

  if (name.includes("lean mass gainer")) {
    return `/products/lean-mass-gainer/${flavour}/front.png`;
  }

  if (name.includes("essential whey")) {
    return `/products/essential-whey/${flavour}/front.png`;
  }

  if (name.includes("mass gainer")) {
    return `/products/mass-gainer/${flavour}/front.png`;
  }

  if (name.includes("whey protein") || name.startsWith("whey")) {
    return flavour === "kulfi"
      ? "/products/whey/kulfi/front.jpeg"
      : "/products/whey/chocolate/front.jpeg";
  }

  return "/routine labz.png";
}

const money = (value: number) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;

export default function Cart() {
  const {
    cart,
    loading,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const items = cart?.items || [];

  return (
    <div className="shop-page">
      <header className="shop-header">
        <a href="/" className="shop-logo">
          ROUTINE <b>LABZ</b>
        </a>
        <a href="/" className="shop-back">
          ← BACK TO STORE
        </a>
      </header>

      <main className="shop-container">
        <div className="shop-title">
          <span>CART / 01</span>
          <h1>
            YOUR <em>ROUTINE.</em>
          </h1>
        </div>

        {loading && !cart ? (
          <div className="shop-empty">LOADING CART...</div>
        ) : items.length === 0 ? (
          <div className="shop-empty">
            <h2>YOUR CART IS EMPTY.</h2>
            <p>
              Add a product from the Routine Labz stack to continue.
            </p>
            <a className="btn-gold" href="/#products">
              EXPLORE PRODUCTS →
            </a>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map((item) => (
                <article className="cart-item" key={item.productId}>
                  <div className="cart-image">
                    <img
                      src={getCartImage(item.productName)}
                      alt={item.productName}
                    />
                  </div>

                  <div>
                    <span>ROUTINE LABZ</span>
                    <h3>{item.productName}</h3>
                    <p>{money(item.price)}</p>

                    <div className="qty">
                      <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity - 1
                          )
                        }
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <b>{item.quantity}</b>

                      <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity + 1
                          )
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>

                      <button
                        type="button"
                        className="remove"
                        disabled={loading}
                        onClick={() => removeItem(item.productId)}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>

                  <strong>{money(item.subtotal)}</strong>
                </article>
              ))}
            </div>

            <aside className="cart-summary">
              <span>ORDER SUMMARY</span>
              <h2>{money(cart?.totalAmount || 0)}</h2>

              <a className="btn-gold" href="/checkout">
                PROCEED TO CHECKOUT →
              </a>

              <button
                type="button"
                className="clear-btn"
                disabled={loading}
                onClick={clearCart}
              >
                CLEAR CART
              </button>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
