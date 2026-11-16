import React from "react";

const items = [
  "MASS GAINER", "◆", "LEAN MASS GAINER", "◆",
  "PRECISION FORMULA", "◆", "ROUTINE LABZ", "◆",
  "QUALITY FIRST", "◆", "TRAIN. RECOVER. REPEAT.", "◆",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className={i % 2 === 1 ? "marquee-dot" : ""}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
