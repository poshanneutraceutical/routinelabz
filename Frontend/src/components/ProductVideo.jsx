import React, { useEffect, useRef, useState } from "react";
import useReveal from "../hooks/useReveal";

const SCENES = [
  {
    id: "intro",
    duration: 4200,
    bg: "radial-gradient(circle at 50% 45%, #28231a 0%, #0a0a0a 65%)",
    lines: [
      { text: "ROUTINE LABZ", gold: false, size: "clamp(1.7rem, 5vw, 3.7rem)" },
      { text: "TWO FORMULAS. ONE GOAL.", gold: true, size: "clamp(0.9rem, 2.2vw, 1.3rem)" },
    ],
  },
  {
    id: "mass",
    duration: 6200,
    bg: "radial-gradient(circle at 72% 45%, #3a2415 0%, #0c0907 66%)",
    img: "/mass-gainer.png",
    title: "MASS GAINER",
    sub: "CHOCOLATE FLAVOUR",
    accent: "#b0713f",
    stats: [["560", "CALORIES"], ["24g", "PROTEIN"], ["95g", "CARBS"], ["4g", "FAT"]],
    bullets: ["Builds Size & Strength", "Energy Support", "Easy to Digest"],
  },
  {
    id: "lean",
    duration: 6200,
    bg: "radial-gradient(circle at 72% 45%, #12283f 0%, #060a0f 66%)",
    img: "/lean-gainer.png",
    title: "LEAN MASS GAINER",
    sub: "VANILLA FLAVOUR",
    accent: "#4b8fc1",
    stats: [["520", "CALORIES"], ["32g", "PROTEIN"], ["70g", "CARBS"], ["5g", "FAT"]],
    bullets: ["Lean Muscle Building", "Low Fat Formula", "Sustained Energy"],
  },
];

export default function ProductVideo() {
  useReveal();
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(null);
  const current = SCENES[scene];

  useEffect(() => {
    if (!playing) return;
    startRef.current = null;
    let raf;

    const tick = (time) => {
      if (!startRef.current) startRef.current = time;
      const p = Math.min((time - startRef.current) / current.duration, 1);
      setProgress(p);
      if (p >= 1) {
        setScene((s) => (s + 1) % SCENES.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scene, playing, current.duration]);

  return (
    <section id="showcase" className="film-section reveal">
      <div className="section-kicker">— PRODUCT FILM / IMAGE MOTION —</div>
      <h2 className="section-heading">SEE THE <span>FORMULA.</span></h2>
      <p className="section-intro">
        A cinematic product showcase built from the actual product artwork.
        No stock packaging. No placeholder bottles.
      </p>

      <div className="film-frame" style={{ background: current.bg }}>
        {current.id === "intro" ? (
          <div className="film-intro">
            {current.lines.map((line, i) => (
              <div
                key={line.text}
                className={line.gold ? "text-gold" : "text-chrome"}
                style={{ "--delay": `${0.25 + i * 0.4}s`, fontSize: line.size }}
              >
                {line.text}
              </div>
            ))}
          </div>
        ) : (
          <div className="film-scene" key={current.id}>
            <div
              className="film-product-glow"
              style={{ background: current.accent }}
            />
            <img className="film-product" src={current.img} alt={current.title} />
            <div className="film-copy">
              <span className="film-index">ROUTINE / {scene.toString().padStart(2, "0")}</span>
              <h3>{current.title}</h3>
              <p className="film-sub" style={{ color: current.accent }}>— {current.sub} —</p>
              <div className="film-stats">
                {current.stats.map(([value, label]) => (
                  <div key={label}>
                    <b style={{ color: current.accent }}>{value}</b>
                    <small>{label}</small>
                  </div>
                ))}
              </div>
              <div className="film-bullets">
                {current.bullets.map((item) => <span key={item}>▸ {item}</span>)}
              </div>
            </div>
          </div>
        )}

        <div className="film-vignette" />
        <div className="film-controls">
          <button onClick={() => setPlaying((v) => !v)}>{playing ? "❚❚" : "▶"}</button>
          <div className="film-progress">
            {SCENES.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Show ${s.id}`}
                onClick={() => { setScene(i); setProgress(0); }}
              >
                <span style={{ width: i < scene ? "100%" : i === scene ? `${progress * 100}%` : "0%" }} />
              </button>
            ))}
          </div>
          <span className="film-scene-count">{scene + 1} / {SCENES.length}</span>
        </div>
      </div>
    </section>
  );
}
