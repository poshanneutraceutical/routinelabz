import React from "react";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Footer from "../components/Footer";

export default function AboutPage() {
  return <div className="leather-bg page-shell"><Navbar/><main className="inner-page"><div className="page-hero"><span>01 / ABOUT ROUTINE LABZ</span><h1>BUILT FOR THE ROUTINE.<br/><em>DESIGNED FOR PERFORMANCE.</em></h1><p>A closer look at the thinking behind Routine Labz — practical sports nutrition built around consistency.</p></div><About/><section className="brand-section about-detail"><div className="brand-container"><div className="detail-grid"><div><span className="brand-kicker">THE IDEA</span><h2>CONSISTENCY<br/><em>COMPOUNDS.</em></h2></div><div><p>Training creates the stimulus. The routine creates the result. Our role is to make the nutrition side of that routine clear, useful and dependable.</p><p>From product purpose to ingredient selection and quality checks, we want every part of the experience to feel considered.</p></div></div></div></section></main><Footer/></div>;
}
