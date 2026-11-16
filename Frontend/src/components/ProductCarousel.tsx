import React, { useEffect, useState } from "react";

interface ProductCarouselProps { images: string[]; productName: string; }

export default function ProductCarousel({ images, productName }: ProductCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [failed, setFailed] = useState(false);
  const safeImages = images?.length ? images : [];

  useEffect(() => { setCurrent(0); setFailed(false); }, [images]);
  useEffect(() => {
    if (safeImages.length < 2) return;
    const id = window.setInterval(() => setCurrent(v => (v + 1) % safeImages.length), 3500);
    return () => window.clearInterval(id);
  }, [safeImages.length]);

  if (!safeImages.length || failed) return <div className="product-carousel empty">PRODUCT IMAGE</div>;
  const src = encodeURI(safeImages[current]);
  return <div className="product-carousel">
    <img src={src} alt={`${productName} ${current + 1}`} onError={() => setFailed(true)} />
    {safeImages.length > 1 && <>
      <button onClick={() => setCurrent(v => v === 0 ? safeImages.length - 1 : v - 1)} aria-label="Previous image">←</button>
      <button onClick={() => setCurrent(v => (v + 1) % safeImages.length)} aria-label="Next image">→</button>
      <div className="carousel-dots">{safeImages.map((_, i) => <span className={i === current ? "active" : ""} key={i}/>)}</div>
    </>}
  </div>;
}
