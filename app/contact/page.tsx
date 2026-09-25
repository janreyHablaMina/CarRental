"use client";

import "./contact.css";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, 
  MessageSquare, ArrowRight, ShieldCheck, ChevronDown, Sparkles,
  Compass, ExternalLink
} from "lucide-react";
import { vehicles } from "@/lib/vehicles";
import { useBooking } from "@/context/BookingContext";
import { type HubLocationItem } from "@/components/LeafletMap";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="leaflet-map-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 480 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#94a3b8", fontFamily: "var(--font-mono, monospace)", fontSize: 13 }}>
        <span className="cp-pulse-dot" /> Initializing Dark Matter Telemetry Map...
      </div>
    </div>
  ),
});

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15"/>
  </svg>
);

type HubLocation = HubLocationItem;

const HUBS: HubLocation[] = [
  {
    id: "bgc",
    name: "BGC Flagship Lounge",
    category: "Supercar Delivery & Showroom",
    address: "5th Ave cor. 28th St, Bonifacio High Street Central, Taguig City, Metro Manila",
    phone: "+63 (2) 8888-3748",
    email: "bgc.concierge@drivex.ph",
    hours: "Open 24/7 (VIP Turnaround)",
    coords: "14.5507° N, 121.0509° E",
    lat: 14.5507,
    lng: 121.0509,
    googleMapsUrl: "https://maps.google.com/?q=Bonifacio+High+Street+Taguig",
    features: ["Supercar Direct Handover", "Private VIP Valet", "Refreshment Lounge"]
  },
  {
    id: "makati",
    name: "Makati Executive Hub",
    category: "Chauffeur & Corporate Fleet",
    address: "Ayala Triangle Gardens Tower Two, Paseo de Roxas, Makati CBD",
    phone: "+63 (2) 8888-3749",
    email: "makati.fleet@drivex.ph",
    hours: "06:00 AM – 11:00 PM Daily",
    coords: "14.5574° N, 121.0232° E",
    lat: 14.5574,
    lng: 121.0232,
    googleMapsUrl: "https://maps.google.com/?q=Ayala+Triangle+Gardens+Makati",
    features: ["Executive Sedans", "Armored Vehicle Dispatch", "Corporate Billing Desk"]
  },
  {
    id: "naia",
    name: "NAIA Terminal 3 VIP Concierge",
    category: "24/7 Flight Arrival Hub",
    address: "Terminal 3 Arrival VIP Lounge, Andrews Ave, Pasay City, Metro Manila",
    phone: "+63 (2) 8888-3750",
    email: "airport.vip@drivex.ph",
    hours: "Open 24/7 (Flight Tracked)",
    coords: "14.5204° N, 121.0159° E",
    lat: 14.5204,
    lng: 121.0159,
    googleMapsUrl: "https://maps.google.com/?q=NAIA+Terminal+3+Pasay",
    features: ["Tarmac Fast-Track", "Luggage Valet", "Keyless Mobile Unlock"]
  },
  {
    id: "clark",
    name: "Clark Freeport Hub",
    category: "Grand Touring & Track Fleet",
    address: "Clark Global City, Manuel A. Roxas Hwy, Clark Freeport Zone, Pampanga",
    phone: "+63 (45) 499-3748",
    email: "clark.fleet@drivex.ph",
    hours: "07:00 AM – 10:00 PM Daily",
    coords: "15.1764° N, 120.5312° E",
    lat: 15.1764,
    lng: 120.5312,
    googleMapsUrl: "https://maps.google.com/?q=Clark+Global+City+Pampanga",
    features: ["Track Preparation", "North Luzon Dispatch", "Helipad Access"]
  },
  {
    id: "cebu",
    name: "Cebu IT Park Hub",
    category: "Visayas Coastal Fleet",
    address: "Skyrise 4B, Garden Bloc, Cebu IT Park, Lahug, Cebu City",
    phone: "+63 (32) 412-3748",
    email: "cebu.vip@drivex.ph",
    hours: "08:00 AM – 09:00 PM Daily",
    coords: "10.3297° N, 123.9056° E",
    lat: 10.3297,
    lng: 123.9056,
    googleMapsUrl: "https://maps.google.com/?q=Cebu+IT+Park+Lahug",
    features: ["Coastal SUV Fleet", "Mactan Airport Drop", "Island Tour Drivers"]
  }
];

