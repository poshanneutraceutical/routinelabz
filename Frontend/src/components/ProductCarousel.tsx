
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "../styles/product-gallery.css";

interface ProductCarouselProps {
  images: string[];
  productName: string;
}

export default function ProductCarousel({
  images,
  productName,
}: ProductCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [failedImages, setFailedImages] = useState<Set<string>>(
    () => new Set()
  );

  const touchStartX = useRef<number | null>(null);

  const imageKey = useMemo(
    () => (images || []).join("|"),
    [images]
  );

  const availableImages = useMemo(
    () =>
      (images || []).filter(
        (src) => src && !failedImages.has(src)
      ),
    [images, failedImages]
  );

  const activeIndex = Math.min(
    current,
    Math.max(availableImages.length - 1, 0)
  );

  const activeImage = availableImages[activeIndex];

  useEffect(() => {
    setCurrent(0);
    setFailedImages(new Set());
    setLightboxOpen(false);
  }, [imageKey]);

  const goTo = (index: number) => {
    if (!availableImages.length) return;

    setCurrent(
      (index + availableImages.length) %
        availableImages.length
    );
  };

  const previous = () => goTo(activeIndex - 1);
  const next = () => goTo(activeIndex + 1);

  useEffect(() => {
    if (!lightboxOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [
    lightboxOpen,
    activeIndex,
    availableImages.length,
  ]);

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current =
      event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    if (
      touchStartX.current === null ||
      availableImages.length < 2
    ) {
      return;
    }

    const endX =
      event.changedTouches[0]?.clientX ??
      touchStartX.current;

    const delta = endX - touchStartX.current;

    if (Math.abs(delta) > 45) {
      delta > 0 ? previous() : next();
    }

    touchStartX.current = null;
  };

  const handleImageError = (src: string) => {
    setFailedImages(
      (currentSet) => new Set(currentSet).add(src)
    );
    setCurrent(0);
  };

  if (!activeImage) {
    return (
      <div className="product-gallery-empty">
        PRODUCT IMAGES UNAVAILABLE
      </div>
    );
  }

  return (
    <div className="product-gallery">
      <div
        className="product-gallery-stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          className="product-gallery-zoom"
          onClick={() => setLightboxOpen(true)}
          aria-label="Open full-size product photograph"
        >
          ⤢ <span>VIEW FULL IMAGE</span>
        </button>

        <button
          type="button"
          className="product-gallery-main"
          onClick={() => setLightboxOpen(true)}
          aria-label={`View full-size ${productName} photograph`}
        >
          <img
            key={activeImage}
            src={activeImage}
            alt={`${productName} photograph ${activeIndex + 1}`}
            onError={() => handleImageError(activeImage)}
          />
        </button>

        {availableImages.length > 1 && (
          <>
            <button
              type="button"
              className="product-gallery-arrow prev"
              onClick={previous}
              aria-label="Previous photograph"
            >
              ‹
            </button>

            <button
              type="button"
              className="product-gallery-arrow next"
              onClick={next}
              aria-label="Next photograph"
            >
              ›
            </button>

            <span className="product-gallery-count">
              {activeIndex + 1} / {availableImages.length}
            </span>
          </>
        )}
      </div>

      {availableImages.length > 1 && (
        <div
          className="product-gallery-thumbnails"
          aria-label="Product photograph thumbnails"
        >
          {availableImages.map((src, index) => (
            <button
              type="button"
              key={src}
              className={index === activeIndex ? "active" : ""}
              onClick={() => setCurrent(index)}
              aria-label={`Show photograph ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <img
                src={src}
                alt={`${productName} thumbnail ${index + 1}`}
              />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          className="product-gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} full-size photographs`}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className="product-gallery-lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close viewer"
          >
            ×
          </button>

          {availableImages.length > 1 && (
            <button
              type="button"
              className="product-gallery-lightbox-arrow prev"
              onClick={(event) => {
                event.stopPropagation();
                previous();
              }}
              aria-label="Previous photograph"
            >
              ‹
            </button>
          )}

          <img
            src={activeImage}
            alt={`${productName} full-size photograph`}
            onClick={(event) => event.stopPropagation()}
          />

          {availableImages.length > 1 && (
            <button
              type="button"
              className="product-gallery-lightbox-arrow next"
              onClick={(event) => {
                event.stopPropagation();
                next();
              }}
              aria-label="Next photograph"
            >
              ›
            </button>
          )}

          {availableImages.length > 1 && (
            <span className="product-gallery-lightbox-count">
              {activeIndex + 1} / {availableImages.length}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
