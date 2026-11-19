
import React, { useEffect, useState } from "react";
import CartIcon from "./CartIcon";

const links = [
  ["About", "/about"],
  ["The Lab", "/lab"],
  ["Standard", "/standard"],
  ["Products", "/#products"],
  ["Distributors", "/#distribute"],
  ["Contact", "/#contact"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);

    if (href.startsWith("/#") && window.location.pathname !== "/") {
      window.location.href = href;
    }
  };

  return (
    <header className={`site-nav ${scrolled ? "site-nav-scrolled" : ""}`}>

      <a
        href="/"
        className="nav-logo"
        onClick={() => setOpen(false)}
      >
        <img
          src="/routine labz.png"
          alt="ROUTINE LABZ"
          className="navbar-logo"
        />
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            onClick={() => go(href)}
          >
            {label}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <a className="nav-verify" href="/verify">
          VERIFY PRODUCT
        </a>

        <a className="btn-gold nav-shop" href="/#products">
          EXPLORE STACK
        </a>
      </div>

      {/* Cart remains visible on desktop and mobile */}
      <CartIcon />

      <button
        type="button"
        className="nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div className="mobile-nav">

          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => go(href)}
            >
              {label}
            </a>
          ))}

          <a href="/cart" onClick={() => setOpen(false)}>
            SHOPPING CART
          </a>

          <a href="/verify" onClick={() => setOpen(false)}>
            VERIFY PRODUCT
          </a>

          <a
            className="btn-gold"
            href="/#products"
            onClick={() => setOpen(false)}
          >
            EXPLORE STACK
          </a>

        </div>
      )}

    </header>
  );
}
