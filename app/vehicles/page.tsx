"use client";

import "./vehicles-collection.css";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Gauge,
  RotateCcw,
  Search,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import { vehicles, type Vehicle } from "@/lib/vehicles";

const PAGE_SIZE = 6;
const CATEGORIES = ["All", "Sports", "Luxury", "Sedan", "SUV", "Economy"];

export default function VehiclesCollectionPage() {
  const router = useRouter();
  const gridTopRef = useRef<HTMLDivElement>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [currentPage, setCurrentPage] = useState(1);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: vehicles.length };
    CATEGORIES.slice(1).forEach((cat) => {
      counts[cat] = vehicles.filter((v) => v.category === cat).length;
    });
    return counts;
  }, []);

  // Filter & Sort computation
  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((v) => v.category === selectedCategory);
    }

    // Search query filter
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(query) ||
          v.brand.toLowerCase().includes(query) ||
          v.category.toLowerCase().includes(query) ||
          v.engine.toLowerCase().includes(query)
      );
    }

    // Seats filter
    if (selectedSeats !== "all") {
      const seatsNum = parseInt(selectedSeats, 10);
      if (seatsNum === 5) {
        result = result.filter((v) => v.seats >= 5);
      } else {
        result = result.filter((v) => v.seats === seatsNum);
      }
    }

    // Sorting
    result.sort((a, b) => {
      const priceA = parseInt(a.price.replace(/,/g, ""), 10) || 0;
      const priceB = parseInt(b.price.replace(/,/g, ""), 10) || 0;

      if (sortBy === "price-asc") {
        return priceA - priceB;
      }
      if (sortBy === "price-desc") {
        return priceB - priceA;
      }
      if (sortBy === "accel") {
        const accelA = parseFloat(a.acceleration) || 99;
        const accelB = parseFloat(b.acceleration) || 99;
        return accelA - accelB;
      }
      if (sortBy === "name") {
        return `${a.brand} ${a.name}`.localeCompare(`${b.brand} ${b.name}`);
      }
      // Default: featured first, then price desc
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return priceB - priceA;
    });

    return result;
  }, [searchQuery, selectedCategory, selectedSeats, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedSeats, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredVehicles.length / PAGE_SIZE) || 1;
  const paginatedVehicles = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredVehicles.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredVehicles, currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedSeats("all");
    setSortBy("featured");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedSeats !== "all" ||
    sortBy !== "featured";

  return (
    <div className="vc-page">
      {/* Topbar */}
      <header className="vc-topbar">
        <div className="vc-topbar-left">
          <Link href="/" className="vc-back-link">
            <ArrowLeft size={16} />
            <span>Home</span>
          </Link>
          <Link href="/" className="vc-brand">
            DRIVE<span>X</span>
          </Link>
        </div>
        <div className="vc-topbar-right">
          <Link href="/#booking" className="vc-topbar-cta">
            Book a Drive <ArrowRight size={15} />
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="vc-hero">
        <div className="vc-hero-eyebrow">
          <span className="vc-pulse-dot" />
          <span>The Collection // 2026 Fleet Directory</span>
        </div>
        <h1 className="vc-hero-title">
          Curated Performance. <span>Refined Luxury.</span>
        </h1>
        <p className="vc-hero-sub">
          Explore our complete roster of precision supercars, grand tourers, executive sedans, and versatile luxury SUVs. Prepared to perfection for your journey.
        </p>

        <div className="vc-stats-strip">
          <div className="vc-stat-item">
            <span className="vc-stat-num">{vehicles.length}</span>
            <span className="vc-stat-label">Total Vehicles</span>
          </div>
          <div className="vc-stat-item">
            <span className="vc-stat-num">5</span>
            <span className="vc-stat-label">Tiers & Categories</span>
          </div>
          <div className="vc-stat-item">
            <span className="vc-stat-num">80+</span>
            <span className="vc-stat-label">Covered Locations</span>
          </div>
          <div className="vc-stat-item">
            <span className="vc-stat-num">100%</span>
            <span className="vc-stat-label">Verified Fleet</span>
          </div>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <div className="vc-controls-container" ref={gridTopRef}>
        <div className="vc-controls-card">
          {/* Search Row */}
          <div className="vc-search-row">
            <div className="vc-search-wrap">
              <Search size={18} className="vc-search-icon" />
              <input
                type="text"
                placeholder="Search by car name, brand, or engine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="vc-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="vc-search-clear"
                  onClick={() => setSearchQuery("")}
                  title="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Secondary dropdown filters */}
            <div className="vc-secondary-selects">
              {/* Sort By */}
              <div className="vc-select-group">
                <span className="vc-select-label">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="vc-select"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="accel">0-100 Acceleration</option>
                  <option value="name">Alphabetical (A-Z)</option>
                </select>
              </div>

              {/* Seats Filter */}
              <div className="vc-select-group">
                <span className="vc-select-label">Seats:</span>
                <select
                  value={selectedSeats}
                  onChange={(e) => setSelectedSeats(e.target.value)}
                  className="vc-select"
                >
                  <option value="all">Any Seats</option>
                  <option value="2">2 Seats (Coupe)</option>
                  <option value="4">4 Seats</option>
                  <option value="5">5+ Seats (Full size)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs Row */}
          <div className="vc-category-row">
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`vc-cat-btn ${isActive ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <span>{cat}</span>
                  <span className="vc-cat-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Filter Summary & Chips */}
          <div className="vc-filter-summary">
            <div className="vc-chips-list">
              <span className="vc-results-count">
                Showing {filteredVehicles.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–
                {Math.min(currentPage * PAGE_SIZE, filteredVehicles.length)} of {filteredVehicles.length} vehicle
                {filteredVehicles.length === 1 ? "" : "s"}
              </span>

              {selectedCategory !== "All" && (
                <span className="vc-chip">
                  Category: {selectedCategory}
                  <button
                    type="button"
                    className="vc-chip-remove"
                    onClick={() => setSelectedCategory("All")}
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="vc-chip">
                  Search: &ldquo;{searchQuery}&rdquo;
                  <button
                    type="button"
                    className="vc-chip-remove"
                    onClick={() => setSearchQuery("")}
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {selectedSeats !== "all" && (
                <span className="vc-chip">
                  {selectedSeats === "5" ? "5+ Seats" : `${selectedSeats} Seats`}
                  <button
                    type="button"
                    className="vc-chip-remove"
                    onClick={() => setSelectedSeats("all")}
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {hasActiveFilters && (
                <button
                  type="button"
                  className="vc-reset-all-btn"
                  onClick={handleResetFilters}
                >
                  <RotateCcw size={12} />
                  <span>Reset filters</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Grid or Empty State */}
      <main className="vc-grid-container">
        {filteredVehicles.length === 0 ? (
          /* Empty State */
          <div className="vc-empty-state">
            <div className="vc-empty-icon-wrap">
              <Search size={32} />
            </div>
            <h3 className="vc-empty-title">No vehicles found</h3>
            <p className="vc-empty-desc">
              We couldn&apos;t find any vehicles matching your current search criteria
              {searchQuery && <> for &ldquo;<strong>{searchQuery}</strong>&rdquo;</>}
              {selectedCategory !== "All" && <> in the <strong>{selectedCategory}</strong> category</>}.
            </p>
            <button
              type="button"
              className="vc-empty-reset-btn"
              onClick={handleResetFilters}
            >
              <RotateCcw size={14} />
              <span>Reset All Filters</span>
            </button>

            <div className="vc-empty-suggestions">
              <span className="vc-empty-sug-label">Popular searches:</span>
              <button
                type="button"
                className="vc-empty-sug-pill"
                onClick={() => {
                  setSelectedCategory("Sports");
                  setSearchQuery("");
                }}
              >
                Sports Cars
              </button>
              <button
                type="button"
                className="vc-empty-sug-pill"
                onClick={() => {
                  setSelectedCategory("Luxury");
                  setSearchQuery("");
                }}
              >
                Luxury Fleet
              </button>
              <button
                type="button"
                className="vc-empty-sug-pill"
                onClick={() => {
                  setSelectedCategory("SUV");
                  setSearchQuery("");
                }}
              >
                SUVs
              </button>
              <button
                type="button"
                className="vc-empty-sug-pill"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("Porsche");
                }}
              >
                Porsche
              </button>
            </div>
          </div>
        ) : (
          /* Vehicle Grid */
          <>
            <div className="vc-grid">
              {paginatedVehicles.map((vehicle, index) => (
                <Link
                  href={`/vehicles/${vehicle.id}`}
                  key={vehicle.id}
                  className="vc-card"
                  style={{ animationDelay: `${index * 65}ms` }}
                >
                  {/* Photo Visual */}
                  <div className="vc-card-visual">
                    <Image
                      src={vehicle.image}
                      alt={`${vehicle.brand} ${vehicle.name}`}
                      fill
                      sizes="(max-width: 680px) 100vw, (max-width: 1150px) 50vw, 33vw"
                      className="vc-card-img"
                    />
                    <div className="vc-card-gradient" />
                    <div className="vc-card-badge-top">
                      <span className="vc-card-cat-badge">{vehicle.category}</span>
                      {vehicle.featured && (
                        <span className="vc-card-featured-badge">
                          <Sparkles size={10} style={{ display: "inline", marginRight: 3 }} />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="vc-card-body">
                    <div className="vc-card-header">
                      <p className="vc-card-eyebrow">{vehicle.brand}</p>
                      <h3 className="vc-card-title">{vehicle.name}</h3>
                    </div>

                    {/* Specs Grid */}
                    <div className="vc-card-specs">
                      <div className="vc-spec-item" title="Seating Capacity">
                        <Users size={14} />
                        <span>{vehicle.seats} Seats</span>
                      </div>
                      <div className="vc-spec-item" title="Transmission">
                        <Gauge size={14} />
                        <span>{vehicle.transmission}</span>
                      </div>
                      <div className="vc-spec-item" title="Engine Output">
                        <Zap size={14} />
                        <span>{vehicle.engine}</span>
                      </div>
                      <div className="vc-spec-item" title="0-100 km/h Acceleration">
                        <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, color: "#64748b" }}>
                          0-100:
                        </span>
                        <span>{vehicle.acceleration}</span>
                      </div>
                    </div>

                    {/* Footer / Pricing & CTA */}
                    <div className="vc-card-footer">
                      <div className="vc-card-price-block">
                        <span className="vc-card-price-label">Starting at</span>
                        <div className="vc-card-price-amount">
                          ₱{vehicle.price} <span>/ day</span>
                        </div>
                      </div>

                      <div className="vc-card-arrow-btn">
                        <ArrowRight size={17} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="vc-pagination">
                <span className="vc-page-info">
                  Page {currentPage} of {totalPages}
                </span>

                <div className="vc-page-controls">
                  <button
                    type="button"
                    className="vc-page-btn"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    title="Previous page"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      className={`vc-page-btn ${pageNum === currentPage ? "active" : ""}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    type="button"
                    className="vc-page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    title="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="vc-footer">
        <div className="vc-footer-brand">
          DRIVE<span>X</span> SHOWROOM
        </div>
        <div className="vc-footer-links">
          <Link href="/">Home</Link>
          <Link href="/#booking">Reservations</Link>
          <Link href="/#why">About DriveX</Link>
          <Link href="/#footer">Support</Link>
        </div>
        <div className="vc-footer-copy">
          © {new Date().getFullYear()} DriveX Luxury Fleet. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
