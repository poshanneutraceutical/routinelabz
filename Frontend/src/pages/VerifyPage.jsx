import React, { useState } from "react";

const API_BASE = import.meta.env.VITE_VERIFY_API_URL || "/api";

export default function VerifyPage() {
  const [form, setForm] = useState({ name: "", phone: "", code: "" });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const updateCode = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 9);
    setForm((p) => ({ ...p, code: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (form.code.length !== 9) {
      setStatus("invalid");
      setMessage("Please enter the complete 9-character verification code.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(`${API_BASE}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Verification failed");
      const data = await res.json();
      setStatus(data.status === "valid" ? "valid" : "invalid");
      setMessage(data.message || "");
    } catch {
      setStatus("invalid");
      setMessage("Unable to verify the product right now. Please try again later.");
    }
  };

  const reset = () => {
    setForm({ name: "", phone: "", code: "" });
    setStatus("idle");
    setMessage("");
  };

  return (
    <div className="verify-page">
      <div className="verify-grid" />
      <div className="verify-orb" />
      <a className="verify-brand" href="/">ROUTINE <span>▸LABZ</span></a>

      <div className="verify-layout">
        <div className="verify-copy">
          <div className="section-kicker">— AUTHENTICITY CHECK —</div>
          <h1>VERIFY<br /><span>YOUR PRODUCT.</span></h1>
          <p>
            Enter the details from your product and the unique verification code
            to confirm authenticity.
          </p>
          <div className="verify-steps">
            <div><b>01</b><span>ENTER YOUR DETAILS</span></div>
            <div><b>02</b><span>ENTER 9-CHARACTER CODE</span></div>
            <div><b>03</b><span>GET YOUR RESULT</span></div>
          </div>
        </div>

        <div className="verify-card">
          {status === "valid" || status === "invalid" ? (
            <div className={`verify-result ${status}`}>
              <div className="result-icon">{status === "valid" ? "✓" : "!"}</div>
              <span>{status === "valid" ? "AUTHENTICITY CONFIRMED" : "CHECK FAILED"}</span>
              <h2>{status === "valid" ? "PRODUCT VERIFIED." : "VERIFICATION FAILED."}</h2>
              <p>{message}</p>
              <button className="btn-ghost verify-reset" onClick={reset}>VERIFY ANOTHER</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="form-topline">VERIFY FORM / 01</div>
              <h2>PRODUCT AUTHENTICATION</h2>
              <p className="form-help">Use the exact details printed with your product.</p>

              <label>FULL NAME *<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Your full name" /></label>
              <label>PHONE NUMBER *<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required placeholder="+91" /></label>
              <label>9-CHARACTER VERIFICATION CODE *
                <input className="code-input" value={form.code} onChange={updateCode} maxLength={9} required placeholder="ABC123XYZ" />
              </label>
              <div className="code-hint">Enter the complete 9-character code from the product.</div>

              <button className="btn-gold form-submit" disabled={status === "loading" || form.code.length !== 9}>
                {status === "loading" ? "CHECKING..." : "VERIFY PRODUCT →"}
              </button>
            </form>
          )}

          <div className="verify-footer">ROUTINE LABZ SECURITY / {new Date().getFullYear()}</div>
        </div>
      </div>
    </div>
  );
}
