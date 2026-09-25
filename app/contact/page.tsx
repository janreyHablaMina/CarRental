"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Clock,
  ExternalLink,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { vehicles } from "@/lib/vehicles";
import { type HubLocation } from "@/components/LeafletMap";
import "./contact.css";

// Dynamically import Leaflet Map to prevent SSR errors
const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="contact-map-loader">
      <div className="contact-map-spin" />
      <span>Loading Interactive Map...</span>
    </div>
  ),
});

const HUBS: HubLocation[] = [
  {
    id: "bgc",
    name: "BGC Flagship Lounge",
    category: "Supercar Handover & VIP Lounge",
    address: "5th Ave cor. 28th St, Bonifacio High Street Central, Taguig City",
    phone: "+63 (2) 8888-3748",
    email: "bgc.concierge@drivex.ph",
    hours: "Open 24/7 (VIP Turnaround)",
    coords: "14.5507° N, 121.0509° E",
    lat: 14.5507,
    lng: 121.0509,
    googleMapsUrl: "https://maps.google.com/?q=Bonifacio+High+Street+Taguig",
    features: ["Supercar Direct Handover", "Private VIP Valet", "Refreshment Lounge"],
  },
  {
    id: "naia",
    name: "NAIA Terminal 3 Concierge",
    category: "Airside & Curbside Airport Handover",
    address: "Terminal 3 Arrival VIP Lounge, Andrews Ave, Pasay City",
    phone: "+63 (2) 8888-3750",
    email: "airport.vip@drivex.ph",
    hours: "Open 24/7 (Flight Tracked)",
    coords: "14.5204° N, 121.0159° E",
    lat: 14.5204,
    lng: 121.0159,
    googleMapsUrl: "https://maps.google.com/?q=NAIA+Terminal+3+Pasay",
    features: ["Tarmac Fast-Track", "Inbound Flight Sync", "Pre-Cooled Cabin"],
  },
  {
    id: "makati",
    name: "Makati Executive Hub",
    category: "Corporate Fleet & Chauffeur Desk",
    address: "Ayala Triangle Gardens Tower Two, Paseo de Roxas, Makati CBD",
    phone: "+63 (2) 8888-3749",
    email: "makati.fleet@drivex.ph",
    hours: "06:00 AM – 11:00 PM Daily",
    coords: "14.5574° N, 121.0232° E",
    lat: 14.5574,
    lng: 121.0232,
    googleMapsUrl: "https://maps.google.com/?q=Ayala+Triangle+Gardens+Makati",
    features: ["Executive Sedans", "Armored Fleet Dispatch", "Corporate Desk"],
  },
  {
    id: "clark",
    name: "Clark Freeport Hub",
    category: "Grand Touring & Track Fleet Staging",
    address: "Clark Global City, Manuel A. Roxas Hwy, Clark Freeport Zone",
    phone: "+63 (45) 499-3748",
    email: "clark.fleet@drivex.ph",
    hours: "07:00 AM – 10:00 PM Daily",
    coords: "15.1764° N, 120.5312° E",
    lat: 15.1764,
    lng: 120.5312,
    googleMapsUrl: "https://maps.google.com/?q=Clark+Global+City+Pampanga",
    features: ["Track Day Prep", "Clark Airport Staging", "Helipad Access"],
  },
  {
    id: "cebu",
    name: "Cebu IT Park Hub",
    category: "Visayas Coastal Fleet & Island Tours",
    address: "Skyrise 4B, Garden Bloc, Cebu IT Park, Lahug, Cebu City",
    phone: "+63 (32) 412-3748",
    email: "cebu.vip@drivex.ph",
    hours: "08:00 AM – 09:00 PM Daily",
    coords: "10.3297° N, 123.9056° E",
    lat: 10.3297,
    lng: 123.9056,
    googleMapsUrl: "https://maps.google.com/?q=Cebu+IT+Park+Lahug",
    features: ["Coastal SUV Fleet", "Mactan Airport Drop", "Island Tour Drivers"],
  },
];

