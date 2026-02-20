"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, MessageSquare, ArrowRight, Compass } from "lucide-react";
import "./home-contact.css";

export default function HomeContactSection() {
  return (
    <section className="home-contact-section" id="contact" data-reveal>
      {/* ---------------- Dark Matter Map Visual Background ---------------- */}
      <div className="home-contact-map-bg" aria-hidden="true">
        {/* Cybernetic Grid Pattern */}
        <div className="home-contact-map-mesh" />

        {/* Stylized Vector Cartography Road Networks */}
        <svg
          className="home-contact-map-svg"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Highway Arcs & Arterial Roads */}
          <path
            d="M-50 450 C 300 480, 500 300, 750 350 S 1100 550, 1300 500"
            stroke="#4da3ff"
            strokeWidth="3.5"
            strokeDasharray="12 6"
            opacity="0.65"
          />
          <path
            d="M100 -50 C 150 250, 400 450, 600 520 S 950 650, 1250 850"
            stroke="#38bdf8"
            strokeWidth="2.5"
            opacity="0.45"
          />
          <path
            d="M350 850 C 420 600, 650 400, 850 300 S 1150 150, 1300 100"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />
          <path
            d="M-20 200 C 250 220, 520 180, 800 240 S 1100 200, 1250 260"
            stroke="rgba(77,163,255,0.3)"
            strokeWidth="1.5"
          />
          <path
            d="M500 50 L 500 750 M 200 150 L 1050 650 M 150 700 L 950 100"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />

          {/* Coordinate Concentric Rings */}
          <circle cx="280" cy="320" r="140" stroke="rgba(77,163,255,0.18)" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="280" cy="320" r="220" stroke="rgba(77,163,255,0.1)" strokeWidth="1" />
          <circle cx="950" cy="380" r="180" stroke="rgba(77,163,255,0.15)" strokeWidth="1" strokeDasharray="8 8" />
        </svg>

        {/* Ambient Radial Vignette */}
        <div className="home-contact-vignette" />

        {/* Active Radar Beacon Pins on Map */}
        <div className="home-map-pin bgc">
          <span className="home-map-pin-pulse" />
          <span className="home-map-pin-label">BGC FLAGSHIP LOUNGE // 14.5507° N</span>
        </div>

        <div className="home-map-pin makati">
          <span className="home-map-pin-pulse" />
          <span className="home-map-pin-label">MAKATI CBD EXECUTIVE // 14.5574° N</span>
        </div>

        <div className="home-map-pin naia">
          <span className="home-map-pin-pulse" />
          <span className="home-map-pin-label">NAIA TERMINAL 3 AIRPORT // 14.5204° N</span>
        </div>

        <div className="home-map-pin clark">
          <span className="home-map-pin-pulse" />
          <span className="home-map-pin-label">CLARK FREEPORT HUB // 15.1764° N</span>
        </div>
      </div>

      {/* ---------------- Centered Floating Luxury Card ---------------- */}
      <div className="home-contact-card">
        <div className="home-contact-badge">
          <span className="home-contact-pulse-dot" />
          <span>24/7 VIP Concierge // Metro Manila & Lounges</span>
        </div>

        <h2 className="home-contact-title">
          Visit or Connect With <span>DriveX.</span>
        </h2>

        <p className="home-contact-subtitle">
          Experience private curbside delivery directly to your hotel or airport terminal, or visit our flagship showroom in Bonifacio Global City.
        </p>

        {/* 2x2 Contact Grid */}
        <div className="home-contact-grid">
          <a
            href="https://maps.google.com/?q=Bonifacio+High+Street+Taguig"
            target="_blank"
            rel="noopener noreferrer"
            className="home-contact-item"
          >
            <div className="home-contact-icon">
              <MapPin size={18} />
            </div>
            <div className="home-contact-info">
              <span className="home-contact-label">Flagship Lounge</span>
              <span className="home-contact-value">5th Ave, BGC, Taguig City</span>
            </div>
          </a>

          <a href="tel:+63288883748" className="home-contact-item">
            <div className="home-contact-icon">
              <Phone size={18} />
            </div>
            <div className="home-contact-info">
              <span className="home-contact-label">VIP Direct Line</span>
              <span className="home-contact-value">+63 (2) 8888-DRIVEX</span>
            </div>
          </a>

          <a href="mailto:concierge@drivex.ph" className="home-contact-item">
            <div className="home-contact-icon">
              <Mail size={18} />
            </div>
            <div className="home-contact-info">
              <span className="home-contact-label">Concierge Email</span>
              <span className="home-contact-value">concierge@drivex.ph</span>
            </div>
          </a>

          <div className="home-contact-item">
            <div className="home-contact-icon">
              <Clock size={18} />
            </div>
            <div className="home-contact-info">
              <span className="home-contact-label">Dispatch Hours</span>
              <span className="home-contact-value">Open 24/7 (Flight Tracked)</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="home-contact-actions">
          <a
            href="https://wa.me/639178883748?text=Hello%20DriveX%20Concierge,%20I%20would%20like%20to%20inquire%20about%20a%20luxury%20vehicle%20reservation."
            target="_blank"
            rel="noopener noreferrer"
            className="home-contact-btn primary"
          >
            <MessageSquare size={16} />
            <span>Message on WhatsApp</span>
          </a>

          <Link href="/contact" className="home-contact-btn secondary">
            <Compass size={15} />
            <span>Explore Nationwide Hubs</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
