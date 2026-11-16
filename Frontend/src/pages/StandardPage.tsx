import React from "react";
import Navbar from "../components/Navbar";
import Standard from "../components/Standard";
import Footer from "../components/Footer";

export default function StandardPage() {
  return <div className="leather-bg page-shell"><Navbar/><main className="inner-page"><div className="page-hero standard-page-hero"><span>03 / THE ROUTINE STANDARD</span><h1>QUALITY IS<br/><em>PART OF THE FORMULA.</em></h1><p>A practical standard for ingredient quality, formula precision, process control and performance focus.</p></div><Standard/><section className="brand-section standard-detail"><div className="brand-container"><div className="detail-grid"><div><span className="brand-kicker">QUALITY / TRANSPARENCY / CONSISTENCY</span><h2>TRAIN.<br/><em>RECOVER.</em><br/>REPEAT.</h2></div><div><p>Your routine deserves products you can understand. We are building the Routine Standard around clear product purpose and a quality-first process.</p><a className="btn-gold" href="/verify">VERIFY A PRODUCT →</a></div></div></div></section></main><Footer/></div>;
}