const FAQS = [
  {
    q: "How fast can a vehicle be delivered to my hotel or residence?",
    a: "Within Metro Manila (BGC, Makati, NAIA, Alabang), our dedicated concierge team guarantees curbside delivery within 45 to 60 minutes for confirmed bookings.",
  },
  {
    q: "Can my car be waiting curbside at NAIA when my flight lands?",
    a: "Yes. Our team tracks your inbound flight number and coordinates curbside staging so your vehicle is pre-cooled and waiting the moment you exit the terminal.",
  },
  {
    q: "What credentials do I need to rent a luxury vehicle?",
    a: "Drivers must be at least 21 years of age with a valid Philippine Driver's License or an International Driving Permit (IDP) alongside a valid passport or government ID. A major credit card security hold is required for supercars.",
  },
  {
    q: "Is insurance included in the daily rental rate?",
    a: "Every rental includes Tier-1 Comprehensive Collision Damage Waiver (CDW) and Third-Party Liability (TPL). Zero-deductible VIP excess waiver coverage is also available during booking.",
  },
];

export default function ContactPage() {
  const [selectedHub, setSelectedHub] = useState<HubLocation>(HUBS[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle: "",
    location: "BGC Flagship Lounge",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      vehicle: "",
      location: "BGC Flagship Lounge",
      message: "",
    });
    setSubmitted(false);
  };

  return (
    <div className="contact-page">
      {/* ---------------- 1. Cinematic Automotive Banner ---------------- */}
      <section className="contact-cinematic-banner">
        <div className="contact-banner-stage">
          {/* High-Resolution Background Image Layer */}
          <div className="contact-banner-bg">
            <Image
              src="/images/drivex-coastal-drive.png"
              alt="DriveX Concierge Luxury Grand Touring"
              fill
              priority
              sizes="100vw"
            />
          </div>

          {/* Luxury Atmospheric Overlays */}
          <div className="contact-banner-glow" />
          <div className="contact-banner-overlay" />
          <div className="contact-banner-speedlines" />

          {/* Banner Editorial Content */}
          <div className="contact-banner-content">
            <div className="contact-banner-container">
              <div className="contact-hero-tag">
                <span className="contact-tag-dot" />
                <span>01 // 24/7 PRIVATE CONCIERGE &amp; OPERATIONS</span>
              </div>

              <h1 className="contact-hero-heading">
                The Art of Bespoke Service.<br />
                <span>Connect with Concierge.</span>
              </h1>

              <p className="contact-hero-subtext">
                Whether arranging an airside tarmac delivery at NAIA, reserving an exotic supercar, or organizing a custom road expedition, our dedicated fleet operations team is at your command 24/7.
              </p>

              {/* Direct Contact Pills on Banner */}
              <div className="contact-direct-pills">
                <a href="tel:+63288883748" className="direct-pill">
                  <Phone size={14} className="pill-icon" />
                  <span>+63 (2) 8888-DRIVEX</span>
                </a>
                <a
                  href="https://wa.me/639178883748?text=Hello%20DriveX%20Concierge,%20I%20would%20like%20to%20inquire%20about%20a%20luxury%20vehicle%20reservation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="direct-pill whatsapp"
                >
                  <MessageSquare size={14} className="pill-icon" />
                  <span>WhatsApp VIP Desk</span>
                </a>
                <a href="mailto:concierge@drivex.ph" className="direct-pill">
                  <Mail size={14} className="pill-icon" />
                  <span>concierge@drivex.ph</span>
                </a>
                <a href="tel:+63289994357" className="direct-pill emergency">
                  <span className="emergency-indicator" />
                  <span>Roadside: +63 (2) 8999-HELP</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 2. Unified 2-Column Console (Form + Hubs/Map) ---------------- */}
      <section className="contact-content-section">
        <div className="contact-container">
          <div className="contact-split-grid">
            {/* Left Column: Clean Inquiry Form */}
            <div className="contact-box form-box">
              <div className="box-head">
                <h2>Send a Priority Inquiry</h2>
                <p>Leave your details and requirements. A fleet coordinator will respond promptly.</p>
              </div>

              {submitted ? (
                <div className="form-success-state">
                  <CheckCircle2 size={38} className="success-icon" />
                  <h3>Inquiry Received</h3>
                  <p>
                    Thank you, <strong>{formData.name || "valued guest"}</strong>. Your request regarding{" "}
                    <strong>{formData.vehicle || "our luxury fleet"}</strong> has been logged. Our concierge will contact you via <strong>{formData.phone || formData.email}</strong> shortly.
                  </p>
                  <div className="success-buttons">
                    <button type="button" className="btn-reset" onClick={handleResetForm}>
                      Send Another Message
                    </button>
                    <a
                      href={`https://wa.me/639178883748?text=Hello%20DriveX,%20I%20just%20submitted%20an%20inquiry%20for%20${encodeURIComponent(
                        formData.name
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-wa"
                    >
                      Message on WhatsApp <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-field">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sebastian Cruz"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-field">
                      <label>Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+63 917 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="client@prestige.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-field">
                      <label>Vehicle of Interest</label>
                      <div className="select-wrap">
                        <select
                          value={formData.vehicle}
                          onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                        >
                          <option value="">Any available vehicle</option>
                          {vehicles.map((v) => (
                            <option key={v.id} value={`${v.brand} ${v.name}`}>
                              {v.brand} {v.name} (₱{v.price}/day)
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="select-icon" />
                      </div>
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Preferred Handover Hub</label>
                    <div className="select-wrap">
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      >
                        <option value="BGC Flagship Lounge">BGC Flagship Lounge (Bonifacio High Street)</option>
                        <option value="NAIA Terminal 3 Airport">NAIA Terminal 3 (Airside / Curbside VIP)</option>
                        <option value="Makati CBD Handover">Makati Executive Hub (Ayala Triangle)</option>
                        <option value="Clark Freeport Zone">Clark Freeport Zone (Pampanga / Helipad)</option>
                        <option value="Cebu IT Park">Cebu IT Park Hub (Garden Bloc)</option>
                        <option value="Custom Hotel or Residence">Private Residence or 5-Star Hotel Valet</option>
                      </select>
                      <ChevronDown size={14} className="select-icon" />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Trip Dates &amp; Special Requests</label>
                    <textarea
                      rows={3}
                      placeholder="Please note your requested rental dates, delivery location, flight number, or chauffeur requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="submit-btn">
                    {isSubmitting ? "Transmitting Request..." : "Submit Priority Inquiry"}
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Physical Lounges + Integrated Interactive Map */}
            <div className="contact-box locations-box">
              <div className="box-head">
                <h2>Flagship Lounges &amp; Hubs</h2>
                <p>Pick up keys at our private lounges or request direct curbside delivery.</p>
              </div>

              {/* Hub Tabs */}
              <div className="hub-tabs-row">
                {HUBS.map((hub) => (
                  <button
                    type="button"
                    key={hub.id}
                    className={`hub-tab-btn ${selectedHub.id === hub.id ? "active" : ""}`}
                    onClick={() => setSelectedHub(hub)}
                  >
                    {hub.name.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Selected Hub Details Card */}
              <div className="selected-hub-dossier">
                <div className="dossier-top">
                  <div>
                    <span className="dossier-category">{selectedHub.category}</span>
                    <h3 className="dossier-title">{selectedHub.name}</h3>
                  </div>
                  <a
                    href={selectedHub.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dossier-map-btn"
                  >
                    <span>Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                <div className="dossier-meta">
                  <div className="meta-line">
                    <MapPin size={14} className="meta-icon" />
                    <span>{selectedHub.address}</span>
                  </div>
                  <div className="meta-line">
                    <Clock size={14} className="meta-icon" />
                    <span>{selectedHub.hours}</span>
                  </div>
                  <div className="meta-line">
                    <Phone size={14} className="meta-icon" />
                    <a href={`tel:${selectedHub.phone.replace(/[^0-9+]/g, "")}`}>{selectedHub.phone}</a>
                  </div>
                </div>

                {/* Compact Embedded Leaflet Map */}
                <div className="hub-embedded-map">
                  <LeafletMap
                    hubs={HUBS}
                    selectedHub={selectedHub}
                    onSelectHub={setSelectedHub}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 3. Compact FAQs Accordion ---------------- */}
      <section className="contact-faq-section">
        <div className="contact-container">
          <div className="faq-head">
            <span className="faq-tag">CLIENT INTELLIGENCE</span>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`faq-card ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="faq-trigger"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question">{faq.q}</span>
                    <ChevronDown size={16} className={`faq-arrow ${isOpen ? "rotate" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="faq-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
