import React, { useState } from "react";
import useReveal from "../hooks/useReveal";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export default function Contact() {
  useReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");

  const update = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-layout">
        <div className="contact-copy reveal">
          <div className="section-kicker">— GET IN TOUCH —</div>
          <h2 className="section-heading left">TALK TO <span>ROUTINE.</span></h2>
          <p>Questions about products, authenticity or becoming a distributor? Send the team a message.</p>
          <div className="contact-details">
            <div><span>EMAIL</span><b>routinelabzinfo.com</b></div>
            <div><span>PHONE</span><b>+91 97727 33319</b></div>
            <div><span>BUSINESS</span><b>68-A Ganesh Nagar B Sheopur, Sanganer, Jaipur -302033</b></div>
          </div>
        </div>

        <div className="form-shell reveal">
          {status === "success" ? (
            <div className="form-success">
              <div className="success-mark">✓</div>
              <span>MESSAGE SENT</span>
              <h3>THANK YOU.</h3>
              <p>Your message has been submitted successfully.</p>
              <button className="btn-ghost" onClick={() => setStatus("idle")}>SEND ANOTHER</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="form-topline">CONTACT FORM / 01</div>
              <h3>START A CONVERSATION.</h3>
              <div className="form-grid">
                <label>NAME *<input name="name" value={form.name} onChange={update} required placeholder="Your name" /></label>
                <label>EMAIL *<input name="email" type="email" value={form.email} onChange={update} required placeholder="you@email.com" /></label>
              </div>
              <label>SUBJECT<input name="subject" value={form.subject} onChange={update} placeholder="How can we help?" /></label>
              <label>MESSAGE *<textarea name="message" value={form.message} onChange={update} required rows="6" placeholder="Write your message..." /></label>
              {status === "error" && <div className="form-error">Unable to send right now. Please try again.</div>}
              <button className="btn-gold form-submit" disabled={status === "loading"}>
                {status === "loading" ? "SENDING..." : "SEND MESSAGE →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
