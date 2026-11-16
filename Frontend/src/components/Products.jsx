import React from "react";
import useReveal from "../hooks/useReveal";

const products = [
  {
    id: "01",
    name: "MASS GAINER",
    flavor: "CHOCOLATE",
    image: "/mass-gainer.png",
    accent: "#b0713f",
    stats: [["560", "Calories"], ["24g", "Protein"], ["95g", "Carbs"], ["4g", "Fat"]],
    desc: "A calorie-dense formula built around size, strength and consistent daily nutrition.",
  },
  {
    id: "02",
    name: "LEAN MASS GAINER",
    flavor: "VANILLA",
    image: "/lean-gainer.png",
    accent: "#4b8fc1",
    stats: [["520", "Calories"], ["32g", "Protein"], ["70g", "Carbs"], ["5g", "Fat"]],
    desc: "A leaner calorie profile designed for controlled mass building and sustained training fuel.",
  },
];

export default function Products() {
  useReveal();

  return (
    <section id="products" className="products-section">
      <div className="section-kicker reveal">— THE CURRENT STACK —</div>
      <h2 className="section-heading reveal">TWO FORMULAS.<span> ZERO DISTRACTION.</span></h2>
      <p className="section-intro reveal">
        Product information stays front and centre. No retail-price blocks or commission claims.
      </p>

      <div className="product-grid">
        {products.map((p, i) => (
          <article className="product-card reveal" key={p.id} style={{ "--accent": p.accent, "--delay": `${i * 0.12}s` }}>
            <div className="product-number">{p.id}</div>
            <div className="product-image-wrap">
              <div className="product-glow" />
              <img src={p.image} alt={`Routine Labz ${p.name}`} />
              <span className="product-chip">{p.flavor} FLAVOUR</span>
            </div>

            <div className="product-body">
              <div className="product-label">ROUTINE LABZ / FORMULA {p.id}</div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>

              <div className="spec-grid">
                {p.stats.map(([value, label]) => (
                  <div key={label}>
                    <strong>{value}</strong>
                    <small>{label}</small>
                  </div>
                ))}
              </div>

              <a href="#distribute" className="product-link">
                ENQUIRE FOR BUSINESS <span>↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
