import React from "react";

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-grid" />
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />

      <div className="hero-copy reveal">
        <div className="eyebrow"><span /> 3RD-PARTY LAB TESTED <span /></div>
        <h1>
          FUEL YOUR
          <strong>ROUTINE.</strong>
          DOMINATE.
        </h1>
        <p>
          Precision-built sports nutrition for people who train with intent.
          Clean formulas, transparent labels and a routine designed around performance.
        </p>
        <div className="hero-actions">
          <a className="btn-gold" href="#products">EXPLORE PRODUCTS →</a>
          <a className="btn-ghost" href="#showcase">WATCH PRODUCT FILM</a>
        </div>

        <div className="hero-proof">
          <div><b>02</b><span>CORE GAINER<br />FORMULAS</span></div>
          <div><b>100%</b><span>LABEL<br />TRANSPARENCY</span></div>
          <div><b>24/7</b><span>BRAND<br />SUPPORT</span></div>
        </div>
      </div>

      <div className="hero-products reveal">
        <div className="orbit-ring ring-one" />
        <div className="orbit-ring ring-two" />
        <div className="hero-product hero-product-mass">
          <img src="/Navbar routine image.png" alt="Routine Labz Mass Gainer" />
        </div>


      </div>

      <a href="#showcase" className="scroll-cue">SCROLL <span>↓</span></a>
    </section>
  );
}
