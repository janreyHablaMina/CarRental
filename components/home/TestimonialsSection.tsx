"use client";

import React from "react";
import { Star, ShieldCheck, CheckCircle2, MessageSquareQuote, Car } from "lucide-react";

interface Testimonial {
  id: string;
  author: string;
  role: string;
  car: string;
  avatarInitials: string;
  avatarImage: string;
  rating: number;
  quote: string;
  city: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    author: "Dominic Soriano",
    role: "Managing Director, Alpha Peak Ventures",
    car: "Porsche 911 Carrera",
    avatarInitials: "DS",
    avatarImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    rating: 5,
    quote:
      "The handover at BGC was genuinely the smoothest rental experience of my life. 10 minutes from digital ID verification to keys in hand. The Carrera was in mint, showroom condition.",
    city: "Bonifacio Global City",
  },
  {
    id: "2",
    author: "Elena Rostova",
    role: "International Architecture Consultant",
    car: "Rolls-Royce Ghost",
    avatarInitials: "ER",
    avatarImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80",
    rating: 5,
    quote:
      "Requested tarmac delivery right as my flight touched down at NAIA Terminal 3. The car was parked curbside with chilled water and climate set. Unmatched executive elegance.",
    city: "Makati & Manila",
  },
  {
    id: "3",
    author: "Marcus Vance",
    role: "Founder, Apex Kinetic Studio",
    car: "Lamborghini Huracán",
    avatarInitials: "MV",
    avatarImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
    rating: 5,
    quote:
      "Track stance, zero mechanical quirks, and an exhaust note that turns heads anywhere. Transparent pricing with zero hidden security deposit headaches. DriveX is the real deal.",
    city: "Clark Freeport",
  },
  {
    id: "4",
    author: "Patricia Chen",
    role: "Tech Founder & Angel Investor",
    car: "Tesla Model X Plaid",
    avatarInitials: "PC",
    avatarImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80",
    rating: 5,
    quote:
      "Effortless weekend trip up to Baguio. The falcon doors and instant torque made the mountain drive an absolute joy. The mobile booking flow took under 3 minutes.",
    city: "San Juan / Baguio",
  },
  {
    id: "5",
    author: "Gabriel Mendoza",
    role: "Creative Director, Studio Hyperion",
    car: "BMW M4 Competition",
    avatarInitials: "GM",
    avatarImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&auto=format&fit=crop&q=80",
    rating: 5,
    quote:
      "We hired the M4 for a high-fashion editorial shoot and extended the rental for a weekend drive. The DriveX concierge team supported our itinerary around the clock.",
    city: "Cebu IT Park",
  },
  {
    id: "6",
    author: "Sofia Alcantara",
    role: "Private Equity Partner",
    car: "Mercedes-AMG G63",
    avatarInitials: "SA",
    avatarImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    rating: 5,
    quote:
      "Commanding presence, immaculate interior, and white-glove chauffeur support when needed. There is no other luxury mobility service in the Philippines that comes close.",
    city: "Alabang / Taguig",
  },
];

export default function TestimonialsSection() {
  // Duplicate array to ensure seamless infinite looping animation
  const loopCards = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="hp-testimonials-section" id="testimonials">
      <div className="hp-testimonials-header">
        <div>
          <div className="hp-section-eyebrow">
            <MessageSquareQuote size={14} />
            <span>Verified Driver Experiences</span>
          </div>
          <h2 className="hp-section-heading">
            Trusted by <span>Tastemakers & Executives.</span>
          </h2>
          <p className="hp-section-desc">
            Discover why entrepreneurs, touring professionals, and automotive purists choose DriveX for their premier journeys.
          </p>
        </div>

        {/* Global Rating Score Pill */}
        <div className="hp-rating-badge">
          <div className="hp-rating-score">4.98</div>
          <div className="hp-rating-details">
            <div className="hp-stars-row">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <div className="hp-rating-count">Based on 3,420+ Verified VIP Drives</div>
          </div>
        </div>
      </div>

      {/* Infinite Auto-Scroll Track */}
      <div className="hp-marquee-wrapper">
        <div className="hp-marquee-track">
          {loopCards.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="hp-testimonial-card">
              <div>
                <div className="hp-testimonial-top">
                  <div className="hp-stars-row">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <div className="hp-car-driven-badge">
                    <Car size={12} style={{ color: "#4da3ff" }} />
                    <span>{item.car}</span>
                  </div>
                </div>

                <p className="hp-testimonial-quote" style={{ marginTop: 16 }}>
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="hp-testimonial-author">
                <div className="hp-author-avatar" style={{ borderRadius: "50%", overflow: "hidden" }}>
                  {item.avatarImage ? (
                    <img
                      src={item.avatarImage}
                      alt={item.author}
                      className="hp-avatar-img"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      loading="lazy"
                    />
                  ) : (
                    item.avatarInitials
                  )}
                </div>
                <div className="hp-author-info">
                  <div className="hp-author-name">
                    <span>{item.author}</span>
                    <CheckCircle2 size={13} className="hp-verified-icon" />
                  </div>
                  <div className="hp-author-role">
                    {item.role} &bull; {item.city}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
