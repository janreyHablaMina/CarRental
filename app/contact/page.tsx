"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  MapPin,
  ExternalLink,
  Sparkles,
  Check
} from "lucide-react";
import { vehicles } from "@/lib/vehicles";
import { HubLocation } from "@/components/LeafletMap";
import "./contact.css";

// Dynamically import Leaflet Map (client-side only, no SSR)
const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="contact-map-loading">
      <div className="contact-map-spinner" />
      <span>Loading interactive map...</span>
    </div>
  ),
});

const HUBS: HubLocation[] = [
  {
    id: "bgc",
    name: "BGC Flagship Lounge",
    category: "Supercar Handover & Private Lounge",
    address: "5th Ave cor. 28th St, Bonifacio High Street Central, Taguig City, Metro Manila",
    phone: "+63 (2) 8888-3748",
    email: "bgc.concierge@drivex.ph",
    hours: "Open 24/7 (VIP Turnaround)",
    coords: "14.5507° N, 121.0509° E",
    lat: 14.5507,
    lng: 121.0509,
    googleMapsUrl: "https://maps.google.com/?q=Bonifacio+High+Street+Taguig",
    features: ["Supercar Direct Handover", "Private VIP Valet", "Refreshment Lounge", "Vehicle Detailing Bay"]
  },
  {
    id: "naia",
    name: "NAIA Terminal 3 Concierge",
    category: "Airside & Curbside Airport Handover",
    address: "Terminal 3 Arrival VIP Lounge, Andrews Ave, Pasay City, Metro Manila",
    phone: "+63 (2) 8888-3750",
    email: "airport.vip@drivex.ph",
    hours: "Open 24/7 (Flight Tracked)",
    coords: "14.5204° N, 121.0159° E",
    lat: 14.5204,
    lng: 121.0159,
    googleMapsUrl: "https://maps.google.com/?q=NAIA+Terminal+3+Pasay",
    features: ["Tarmac Fast-Track", "Luggage Valet", "Pre-Cooled Cabin", "Chauffeur Meet & Greet"]
  },
  {
    id: "makati",
    name: "Makati Executive Hub",
    category: "Corporate Fleet & Chauffeur Logistics",
    address: "Ayala Triangle Gardens Tower Two, Paseo de Roxas, Makati CBD",
    phone: "+63 (2) 8888-3749",
    email: "makati.fleet@drivex.ph",
    hours: "06:00 AM – 11:00 PM Daily",
    coords: "14.5574° N, 121.0232° E",
    lat: 14.5574,
    lng: 121.0232,
    googleMapsUrl: "https://maps.google.com/?q=Ayala+Triangle+Gardens+Makati",
    features: ["Executive Sedans", "Armored Vehicle Dispatch", "Corporate Billing Desk", "Diplomatic Escorts"]
  },
  {
    id: "clark",
    name: "Clark Freeport Hub",
    category: "Grand Touring & Track Fleet Staging",
    address: "Clark Global City, Manuel A. Roxas Hwy, Clark Freeport Zone, Pampanga",
    phone: "+63 (45) 499-3748",
    email: "clark.fleet@drivex.ph",
    hours: "07:00 AM – 10:00 PM Daily",
    coords: "15.1764° N, 120.5312° E",
    lat: 15.1764,
    lng: 120.5312,
    googleMapsUrl: "https://maps.google.com/?q=Clark+Global+City+Pampanga",
    features: ["Track Day Prep", "North Luzon Dispatch", "Helipad Direct Access", "High-Speed Staging"]
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
    features: ["Coastal SUV Fleet", "Mactan Airport Drop", "Island Tour Drivers", "Yacht Transfer Coordination"]
  }
];

