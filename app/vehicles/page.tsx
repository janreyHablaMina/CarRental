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
import { useBooking } from "@/context/BookingContext";

const PAGE_SIZE = 6;
const CATEGORIES = ["All", "Sports", "Luxury", "Sedan", "SUV", "Economy"];

const FEATURED_SLIDES = [
  {
    id: "lamborghini-huracan-evo",
    brand: "Lamborghini",
    name: "Huracán EVO",
    tagline: "Atmospheric V10 // Corsa Dynamics & Titanium Exhaust",
    category: "Sports",
    engine: "640 HP V10",
    acceleration: "2.9s 0-100",
    transmission: "7-Spd Dual-Clutch",
    seats: 2,
    price: "28,000",
    image: "/images/fleet-sports-huracan.jpg",
    badge: "FLEET FLAGSHIP",
  },
  {
    id: "rolls-royce-phantom-viii",
    brand: "Rolls-Royce",
    name: "Phantom VIII",
    tagline: "The Pinnacle of Ultra-Luxury Transport & Silent Flight",
    category: "Luxury",
    engine: "563 HP Twin-Turbo V12",
    acceleration: "5.1s 0-100",
    transmission: "8-Spd Satellite Aided",
    seats: 5,
    price: "35,000",
    image: "/images/fleet-rolls.jpg",
    badge: "VIP SOVEREIGN",
  },
  {
    id: "porsche-911-carrera-t",
    brand: "Porsche",
    name: "911 Carrera T",
    tagline: "Pure Mechanical Purity // Active Suspension Dynamics",
    category: "Sports",
    engine: "385 HP Twin-Turbo",
    acceleration: "4.0s 0-100",
    transmission: "PDK Automatic",
    seats: 4,
    price: "18,500",
    image: "/images/fleet-porsche.jpg",
    badge: "TRACK HERITAGE",
  },
  {
    id: "tesla-model-s-plaid",
    brand: "Tesla",
    name: "Model S Plaid",
    tagline: "Sub-2-Second Acceleration // Tri-Motor Torque Vectoring",
    category: "Luxury",
    engine: "1,020 HP Electric",
    acceleration: "1.99s 0-100",
    transmission: "Tri-Motor AWD",
    seats: 5,
    price: "12,500",
    image: "/images/fleet-tesla.jpg",
    badge: "ELECTRIC HYPERCAR",
  },
  {
    id: "range-rover-velar-r-dynamic",
    brand: "Range Rover",
    name: "Velar R-Dynamic",
    tagline: "All-Terrain Prestige // British High-Performance Avant-Garde",
    category: "SUV",
    engine: "395 HP Turbo Inline-6",
    acceleration: "5.2s 0-100",
    transmission: "8-Speed Automatic AWD",
    seats: 5,
    price: "8,500",
    image: "/images/fleet-suv-velar.jpg",
    badge: "PREMIUM CONCIERGE SUV",
  },
];

export default function VehiclesCollectionPage() {
  const router = useRouter();
  const gridTopRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();

  // Cinematic Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSeats, setSelectedSeats] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [currentPage, setCurrentPage] = useState(1);

  // Slider Autoplay Effect (5s per slide)
  useEffect(() => {
    if (isPaused) return;

    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % FEATURED_SLIDES.length);
      setSlideProgress(0);
    }, 5000);

    const progressTimer = setInterval(() => {
      setSlideProgress((p) => Math.min(100, p + 100 / 50));
    }, 100);

    return () => {
      clearInterval(slideTimer);
      clearInterval(progressTimer);
    };
  }, [isPaused, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % FEATURED_SLIDES.length);
    setSlideProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + FEATURED_SLIDES.length) % FEATURED_SLIDES.length);
    setSlideProgress(0);
  };

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    setSlideProgress(0);
  };

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

      {/* Cinematic Showcase Slider Banner */}
      <section className="vc-cinematic-banner">
        <div
          className="vc-slider-stage"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {FEATURED_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`vc-slide-item ${isActive ? "active" : ""}`}
              >
                {/* Background Image Layer */}
                <div className="vc-slide-bg-wrap">
                  <Image
                    src={slide.image}
                    alt={`${slide.brand} ${slide.name}`}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                  />
                </div>

                {/* Overlays & Atmosphere */}
                <div className="vc-slide-glow" />
                <div className="vc-slide-overlay" />
                <div className="vc-slide-speedlines" />

                {/* Slide Text Content & Telemetry */}
                <div className="vc-slide-content">
                  <div className="vc-slide-eyebrow">
                    <span className="vc-pulse-dot" />
                    <span>{slide.badge} // {slide.category.toUpperCase()} CLASS</span>
                  </div>

                  <div>
                    <p className="vc-slide-brand">{slide.brand}</p>
                    <h2 className="vc-slide-title">{slide.name}</h2>
                  </div>

                  <div className="vc-slide-specs-row">
                    <span className="vc-spec-pill highlight">
                      <Zap size={13} /> {slide.engine}
                    </span>
                    <span className="vc-spec-pill">
                      <Gauge size={13} /> {slide.acceleration}
                    </span>
                    <span className="vc-spec-pill">
                      {slide.transmission}
                    </span>
                    <span className="vc-spec-pill">
                      <Users size={13} /> {slide.seats} Seats
                    </span>
                  </div>

                  <div className="vc-slide-price-tag">
                    <span>From</span>
                    <strong>₱{slide.price}</strong>
                    <span>/ 24-hr day</span>
                  </div>

                  <div className="vc-slide-actions">
                    <button
                      type="button"
                      className="vc-banner-btn-primary"
                      onClick={() => openBooking({ vehicleId: slide.id, step: 1 })}
                    >
                      <Sparkles size={16} /> Reserve This Car <ArrowRight size={16} />
                    </button>
                    <Link
                      href={`/vehicles/${slide.id}`}
                      className="vc-banner-btn-secondary"
                    >
                      Explore Specs
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Top Right HUD & Nav Controls */}
          <div className="vc-slider-hud-top">
            <div className="vc-slider-counter">
              <strong>0{currentSlide + 1}</strong> // 0{FEATURED_SLIDES.length}
            </div>
            <div className="vc-slider-nav-btns">
              <button
                type="button"
                className="vc-slider-arrow"
                onClick={prevSlide}
                aria-label="Previous vehicle slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="vc-slider-arrow"
                onClick={nextSlide}
                aria-label="Next vehicle slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Autoplay Progress Line */}
          <div className="vc-slider-progress-track">
            <div
              className="vc-slider-progress-bar"
              style={{ width: `${slideProgress}%` }}
            />
          </div>
        </div>

        {/* Thumbnail Selector Bar below Stage */}
        <div className="vc-thumbnails-bar">
          {FEATURED_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`vc-thumb-card ${idx === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(idx)}
            >
              <div className="vc-thumb-img-wrap">
                <Image
                  src={slide.image}
                  alt={slide.name}
                  fill
                  sizes="80px"
                />
              </div>
              <div className="vc-thumb-info">
                <span className="vc-thumb-title">{slide.brand} {slide.name}</span>
                <span className="vc-thumb-price">₱{slide.price}/d</span>
              </div>
            </button>
          ))}
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

                      <div className="vc-card-actions">
                        <button
                          type="button"
                          className="vc-card-quick-book-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openBooking({ vehicleId: vehicle.id, step: 1 });
                          }}
                        >
                          <Sparkles size={11} /> Book
                        </button>
                        <div className="vc-card-arrow-btn">
                          <ArrowRight size={17} />
                        </div>
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
