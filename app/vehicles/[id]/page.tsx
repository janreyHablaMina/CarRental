"use client";

import "./vehicle-detail.css";

import Image from "next/image";
import Link from "next/link";
import { useState, use, useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Gauge,
  MapPin,
  Users,
} from "lucide-react";
import { vehicles, PH_LOCATIONS, type Vehicle } from "@/lib/vehicles";
import { getVehicleDetails } from "@/lib/vehicleDetails";
import { useBooking } from "@/context/BookingContext";

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { openBooking } = useBooking();
  const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === resolvedParams.id);

  const [activeImage, setActiveImage] = useState(vehicle?.image ?? "");
  const [destSearch, setDestSearch] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [picked, setPicked] = useState<{ route: string; price: number | null; exactRoute?: string } | null>(null);

  // Suggestions (same category first, then others)
  const suggestedVehicles = useMemo(() => {
    if (!vehicle) return [];
    const sameCat = vehicles.filter((v) => v.id !== vehicle.id && v.category === vehicle.category);
    const others = vehicles.filter((v) => v.id !== vehicle.id && v.category !== vehicle.category);
    return [...sameCat, ...others].slice(0, 3);
  }, [vehicle]);

  if (!vehicle) {
    return (
      <main className="vd-not-found">
        <div className="vd-not-found-card">
          <p className="vd-not-found-eyebrow">VEHICLE NOT FOUND</p>
          <h1 className="vd-not-found-title">Vehicle Not Located</h1>
          <p className="vd-not-found-sub">
            The requested vehicle profile is not available in our fleet registry.
          </p>
          <Link href="/vehicles" className="vd-not-found-btn">
            <ArrowLeft size={16} /> Back to Fleet Collection
          </Link>
        </div>
      </main>
    );
  }

  const details = getVehicleDetails(vehicle);
  const filteredLocs = PH_LOCATIONS.filter((l) =>
    l.toLowerCase().includes(destSearch.trim().toLowerCase())
  );

  const handleSelectRoute = (routeName: string, price: number | null, exactRoute?: string) => {
    setPicked({ route: routeName, price, exactRoute });
    setDestSearch(routeName);
    setShowDrop(false);
  };

  return (
    <div className="vd-page">
      <div className="vd-container">
        
        {/* Clean Breadcrumb Bar */}
        <div className="vd-breadcrumb-bar">
          <Link href="/vehicles" className="vd-back-link">
            <ArrowLeft size={15} />
            <span>Back to Fleet</span>
          </Link>
          <span className="vd-category-badge">{vehicle.category}</span>
        </div>

        {/* Streamlined Master Grid */}
        <div className="vd-grid">

          {/* LEFT: Visual Showcase & Concise Overview */}
          <div className="vd-visual-col">
            <div className="vd-viewport">
              <Image
                src={activeImage}
                alt={`${vehicle.brand} ${vehicle.name}`}
                fill
                className="vd-stage-img"
                priority
                sizes="(max-width: 960px) 100vw, 55vw"
              />
              {vehicle.images.length > 1 && (
                <div className="vd-counter">
                  {vehicle.images.indexOf(activeImage) + 1} / {vehicle.images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {vehicle.images.length > 1 && (
              <div className="vd-thumbs">
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
                        sizes="90px"
                        className="vd-thumb-img"
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Concise Overview & Key Inclusions */}
            <div className="vd-overview-box">
              <p className="vd-summary-text">{details.summary}</p>
              
              <div className="vd-inclusions-row">
                <span className="vd-inc-pill"><Check size={13} /> Full CDW Insurance</span>
                <span className="vd-inc-pill"><Check size={13} /> Toll RFID Active</span>
                <span className="vd-inc-pill"><Check size={13} /> 24/7 Roadside Support</span>
                <span className="vd-inc-pill"><Check size={13} /> Pre-Cooled Cabin</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Booking Console */}
          <div className="vd-console-col">
            <div className="vd-console-card">
              
              {/* Header */}
              <div className="vd-console-header">
                <span className="vd-brand">{vehicle.brand}</span>
                <h1 className="vd-title">{vehicle.name}</h1>
                <p className="vd-tagline">{details.tagline}</p>
              </div>

              {/* Price Banner */}
              <div className="vd-price-row">
                <div className="vd-price-col">
                  <small>Daily Rate</small>
                  <strong>₱{vehicle.price}<span>/ day</span></strong>
                </div>
                <span className="vd-rent-option">Self-Drive or Chauffeur</span>
              </div>

              {/* Practical Rental Specs (Capacity & Transmission) */}
              <div className="vd-specs-grid">
                <div className="vd-spec-item">
                  <Users size={16} />
                  <div>
                    <small>Capacity</small>
                    <span>{vehicle.seats} Seats</span>
                  </div>
                </div>

                <div className="vd-spec-item">
                  <Gauge size={16} />
                  <div>
                    <small>Transmission</small>
                    <span>{vehicle.transmission}</span>
                  </div>
                </div>
              </div>

              {/* Destination Trip Rate Terminal */}
              <div className="vd-route-terminal">
                <span className="vd-terminal-label">Destination Trip Pricing</span>

                {/* Search Box */}
                <div className="vd-search-wrap">
                  <div className="vd-search-box">
                    <MapPin size={15} className="vd-search-icon" />
                    <input
                      type="text"
                      className="vd-search-input"
                      placeholder="Search destination (e.g. Clark, Subic, Manila...)"
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
                        className="vd-clear-btn"
                        onClick={() => {
                          setDestSearch("");
                          setPicked(null);
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {showDrop && destSearch.trim().length > 0 && (
                    <div className="vd-dropdown">
                      {filteredLocs.length > 0 ? (
                        filteredLocs.map((loc, i) => {
                          const match = vehicle.destinations.find((d) =>
                            d.route.toLowerCase().includes(loc.toLowerCase())
                          );
                          return (
                            <button
                              key={i}
                              type="button"
                              className="vd-drop-btn"
                              onMouseDown={() =>
                                handleSelectRoute(loc, match ? match.price : null, match?.route)
                              }
                            >
                              <span>{loc}</span>
                              {match ? (
                                <strong>₱{match.price.toLocaleString()}</strong>
                              ) : (
                                <span className="vd-drop-inq">Custom Quote</span>
                              )}
                            </button>
                          );
                        })
                      ) : (
                        <div className="vd-drop-empty">
                          No direct match for &quot;{destSearch}&quot;. Concierge quote applies.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Selected Trip Rate Card */}
                {picked && (
                  <div className="vd-rate-card">
                    <div className="vd-rate-card-head">
                      <span>{picked.exactRoute || picked.route}</span>
                      <span className="vd-rate-status">
                        {picked.price !== null ? "Fixed Trip Rate" : "Custom Rate"}
                      </span>
                    </div>
                    {picked.price !== null ? (
                      <div className="vd-rate-card-val">
                        <strong>₱{picked.price.toLocaleString()}</strong>
                        <small>per trip</small>
                      </div>
                    ) : (
                      <p className="vd-rate-custom-hint">
                        Our 24/7 concierge will confirm the customized route rate upon booking.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                type="button"
                className="vd-submit-btn"
                onClick={() =>
                  openBooking({
                    vehicleId: vehicle.id,
                    destination: picked?.route,
                    step: 1,
                  })
                }
              >
                <span>Book This Vehicle</span>
                <ArrowRight size={18} />
              </button>

            </div>
          </div>

        </div>

        {/* Suggested / Related Vehicles Section */}
        {suggestedVehicles.length > 0 && (
          <section className="vd-suggested-section">
            <div className="vd-suggested-head">
              <div>
                <span className="vd-suggested-eyebrow">EXPLORE ALTERNATIVES</span>
                <h2 className="vd-suggested-title">Similar Vehicles You Might Like</h2>
              </div>
              <Link href="/vehicles" className="vd-suggested-all">
                <span>View Full Fleet</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="vd-suggested-grid">
              {suggestedVehicles.map((car) => (
                <Link
                  key={car.id}
                  href={`/vehicles/${car.id}`}
                  className="vd-suggested-card"
                >
                  <div className="vd-suggested-img-wrap">
                    <Image
                      src={car.image}
                      alt={`${car.brand} ${car.name}`}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      className="vd-suggested-img"
                    />
                    <span className="vd-suggested-cat">{car.category}</span>
                  </div>

                  <div className="vd-suggested-body">
                    <span className="vd-suggested-brand">{car.brand}</span>
                    <h3 className="vd-suggested-name">{car.name}</h3>

                    <div className="vd-suggested-specs">
                      <span><Users size={13} /> {car.seats} Seats</span>
                      <span className="vd-suggested-sep">•</span>
                      <span><Gauge size={13} /> {car.transmission}</span>
                    </div>

                    <div className="vd-suggested-footer">
                      <div className="vd-suggested-price">
                        <small>From</small>
                        <strong>₱{car.price}<span>/ day</span></strong>
                      </div>
                      <span className="vd-suggested-arrow">
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
