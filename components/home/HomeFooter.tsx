"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import "./home-footer.css";

export default function HomeFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="dx-footer" id="footer" aria-label="DriveX Footer">
      {/* Subtle Background Architectural Ambient Glow */}
      <div className="dx-footer-glow" aria-hidden="true" />

      {/* Giant Architectural Background Watermark */}
      <div className="dx-footer-watermark" aria-hidden="true">
        DRIVEX
      </div>

      <div className="dx-footer-inner">
        {/* ==================================================================
            Top Header Bar: VIP Dispatch & Operational Telemetry
            ================================================================== */}
        <div className="dx-footer-dispatch-card">
          <div className="dx-dispatch-left">
            <div className="dx-dispatch-badge">
              <Sparkles size={12} className="dx-sparkle" />
              <span>THE PRIVATE DISPATCH</span>
            </div>
            <h3 className="dx-dispatch-title">The Grand Tour Continues</h3>
            <p className="dx-dispatch-desc">
              Receive confidential fleet arrivals, invitations to curated mountain pass rallies, and direct concierge priority across the Philippines.
            </p>
          </div>

          <div className="dx-dispatch-right">
            {subscribed ? (
              <div className="dx-dispatch-success">
                <CheckCircle2 size={18} className="dx-success-icon" />
                <span>You have been added to the private concierge roster. Welcome to DriveX.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="dx-dispatch-form">
                <div className="dx-dispatch-input-wrap">
                  <Mail size={16} className="dx-input-mail-icon" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your executive email..."
                    required
                    className="dx-dispatch-input"
                  />
                </div>
                <button type="submit" className="dx-dispatch-submit-btn">
                  <span>Join The Circle</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}

            <div className="dx-dispatch-telemetry">
              <span className="dx-status-dot" />
              <span className="dx-telemetry-text">
                <strong>24/7 Operations Active</strong> • BGC Flagship & NAIA Airport VIP Hubs Ready
              </span>
            </div>
          </div>
        </div>

        {/* ==================================================================
            Main 4-Column Curated Directory
            ================================================================== */}
        <div className="dx-footer-grid">
          {/* Column 1: Brand & Liaison */}
          <div className="dx-footer-col dx-brand-col">
            <Link href="/" className="dx-footer-wordmark">
              DRIVE<span>X</span>
            </Link>
            <p className="dx-brand-tagline">
              The Art of the Extraordinary Journey. Engineered to redefine high-performance automotive grand touring in the Philippines.
            </p>

            <div className="dx-contact-list">
              <a href="tel:+63288883748" className="dx-contact-item">
                <Phone size={14} className="dx-contact-icon" />
                <span>+63 (2) 8888-DRIVEX (24/7 VIP Line)</span>
              </a>
              <a href="mailto:concierge@drivex.ph" className="dx-contact-item">
                <Mail size={14} className="dx-contact-icon" />
                <span>concierge@drivex.ph</span>
              </a>
              <div className="dx-contact-item">
                <MapPin size={14} className="dx-contact-icon" />
                <span>BGC Flagship Lounge, 5th Ave, Taguig, Metro Manila</span>
              </div>
            </div>

            {/* Social Channels */}
            <div className="dx-social-row">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DriveX on Instagram"
                className="dx-social-btn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DriveX on Facebook"
                className="dx-social-btn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DriveX on LinkedIn"
                className="dx-social-btn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DriveX on X (Twitter)"
                className="dx-social-btn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Fleet & Categories */}
          <div className="dx-footer-col">
            <h4 className="dx-col-heading">The Fleet</h4>
            <ul className="dx-link-list">
              <li>
                <Link href="#vehicles" className="dx-nav-link">
                  Hypercars & Exotics
                </Link>
              </li>
              <li>
                <Link href="#vehicles" className="dx-nav-link">
                  Track Edition & Spiders
                </Link>
              </li>
              <li>
                <Link href="#vehicles" className="dx-nav-link">
                  Grand Tourers & Coupés
                </Link>
              </li>
              <li>
                <Link href="#vehicles" className="dx-nav-link">
                  Executive Armored & SUVs
                </Link>
              </li>
              <li>
                <Link href="#how" className="dx-nav-link">
                  Airport Tarmac Valet
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="dx-nav-link">
                  Complete Fleet Directory →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Scenic Escapes & Hubs */}
          <div className="dx-footer-col">
            <h4 className="dx-col-heading">Expeditions & Hubs</h4>
            <ul className="dx-link-list">
              <li>
                <Link href="#contact" className="dx-nav-link">
                  BGC Flagship Lounge
                </Link>
              </li>
              <li>
                <Link href="#contact" className="dx-nav-link">
                  NAIA Airport VIP Direct
                </Link>
              </li>
              <li>
                <Link href="#contact" className="dx-nav-link">
                  Sierra Madre Mountain Pass
                </Link>
              </li>
              <li>
                <Link href="#contact" className="dx-nav-link">
                  Tagaytay Caldera Scenic Ridge
                </Link>
              </li>
              <li>
                <Link href="#contact" className="dx-nav-link">
                  Clark & Bamban Highlands
                </Link>
              </li>
              <li>
                <Link href="#contact" className="dx-nav-link">
                  Cebu Trans-Central Highway
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Experience & Policies */}
          <div className="dx-footer-col">
            <h4 className="dx-col-heading">Experience & Care</h4>
            <ul className="dx-link-list">
              <li>
                <Link href="#why" className="dx-nav-link">
                  White-Glove Handover
                </Link>
              </li>
              <li>
                <Link href="#why" className="dx-nav-link">
                  Comprehensive CDW Coverage
                </Link>
              </li>
              <li>
                <Link href="#why" className="dx-nav-link">
                  Instant Deposit Release
                </Link>
              </li>
              <li>
                <Link href="#why" className="dx-nav-link">
                  Expressway RFID Tollways
                </Link>
              </li>
              <li>
                <Link href="/contact" className="dx-nav-link">
                  Corporate & Media Inquiries
                </Link>
              </li>
              <li>
                <Link href="/admin" className="dx-nav-link dx-admin-badge-link">
                  <ShieldCheck size={13} />
                  <span>Fleet Ops Console</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ==================================================================
            Bottom Utility Bar: Copyright, Cities & Back to Top
            ================================================================== */}
        <div className="dx-footer-bottom">
          <div className="dx-bottom-left">
            <span>© {new Date().getFullYear()} DriveX Luxury Mobility Inc. All rights reserved.</span>
          </div>

          <div className="dx-bottom-center">
            <span className="dx-city-tag">MANILA</span>
            <span className="dx-city-dot">•</span>
            <span className="dx-city-tag">BGC</span>
            <span className="dx-city-dot">•</span>
            <span className="dx-city-tag">CLARK</span>
            <span className="dx-city-dot">•</span>
            <span className="dx-city-tag">CEBU</span>
          </div>

          <div className="dx-bottom-right">
            <div className="dx-legal-links">
              <a href="#footer" className="dx-legal-link">Privacy Charter</a>
              <a href="#footer" className="dx-legal-link">Rental Terms</a>
              <a href="#footer" className="dx-legal-link">Security Protocols</a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="dx-back-to-top"
              aria-label="Scroll back to top of page"
            >
              <span>Top of Runway</span>
              <ArrowUp size={13} className="dx-top-icon" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
