import React from "react";
import ProductCarousel from "./ProductCarousel";
import type { Product } from "../lib/api";

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: number) => void;
  addingProductId: number | null;
}

export default function ProductQuickView({ product, isOpen, onClose, onAddToCart, addingProductId }: ProductQuickViewProps) {
  if (!isOpen || !product) return null;
  return <div className="quick-view-overlay" onClick={onClose}>
    <div className="quick-view" onClick={e => e.stopPropagation()}>
      <button className="quick-close" onClick={onClose}>×</button>
      <div><ProductCarousel images={product.images || []} productName={product.name}/></div>
      <div className="quick-copy">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <h2>{product.name}</h2><div className="quick-price">₹{Number(product.price || 0).toLocaleString("en-IN")}</div>
        <p>{product.description || "Routine Labz performance nutrition."}</p>
        <div className="quick-meta"><span>CATEGORY <b>{product.category || "SPORTS NUTRITION"}</b></span><span>STATUS <b>{product.inStock ? "IN STOCK" : "OUT OF STOCK"}</b></span></div>
        <button className="btn-gold" disabled={!product.inStock || addingProductId === product.id} onClick={() => onAddToCart(product.id)}>{addingProductId === product.id ? "ADDING..." : "ADD TO CART →"}</button>
      </div>
    </div>
  </div>;
}