const FAQS = [
  {
    q: "How fast can a vehicle be delivered to my hotel or residence?",
    a: "Within Metro Manila (BGC, Makati, NAIA, Alabang), our dedicated concierge team guarantees curbside delivery within 45 to 60 minutes for reserved bookings. Emergency and on-demand dispatches average under 90 minutes."
  },
  {
    q: "Can my car be waiting curbside at NAIA when my flight lands?",
    a: "Yes. Our NAIA Terminal 3 team is directly linked to real-time flight telemetry. Your assigned concierge tracks your inbound flight and ensures the vehicle is parked curbside with climate control pre-set to your preference."
  },
  {
    q: "What credentials do I need to rent a luxury vehicle?",
    a: "Drivers must be at least 21 years of age with a valid Philippine Driver's License or an International Driving Permit (IDP) alongside a valid passport. A major credit card or verified security deposit is required for supercars."
  },
  {
    q: "Is insurance included in the daily rental rate?",
    a: "Every DriveX rental includes Tier-1 Comprehensive Collision Damage Waiver (CDW) and Third-Party Liability (TPL) insurance. Zero-deductible VIP excess waiver coverage is also available during booking."
  },
  {
    q: "Can you accommodate custom driving tours or chauffeur services?",
    a: "Yes. We offer professional executive chauffeurs as well as bespoke convoy planning for mountain routes (Sierra Madre, Tagaytay) and multi-day provincial grand tours."
  }
];

