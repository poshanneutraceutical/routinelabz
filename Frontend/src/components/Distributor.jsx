import React, { useState } from "react";
import useReveal from "../hooks/useReveal";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  businessName: "",
  city: "",
  state: "",
  message: "",
};

export default function Distributor() {
  useReveal();
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");

  const update = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${API_URL}/distributor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm(emptyForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="distribute" className="business-section">
      <div className="business-layout">
        <div className="business-copy reveal">
          <div className="section-kicker">— BUSINESS PARTNERSHIP —</div>
          <h2 className="section-heading left">BUILD THE <span>ROUTINE.</span><br />BUILD THE NETWORK.</h2>
          <p>
            Interested in carrying Routine Labz products? Tell us about your
            business and location. Our team can follow up with the relevant
            distributorship information.
          </p>

          <div className="business-points">
            <div><b>01</b><span>Distributor enquiry</span></div>
            <div><b>02</b><span>Business & location details</span></div>
            <div><b>03</b><span>Team follow-up</span></div>
          </div>

          <div className="business-note">
            <span>NO RETAIL-PRICE BLOCKS.</span>
            <span>NO COMMISSION CLAIMS.</span>
          </div>
        </div>

        <div className="form-shell reveal">
          {status === "success" ? (
            <div className="form-success">
              <div className="success-mark">✓</div>
              <span>APPLICATION RECEIVED</span>
              <h3>LET'S TALK BUSINESS.</h3>
              <p>Your distributor enquiry has been submitted. Our team will contact you.</p>
              <button className="btn-ghost" onClick={() => setStatus("idle")}>SUBMIT ANOTHER</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="form-topline">DISTRIBUTOR FORM / 01</div>
              <h3>LET'S WORK TOGETHER.</h3>
              <p className="form-help">Complete the details below and our business team will get in touch.</p>

              <div className="form-grid">
                <label>FULL NAME *<input name="fullName" value={form.fullName} onChange={update} required placeholder="Your name" /></label>
                <label>EMAIL *<input name="email" type="email" value={form.email} onChange={update} required placeholder="you@company.com" /></label>
                <label>PHONE NUMBER<input name="phone" value={form.phone} onChange={update} placeholder="+91" /></label>
                <label>BUSINESS NAME<input name="businessName" value={form.businessName} onChange={update} placeholder="Company / Store" /></label>
                <label>CITY<input name="city" value={form.city} onChange={update} placeholder="City" /></label>
                <label>STATE<input name="state" value={form.state} onChange={update} placeholder="State" /></label>
              </div>

              <label>ABOUT YOUR BUSINESS<textarea name="message" value={form.message} onChange={update} rows="5" placeholder="Tell us about your business, channels and requirements..." /></label>

              {status === "error" && <div className="form-error">Unable to submit right now. Please check the backend and try again.</div>}

              <button className="btn-gold form-submit" disabled={status === "loading"}>
                {status === "loading" ? "SUBMITTING..." : "SUBMIT APPLICATION →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
