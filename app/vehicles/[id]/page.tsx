"use client";

import "./vehicle-detail.css";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, use } from "react";
import { ArrowLeft, ArrowRight, Gauge, Users, Zap } from "lucide-react";
import { vehicles, PH_LOCATIONS, type Vehicle } from "@/lib/vehicles";

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const vehicle: Vehicle | undefined = vehicles.find((v) => v.id === resolvedParams.id);

  const [activeImage, setActiveImage] = useState(vehicle?.image ?? "");
  const [destSearch, setDestSearch] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [picked, setPicked] = useState<{ route: string; price: number | null; exactRoute?: string } | null>(null);

  if (!vehicle) {
    return (
      <main className="vd-not-found">
        <p>Vehicle not found.</p>
        <Link href="/vehicles">← Back to fleet collection</Link>
      </main>
    );
  }

  const filteredLocs = PH_LOCATIONS.filter((l) =>
    l.toLowerCase().includes(destSearch.trim().toLowerCase())
  );

  return (
    <div className="vd-page">
      {/* Top bar */}
      <header className="vd-topbar">
        <button className="vd-back-btn" onClick={() => router.push("/vehicles")}>
          <ArrowLeft size={18} />
          <span>Back to Collection</span>
        </button>
        <div className="vd-wordmark">DRIVE<span>X</span></div>
        <div />
      </header>

      <div className="vd-body">
        {/* Left — Gallery */}
        <aside className="vd-gallery">
          <div className="vd-main-img-wrap">
            <Image src={activeImage} alt={vehicle.name} fill className="vd-main-img" priority />
          </div>
          {vehicle.images.length > 1 && (
            <div className="vd-thumbs">
              {vehicle.images.map((img, i) => (
                <button
                  key={i}
                  className={`vd-thumb${img === activeImage ? " active" : ""}`}
                  onClick={() => setActiveImage(img)}
                >
                  <Image src={img} alt={`${vehicle.name} view ${i + 1}`} fill style={{ objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* Right — Info */}
        <section className="vd-info">
          <p className="vd-eyebrow">{vehicle.brand}</p>
          <h1 className="vd-title">{vehicle.name}</h1>
          <p className="vd-category-tag">{vehicle.category}</p>

          {/* Specs */}
          <div className="vd-specs">
            <div className="vd-spec-item">
              <Users size={16} />
              <div>
                <small>Seats</small>
                <span>{vehicle.seats}</span>
              </div>
            </div>
            <div className="vd-spec-item">
              <Gauge size={16} />
              <div>
                <small>Transmission</small>
                <span>{vehicle.transmission}</span>
              </div>
            </div>
            <div className="vd-spec-item">
              <Zap size={16} />
              <div>
                <small>Engine</small>
                <span>{vehicle.engine}</span>
              </div>
            </div>
            <div className="vd-spec-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <div>
                <small>0–100 km/h</small>
                <span>{vehicle.acceleration}</span>
              </div>
            </div>
          </div>

          {/* Starting price */}
          <div className="vd-starting-price">
            <small>Starting from</small>
            <strong>₱{vehicle.price}</strong>
            <span>/ day</span>
          </div>

          {/* Destination picker */}
          <div className="vd-dest-section">
            <h3>Select Destination</h3>
            <div className="vd-dest-wrap">
              <input
                type="text"
                className="vd-dest-input"
                placeholder="Search a location in the Philippines…"
                value={destSearch}
                onFocus={() => setShowDrop(true)}
                onBlur={() => setTimeout(() => setShowDrop(false), 150)}
                onChange={(e) => {
                  setDestSearch(e.target.value);
                  setPicked(null);
                  setShowDrop(true);
                }}
              />
              {showDrop && destSearch.trim().length > 0 && (
                <div className="vd-dest-dropdown">
                  {filteredLocs.length > 0 ? filteredLocs.map((loc, i) => {
                    const match = vehicle.destinations.find((d) =>
                      d.route.toLowerCase().includes(loc.toLowerCase())
                    );
                    return (
                      <button
                        key={i}
                        type="button"
                        className="vd-dest-option"
                        onMouseDown={() => {
                          setPicked({ route: loc, price: match ? match.price : null, exactRoute: match?.route });
                          setDestSearch(loc);
                          setShowDrop(false);
                        }}
                      >
                        <span>{loc}</span>
                        {match ? (
                          <strong>₱{match.price.toLocaleString()}</strong>
                        ) : (
                          <span className="vd-dest-inquire">Inquire</span>
                        )}
                      </button>
                    );
                  }) : (
                    <div className="vd-dest-empty">No location found matching &quot;{destSearch}&quot;</div>
                  )}
                </div>
              )}
            </div>

            {picked ? (
              picked.price !== null ? (
                <div className="vd-price-card">
                  <div className="vd-price-route">{picked.exactRoute || picked.route}</div>
                  <div className="vd-price-amount">₱{picked.price.toLocaleString()}</div>
                  <div className="vd-price-label">per trip</div>
                </div>
              ) : (
                <div className="vd-price-card vd-price-card--inquire">
                  <p>No set price for <strong>&quot;{picked.route}&quot;</strong> yet.</p>
                  <p>Please inquire with us for a custom rate to this location.</p>
                  <a href="mailto:hello@drivex.ph">Contact Support →</a>
                </div>
              )
            ) : (
              <p className="vd-dest-hint">Type a destination to see the trip rate for this vehicle.</p>
            )}
          </div>

          {/* Book CTA */}
          <button className="vd-book-btn" onClick={() => router.push("/#booking")}>
            Book this car <ArrowRight size={18} />
          </button>
        </section>
      </div>
    </div>
  );
}