export default function ContactPage() {
  const [selectedHub, setSelectedHub] = useState<HubLocation>(HUBS[0]);
  const [inquiryType, setInquiryType] = useState("Vehicle Reservation");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    targetDate: "",
    vehicleInterest: "",
    pickupLocation: "BGC Flagship Lounge",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      targetDate: "",
      vehicleInterest: "",
      pickupLocation: "BGC Flagship Lounge",
      message: ""
    });
    setSubmitted(false);
  };

  return (
    <div className="contact-page">
      {/* ---------------- 1. Refined Page Header ---------------- */}
      <section className="contact-hero">
        <div className="contact-hero-container">
          <div className="contact-badge">
            <span className="contact-badge-dot" />
            <span>24/7 PRIVATE CONCIERGE DESK</span>
          </div>

          <h1 className="contact-hero-title">
            Contact <span>DriveX Concierge</span>
          </h1>

          <p className="contact-hero-subtitle">
            Whether arranging an airport tarmac delivery at NAIA, reserving an exotic supercar, or organizing a custom mountain pass expedition, our team is available 24/7.
          </p>
        </div>
      </section>

      {/* ---------------- 2. Top Direct Contact Channels (3 Key Cards) ---------------- */}
      <section className="contact-channels-section">
        <div className="contact-channels-container">
          {/* Card 1: Phone */}
          <a href="tel:+63288883748" className="contact-channel-card">
            <div className="channel-card-icon phone">
              <Phone size={22} />
            </div>
            <div className="channel-card-content">
              <span className="channel-card-label">Toll-Free VIP Hotline</span>
              <span className="channel-card-value">+63 (2) 8888-DRIVEX</span>
              <span className="channel-card-sub">Available 24/7 • Instant Call</span>
            </div>
            <span className="channel-card-action">
              Call Now <ArrowRight size={14} />
            </span>
          </a>

          {/* Card 2: WhatsApp */}
          <a
            href="https://wa.me/639178883748?text=Hello%20DriveX%20Concierge,%20I%20would%20like%20to%20inquire%20about%20a%20luxury%20vehicle%20reservation."
            target="_blank"
            rel="noopener noreferrer"
            className="contact-channel-card highlight"
          >
            <div className="channel-card-icon whatsapp">
              <MessageSquare size={22} />
            </div>
            <div className="channel-card-content">
              <span className="channel-card-label">WhatsApp VIP Concierge</span>
              <span className="channel-card-value">+63 917 888 3748</span>
              <span className="channel-card-sub">Direct Chat • &lt; 5 Min Response</span>
            </div>
            <span className="channel-card-action">
              Message on WhatsApp <ArrowRight size={14} />
            </span>
          </a>

          {/* Card 3: Email */}
          <a href="mailto:concierge@drivex.ph" className="contact-channel-card">
            <div className="channel-card-icon email">
              <Mail size={22} />
            </div>
            <div className="channel-card-content">
              <span className="channel-card-label">Private Client Email</span>
              <span className="channel-card-value">concierge@drivex.ph</span>
              <span className="channel-card-sub">Official Quotes & Itineraries</span>
            </div>
            <span className="channel-card-action">
              Send Email <ArrowRight size={14} />
            </span>
          </a>
        </div>

        {/* Roadside Emergency Banner */}
        <div className="contact-emergency-strip">
          <div className="emergency-strip-inner">
            <div className="emergency-left">
              <ShieldCheck size={16} className="emergency-icon" />
              <span><strong>Active Fleet Roadside Emergency:</strong> In the event of an urgent roadside issue, dial our dedicated 24/7 dispatch team:</span>
            </div>
            <a href="tel:+63289994357" className="emergency-phone">
              +63 (2) 8999-HELP
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- 3. Split 2-Column Main Contact Experience ---------------- */}
      <section className="contact-main-section">
        <div className="contact-main-grid">
          {/* Left Column: Contact Form */}
          <div className="contact-form-box">
            <div className="contact-form-header">
              <h2>Send an Inquiry</h2>
              <p>Leave your details and requirements. A dedicated fleet coordinator will respond promptly.</p>
            </div>

            {submitted ? (
              <div className="contact-form-success">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={36} />
                </div>
                <h3>Message Received</h3>
                <p>
                  Thank you, <strong>{formData.fullName || "valued guest"}</strong>. Your inquiry regarding{" "}
                  <strong>{formData.vehicleInterest || "our luxury fleet"}</strong> has been received. Our senior concierge will contact you via <strong>{formData.phone || formData.email}</strong> shortly.
                </p>
                <button type="button" className="contact-form-reset-btn" onClick={handleResetForm}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {/* Inquiry Category Pills */}
                <div className="form-group full">
                  <label className="form-label">Inquiry Purpose</label>
                  <div className="category-pills">
                    {[
                      "Vehicle Reservation",
                      "Airport VIP Handover",
                      "Chauffeur & Corporate",
                      "Custom Road Trip",
                      "General Question"
                    ].map((type) => (
                      <button
                        type="button"
                        key={type}
                        className={`category-pill ${inquiryType === type ? "active" : ""}`}
                        onClick={() => setInquiryType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-row">
                  {/* Name */}
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Vance"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alexander@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  {/* Phone */}
                  <div className="form-group">
                    <label className="form-label">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+63 900 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  {/* Desired Date */}
                  <div className="form-group">
                    <label className="form-label">Target Date</label>
                    <input
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  {/* Vehicle of Interest */}
                  <div className="form-group">
                    <label className="form-label">Vehicle of Interest</label>
                    <div className="form-select-wrap">
                      <select
                        value={formData.vehicleInterest}
                        onChange={(e) => setFormData({ ...formData, vehicleInterest: e.target.value })}
                        className="form-select"
                      >
                        <option value="">Any available vehicle</option>
                        {vehicles.map((v) => (
                          <option key={v.id} value={v.name}>
                            {v.name} ({v.price}/day)
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="select-arrow" />
                    </div>
                  </div>

                  {/* Preferred Location */}
                  <div className="form-group">
                    <label className="form-label">Preferred Location</label>
                    <div className="form-select-wrap">
                      <select
                        value={formData.pickupLocation}
                        onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                        className="form-select"
                      >
                        <option value="BGC Flagship Lounge">BGC Flagship Lounge</option>
                        <option value="NAIA Terminal 3 Airport">NAIA Terminal 3 Airport</option>
                        <option value="Makati CBD Handover">Makati CBD Handover</option>
                        <option value="Clark Freeport Zone">Clark Freeport Zone</option>
                        <option value="Cebu IT Park">Cebu IT Park</option>
                        <option value="Custom Address">Hotel / Private Residence</option>
                      </select>
                      <ChevronDown size={14} className="select-arrow" />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="form-group full">
                  <label className="form-label">Message or Special Requests</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your trip dates, preferred delivery time, or any specific requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="form-submit-btn">
                  {isSubmitting ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <span>Send Priority Message</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Physical Lounges & Hubs Directory */}
          <div className="contact-locations-box">
            <div className="locations-header">
              <h2>Flagship Lounges &amp; Hubs</h2>
              <p>Pick up keys directly at our private lounges or request curbside delivery anywhere in Metro Manila.</p>
            </div>

            {/* Hub Selector Buttons */}
            <div className="location-tabs">
              {HUBS.map((hub) => (
                <button
                  type="button"
                  key={hub.id}
                  className={`location-tab ${selectedHub.id === hub.id ? "active" : ""}`}
                  onClick={() => setSelectedHub(hub)}
                >
                  {hub.name.split(" ")[0]}
                </button>
              ))}
            </div>

            {/* Selected Location Card */}
            <div className="selected-location-card">
              <div className="location-badge">
                <Sparkles size={13} />
                <span>{selectedHub.category}</span>
              </div>

              <h3 className="location-name">{selectedHub.name}</h3>

              <div className="location-details-list">
                <div className="location-detail-item">
                  <MapPin size={16} className="detail-icon" />
                  <span>{selectedHub.address}</span>
                </div>

                <div className="location-detail-item">
                  <Clock size={16} className="detail-icon" />
                  <span>{selectedHub.hours}</span>
                </div>

                <div className="location-detail-item">
                  <Phone size={16} className="detail-icon" />
                  <a href={`tel:${selectedHub.phone.replace(/[^0-9+]/g, "")}`}>{selectedHub.phone}</a>
                </div>

                <div className="location-detail-item">
                  <Mail size={16} className="detail-icon" />
                  <a href={`mailto:${selectedHub.email}`}>{selectedHub.email}</a>
                </div>
              </div>

              {/* Hub Features */}
              <div className="location-features">
                <span className="features-title">Hub Services:</span>
                <div className="features-list">
                  {selectedHub.features.map((feat, idx) => (
                    <span key={idx} className="feature-pill">
                      <Check size={12} /> {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="location-card-actions">
                <a
                  href={selectedHub.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-btn primary"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={14} />
                </a>

                <a
                  href={`tel:${selectedHub.phone.replace(/[^0-9+]/g, "")}`}
                  className="location-btn secondary"
                >
                  <Phone size={14} />
                  <span>Call Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 4. Interactive Location Map ---------------- */}
      <section className="contact-map-section">
        <div className="contact-map-container">
          <div className="map-section-head">
            <div>
              <p className="section-eyebrow">Location Overview</p>
              <h2>Interactive Hubs Map</h2>
            </div>
            <p className="map-section-desc">
              Explore our physical lounges across Luzon and Visayas. Click any pin to view details and get instant driving directions.
            </p>
          </div>

          <div className="contact-map-wrapper">
            <LeafletMap
              hubs={HUBS}
              selectedHub={selectedHub}
              onSelectHub={setSelectedHub}
            />
          </div>
        </div>
      </section>

      {/* ---------------- 5. Essential FAQs Accordion ---------------- */}
      <section className="contact-faq-section">
        <div className="contact-faq-container">
          <div className="faq-header">
            <p className="section-eyebrow">Frequently Asked Questions</p>
            <h2>Everything You Need to Know</h2>
            <p>Clear, direct answers to common questions about reservations, delivery, and credentials.</p>
          </div>

          <div className="faq-accordion-list">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`faq-accordion-item ${isOpen ? "open" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-accordion-btn"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{faq.q}</span>
                    <ChevronDown size={18} className={`faq-chevron ${isOpen ? "rotate" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="faq-accordion-answer">
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
