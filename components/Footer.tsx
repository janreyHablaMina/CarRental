"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, ArrowRight, Sparkles } from "lucide-react";
import "./home/home-footer.css";

export default function Footer() {
  const pathname = usePathname();

  // Do not render the public footer on admin pages
  if (pathname.startsWith("/admin")) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="dx-billboard-footer" id="footer" aria-label="DriveX Footer">
      {/* Massive Background Watermark */}
      <div className="dx-footer-bg-watermark" aria-hidden="true">
        DRIVEX
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
