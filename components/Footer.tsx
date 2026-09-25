"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, ArrowRight, Sparkles } from "lucide-react";
import "./home/home-footer.css";

export default function Footer() {
  const pathname = usePathname();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Manila",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Do not render the public footer on admin pages
  if (pathname.startsWith("/admin")) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="dx-billboard-footer" id="footer" aria-label="DriveX Footer">
      {/* Top Telemetry Header Bar */}
      <div className="dx-telemetry-strip">
        <div className="dx-telemetry-inner">
          <div className="dx-telemetry-left">
            <span className="dx-beacon-dot" />
            <span className="dx-beacon-label">LIVE OPERATIONS ACTIVE</span>
            <span className="dx-telemetry-sep">•</span>
            <span className="dx-telemetry-time">
              MANILA {time || "10:30:00 PM"} PHT
            </span>
          </div>

          <div className="dx-telemetry-right">
            <span className="dx-coords">14°33′14″N 121°03′04″E</span>
            <span className="dx-telemetry-sep">•</span>
            <span className="dx-hubs">BGC • NAIA T3 • CLARK • CEBU</span>
          </div>
        </div>
      </div>

      {/* Main Billboard Canvas */}
      <div className="dx-billboard-container">
        {/* Editorial Headline & Ethos */}
        <div className="dx-billboard-head">
          <div className="dx-billboard-brand-badge">
            <Sparkles size={11} className="dx-badge-icon" />
            <span>GRAND TOURING AUTOMOTIVE LUXURY</span>
          </div>
          <h2 className="dx-billboard-headline">
            THE ART OF THE<br />
            <span>EXTRAORDINARY JOURNEY.</span>
          </h2>
          <p className="dx-billboard-sub">
            The Philippines&apos; premier fleet of exotic supercars, grand tourers, and bespoke mountain pass expeditions.
          </p>
        </div>

        {/* Horizontal Service Capsules */}
        <div className="dx-capsule-row">
          <Link href="/vehicles" className="dx-capsule">
            <span className="dx-capsule-icon">🏎️</span>
            <span className="dx-capsule-text">Curated Fleet</span>
            <ArrowRight size={11} className="dx-capsule-arrow" />
          </Link>
          <Link href="/contact" className="dx-capsule">
            <span className="dx-capsule-icon">✈️</span>
            <span className="dx-capsule-text">NAIA Airport Tarmac Valet</span>
            <ArrowRight size={11} className="dx-capsule-arrow" />
          </Link>
          <Link href="/contact" className="dx-capsule">
            <span className="dx-capsule-icon">⛰️</span>
            <span className="dx-capsule-text">Sierra Madre Expeditions</span>
            <ArrowRight size={11} className="dx-capsule-arrow" />
          </Link>
          <a href="tel:+63288883748" className="dx-capsule">
            <span className="dx-capsule-icon">📞</span>
            <span className="dx-capsule-text">+63 (2) 8888-DRIVEX</span>
            <ArrowRight size={11} className="dx-capsule-arrow" />
          </a>
          <a href="mailto:concierge@drivex.ph" className="dx-capsule">
            <span className="dx-capsule-icon">💬</span>
            <span className="dx-capsule-text">concierge@drivex.ph</span>
            <ArrowRight size={11} className="dx-capsule-arrow" />
          </a>
        </div>

        {/* Floating Minimal Navigation Bar */}
        <nav className="dx-inline-nav" aria-label="Footer Navigation">
          <Link href="/vehicles" className="dx-nav-item">Vehicles</Link>
          <span className="dx-nav-dot">/</span>
          <Link href="/#how" className="dx-nav-item">How It Works</Link>
          <span className="dx-nav-dot">/</span>
          <Link href="/#why" className="dx-nav-item">The Standard</Link>
          <span className="dx-nav-dot">/</span>
          <Link href="/contact" className="dx-nav-item">Concierge Hub</Link>
          <span className="dx-nav-dot">/</span>
          <Link href="/vehicles" className="dx-nav-item">Fleet Directory</Link>
          <span className="dx-nav-dot">/</span>
          <Link href="/admin" className="dx-nav-item dx-admin-link">Fleet Console</Link>
        </nav>
      </div>

      {/* Massive Edge-to-Edge Billboard Typography (Diffuser Style) */}
      <div className="dx-diffuser-wordmark-wrap" aria-hidden="true">
        <div className="dx-diffuser-glow-line" />
        <span className="dx-diffuser-wordmark">D R I V E X</span>
      </div>

      {/* Baseline Utility Bar */}
      <div className="dx-baseline-bar">
        <div className="dx-baseline-inner">
          <div className="dx-baseline-copy">
            © {new Date().getFullYear()} DriveX Luxury Mobility Inc. All rights reserved.
          </div>

          <div className="dx-baseline-legal">
            <Link href="/#">Privacy Charter</Link>
            <span>•</span>
            <Link href="/#">Rental Policies</Link>
            <span>•</span>
            <Link href="/#">CDW Coverage Terms</Link>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="dx-baseline-top-btn"
            aria-label="Scroll back to top"
          >
            <span>Top of Runway</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
