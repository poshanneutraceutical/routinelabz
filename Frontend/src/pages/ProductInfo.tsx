
import React, { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import type { Product } from "../lib/api";
import { useCart } from "../context/CartContext";
import ProductCarousel from "../components/ProductCarousel";

const PRODUCT_PRESENTATION = [
  {
    category: "Mass Gainer",
    namePrefix: "Mass Gainer",
    familyName: "MASS GAINER",
    stats: [
      ["63g", "CARBS"],
      ["1200mg", "CREATINE"],
      ["20g", "PROTEIN"],
      ["30", "SERVINGS"],
    ],
    galleries: {
      CHOCOLATE: [
        "/products/mass-gainer/chocolate/front.png",
        "/products/mass-gainer/chocolate/side.png",
        "/products/mass-gainer/chocolate/back.png",
      ],
      KULFI: [
        "/products/mass-gainer/kulfi/front.png",
        "/products/mass-gainer/kulfi/side.png",
        "/products/mass-gainer/kulfi/back.png",
      ],
    },
  },
  {
    category: "Lean Mass Gainer",
    namePrefix: "Lean Mass Gainer",
    familyName: "LEAN MASS GAINER",
    stats: [
      ["50g", "PROTEIN"],
      ["3g", "HEALTHY FATS"],
      ["75g", "CARBS"],
      ["20", "SERVINGS"],
    ],
    galleries: {
      CHOCOLATE: [
        "/products/lean-mass-gainer/chocolate/front.png",
        "/products/lean-mass-gainer/chocolate/side.png",
        "/products/lean-mass-gainer/chocolate/back.png",
      ],
      KULFI: [
        "/products/lean-mass-gainer/kulfi/front.png",
        "/products/lean-mass-gainer/kulfi/side.png",
        "/products/lean-mass-gainer/kulfi/back.png",
      ],
    },
  },
  {
    category: "Essential Whey",
    namePrefix: "Essential Whey",
    familyName: "ESSENTIAL WHEY",
    stats: [
      ["24g", "PROTEIN"],
      ["8.5g", "EAA"],
      ["2.0g", "BCAA"],
      ["50", "SERVINGS"],
    ],
    galleries: {
      CHOCOLATE: [
        "/products/essential-whey/chocolate/front.png",
        "/products/essential-whey/chocolate/side.png",
        "/products/essential-whey/chocolate/back.png",
      ],
      KULFI: [
        "/products/essential-whey/kulfi/front.png",
        "/products/essential-whey/kulfi/side.png",
        "/products/essential-whey/kulfi/back.png",
      ],
    },
  },
  {
    category: "Whey Protein",
    namePrefix: "Whey Protein",
    familyName: "WHEY PROTEIN",
    stats: [
      ["24g", "PROTEIN"],
      ["3g", "CARBS"],
      ["11.31g", "EAA"],
      ["0g", "ADDED SUGAR"],
    ],
    galleries: {
      CHOCOLATE: [
        "/products/whey/chocolate/front.jpeg",
        "/products/whey/chocolate/side.jpeg",
        "/products/whey/chocolate/back.jpeg",
      ],
      KULFI: [
        "/products/whey/kulfi/front.jpeg",
        "/products/whey/kulfi/side.jpeg",
        "/products/whey/kulfi/back.png",
      ],
    },
  },
] as const;

type Flavour = "CHOCOLATE" | "KULFI";

const formatPrice = (value: number) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;

export default function ProductInfo() {
  const productId = Number(
    window.location.pathname.split("/").filter(Boolean).pop()
  );

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [cartError, setCartError] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    let active = true;

    setLoading(true);
    setProduct(null);
    setError("");

    if (!Number.isInteger(productId) || productId <= 0) {
      setError("Invalid product link.");
      setLoading(false);

      return () => {
        active = false;
      };
    }

    api.getProduct(productId)
      .then((result) => {
        if (active) setProduct(result);
      })
      .catch((requestError) => {
        console.error("Unable to load product:", requestError);

        if (active) {
          setError(
            "This product could not be loaded. Return to the product list and try again."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [productId]);

  const presentation = useMemo(() => {
    if (!product) return null;

    const family = PRODUCT_PRESENTATION.find(
      (item) =>
        String(product.category || "").toLowerCase() ===
          item.category.toLowerCase() &&
        String(product.name || "")
          .toLowerCase()
          .startsWith(item.namePrefix.toLowerCase())
    );

    if (!family) return null;

    const flavour = String(product.badge || "").toUpperCase() as Flavour;

    if (flavour !== "CHOCOLATE" && flavour !== "KULFI") {
      return null;
    }

    return {
      familyName: family.familyName,
      flavour,
      stats: family.stats,
      gallery: [...family.galleries[flavour]],
    };
  }, [product]);

  const handleAddToCart = async () => {
    if (!product) return;

    setAdding(true);
    setCartError("");

    try {
      await addToCart(product.id, quantity);
      window.location.href = "/cart";
    } catch (requestError) {
      console.error(
        "Unable to add selected flavour to cart:",
        requestError
      );

      setCartError(
        "Unable to add this flavour to your cart. Please try again."
      );
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="product-page">
        <div className="shop-empty">LOADING PRODUCT...</div>
      </div>
    );
  }

  if (error || !product || !presentation) {
    return (
      <div className="product-page">
        <header className="shop-header">
          <a href="/" className="shop-logo">
            ROUTINE <b>LABZ</b>
          </a>
          <a href="/#products" className="shop-back">
            ← PRODUCTS
          </a>
        </header>

        <main className="shop-container">
          <div className="shop-empty">
            <h2>PRODUCT UNAVAILABLE</h2>
            <p>
              {error ||
                "The selected product or flavour is not configured. Check the products table and run the local SQL migration."}
            </p>
            <a className="btn-gold" href="/#products">
              BACK TO PRODUCTS
            </a>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="product-page">
      <header className="shop-header">
        <a href="/" className="shop-logo">
          ROUTINE <b>LABZ</b>
        </a>
        <a href="/#products" className="shop-back">
          ← PRODUCTS
        </a>
      </header>

      <main className="product-detail product-detail-variant">
        <div className="product-detail-gallery-column">
          <ProductCarousel
            key={`${product.id}-${presentation.flavour}`}
            images={presentation.gallery}
            productName={`${presentation.familyName} ${presentation.flavour}`}
          />

          <div className="product-gallery-caption">
            PRODUCT PHOTOGRAPHS · FRONT / SIDE / BACK · SWIPE OR USE ARROWS
          </div>
        </div>

        <div className="product-detail-copy product-detail-variant-copy">
          <span>ROUTINE LABZ / {product.category}</span>

          <h1>{presentation.familyName}</h1>

          <div className="product-detail-flavour">
            {presentation.flavour} FLAVOUR
          </div>

          <div className="product-price">
            {formatPrice(Number(product.price || 0))}
          </div>

          <div className="product-detail-divider" />

          <h2>PRODUCT DESCRIPTION</h2>
          <p>{product.description}</p>

          <div className="product-detail-variant-stats">
            {presentation.stats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <small>{label}</small>
              </div>
            ))}
          </div>

          <div
            className={`product-detail-stock ${
              product.inStock ? "is-stock" : "is-out"
            }`}
          >
            <span />
            {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
          </div>

          <div className="product-detail-buy-row">
            <div className="product-detail-quantity">
              <button
                type="button"
                disabled={adding}
                onClick={() =>
                  setQuantity((value) => Math.max(1, value - 1))
                }
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                disabled={adding}
                onClick={() =>
                  setQuantity((value) => Math.min(20, value + 1))
                }
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="btn-gold product-detail-add"
              disabled={!product.inStock || adding}
              onClick={handleAddToCart}
            >
              {adding ? "ADDING TO CART..." : "ADD TO CART →"}
            </button>
          </div>

          {cartError && (
            <p className="product-detail-error" role="alert">
              {cartError}
            </p>
          )}

          <div className="product-detail-trust">
            <span>SECURE CHECKOUT</span>
            <span>ROUTINE LABZ</span>
            <span>PERFORMANCE NUTRITION</span>
          </div>
        </div>
      </main>
    </div>
  );
}
