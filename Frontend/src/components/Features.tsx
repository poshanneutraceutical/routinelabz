import React from "react";

const features = [
  ["01", "MUSCLE GROWTH", "Nutrition designed around consistent training, recovery and daily progress."],
  ["02", "TRUSTED QUALITY", "A quality-first approach from ingredient selection to finished product."],
  ["03", "PEAK PERFORMANCE", "Purpose-built formulas that fit the way athletes actually train."],
  ["04", "DAILY CONSISTENCY", "Straightforward products designed to become part of the routine."],
];

export default function Features() {
  return <section className="feature-section"><div className="feature-grid">{features.map(([n,t,d])=><article className="feature-card" key={n}><span>{n}</span><div className="feature-symbol">+</div><h3>{t}</h3><p>{d}</p></article>)}</div></section>;
}
