"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, Phone, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { type HubLocation } from "@/components/LeafletMap";
import "./home-contact.css";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="home-leaflet-loading">
      <span>Initializing DriveX Telemetry Map...</span>
    </div>
  ),
});

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
    features: ["Supercar Direct Handover", "Private VIP Valet", "Refreshment Lounge"],
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
    features: ["Executive Sedans", "Armored Vehicle Dispatch", "Corporate Billing Desk"],
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
    features: ["Tarmac Fast-Track", "Luggage Valet", "Keyless Mobile Unlock"],
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
    features: ["Track Preparation", "North Luzon Dispatch", "Helipad Access"],
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
    features: ["Coastal SUV Fleet", "Mactan Airport Drop", "Island Tour Drivers"],
  },
];

export default function HomeContactSection() {
  const [selectedHub, setSelectedHub] = useState<HubLocation>(HUBS[0]);

  return (
    <section className="home-contact-section" id="contact" data-reveal>
      <div className="home-contact-container">
        {/* Section Header */}
        <div className="home-contact-header">
          <div>
            <p className="eyebrow">05 // Nationwide Operations</p>
            <h2>Nationwide Hubs &amp; Lounges</h2>
          </div>
          <p className="home-contact-header-desc">
            Direct delivery at NAIA, private turnarounds in BGC, and executive lounges across Metro Manila &amp; the Philippines.
          </p>
        </div>

        {/* Hub Selector Pills */}
        <div className="home-hub-tabs">
          {HUBS.map((hub) => (
            <button
              type="button"
              key={hub.id}
              className={`home-hub-tab ${selectedHub.id === hub.id ? "active" : ""}`}
              onClick={() => setSelectedHub(hub)}
            >
              <span className="home-hub-tab-dot" />
              <span>{hub.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Exact Leaflet Map from Contact Page */}
        <div className="home-map-frame">
          <LeafletMap
            hubs={HUBS}
            selectedHub={selectedHub}
            onSelectHub={setSelectedHub}
          />
        </div>

        {/* Selected Hub Details Bar */}
        <div className="home-selected-hub-bar">
          <div className="home-selected-hub-main">
            <div className="home-selected-hub-tags">
              <span className="home-selected-hub-name">{selectedHub.name}</span>
              <span className="home-selected-hub-category">{selectedHub.category}</span>
            </div>
            <div className="home-selected-hub-meta">
              <span><MapPin size={14} /> {selectedHub.address}</span>
              <span><Clock size={14} /> {selectedHub.hours}</span>
              <span><Phone size={14} /> {selectedHub.phone}</span>
            </div>
          </div>

          <div className="home-selected-hub-actions">
            <a
              href={selectedHub.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="home-hub-action-btn secondary"
            >
              Directions <ExternalLink size={13} />
            </a>
            <Link href="/contact" className="home-hub-action-btn primary">
              Concierge Hub <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
