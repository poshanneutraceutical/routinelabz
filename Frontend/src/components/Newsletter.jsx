import React, { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };

  return (
    <section className="newsletter">
      <div className="newsletter-glow" />
      <div className="reveal">
        <div className="section-kicker">— STAY IN THE ROUTINE —</div>
        <h2>JOIN THE <span>LAB.</span></h2>
        <p>Product drops, formula updates and useful training information — without the noise.</p>
        {done ? (
          <div className="newsletter-done">✓ YOU'RE IN THE ROUTINE.</div>
        ) : (
          <form onSubmit={submit}>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
            <button className="btn-gold">SUBSCRIBE</button>
          </form>
        )}
      </div>
    </section>
  );
}
