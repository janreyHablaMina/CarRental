"use client";

import React from "react";
import { Zap, Plane, Compass, ShieldCheck, Sparkles } from "lucide-react";
import "./home-section-divider.css";

const MARQUEE_ITEMS = [
  "FERRARI F8 TRIBUTO",
  "PORSCHE 911 GT3 RS",
  "RANGE ROVER AUTOBIOGRAPHY",
  "MCLAREN 720S",
  "24/7 AIRPORT TARMAC VALET",
  "SIERRA MADRE MOUNTAIN PASS",
  "PRE-LOADED RFID EXPRESSWAY PASS",
  "TAGAYTAY RIDGE & TAAL CALDERA",
  "ALL-INCLUSIVE CDW COVERAGE",
  "CEBU TRANS-CENTRAL HIGHWAY",
  "ZERO HIDDEN SURCHARGES",
  "WHITE-GLOVE DOORSTEP DELIVERY",
];

const DISTINCTIONS = [
  {
    icon: Zap,
    title: "45-Min Metro Handover",
    subtitle: "Doorstep delivery across BGC, Makati & Ortigas",
  },
  {
    icon: Plane,
    title: "Flight-Tracked Tarmac Valet",
    subtitle: "NAIA T1–T3 & Clark: waiting as you clear customs",
  },
  {
    icon: Compass,
    title: "Pre-Loaded Expressway RFID",
    subtitle: "Autosweep & Easytrip ready on all tollways",
  },
  {
    icon: ShieldCheck,
    title: "Comprehensive CDW Coverage",
    subtitle: "Zero-deductible options with instant deposit release",
  },
];

export default function HomeSectionDivider() {
  return (
    <div
      className="home-section-divider"
      aria-hidden="false"
      style={{
        background: "#ffffff",
        color: "#0f172a",
        position: "relative",
        zIndex: 10,
        display: "block",
        width: "100%",
      }}
    >
      {/* Top Infinite Kinetic Marquee Ribbon */}
      <div className="divider-marquee-wrapper">
        <div className="divider-marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <span key={idx} className="divider-marquee-item">
              <span className="marquee-dot">◆</span>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Middle Architectural Hairline with Monogram */}
      <div className="divider-hairline-row">
        <span className="divider-hairline-line" />
        <div className="divider-monogram-badge">
          <Sparkles size={13} className="divider-sparkle-icon" />
          <span>THE DRIVEX DISTINCTION</span>
        </div>
        <span className="divider-hairline-line" />
      </div>

      {/* 4-Pillar Distinction Strip */}
      <div className="divider-pillars-container">
        <div className="divider-pillars-grid">
          {DISTINCTIONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="divider-pillar-card">
                <div className="divider-pillar-icon-wrap">
                  <Icon size={16} className="divider-pillar-icon" />
                </div>
                <div className="divider-pillar-text">
                  <span className="divider-pillar-title">{item.title}</span>
                  <span className="divider-pillar-subtitle">{item.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