const FAQS = [
  {
    q: "How fast can a vehicle be dispatched to my location?",
    a: "Within Metro Manila (BGC, Makati, NAIA, Alabang), our dedicated concierge team guarantees curbside delivery within 45 to 60 minutes for reserved bookings. Emergency and on-demand dispatches average under 90 minutes."
  },
  {
    q: "Can my car be waiting at the airport when my flight lands?",
    a: "Yes. Our NAIA Terminal 3 and Clark hubs are directly linked to real-time flight telemetry. Your assigned concierge monitors your flight and ensures the vehicle is parked curbside with the climate control pre-set to your preference."
  },
  {
    q: "What credentials are required to rent luxury sports cars?",
    a: "Drivers must be at least 21 years of age with a valid Philippine Driver's License or an International Driving Permit (IDP) alongside a valid passport. A major credit card or verified security deposit is required for high-tier supercars."
  },
  {
    q: "Is comprehensive insurance included with all rentals?",
    a: "Every DriveX vehicle includes Tier-1 Comprehensive Collision Damage Waiver (CDW) and Third-Party Liability (TPL) insurance. Zero-deductible VIP excess waiver coverage is also available during booking."
  }
];

export default function ContactPage() {
  const { openBooking } = useBooking();
  const [selectedHub, setSelectedHub] = useState<HubLocation>(HUBS[0]);
  const [inquiryType, setInquiryType] = useState("General Inquiry");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    vehicleInterest: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate luxury dispatch transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const handleResetForm = () => {
    setFormData({ fullName: "", email: "", phone: "", vehicleInterest: "", message: "" });
    setSubmitted(false);
  };

  return (
    <div className="cp-page">
      {/* ---------------- Cinematic Hero Banner ---------------- */}
      <section className="cp-hero-banner">
        {/* Background Visual Layer */}
        <div className="cp-hero-bg-wrap">
          <Image
            src="/images/fleet-porsche.jpg"
            alt="DriveX Exotic Automotive Concierge"
            fill
            priority
            sizes="100vw"
          />
        </div>

        {/* Glow & Vignette Overlays */}
        <div className="cp-hero-glow" />
        <div className="cp-hero-overlay" />

        <div className="cp-hero-content">
          <div className="cp-hero-eyebrow">
            <span className="cp-pulse-dot" />
            <span>DRIVEX VIP CONCIERGE // 24/7 DISPATCH ACTIVE</span>
          </div>

          <h1 className="cp-hero-title">
            Connect With Our <span>Private Concierge.</span>
          </h1>

          <p className="cp-hero-sub">
            Direct priority lines to our fleet specialists, VIP turnaround managers, and nationwide concierge lounges.
            Guaranteed 15-minute verification with on-demand curbside delivery across the Philippines.
          </p>

          <div className="cp-hero-actions-row">
            <a
              href="https://wa.me/639171234567?text=Hello%20DriveX%20Concierge,%20I%20would%20like%20to%20inquire%20about%20a%20luxury%20vehicle%20reservation."
              target="_blank"
              rel="noreferrer"
              className="cp-hero-direct-btn primary"
            >
              <MessageSquare size={16} /> WhatsApp VIP Concierge
            </a>
            <a href="tel:+63288883748" className="cp-hero-direct-btn secondary">
              <Phone size={15} /> Priority Phone (+63 2 8888 3748)
            </a>
            <button
              type="button"
              className="cp-hero-direct-btn secondary"
              onClick={() => openBooking({ step: 1 })}
            >
              <Sparkles size={15} /> Book Reservation Online
            </button>
          </div>

          <div className="cp-hero-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><TwitterIcon /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><LinkedinIcon /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><YoutubeIcon /></a>
          </div>

          <div className="cp-quick-stats">
            <div className="cp-stat-chip">
              <Clock size={16} />
              <span>&lt; 15 Min Verification</span>
            </div>
            <div className="cp-stat-chip">
              <Compass size={16} />
              <span>5 Operational Hubs</span>
            </div>
            <div className="cp-stat-chip">
              <ShieldCheck size={16} />
              <span>24/7 Roadside VIP Dispatch</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Interactive Multi-Location Map ---------------- */}
      <section className="cp-hubs-section">
        <div className="cp-section-header">
          <h2>Nationwide Operations & Lounges</h2>
          <p>Select any branch on the radar map to view dispatch hours, coordinates, and direct lines.</p>
        </div>

        <div className="cp-map-layout">
          {/* Realistic Leaflet Dark Mode Map */}
          <LeafletMap
            hubs={HUBS}
            selectedHub={selectedHub}
            onSelectHub={setSelectedHub}
          />

          {/* Hubs Selector Cards List */}
          <div className="cp-hubs-list">
            {HUBS.map((hub) => {
              const isSelected = selectedHub.id === hub.id;
              return (
                <div 
                  key={hub.id}
                  className={`cp-hub-card ${isSelected ? "active" : ""}`}
                  onClick={() => setSelectedHub(hub)}
                >
                  <div className="cp-hub-header">
                    <span className="cp-hub-name">{hub.name}</span>
                    <span className="cp-hub-pill">{hub.category.split(" ")[0]}</span>
                  </div>

                  <div className="cp-hub-address">
                    <MapPin size={14} />
                    <span>{hub.address}</span>
                  </div>

                  <div className="cp-hub-footer">
                    <div className="cp-hub-meta">
                      <Clock size={13} />
                      <span>{hub.hours}</span>
                    </div>
                    <span className="cp-hub-phone">{hub.phone}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Direct Channels & Inquiry Form ---------------- */}
      <section className="cp-comms-section">
        <div className="cp-comms-grid">
          {/* Left Column: Direct Channels & Social Matrix */}
          <div className="cp-channels-col">
            {/* Direct Communication Channels */}
            <div className="cp-channel-card">
              <h3>
                <Phone size={18} />
                <span>Direct Concierge Channels</span>
              </h3>

              <div className="cp-channel-items">
                <a href="tel:+63288883748" className="cp-channel-row">
                  <div className="cp-cr-left">
                    <div className="cp-cr-icon"><Phone size={17} /></div>
                    <div className="cp-cr-text">
                      <span className="cp-cr-label">Toll-Free VIP Line</span>
                      <span className="cp-cr-val">+63 (2) 8888-DRIVEX</span>
                    </div>
                  </div>
                  <ArrowRight size={15} className="cp-cr-arrow" />
                </a>

                <a href="mailto:concierge@drivex.ph" className="cp-channel-row">
                  <div className="cp-cr-left">
                    <div className="cp-cr-icon"><Mail size={17} /></div>
                    <div className="cp-cr-text">
                      <span className="cp-cr-label">Email Concierge</span>
                      <span className="cp-cr-val">concierge@drivex.ph</span>
                    </div>
                  </div>
                  <ArrowRight size={15} className="cp-cr-arrow" />
                </a>

                <a href="https://wa.me/639178883748" target="_blank" rel="noopener noreferrer" className="cp-channel-row">
                  <div className="cp-cr-left">
                    <div className="cp-cr-icon"><MessageSquare size={17} /></div>
                    <div className="cp-cr-text">
                      <span className="cp-cr-label">WhatsApp & Telegram VIP</span>
                      <span className="cp-cr-val">+63 917 888 3748</span>
                    </div>
                  </div>
                  <ArrowRight size={15} className="cp-cr-arrow" />
                </a>

                <div className="cp-channel-row" style={{ cursor: "default" }}>
                  <div className="cp-cr-left">
                    <div className="cp-cr-icon"><ShieldCheck size={17} /></div>
                    <div className="cp-cr-text">
                      <span className="cp-cr-label">Emergency Roadside Assistance</span>
                      <span className="cp-cr-val">+63 (2) 8999-HELP (24/7)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>

          {/* Right Column: Inquiry & Booking Form */}
          <div className="cp-form-card">
            <div className="cp-form-header">
              <h3>Send a Private Dispatch Inquiry</h3>
              <p>Leave your details and vehicle of interest. A fleet manager will respond within 15 minutes.</p>
            </div>

            {submitted ? (
              <div className="cp-success-box">
                <div className="cp-success-icon">
                  <CheckCircle2 size={28} />
                </div>
                <h4>Inquiry Received</h4>
                <p>
                  Thank you, <strong>{formData.fullName || "valued client"}</strong>. Your priority request has been assigned to our senior concierge team. Expect a direct callback shortly.
                </p>
                <button className="cp-btn-reset" onClick={handleResetForm}>
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cp-form-content">
                {/* Inquiry Type Chips */}
                <div className="cp-input-group full">
                  <label>Inquiry Category</label>
                  <div className="cp-type-pills">
                    {["General Inquiry", "Custom Supercar Hire", "Corporate Fleet", "Airport VIP Transfer", "Film & Events"].map((t) => (
                      <button
                        type="button"
                        key={t}
                        className={`cp-type-pill ${inquiryType === t ? "active" : ""}`}
                        onClick={() => setInquiryType(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="cp-form-grid" style={{ marginTop: 16 }}>
                  {/* Name */}
                  <div className="cp-input-group">
                    <label>Full Name *</label>
                    <div className="cp-input-wrap">
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Alexander Vance"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="cp-input-group">
                    <label>Email Address *</label>
                    <div className="cp-input-wrap">
                      <input 
                        type="email" 
                        required 
                        placeholder="alexander@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="cp-input-group">
                    <label>Phone / WhatsApp *</label>
                    <div className="cp-input-wrap">
                      <input 
                        type="tel" 
                        required 
                        placeholder="+63 900 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Vehicle Selector */}
                  <div className="cp-input-group">
                    <label>Vehicle of Interest</label>
                    <div className="cp-input-wrap">
                      <select 
                        value={formData.vehicleInterest}
                        onChange={(e) => setFormData({ ...formData, vehicleInterest: e.target.value })}
                      >
                        <option value="">Any available vehicle</option>
                        {vehicles.map((v) => (
                          <option key={v.id} value={v.name}>
                            {v.name} ({v.price}/day)
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="cp-select-arrow" />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="cp-input-group full">
                    <label>Special Requests or Details</label>
                    <div className="cp-input-wrap">
                      <textarea 
                        rows={3}
                        placeholder="Specify target dates, delivery location, or chauffeur requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="cp-submit-btn">
                  {isSubmitting ? (
                    <span>Transmitting to Concierge...</span>
                  ) : (
                    <>
                      <span>Submit Priority Inquiry</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- Frequently Asked Questions ---------------- */}
      <section className="cp-faq-section">
        <div className="cp-section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Quick answers regarding fleet turnarounds, airport handovers, and licensing requirements.</p>
        </div>

        <div className="cp-faq-list">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className={`cp-faq-item ${isOpen ? "open" : ""}`}
              >
                <button 
                  className="cp-faq-question"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} />
                </button>
                {isOpen && (
                  <div className="cp-faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="cp-footer">
        <div className="cp-footer-brand">
          DRIVE<span>X</span> PHILIPPINES
        </div>
        <div className="cp-footer-links">
          <Link href="/">Home</Link>
          <Link href="/vehicles">Fleet Directory</Link>
          <Link href="/contact">Concierge Hub</Link>
          <Link href="/admin">Fleet Admin</Link>
        </div>
        <div className="cp-footer-copy">
          © {new Date().getFullYear()} DriveX Luxury Mobility Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
