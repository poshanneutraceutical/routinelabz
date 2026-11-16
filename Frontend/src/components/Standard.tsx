import React from "react";

const standards = [
  ["01", "INGREDIENT QUALITY", "Selected with consistency, identity and intended use in mind."],
  ["02", "FORMULA PRECISION", "Every ingredient earns its place and supports the intended purpose."],
  ["03", "QUALITY CONTROL", "Checks are built into the journey from material to finished product."],
  ["04", "PERFORMANCE FOCUS", "Products are designed to support real training routines."],
];

export default function Standard({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id="standard"
      className={`brand-section standard-section ${compact ? "compact" : ""}`}
    >
      <div className="brand-container">
        <div className="brand-heading-row">
          <div>
            <span className="brand-number">03</span>
            <span className="brand-kicker">THE ROUTINE STANDARD</span>
          </div>
          <a href="/standard" className="brand-more">
            OUR STANDARD ↗
          </a>
        </div>

        <div className="standard-grid-new">
          <div className="standard-art standard-art-image">
            <div className="scan-circle" />

            <img
              className="standard-feature-image"
              src="/routinelabz3.png"
              alt="Routine Labz product quality and formulation"
            />

            <div className="scan-line">QUALITY / CHECK / RECORD</div>
          </div>

          <div className="standard-list-new">
            {standards.map(([n, title, text]) => (
              <div className="standard-row-new" key={n}>
                <b>{n}</b>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <span>↗</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}