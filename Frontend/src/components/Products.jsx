
import React, { useEffect, useMemo, useState } from "react";
import useReveal from "../hooks/useReveal";
import { useCart } from "../context/CartContext";
import { api } from "../lib/api";
import "../styles/product-variants.css";

const FAMILY_CONFIG = [
  {
    key: "mass-gainer",
    category: "Mass Gainer",
    namePrefix: "Mass Gainer",
    title: "MASS GAINER",
    number: "01",
    description:
      "A high-calorie mass formula designed to support weight gain, training fuel and recovery.",
    stats: [
      ["63g", "Carbs"],
      ["1200mg", "Creatine"],
      ["20g", "Protein"],
      ["30", "Servings"],
    ],
    flavours: {
      CHOCOLATE: {
        front: "/products/mass-gainer/chocolate/front.png",
        gallery: [
          "/products/mass-gainer/massgainer1.jpeg",
          "/products/mass-gainer/massgainer1.jpeg",
          "/products/mass-gainer/massgainer1.jpeg",
        ],
      },
      KULFI: {
        front: "/products/mass-gainer/kulfi/front.png",
        gallery: [
          "/products/mass-gainer/kulfi/front.png",
          "/products/mass-gainer/kulfi/side.png",
          "/products/mass-gainer/kulfi/back.png",
        ],
      },
    },
  },
  {
    key: "lean-mass-gainer",
    category: "Lean Mass Gainer",
    namePrefix: "Lean Mass Gainer",
    title: "LEAN MASS GAINER",
    number: "02",
    description:
      "A balanced lean-mass formula designed to support muscle development, strength and recovery.",
    stats: [
      ["50g", "Protein"],
      ["3g", "Healthy fats"],
      ["75g", "Carbs"],
      ["20", "Servings"],
    ],
    flavours: {
      CHOCOLATE: {
        front: "/products/lean-mass-gainer/chocolate/front.png",
        gallery: [
          "/products/lean-mass-gainer/chocolate/front.png",
          "/products/lean-mass-gainer/chocolate/side.png",
          "/products/lean-mass-gainer/chocolate/back.png",
        ],
      },
      KULFI: {
        front: "/products/lean-mass-gainer/kulfi/front.png",
        gallery: [
          "/products/lean-mass-gainer/kulfi/front.png",
          "/products/lean-mass-gainer/kulfi/side.png",
          "/products/lean-mass-gainer/kulfi/back.png",
        ],
      },
    },
  },
  {
    key: "essential-whey",
    category: "Essential Whey",
    namePrefix: "Essential Whey",
    title: "ESSENTIAL WHEY",
    number: "03",
    description:
      "Premium essential whey protein for daily protein intake, training support and recovery.",
    stats: [
      ["24g", "Protein"],
      ["8.5g", "EAA"],
      ["2.0g", "BCAA"],
      ["50", "Servings"],
    ],
    flavours: {
      CHOCOLATE: {
        front: "/products/essential-whey/chocolate/front.png",
        gallery: [
          "/products/essential-whey/chocolate/front.png",
          "/products/essential-whey/chocolate/side.png",
          "/products/essential-whey/chocolate/back.png",
        ],
      },
      KULFI: {
        front: "/products/essential-whey/kulfi/front.png",
        gallery: [
          "/products/essential-whey/kulfi/front.png",
          "/products/essential-whey/kulfi/side.png",
          "/products/essential-whey/kulfi/back.png",
        ],
      },
    },
  },
  {
    key: "whey-protein",
    category: "Whey Protein",
    namePrefix: "Whey Protein",
    title: "WHEY PROTEIN",
    number: "04",
    description:
      "Performance whey protein with essential amino acids for convenient everyday nutrition.",
    stats: [
      ["24g", "Protein"],
      ["3g", "Carbs"],
      ["11.31g", "EAA"],
      ["0g", "Added sugar"],
    ],
    flavours: {
      CHOCOLATE: {
        front: "/products/whey/chocolate/front.jpeg",
        gallery: [
          "/products/whey/chocolate/front.jpeg",
          "/products/whey/chocolate/side.jpeg",
          "/products/whey/chocolate/back.jpeg",
        ],
      },
      KULFI: {
        front: "/products/whey/kulfi/front.jpeg",
        gallery: [
          "/products/whey/kulfi/front.jpeg",
          "/products/whey/kulfi/side.jpeg",
          "/products/whey/kulfi/back.png",
        ],
      },
    },
  },
];

