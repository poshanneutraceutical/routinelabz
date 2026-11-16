import React from "react";
import useReveal from "../hooks/useReveal";

const reviews = [
  ["01", "ARJUN M.", "POWERLIFTER", "The product presentation is clean, focused and exactly what I want from a serious supplement brand."],
  ["02", "PRIYA S.", "FITNESS ATHLETE", "A much more straightforward approach to product information. Easy to understand and easy to fit into a routine."],
  ["03", "ROHIT K.", "BODYBUILDER", "The focus on formula details instead of hype is what makes the brand feel different."],
];

export default function Testimonials() {
  useReveal();
  return (
    <section id="reviews" className="reviews-section">
      <div className="section-kicker reveal">— FIELD REPORTS —</div>
      <h2 className="section-heading reveal">THE ROUTINE <span>REPORT.</span></h2>
      <div className="review-grid">
        {reviews.map(([num, name, role, text]) => (
          <article className="review-card reveal" key={num}>
            <span>{num}</span>
            <div className="stars">★★★★★</div>
            <p>“{text}”</p>
            <strong>{name}</strong>
            <small>{role}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
