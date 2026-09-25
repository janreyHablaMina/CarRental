"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  Zap,
  PhoneCall,
  MapPin,
} from "lucide-react";
import "./home-contact.css";

export interface DriveXPillar {
  id: string;
  number: string;
  tabLabel: string;
  subLabel: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  keyFacts: string[];
  ctaText: string;
  ctaLink: string;
}

const PILLARS: DriveXPillar[] = [
  {
    id: "fleet",
    number: "01",
    tabLabel: "Curated Fleet",
    subLabel: "Exotics & Grand Tourers",
    badge: "Precision & Performance",
    title: "Handpicked Exotics & Luxury Flagships",
    tagline: "Every vehicle is personally owned, maintained, and prepared to factory standard.",
    description:
      "DriveX is not a peer-to-peer marketplace or a standard commercial rental fleet. Every car—from track-honed Porsche GTs and Ferrari mid-engine exotics to flagship Range Rovers and executive sedans—is maintained to strict manufacturer specifications, multi-point inspected, and immaculately detailed before every drive.",
    keyFacts: [
      "Tier-1 Multi-Point Inspection Before Every Handover",
      "Factory Calibrated: Porsche, Ferrari, McLaren, Mercedes-AMG",
      "Pristine Showroom Condition & Sanitized Delivery",
    ],
    ctaText: "Explore Available Fleet",
    ctaLink: "#vehicles",
  },
  {
    id: "handover",
    number: "02",
    tabLabel: "White-Glove Handover",
    subLabel: "Tarmac & Doorstep Delivery",
    badge: "Zero Friction Service",
    title: "Airport Tarmac to Private Doorstep",
    tagline: "Skip the rental counters, paperwork queues, and bureaucratic friction.",
    description:
      "We deliver directly to you. Whether arriving on a flight at NAIA or Clark International, departing from your private residence in BGC or Makati, or staying at a 5-star hotel, your prepared vehicle awaits you at your exact schedule with keyless mobile unlock or private white-glove valet turnaround.",
    keyFacts: [
      "Flight-Tracked Delivery: Waiting Curbside at NAIA T1–T3 & Clark",
      "Doorstep Delivery Across BGC, Makati, Ortigas & Alabang",
      "Digital Fast-Track: 100% Paperless Identity Verification",
    ],
    ctaText: "Reserve VIP Delivery",
    ctaLink: "/booking",
  },
  {
    id: "expeditions",
    number: "03",
    tabLabel: "Scenic Expeditions",
    subLabel: "Curated Nature Grand Tours",
    badge: "The Open Road",
    title: "Engineered for Philippine Road Trips",
    tagline: "From misty highland switchbacks to cliffside coastal highways.",
    description:
      "We believe true luxury is the freedom of the open road. Our grand touring fleet is engineered and primed for iconic Philippine landscapes—curving through the cool mountain mists of Tagaytay, carving the soaring Sierra Madre passes, or cruising the coastal cliffs of Cebu and Batangas with pre-loaded expressway RFID.",
    keyFacts: [
      "Pre-Loaded Autosweep & Easytrip RFID on All Tollways",
      "Bespoke Driving Route Guides for Mountain & Coastal Tours",
      "Cross-Hub Drop-Offs Between Manila, Clark & Regional Hubs",
    ],
    ctaText: "View Driving Escapes",
    ctaLink: "/contact",
  },
  {
    id: "transparency",
    number: "04",
    tabLabel: "Zero-Surprise Pricing",
    subLabel: "All-Inclusive & Honest",
    badge: "Complete Peace of Mind",
    title: "All-Inclusive, Transparent Luxury",
    tagline: "The price you see is the price you drive away with.",
    description:
      "Traditional car rentals are notorious for hidden fees, fine-print restrictions, and delayed security deposit returns. DriveX operates with absolute clarity: Tier-1 Comprehensive Collision Insurance is included, toll RFID is transparently tracked, fuel policies are simple, and security deposit releases are executed promptly.",
    keyFacts: [
      "Comprehensive CDW & Third-Party Liability (TPL) Included",
      "Zero Hidden Surcharges, Turnaround Fees, or Airport Markups",
      "Expedited Digital Security Deposit Releases Upon Return",
    ],
    ctaText: "Explore Rental Standards",
    ctaLink: "/#why",
  },
  {
    id: "concierge",
    number: "05",
    tabLabel: "24/7 VIP Concierge",
    subLabel: "Personal Journey Liaison",
    badge: "Always By Your Side",
    title: "Your Dedicated Mobility Concierge",
    tagline: "Single-point personal liaison from reservation to retrieval.",
    description:
      "You never deal with a call center or automated chatbot. A dedicated DriveX Concierge is available around the clock via WhatsApp or direct phone to arrange bespoke route suggestions, coordinate vehicle swaps, assist with restaurant and hotel valets, and guarantee 24/7 nationwide roadside dispatch.",
    keyFacts: [
      "Dedicated WhatsApp Concierge Liaison for Every Client",
      "24/7 Nationwide Roadside Assistance & Recovery",
      "Bespoke Chauffeur & Armored Vehicle Options Available",
    ],
    ctaText: "Contact Concierge Desk",
    ctaLink: "/contact",
  },
];

