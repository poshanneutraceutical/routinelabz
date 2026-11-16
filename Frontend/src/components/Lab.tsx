import React from "react";

const cards = [
  ["01", "SOURCE", "Premium raw materials selected with consistency and intended use in mind."],
  ["02", "FORMULATE", "Every ingredient has a job. Every formula starts with a performance objective."],
  ["03", "CHECK", "Quality checkpoints help maintain consistency from material to finished product."],
  ["04", "DELIVER", "Finished products designed to become part of an athlete's everyday routine."],
];

export default function Lab({ compact = false }: { compact?: boolean }) {
  return (
    <section id="lab" className={`brand-section lab-section ${compact ? "compact" : ""}`}>
      <div className="brand-container">
        <div className="brand-heading-row centered-row">
          <div><span className="brand-number">02</span><span className="brand-kicker">THE LAB</span></div>
          {!compact && <span className="brand-side-note">WHERE ROUTINE MEETS SCIENCE</span>}
        </div>
        <div className="lab-intro"><h2>WHERE ROUTINE<br/><em>MEETS SCIENCE.</em></h2><p>We keep the science practical: identify the purpose, build the formula, check the process, then make it part of the routine.</p></div>
        <div className="lab-grid">{cards.map(([n, title, text]) => <article className="lab-card" key={n}><span>{n}</span><div className="lab-icon">{n === "01" ? "◈" : n === "02" ? "⌬" : n === "03" ? "⊙" : "↗"}</div><h3>{title}</h3><p>{text}</p><div className="lab-card-line"/></article>)}</div>
      </div>
    </section>
  );
}
