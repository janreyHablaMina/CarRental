"use client";

import React from "react";
import { Star, ShieldCheck, CheckCircle2, MessageSquareQuote, Car } from "lucide-react";

interface Testimonial {
  id: string;
  author: string;
  role: string;
  car: string;
  avatarInitials: string;
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
                <div className="hp-author-avatar">{item.avatarInitials}</div>
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