export default function HomeContactSection() {
  const [selectedPillar, setSelectedPillar] = useState<DriveXPillar>(PILLARS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="home-contact-section" id="contact" data-reveal>
      <div className="home-contact-container">
        {/* Section Header */}
        <div className="home-contact-header">
          <div>
            <p className="eyebrow">05 // The DriveX Standard</p>
            <h2>The Art of the Extraordinary Journey</h2>
          </div>
          <p className="home-contact-header-desc">
            DriveX was created to redefine automotive luxury in the Philippines. Discover the five core pillars that separate our grand touring experience from ordinary car rentals.
          </p>
        </div>

        {/* 5 DriveX Core Pillars Selector Tabs */}
        <div className="home-hub-tabs">
          {PILLARS.map((pillar) => {
            const isActive = selectedPillar.id === pillar.id;
            return (
              <button
                type="button"
                key={pillar.id}
                className={`home-hub-tab ${isActive ? "active" : ""}`}
                onClick={() => setSelectedPillar(pillar)}
              >
                <div className="home-hub-tab-top">
                  <span className="home-hub-tab-num">{pillar.number}</span>
                  <span className="home-hub-tab-name">{pillar.tabLabel}</span>
                </div>
                <span className="home-hub-tab-service">{pillar.subLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FULL WIDTH CINEMATIC NATURE TRIP / MOVING CAR EXPERIENCE */}
      <div className="home-video-fullwidth">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="/images/drivex-coastal-drive.png"
          className="home-car-video-element"
        >
          <source src="/videos/nature-road-trip.mp4" type="video/mp4" />
          <source src="https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/footage/road.mp4" type="video/mp4" />
          <source src="/videos/luxury-car.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Soft Luxury Vignette Overlay */}
        <div className="home-travel-vignette" />

        {/* Floating Luxury Editorial Travel Card */}
        <div className="home-travel-card-wrapper">
          <div className="home-travel-card">
            <div className="home-travel-card-badge">
              <Sparkles size={13} className="home-travel-badge-icon" />
              <span>{selectedPillar.badge}</span>
            </div>

            <h3 className="home-travel-title">{selectedPillar.title}</h3>
            <p className="home-travel-tagline">{selectedPillar.tagline}</p>

            <p className="home-travel-desc">{selectedPillar.description}</p>

            {/* Key Service Standards List */}
            <div className="home-pillar-facts-list">
              {selectedPillar.keyFacts.map((fact, idx) => (
                <div key={idx} className="home-pillar-fact-item">
                  <span className="home-pillar-fact-bullet" />
                  <span>{fact}</span>
                </div>
              ))}
            </div>

            <div className="home-travel-card-actions">
              <Link href={selectedPillar.ctaLink} className="home-travel-btn-primary">
                {selectedPillar.ctaText} <ArrowRight size={14} />
              </Link>
              <Link href="/contact" className="home-travel-btn-ghost">
                Speak with Concierge
              </Link>
            </div>

            {/* Subtle Nationwide Footnote */}
            <div className="home-travel-locations-footnote">
              <MapPin size={12} className="home-footnote-icon" />
              <span>Nationwide Operations: BGC Lounge • Makati CBD • NAIA Terminals • Clark Freeport • Cebu IT Park</span>
            </div>
          </div>
        </div>

        {/* Floating Minimalist Video Controls */}
        <div className="home-travel-video-ctrls">
          <button
            type="button"
            className="home-travel-ctrl-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause scenic video" : "Play scenic video"}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>

          <button
            type="button"
            className="home-travel-ctrl-btn"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            <span>{isMuted ? "Muted" : "Sound On"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
