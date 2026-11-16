import React from "react";
import Navbar from "../components/Navbar";
import Lab from "../components/Lab";
import Footer from "../components/Footer";

export default function LabPage() {
  return <div className="leather-bg page-shell"><Navbar/><main className="inner-page"><div className="page-hero lab-page-hero"><span>02 / THE LAB</span><h1>WHERE ROUTINE<br/><em>MEETS SCIENCE.</em></h1><p>Purpose, formulation, quality checks and delivery — a simple framework for building better sports nutrition.</p></div><Lab/><section className="brand-section lab-detail"><div className="brand-container"><div className="lab-detail-grid"><div className="lab-detail-art"><span>RL / FORMULA ROOM</span><div className="lab-cylinder"/><div className="lab-orbit"/></div><div><span className="brand-kicker">FORMULA DEVELOPMENT</span><h2>EVERY SERVING<br/><em>HAS A PURPOSE.</em></h2><p>We believe premium nutrition should be understandable. The formula should tell you what it is for, and the product should fit naturally into the way you train.</p><div className="detail-tags"><span>FORMULATE</span><span>CHECK</span><span>REFINE</span></div></div></div></div></section></main><Footer/></div>;
}
