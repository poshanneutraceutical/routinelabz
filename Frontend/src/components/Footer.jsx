import React from "react";
import {
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="routine-footer">

      {/* ================= BACKGROUND EFFECTS ================= */}

      <div className="routine-footer-background">
        <div className="routine-footer-glow routine-footer-glow-one" />
        <div className="routine-footer-glow routine-footer-glow-two" />
        <div className="routine-footer-grid" />
        <div className="routine-footer-lines" />
      </div>

      <div className="routine-footer-container">

        {/* ================= MAIN FOOTER ================= */}

        <div className="routine-footer-main">

          {/* ================= BRAND ================= */}

          <div className="routine-footer-brand">

            <img
              src="/routine labz.png"
              alt="Routine Labz"
              className="routine-footer-logo"
            />

            <div className="routine-footer-gold-line" />

            <p className="routine-footer-description">
              Premium sports nutrition engineered for athletes who demand
              unmatched strength, explosive power and relentless performance.
            </p>

            {/* SOCIAL ICONS */}

            <div className="routine-footer-socials">

              <a
                href="#"
                aria-label="Instagram"
                className="routine-social-icon"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="routine-social-icon"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="routine-social-icon"
              >
                <Youtube size={18} />
              </a>

            </div>

          </div>

          {/* ================= QUICK LINKS ================= */}

          <div className="routine-footer-column">

            <h3 className="routine-footer-title">
              QUICK LINKS
            </h3>

            <div className="routine-footer-title-line" />

            <ul className="routine-footer-list">

              {[
                ["Home", "#home"],
                ["Products", "#products"],
                ["About", "#about"],
                ["Distributor", "#distribute"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (

                <li key={label}>
                  <a href={href}>
                    <span>{label}</span>
                  </a>
                </li>

              ))}

            </ul>

          </div>

          {/* ================= CATEGORIES ================= */}

          <div className="routine-footer-column">

            <h3 className="routine-footer-title">
              CATEGORIES
            </h3>

            <div className="routine-footer-title-line" />

            <ul className="routine-footer-list">

              {[
                "Whey Protein",
                "Mass Gainer",
                "Creatine",
                "Pre Workout",
                "EAA",
                "Fat Burner",
              ].map((item) => (

                <li key={item}>
                  <a href="#products">
                    <span>{item}</span>
                  </a>
                </li>

              ))}

            </ul>

          </div>

          {/* ================= CONTACT ================= */}

          <div className="routine-footer-column">

            <h3 className="routine-footer-title">
              CONTACT
            </h3>

            <div className="routine-footer-title-line" />

            <ul className="routine-footer-contact-list">

              <li>

                <div className="routine-contact-icon">
                  <Mail size={18} />
                </div>

                <span>
                  routinelabzinfo@gmail.com
                </span>

              </li>

              <li>

                <div className="routine-contact-icon">
                  <Phone size={18} />
                </div>

                <span>
                  +91 97727 33319
                </span>

              </li>

              <li>

                <div className="routine-contact-icon">
                  <MapPin size={18} />
                </div>

                <span className="routine-contact-address">
                  68-A Ganesh Nagar B Sheopur, Sanganer, Jaipur -302033
                  <br />
                  India
                </span>

              </li>

            </ul>

          </div>

        </div>

        {/* ================= BOTTOM BAR ================= */}

        <div className="routine-footer-bottom">

          <p>
            © {new Date().getFullYear()} Routine Labz Nutrition.
            All Rights Reserved.
          </p>

          <div className="routine-footer-policy-links">

            <a href="#">
              Privacy Policy
            </a>

            <span>|</span>

            <a href="#">
              Terms & Conditions
            </a>

            <span>|</span>

            <a href="#">
              Shipping Policy
            </a>

            <span>|</span>

            <a href="#">
              Refund Policy
            </a>

          </div>

        </div>

      </div>

      {/* ================= FOOTER STYLES ================= */}

      <style>{`

        /* =========================================
           FOOTER BASE
        ========================================= */

        .routine-footer {
          position: relative;
          width: 100%;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 10% 20%,
              rgba(240, 180, 41, 0.08),
              transparent 28%
            ),
            radial-gradient(
              circle at 90% 80%,
              rgba(50, 199, 89, 0.055),
              transparent 30%
            ),
            #050505;
          border-top: 1px solid rgba(240, 180, 41, 0.25);
          color: #ffffff;
        }

        /* =========================================
           BACKGROUND
        ========================================= */

        .routine-footer-background {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .routine-footer-grid {
          position: absolute;
          inset: 0;

          background-image:
            linear-gradient(
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            );

          background-size: 65px 65px;

          opacity: 0.5;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              rgba(0,0,0,.7),
              transparent
            );
        }

        .routine-footer-lines {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              #f0b429,
              #32c759,
              #f0b429,
              transparent
            );

          opacity: .7;
        }

        .routine-footer-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
        }

        .routine-footer-glow-one {
          width: 400px;
          height: 400px;
          left: -180px;
          top: -180px;
          background: rgba(240,180,41,.08);
        }

        .routine-footer-glow-two {
          width: 400px;
          height: 400px;
          right: -180px;
          bottom: -200px;
          background: rgba(50,199,89,.055);
        }

        /* =========================================
           CONTAINER
        ========================================= */

        .routine-footer-container {
          position: relative;
          z-index: 2;

          width: min(1400px, 90%);

          margin: 0 auto;

          padding-top: 75px;
        }

        /* =========================================
           MAIN GRID
        ========================================= */

        .routine-footer-main {
          display: grid;

          grid-template-columns:
            1.35fr
            1fr
            1fr
            1.25fr;

          gap: 55px;

          padding-bottom: 65px;
        }

        /* =========================================
           BRAND
        ========================================= */

        .routine-footer-brand {
          min-width: 0;
        }

        .routine-footer-logo {
          display: block;

          width: 205px;
          max-width: 100%;
          height: auto;

          object-fit: contain;

          margin-bottom: 18px;

          filter:
            drop-shadow(
              0 8px 20px rgba(0,0,0,.5)
            );
        }

        .routine-footer-gold-line {
          width: 55px;
          height: 3px;

          margin-bottom: 20px;

          background:
            linear-gradient(
              90deg,
              #f0b429,
              #ffd76a,
              transparent
            );
        }

        .routine-footer-description {
          max-width: 370px;

          margin: 0;

          color: #85898d;

          font-family: Rajdhani, sans-serif;

          font-size: 16px;

          line-height: 1.65;
        }

        /* =========================================
           SOCIAL
        ========================================= */

        .routine-footer-socials {
          display: flex;

          gap: 13px;

          margin-top: 27px;
        }

        .routine-social-icon {
          width: 44px;
          height: 44px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #8b8f92;

          border: 1px solid rgba(50,199,89,.25);

          border-radius: 10px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.04),
              rgba(255,255,255,.01)
            );

          transition:
            color .25s ease,
            background .25s ease,
            border-color .25s ease,
            transform .25s ease,
            box-shadow .25s ease;
        }

        .routine-social-icon:hover {
          color: #050505;

          background: #32c759;

          border-color: #32c759;

          transform: translateY(-3px);

          box-shadow:
            0 10px 30px rgba(50,199,89,.2);
        }

        /* =========================================
           COLUMNS
        ========================================= */

        .routine-footer-column {
          min-width: 0;
        }

        .routine-footer-title {
          margin: 0;

          color: #32c759;

          font-family: Orbitron, sans-serif;

          font-size: 13px;

          font-weight: 800;

          letter-spacing: 1.8px;

          text-transform: uppercase;
        }

        .routine-footer-title-line {
          width: 48px;
          height: 3px;

          margin-top: 13px;
          margin-bottom: 21px;

          background:
            linear-gradient(
              90deg,
              #f0b429,
              #32c759
            );
        }

        /* =========================================
           LINKS
        ========================================= */

        .routine-footer-list {
          list-style: none;

          margin: 0;
          padding: 0;
        }

        .routine-footer-list li {
          border-bottom:
            1px solid rgba(255,255,255,.055);
        }

        .routine-footer-list li:last-child {
          border-bottom: none;
        }

        .routine-footer-list a {
          display: flex;

          align-items: center;

          min-height: 43px;

          color: #85898d;

          font-family: Rajdhani, sans-serif;

          font-size: 15px;

          font-weight: 500;

          transition:
            color .2s ease,
            padding-left .2s ease;
        }

        .routine-footer-list a:hover {
          color: #32c759;

          padding-left: 6px;
        }

        /* =========================================
           CONTACT
        ========================================= */

        .routine-footer-contact-list {
          list-style: none;

          margin: 0;
          padding: 0;

          display: flex;

          flex-direction: column;

          gap: 18px;
        }

        .routine-footer-contact-list li {
          display: flex;

          align-items: flex-start;

          gap: 13px;

          color: #85898d;

          font-family: Rajdhani, sans-serif;

          font-size: 14px;

          line-height: 1.5;
        }

        .routine-contact-icon {
          flex-shrink: 0;

          width: 38px;
          height: 38px;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #32c759;

          border:
            1px solid rgba(50,199,89,.25);

          border-radius: 8px;

          background:
            rgba(50,199,89,.035);

          box-shadow:
            inset 0 0 20px rgba(50,199,89,.025);
        }

        .routine-contact-address {
          line-height: 1.7;
        }

        /* =========================================
           BOTTOM
        ========================================= */

        .routine-footer-bottom {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 25px;

          padding:
            25px 0 28px;

          border-top:
            1px solid rgba(50,199,89,.18);
        }

        .routine-footer-bottom p {
          margin: 0;

          color: #555b60;

          font-family: Rajdhani, sans-serif;

          font-size: 12px;
        }

        .routine-footer-policy-links {
          display: flex;

          align-items: center;

          justify-content: center;

          flex-wrap: wrap;

          gap: 13px;

          color: #555b60;
        }

        .routine-footer-policy-links a {
          color: #555b60;

          font-family: Rajdhani, sans-serif;

          font-size: 12px;

          transition: color .2s ease;
        }

        .routine-footer-policy-links a:hover {
          color: #32c759;
        }

        .routine-footer-policy-links span {
          color: #f0b429;
          opacity: .6;
        }

        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 1050px) {

          .routine-footer-main {
            grid-template-columns:
              1.3fr
              1fr
              1fr;

            gap: 45px;
          }

          .routine-footer-brand {
            grid-column: 1 / -1;
          }

        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 700px) {

          .routine-footer-container {
            width: 90%;

            padding-top: 60px;
          }

          .routine-footer-main {
            grid-template-columns: 1fr;

            gap: 42px;

            padding-bottom: 45px;
          }

          .routine-footer-brand {
            grid-column: auto;
          }

          .routine-footer-logo {
            width: 180px;
          }

          .routine-footer-description {
            max-width: 100%;

            font-size: 15px;
          }

          .routine-footer-bottom {
            flex-direction: column;

            align-items: flex-start;

            padding-top: 22px;
          }

          .routine-footer-policy-links {
            justify-content: flex-start;

            gap: 10px;
          }

        }

        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 420px) {

          .routine-footer-container {
            width: 88%;
          }

          .routine-footer-logo {
            width: 165px;
          }

          .routine-footer-socials {
            gap: 9px;
          }

          .routine-social-icon {
            width: 40px;
            height: 40px;
          }

          .routine-footer-title {
            font-size: 11px;
          }

          .routine-footer-list a {
            font-size: 14px;
          }

          .routine-footer-policy-links {
            display: grid;

            grid-template-columns: auto auto;

            justify-content: start;

            gap: 8px 15px;
          }

          .routine-footer-policy-links span {
            display: none;
          }

        }

      `}</style>

    </footer>
  );
}