const FLAVOUR_ORDER = ["CHOCOLATE", "KULFI"];

const normalize = (value) =>
  String(value || "").trim().toLowerCase();

function getVariant(products, family, flavour) {
  return products.find((product) =>
    normalize(product.category) === normalize(family.category) &&
    normalize(product.name).startsWith(normalize(family.namePrefix)) &&
    String(product.badge || "").trim().toUpperCase() === flavour
  );
}

const formatPrice = (price) =>
  price === null || price === undefined
    ? "PRICE NOT SET"
    : `₹${Number(price).toLocaleString("en-IN", {
        maximumFractionDigits: 0,
      })}`;

export default function Products() {
  useReveal();

  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [selectedFlavours, setSelectedFlavours] = useState(() =>
    Object.fromEntries(
      FAMILY_CONFIG.map((family) => [family.key, "CHOCOLATE"])
    )
  );

  const [addingProductId, setAddingProductId] = useState(null);
  const [cartError, setCartError] = useState("");
  const [addedProductIds, setAddedProductIds] = useState(
    () => new Set()
  );

  useEffect(() => {
    let active = true;

    api.getProducts()
      .then((result) => {
        if (!active) return;

        setProducts(Array.isArray(result) ? result : []);
        setLoadError("");
      })
      .catch((error) => {
        console.error("Unable to load Routine Labz products:", error);

        if (active) {
          setLoadError(
            "Products could not be loaded. Check the backend connection and refresh."
          );
        }
      })
      .finally(() => {
        if (active) setLoadingProducts(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const variantsByFamily = useMemo(() => {
    const result = {};

    FAMILY_CONFIG.forEach((family) => {
      result[family.key] = {};

      FLAVOUR_ORDER.forEach((flavour) => {
        result[family.key][flavour] = getVariant(
          products,
          family,
          flavour
        );
      });
    });

    return result;
  }, [products]);

  const selectFlavour = (event, familyKey, flavour) => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedFlavours((current) => ({
      ...current,
      [familyKey]: flavour,
    }));

    setCartError("");
  };

  const goToProduct = (variant) => {
    if (variant?.id) {
      window.location.href = `/product/${variant.id}`;
    }
  };

  const handleCardClick = (event, variant) => {
    if (event.target.closest("button, a, input, select")) return;
    goToProduct(variant);
  };

  const handleCardKeyDown = (event, variant) => {
    if (
      (event.key === "Enter" || event.key === " ") &&
      event.target === event.currentTarget
    ) {
      event.preventDefault();
      goToProduct(variant);
    }
  };

  const handleAddToCart = async (event, variant) => {
    event.preventDefault();
    event.stopPropagation();

    if (!variant?.id) {
      setCartError(
        "This flavour is not available in the database. Run the local product SQL migration first."
      );
      return;
    }

    setCartError("");
    setAddingProductId(variant.id);

    try {
      await addToCart(variant.id, 1);

      setAddedProductIds((current) =>
        new Set(current).add(variant.id)
      );
    } catch (error) {
      console.error("Unable to add product to cart:", error);
      setCartError("Unable to add this product. Please try again.");
    } finally {
      setAddingProductId(null);
    }
  };

  return (
    <section id="products" className="products-section">
      <div className="section-kicker reveal">
        — THE ROUTINE LABZ STACK —
      </div>

      <h2 className="section-heading reveal">
        FOUR FORMULAS.<span> YOUR FLAVOUR.</span>
      </h2>

      <p className="section-intro reveal">
        Choose Chocolate or Kulfi. Open any product to view its supplied
        photographs and full details.
      </p>

      <div className="product-grid product-variant-grid">
        {FAMILY_CONFIG.map((family, index) => {
          const selectedFlavour =
            selectedFlavours[family.key] || "CHOCOLATE";

          const flavourConfig =
            family.flavours[selectedFlavour];

          const variant =
            variantsByFamily[family.key]?.[selectedFlavour];

          const isAdding =
            addingProductId === variant?.id;

          const wasAdded = Boolean(
            variant?.id && addedProductIds.has(variant.id)
          );

          const detailHref = variant?.id
            ? `/product/${variant.id}`
            : "#products";

          return (
            <article
              className="product-card reveal product-variant-card"
              key={family.key}
              tabIndex={variant?.id ? 0 : -1}
              aria-label={`${family.title} ${selectedFlavour} product card`}
              onClick={(event) => handleCardClick(event, variant)}
              onKeyDown={(event) => handleCardKeyDown(event, variant)}
              style={{
                "--accent": "#d4d7dc",
                "--delay": `${index * 0.08}s`,
              }}
            >
              <div className="product-number">{family.number}</div>

              <a
                href={detailHref}
                className="product-variant-image-link"
                onClick={(event) => {
                  if (!variant?.id) event.preventDefault();
                }}
                aria-label={`View ${family.title} ${selectedFlavour} product details`}
              >
                <div className="product-image-wrap">
                  <div className="product-glow" />

                  <img
                    key={flavourConfig.front}
                    src={flavourConfig.front}
                    alt={`Routine Labz ${family.title} ${selectedFlavour} jar`}
                    loading="lazy"
                  />

                  <span className="product-chip">
                    {selectedFlavour} FLAVOUR
                  </span>

                  <span className="product-variant-view-hint">
                    VIEW PRODUCT ↗
                  </span>
                </div>
              </a>

              <div className="product-body product-variant-body">
                <div className="product-label">
                  ROUTINE LABZ / FORMULA {family.number}
                </div>

                <a
                  href={detailHref}
                  className="product-variant-title-link"
                  onClick={(event) => {
                    if (!variant?.id) event.preventDefault();
                  }}
                >
                  <h3>{family.title}</h3>
                </a>

                <p>{family.description}</p>

                <div className="spec-grid">
                  {family.stats.map(([value, label]) => (
                    <div key={label}>
                      <strong>{value}</strong>
                      <small>{label}</small>
                    </div>
                  ))}
                </div>

                <div
                  className="product-flavour-picker"
                  aria-label={`${family.title} flavour selector`}
                >
                  <span>SELECT FLAVOUR</span>

                  <div className="product-flavour-options">
                    {FLAVOUR_ORDER.map((flavour) => (
                      <button
                        type="button"
                        key={flavour}
                        className={
                          selectedFlavour === flavour ? "selected" : ""
                        }
                        aria-pressed={selectedFlavour === flavour}
                        onClick={(event) =>
                          selectFlavour(event, family.key, flavour)
                        }
                      >
                        {flavour}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="product-variant-buy-row">
                  <div className="product-variant-price">
                    <small>PRICE</small>
                    <strong>{formatPrice(variant?.price)}</strong>
                  </div>

                  <button
                    type="button"
                    className="btn-gold product-add-btn"
                    disabled={
                      loadingProducts ||
                      !variant?.id ||
                      variant.inStock === false ||
                      addingProductId !== null
                    }
                    onClick={(event) =>
                      handleAddToCart(event, variant)
                    }
                  >
                    {loadingProducts
                      ? "LOADING..."
                      : isAdding
                        ? "ADDING..."
                        : wasAdded
                          ? "ADD ANOTHER"
                          : "ADD TO CART"}
                  </button>
                </div>

                {!loadingProducts && !variant && (
                  <p className="product-variant-unavailable">
                    {selectedFlavour} variant is not in the database yet.
                  </p>
                )}

                <a
                  href="#distribute"
                  className="product-link"
                  onClick={(event) => event.stopPropagation()}
                >
                  ENQUIRE FOR BUSINESS <span>↗</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {(loadError || cartError) && (
        <p className="product-variant-error" role="alert">
          {loadError || cartError}
        </p>
      )}
    </section>
  );
}
