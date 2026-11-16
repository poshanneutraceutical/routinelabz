import React from "react";
import useReveal from "../hooks/useReveal";

const features = [
  ["01", "LAB STANDARD", "Quality-first product development with a focus on transparent, clearly presented formulas."],
  ["02", "FULL DISCLOSURE", "Straightforward product information without hiding the important numbers behind vague blends."],
  ["03", "SMART FORMULATION", "Products designed around practical training goals: fuel, recovery and consistent progress."],
  ["04", "BUILT FOR ROUTINES", "A focused range made to fit real training schedules rather than overwhelm the shelf."],
];

export default function WhyUs() {
  useReveal();
  return (
    <section id="science" className="science-section">
      <div className="science-line" />
      <div className="section-kicker reveal">— THE ROUTINE STANDARD —</div>
      <h2 className="section-heading reveal">BUILT WITH <span>INTENT.</span></h2>

      <div className="science-grid">
        {features.map(([num, title, desc], i) => (
          <div className="science-card reveal" key={title} style={{ "--delay": `${i * 0.1}s` }}>
            <span>{num}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
            <i>↗</i>
          </div>
        ))}
      </div>
    </section>
  );
}
