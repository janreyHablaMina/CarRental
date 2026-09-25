"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Compass,
  Mountain,
} from "lucide-react";
import "./home-contact.css";

export interface HubLocation {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  coords?: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
  features: string[];
  scenicRoute: string;
  elevation: string;
  speed: string;
}

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
    scenicRoute: "Sierra Madre Mountain Pass // Luzon Foothills",
    elevation: "540m ASL",
    speed: "112 KM/H",
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
    scenicRoute: "Tagaytay Ridge Pass & Taal Lake Scenic Route",
    elevation: "680m ASL",
    speed: "96 KM/H",
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
    scenicRoute: "South Luzon Coastal Corridor & Batangas Coast",
    elevation: "42m ASL",
    speed: "124 KM/H",
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
    scenicRoute: "Bamban Peaks & Zambales Mountain Range Expedition",
    elevation: "410m ASL",
    speed: "135 KM/H",
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
    scenicRoute: "Cebu Trans-Central Mountain Highway & Coastal Cliffs",
    elevation: "830m ASL",
    speed: "108 KM/H",
  },
];

export default function HomeContactSection() {
  const [selectedHub, setSelectedHub] = useState<HubLocation>(HUBS[0]);
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
            <p className="eyebrow">05 // Nationwide Operations</p>
            <h2>Nationwide Hubs &amp; Lounges</h2>
          </div>
          <p className="home-contact-header-desc">
            Direct airport delivery, private VIP turnarounds, and nationwide touring fleets engineered for scenic road trips across the Philippines.
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
      </div>

      {/* FULL WIDTH CINEMATIC NATURE TRIP / MOVING CAR VIDEO */}
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

        {/* Dark Cinematic Vignette Overlays */}
        <div className="home-video-vignette" />
        <div className="home-video-scanline" />

        {/* HUD Telemetry Badges */}
        <div className="home-video-hud-top">
          <div className="home-hud-chip live">
            <span className="home-hud-dot" />
            <span>NATURE EXPEDITION // 4K SCENIC HIGHWAY RUN</span>
          </div>
          <div className="home-hud-chip secondary">
            <Mountain size={13} />
            <span>COASTAL &amp; MOUNTAIN GRAND TOURING</span>
          </div>
        </div>

        {/* Video Overlay Center Callout */}
        <div className="home-video-center-info">
          <span className="home-video-watermark">{selectedHub.name.toUpperCase()}</span>
          <p className="home-video-scenic-sub">{selectedHub.scenicRoute}</p>
          <div className="home-video-telemetry-strip">
            <span>{selectedHub.coords || "14.5507° N, 121.0509° E"}</span>
            <span className="telemetry-divider">•</span>
            <span>ELEV: {selectedHub.elevation}</span>
            <span className="telemetry-divider">•</span>
            <span>CRUISE: {selectedHub.speed}</span>
          </div>
        </div>

        {/* Video Player Floating Controls */}
        <div className="home-video-controls-bar">
          <button
            type="button"
            className="home-video-ctrl-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>

          <button
            type="button"
            className="home-video-ctrl-btn"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span>{isMuted ? "Muted" : "Sound On"}</span>
          </button>
        </div>
      </div>

      <div className="home-contact-container">
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

