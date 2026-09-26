"use client";

import "./vehicle-detail.css";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, use, useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Compass,
  Copy,
  Gauge,
  HelpCircle,
  MapPin,
  Phone,
  Shield,
  ShieldCheck,
  Sparkles,
  Timer,
  Users,
  Wind,
  Zap,
} from "lucide-react";
import { vehicles, PH_LOCATIONS, type Vehicle } from "@/lib/vehicles";
import { getVehicleEditorial } from "@/lib/vehicleDetails";
import { useBooking } from "@/context/BookingContext";

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { openBooking } = useBooking();
  const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === resolvedParams.id);

  const [activeImage, setActiveImage] = useState(vehicle?.image ?? "");
  const [destSearch, setDestSearch] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [picked, setPicked] = useState<{ route: string; price: number | null; exactRoute?: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Suggested complementary vehicles (same category or alternative flagships)
  const complementaryVehicles = useMemo(() => {
    if (!vehicle) return [];
    const sameCat = vehicles.filter((v) => v.id !== vehicle.id && v.category === vehicle.category);
    const others = vehicles.filter((v) => v.id !== vehicle.id && v.category !== vehicle.category);
    return [...sameCat, ...others].slice(0, 3);
  }, [vehicle]);

  if (!vehicle) {
    return (
      <main className="vd-not-found">
        <div className="vd-not-found-card">
          <p className="vd-not-found-eyebrow">404 // VEHICLE NOT FOUND</p>
          <h1 className="vd-not-found-title">Vehicle Record Not Located</h1>
          <p className="vd-not-found-sub">
            The requested vehicle profile may have been rotated or relocated in our fleet registry.
          </p>
          <Link href="/vehicles" className="vd-not-found-btn">
            <ArrowLeft size={16} /> Return to Fleet Collection
          </Link>
        </div>
      </main>
    );
  }

  const editorial = getVehicleEditorial(vehicle);
  const filteredLocs = PH_LOCATIONS.filter((l) =>
    l.toLowerCase().includes(destSearch.trim().toLowerCase())
  );

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const handleSelectRoute = (routeName: string, price: number | null, exactRoute?: string) => {
    setPicked({ route: routeName, price, exactRoute });
    setDestSearch(routeName);
    setShowDrop(false);
  };

  return (
    <div className="vd-page">
      {/* Container aligning strictly with the 1400px header container */}
      <div className="vd-container">
        
        {/* Navigation Breadcrumb Bar */}
        <nav className="vd-breadcrumb-nav" aria-label="Breadcrumb">
          <div className="vd-breadcrumb-left">
            <Link href="/vehicles" className="vd-back-link">
              <ArrowLeft size={15} />
              <span>Fleet Collection</span>
            </Link>
            <span className="vd-breadcrumb-sep">/</span>
            <span className="vd-breadcrumb-cat">{vehicle.category}</span>
            <span className="vd-breadcrumb-sep">/</span>
            <span className="vd-breadcrumb-current">{vehicle.brand} {vehicle.name}</span>
          </div>

          <div className="vd-breadcrumb-right">
            <div className="vd-status-chip">
              <span className="vd-status-pulse" />
              <span>Available for Instant VIP Handover</span>
            </div>
          </div>
        </nav>

        {/* Master Showcase Grid (Left: Cinematic Studio / Right: Booking Dossier) */}
        <div className="vd-showcase-grid">

          {/* LEFT COLUMN: Visual Stage & Automotive Dossier */}
          <div className="vd-left-col">
            
            {/* Cinematic Main Viewport */}
            <div className="vd-stage-card">
              <div className="vd-viewport">
                <Image
                  src={activeImage}
                  alt={`${vehicle.brand} ${vehicle.name}`}
                  fill
                  className="vd-stage-img"
                  priority
                  sizes="(max-width: 900px) 100vw, 55vw"
                />

                {/* Ambient glow highlight */}
                <div className="vd-viewport-glow" />

                {/* Overlaid HUD Badges */}
                <div className="vd-viewport-badges-top">
                  <span className="vd-viewport-pill vd-viewport-pill--accent">
                    {editorial.badge}
                  </span>
                  <span className="vd-viewport-pill">
                    {vehicle.category.toUpperCase()} SPEC
                  </span>
                </div>

                <div className="vd-viewport-badges-bottom">
                  <div className="vd-viewport-telemetry">
                    <span className="vd-telem-metric">0–100 KM/H <strong>{vehicle.acceleration}</strong></span>
                    <span className="vd-telem-sep">|</span>
                    <span className="vd-telem-metric">{vehicle.engine}</span>
                  </div>

                  {vehicle.images.length > 1 && (
                    <span className="vd-viewport-counter">
                      {vehicle.images.indexOf(activeImage) + 1} / {vehicle.images.length}
                    </span>
                  )}
                </div>
              </div>

              {/* Multi-view Thumbnails Strip */}
              {vehicle.images.length > 1 && (
                <div className="vd-thumb-strip">
                  {vehicle.images.map((img, i) => {
                    const isActive = img === activeImage;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImage(img)}
                        className={`vd-thumb-btn ${isActive ? "active" : ""}`}
                        aria-label={`View photo ${i + 1}`}
                      >
                        <Image
                          src={img}
                          alt={`${vehicle.name} thumbnail ${i + 1}`}
                          fill
                          sizes="110px"
                          className="vd-thumb-img"
                        />
                        {isActive && <div className="vd-thumb-indicator" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Showcase Utilities Bar */}
              <div className="vd-stage-utils">
                <button
                  type="button"
                  className="vd-util-btn"
                  onClick={handleCopyLink}
                  title="Share this vehicle profile"
                >
                  {copiedLink ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-400">Direct Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Share Vehicle</span>
                    </>
                  )}
                </button>

                <div className="vd-stage-guarantees">
                  <span className="vd-guar-item">
                    <ShieldCheck size={14} />
                    <span>Tier-1 CDW Included</span>
                  </span>
                  <span className="vd-guar-dot">•</span>
                  <span className="vd-guar-item">
                    <Sparkles size={14} />
                    <span>21°C Staged Handover</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Automotive Dossier & Engineering Narrative */}
            <div className="vd-dossier-card">
              <div className="vd-dossier-header">
                <span className="vd-section-eyebrow">AUTOMOTIVE DOSSIER</span>
                <h2 className="vd-section-title">The Engineering Narrative</h2>
              </div>

              <div className="vd-editorial-body">
                {editorial.editorial.map((para, idx) => (
                  <p key={idx} className="vd-editorial-para">{para}</p>
                ))}
              </div>

              {/* Highlights Chips */}
              <div className="vd-highlights-box">
                <h4 className="vd-highlights-title">Factory Specification & Equipment</h4>
                <div className="vd-highlights-grid">
                  {editorial.highlights.map((feat, i) => (
                    <div key={i} className="vd-highlight-chip">
                      <CheckCircle2 size={13} className="vd-highlight-icon" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Standard Inclusions (DriveX Sovereign Protocol) */}
            <div className="vd-inclusions-card">
              <div className="vd-dossier-header">
                <span className="vd-section-eyebrow">DRIVEX SOVEREIGN STANDARD</span>
                <h2 className="vd-section-title">Every Reservation Includes</h2>
              </div>

              <div className="vd-inclusions-grid">
                <div className="vd-inc-item">
                  <div className="vd-inc-icon-wrap">
                    <Wind size={18} />
                  </div>
                  <div>
                    <h5 className="vd-inc-heading">Pre-Cooled Cabin Handover</h5>
                    <p className="vd-inc-text">Climate staged precisely at 21°C with chilled mineral water and high-speed fast chargers ready.</p>
                  </div>
                </div>

                <div className="vd-inc-item">
                  <div className="vd-inc-icon-wrap">
                    <Compass size={18} />
                  </div>
                  <div>
                    <h5 className="vd-inc-heading">Active Tollway RFID</h5>
                    <p className="vd-inc-text">Pre-loaded RFID passes for frictionless passage across Skyway Stage 3, SLEX, NLEX, SCTEX, and TPLEX.</p>
                  </div>
                </div>

                <div className="vd-inc-item">
                  <div className="vd-inc-icon-wrap">
                    <Shield size={18} />
                  </div>
                  <div>
                    <h5 className="vd-inc-heading">Comprehensive CDW Protection</h5>
                    <p className="vd-inc-text">Tier-1 insurance coverage with transparent deductible waiver and full 24/7 Luzon-wide roadside support.</p>
                  </div>
                </div>

                <div className="vd-inc-item">
                  <div className="vd-inc-icon-wrap">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h5 className="vd-inc-heading">VIP Tarmac & Curbside Staging</h5>
                    <p className="vd-inc-text">Direct handoff at NAIA T1-3, Clark International, Bonifacio Global City, or your private residence.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Reservation & Journey Terminal */}
          <div className="vd-right-col">
            <aside className="vd-booking-console">

              {/* Title & Brand Header */}
              <div className="vd-console-header">
                <div className="vd-brand-row">
                  <span className="vd-brand-badge">{vehicle.brand}</span>
                  <span className="vd-origin-tag">{editorial.origin}</span>
                </div>
                <h1 className="vd-car-name">{vehicle.name}</h1>
                <p className="vd-car-tagline">{editorial.tagline}</p>
              </div>

              {/* Daily Rate Display */}
              <div className="vd-rate-strip">
                <div className="vd-rate-main">
                  <span className="vd-rate-sub">Starting Daily Rate</span>
                  <div className="vd-rate-num-wrap">
                    <span className="vd-rate-currency">₱</span>
                    <span className="vd-rate-amount">{vehicle.price}</span>
                    <span className="vd-rate-period">/ day</span>
                  </div>
                </div>
                <div className="vd-rate-badge">
                  <span>Chauffeur or Self-Drive</span>
                </div>
              </div>

              {/* High-Contrast Telemetry HUD (4 Specs) */}
              <div className="vd-telemetry-hud">
                <div className="vd-hud-card">
                  <div className="vd-hud-top">
                    <span className="vd-hud-label">Power Unit</span>
                    <Zap size={14} className="vd-hud-icon" />
                  </div>
                  <strong className="vd-hud-value">{vehicle.engine}</strong>
                  <span className="vd-hud-caption">{editorial.fuelType}</span>
                </div>

                <div className="vd-hud-card">
                  <div className="vd-hud-top">
                    <span className="vd-hud-label">0–100 km/h</span>
                    <Timer size={14} className="vd-hud-icon" />
                  </div>
                  <strong className="vd-hud-value">{vehicle.acceleration}</strong>
                  <span className="vd-hud-caption">Top: {editorial.topSpeed}</span>
                </div>

                <div className="vd-hud-card">
                  <div className="vd-hud-top">
                    <span className="vd-hud-label">Transmission</span>
                    <Gauge size={14} className="vd-hud-icon" />
                  </div>
                  <strong className="vd-hud-value">{vehicle.transmission}</strong>
                  <span className="vd-hud-caption">Drive: {editorial.drivetrain.split(" ")[0]}</span>
                </div>

                <div className="vd-hud-card">
                  <div className="vd-hud-top">
                    <span className="vd-hud-label">Capacity</span>
                    <Users size={14} className="vd-hud-icon" />
                  </div>
                  <strong className="vd-hud-value">{vehicle.seats} Seats</strong>
                  <span className="vd-hud-caption">Executive Cabin</span>
                </div>
              </div>

              {/* Interactive Route & Destination Trip Terminal */}
              <div className="vd-terminal-section">
                <div className="vd-terminal-title-row">
                  <span className="vd-terminal-title">Select Route & Trip Pricing</span>
                  <span className="vd-terminal-badge">Real-Time Dispatch</span>
                </div>

                {/* Popular Curated Routes Quick-Select Pills */}
                {vehicle.destinations && vehicle.destinations.length > 0 && (
                  <div className="vd-quick-routes">
                    <p className="vd-quick-routes-label">Featured Routes For This Vehicle:</p>
                    <div className="vd-route-pills">
                      {vehicle.destinations.map((d, idx) => {
                        const isSelected = picked?.exactRoute === d.route || picked?.route === d.route;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectRoute(d.route, d.price, d.route)}
                            className={`vd-route-pill ${isSelected ? "selected" : ""}`}
                          >
                            <span className="vd-route-pill-name">{d.route}</span>
                            <span className="vd-route-pill-price">₱{d.price.toLocaleString()}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Search Autocomplete Input */}
                <div className="vd-dest-search-wrap">
                  <label htmlFor="destSearch" className="vd-search-label">
                    Or Search Any City / Province:
                  </label>
                  <div className="vd-input-box">
                    <MapPin size={16} className="vd-input-pin" />
                    <input
                      id="destSearch"
                      type="text"
                      className="vd-search-field"
                      placeholder="e.g. Metro Manila, Baguio, Clark, Batangas..."
                      value={destSearch}
                      onFocus={() => setShowDrop(true)}
                      onBlur={() => setTimeout(() => setShowDrop(false), 200)}
                      onChange={(e) => {
                        setDestSearch(e.target.value);
                        setPicked(null);
                        setShowDrop(true);
                      }}
                    />
                    {destSearch && (
                      <button
                        type="button"
                        className="vd-clear-search"
                        onClick={() => {
                          setDestSearch("");
                          setPicked(null);
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Dropdown Results */}
                  {showDrop && destSearch.trim().length > 0 && (
                    <div className="vd-dropdown-list">
                      {filteredLocs.length > 0 ? (
                        filteredLocs.map((loc, i) => {
                          const match = vehicle.destinations.find((d) =>
                            d.route.toLowerCase().includes(loc.toLowerCase())
                          );
                          return (
                            <button
                              key={i}
                              type="button"
                              className="vd-dropdown-item"
                              onMouseDown={() =>
                                handleSelectRoute(loc, match ? match.price : null, match?.route)
                              }
                            >
                              <div className="vd-drop-loc">
                                <MapPin size={13} />
                                <span>{loc}</span>
                              </div>
                              {match ? (
                                <strong className="vd-drop-price">
                                  ₱{match.price.toLocaleString()}
                                </strong>
                              ) : (
                                <span className="vd-drop-inquire">Custom Inquire</span>
                              )}
                            </button>
                          );
                        })
                      ) : (
                        <div className="vd-dropdown-empty">
                          No direct location match found for &quot;{destSearch}&quot;. Concierge rate inquiry will apply.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Selected Journey Pricing Terminal Feedback Card */}
                {picked && (
                  <div className={`vd-price-receipt ${picked.price === null ? "vd-price-receipt--custom" : ""}`}>
                    {picked.price !== null ? (
                      <>
                        <div className="vd-receipt-row">
                          <span className="vd-receipt-tag">ESTIMATED ROUTE RATE</span>
                          <span className="vd-receipt-status">DISPATCH CONFIRMED</span>
                        </div>
                        <div className="vd-receipt-route">{picked.exactRoute || picked.route}</div>
                        <div className="vd-receipt-amount-row">
                          <span className="vd-receipt-currency">₱</span>
                          <span className="vd-receipt-amount">{picked.price.toLocaleString()}</span>
                          <span className="vd-receipt-per">per trip</span>
                        </div>
                        <p className="vd-receipt-note">
                          Includes fuel allowance, comprehensive insurance, RFID tolls, and vehicle staging.
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="vd-receipt-row">
                          <span className="vd-receipt-tag">BESPOKE ROUTE DESTINATION</span>
                          <span className="vd-receipt-status">CONCIERGE QUOTE</span>
                        </div>
                        <div className="vd-receipt-route">{picked.route}</div>
                        <p className="vd-receipt-custom-desc">
                          Special long-range delivery or inter-island staging required for this destination. Our 24/7 fleet coordinator will finalize custom mileage and staging rates upon reservation.
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Reservation Primary Call to Action */}
              <div className="vd-cta-block">
                <button
                  type="button"
                  className="vd-primary-reserve-btn"
                  onClick={() =>
                    openBooking({
                      vehicleId: vehicle.id,
                      destination: picked?.route,
                      step: 1,
                    })
                  }
                >
                  <span>Reserve This {vehicle.name}</span>
                  <ArrowRight size={18} />
                </button>

                <div className="vd-concierge-assist">
                  <span className="vd-assist-label">Need a customized itinerary or security escort?</span>
                  <div className="vd-assist-links">
                    <a
                      href="https://wa.me/639171234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vd-assist-link"
                    >
                      <Sparkles size={13} /> WhatsApp VIP Concierge
                    </a>
                    <span className="vd-assist-sep">•</span>
                    <a href="tel:+63288883748" className="vd-assist-link">
                      <Phone size={13} /> +63 (2) 8888-3748
                    </a>
                  </div>
                </div>
              </div>

            </aside>
          </div>

        </div>

        {/* COMPLEMENTARY FLEET SECTION */}
        <section className="vd-complementary-section">
          <div className="vd-comp-head">
            <div>
              <span className="vd-section-eyebrow">EXCLUSIVE FLEET CONTINUITY</span>
              <h3 className="vd-comp-title">Alternative Perspectives</h3>
            </div>
            <Link href="/vehicles" className="vd-comp-view-all">
              <span>View Full Fleet Directory</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="vd-comp-grid">
            {complementaryVehicles.map((comp) => (
              <Link
                key={comp.id}
                href={`/vehicles/${comp.id}`}
                className="vd-comp-card"
              >
                <div className="vd-comp-img-wrap">
                  <Image
                    src={comp.image}
                    alt={comp.name}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    className="vd-comp-img"
                  />
                  <div className="vd-comp-overlay" />
                  <span className="vd-comp-cat">{comp.category}</span>
                </div>

                <div className="vd-comp-content">
                  <div className="vd-comp-brand-row">
                    <span className="vd-comp-brand">{comp.brand}</span>
                    <span className="vd-comp-accel">{comp.acceleration}</span>
                  </div>
                  <h4 className="vd-comp-name">{comp.name}</h4>
                  
                  <div className="vd-comp-footer">
                    <div className="vd-comp-price-col">
                      <small>Rate from</small>
                      <strong>₱{comp.price}<span>/day</span></strong>
                    </div>
                    <span className="vd-comp-arrow">
                      <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
