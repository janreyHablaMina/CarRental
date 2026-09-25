"use client";

import React from "react";
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

export default function HomeSectionDivider() {
  return (
    <div
      className="home-section-divider"
      aria-hidden="false"
      style={{
        background: "#f5f2eb",
        color: "#1c1917",
        position: "relative",
        zIndex: 10,
        display: "block",
        width: "100%",
        paddingTop: "24px",
        paddingBottom: "24px",
      }}
    >
      {/* Sleek Infinite Kinetic Marquee Ribbon */}
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
    </div>
  );
}
