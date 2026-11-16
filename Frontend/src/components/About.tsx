import React from "react";

const points = [
  "Purpose-built formulas for everyday performance.",
  "Quality-focused ingredient selection and clear product intent.",
  "Designed around consistency, not short-term hype.",
  "A transparent approach to what goes into your routine.",
];

export default function About({ compact = false }: { compact?: boolean }) {
  return (
    <section id="about" className={`brand-section about-section ${compact ? "compact" : ""}`}>
      <div className="brand-container">
        <div className="brand-heading-row">
          <div><span className="brand-number">01</span><span className="brand-kicker">ABOUT ROUTINE LABZ</span></div>
          <a href="/about" className="brand-more">FULL STORY ↗</a>
        </div>
        <div className="about-brand-grid">
          <div className="about-visual">
            <div className="visual-grid" />
            <div className="visual-caption">RL / FIELD STUDY / 01</div>
            <img src="routinelabz2.png" alt="Routine Labz performance formulas" />
            <div className="visual-stamp">BUILT<br/><b>FOR THE<br/>ROUTINE.</b></div>
          </div>
          <div className="brand-copy">
            <h2>BUILT FOR THE DAILY GRIND.<br/><em>ENGINEERED FOR PERFORMANCE.</em></h2>
            <p className="brand-lead">Performance is not one big moment. It is the work you repeat — the training, recovery, nutrition and discipline that become your routine.</p>
            {!compact && <p>Routine Labz creates straightforward sports nutrition around clear objectives, considered formulas and a quality-first mindset.</p>}
            <div className="brand-points">
              {points.map((point, i) => <div key={point}><span>0{i + 1}</span><p>{point}</p></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
