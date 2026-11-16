
import React from "react";
import "./ManufacturingDetails.css";
import { manufacturingPageData as data } from "./manufacturingPageData";

function LineIcon({ name, className = "" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    building: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="1.5" />
        <path d="M9 21v-4h6v4M8 7h2m4 0h2M8 11h2m4 0h2M8 14h2m4 0h2" />
      </>
    ),
    factory: (
      <>
        <path d="M3 21V9l6 3V8l6 4V5l6 3v13H3Z" />
        <path d="M7 17h2m3 0h2m3 0h2M7 21v-4m5 4v-4m5 4v-4" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  };

  return <svg {...common}>{paths[name] || paths.building}</svg>;
}

function SectionLabel({ children }) {
  return <p className="rl-section-label">{children}</p>;
}

function ContactRow({ item }) {
  if (!item.value) return null;

  const content = (
    <>
      <span className="rl-round-icon">
        <LineIcon name={item.icon} />
      </span>

      <span className="rl-contact-copy">
        {item.label && (
          <span className="rl-contact-label">{item.label}</span>
        )}
        <span className="rl-contact-value">{item.value}</span>
      </span>
    </>
  );

  return item.href ? (
    <a
      className="rl-contact-row"
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noreferrer" : undefined}
    >
      {content}
    </a>
  ) : (
    <div className="rl-contact-row">{content}</div>
  );
}

function DetailRow({ item }) {
  return (
    <div className="rl-detail-row">
      <span className="rl-round-icon">
        <LineIcon name={item.icon || "pin"} />
      </span>

      <span className="rl-detail-copy">
        <strong>{item.label}</strong>
        <span>{item.value || "Add details here"}</span>
      </span>
    </div>
  );
}

export default function ManufacturingDetails() {
  const marketer = data.marketer;
  const manufacturer = data.manufacturer;

  return (
    <main className="rl-manufacturing-page">
      <div className="rl-page-shell">

        {/* PAGE HEADER */}
        <header className="rl-page-header">
          <p className="rl-eyebrow">ROUTINE LABZ</p>
          <h1>{data.pageTitle}</h1>
        </header>

        {/* MARKETED BY */}
        <section
          className="rl-info-card"
          aria-labelledby="rl-marketed-heading"
        >
          <div className="rl-large-icon">
            <LineIcon name="building" />
          </div>

          <SectionLabel>Marketed by</SectionLabel>

          {marketer.logo ? (
            <img
              className="rl-brand-image"
              src={marketer.logo}
              alt={`${marketer.name} logo`}
            />
          ) : (
            <div className="rl-wordmark" id="rl-marketed-heading">
              {marketer.name}
            </div>
          )}

          <span className="rl-red-rule" />

          <div className="rl-tagline">
            {marketer.tagline}
          </div>

          <div className="rl-description">
            {marketer.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {marketer.contacts.some((item) => item.value) && (
            <div className="rl-subsection">
              <SectionLabel>Contact details</SectionLabel>

              <div className="rl-contact-list">
                {marketer.contacts.map((item) => (
                  <ContactRow key={item.label} item={item} />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* MANUFACTURED BY */}
        <section
          className="rl-info-card rl-manufacturer-card"
          aria-labelledby="rl-manufacturer-heading"
        >
          <div className="rl-large-icon">
            <LineIcon name="factory" />
          </div>

          <SectionLabel>Manufactured by</SectionLabel>

          <h2
            className="rl-manufacturer-name"
            id="rl-manufacturer-heading"
          >
            {manufacturer.name}
          </h2>

          <span className="rl-red-rule" />

          <div className="rl-description">
            {manufacturer.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* MANUFACTURING DETAILS */}
          <div className="rl-subsection rl-manufacturing-details">
            <SectionLabel>Manufacturing details</SectionLabel>

            <div className="rl-detail-list">
              {manufacturer.details.map((item) => (
                <DetailRow key={item.label} item={item} />
              ))}
            </div>
          </div>

          {/* CERTIFICATION */}
          <div className="rl-subsection rl-certification-section">
            <SectionLabel>Certification</SectionLabel>

            {manufacturer.certificationImage ? (
              <img
                className="rl-certification-image"
                src={manufacturer.certificationImage}
                alt="Manufacturer certifications"
              />
            ) : (
              <div className="rl-certification-placeholder">
                Add your certification artwork and set its path in
                manufacturingPageData.js
              </div>
            )}
          </div>
        </section>

        <footer className="rl-page-footer">
          Product information · {marketer.name}
        </footer>

      </div>
    </main>
  );
}
