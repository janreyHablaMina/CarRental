"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Copy, Check, ArrowRight, Flame, Clock, Tag } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

interface PromoOffer {
  id: string;
  pill: string;
  isGold?: boolean;
  isFeatured?: boolean;
  discount: string;
  discountUnit: string;
  title: string;
  description: string;
  code: string;
  vehicleHint: string;
}

const OFFERS: PromoOffer[] = [
  {
    id: "weekend",
    pill: "Weekend Flash Privilege",
    discount: "25%",
    discountUnit: "OFF",
    title: "Weekend Coastal & Grand Tour",
    description: "Book 3 or more days on any luxury sedan or sports coupe. Includes unlimited mileage within Luzon.",
    code: "DRIVEX25",
    vehicleHint: "Sports & Luxury Sedans",
  },
  {
    id: "supercar",
    pill: "Tastemaker Elite Tier",
    isGold: true,
    isFeatured: true,
    discount: "₱10,000",
    discountUnit: "CREDIT",
    title: "Supercar Track & VIP Pass",
    description: "Instant fleet rebate applied directly to 48-hour reservations on Porsche 911, Huracán, or R8 V10.",
    code: "SUPERCAR10K",
    vehicleHint: "Exotic Tier Supercars",
  },
  {
    id: "airport",
    pill: "Complimentary Valet",
    discount: "100%",
    discountUnit: "FREE VIP DROP",
    title: "Airport Tarmac Fast-Track",
    description: "Zero delivery fees for curbside handovers directly at NAIA Terminal 1, 2, 3 or Clark Executive Aviation.",
    code: "TARMACVIP",
    vehicleHint: "All Fleet Bookings",
  },
];

export default function PromoSection() {
  const { openBooking } = useBooking();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Dynamic countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return { days: 2, hours: 18, minutes: 30, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  const handleClaim = (promoCode: string) => {
    openBooking({ step: 1 });
  };

  return (
    <section className="hp-promos-section" id="promos">
      <div className="hp-promos-header">
        <div className="hp-promos-title-area">
          <div className="hp-section-eyebrow">
            <Sparkles size={14} />
            <span>Seasonal Privileges & Fleet Credits</span>
          </div>
          <h2 className="hp-section-heading">
            Exclusive <span>Member Offers.</span>
          </h2>
          <p className="hp-section-desc">
            Redeem special access rates, complimentary airport concierge dispatches, and weekend escapes crafted for discerning drivers.
          </p>
        </div>

        {/* Live Countdown Box */}
        <div className="hp-countdown-box">
          <div className="hp-countdown-label">
            <span><Flame size={12} /> Seasonal Window</span>
            <span>Offers Expire In:</span>
          </div>
          <div className="hp-countdown-digits">
            <div className="hp-time-unit">
              <span className="hp-time-val">{String(timeLeft.days).padStart(2, "0")}</span>
              <span className="hp-time-lbl">Days</span>
            </div>
            <span className="hp-time-sep">:</span>
            <div className="hp-time-unit">
              <span className="hp-time-val">{String(timeLeft.hours).padStart(2, "0")}</span>
              <span className="hp-time-lbl">Hrs</span>
            </div>
            <span className="hp-time-sep">:</span>
            <div className="hp-time-unit">
              <span className="hp-time-val">{String(timeLeft.minutes).padStart(2, "0")}</span>
              <span className="hp-time-lbl">Min</span>
            </div>
            <span className="hp-time-sep">:</span>
            <div className="hp-time-unit">
              <span className="hp-time-val">{String(timeLeft.seconds).padStart(2, "0")}</span>
              <span className="hp-time-lbl">Sec</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hp-promos-grid">
        {OFFERS.map((offer) => {
          const isCopied = copiedCode === offer.code;
          return (
            <div 
              key={offer.id} 
              className={`hp-promo-card ${offer.isFeatured ? "featured-card" : ""}`}
            >
              <div>
                <div className="hp-promo-badge-row">
                  <span className={`hp-promo-pill ${offer.isGold ? "gold" : ""}`}>
                    {offer.pill}
                  </span>
                  <span style={{ fontSize: 11, color: "#64748b", fontFamily: "var(--font-mono, monospace)" }}>
                    {offer.vehicleHint}
                  </span>
                </div>

                <div className="hp-promo-discount">
                  {offer.discount}
                  <span>{offer.discountUnit}</span>
                </div>

                <h3 className="hp-promo-title">{offer.title}</h3>
                <p className="hp-promo-description">{offer.description}</p>
              </div>

              <div>
                <div className="hp-promo-code-container">
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Tag size={13} style={{ color: "#4da3ff" }} />
                    <span className="hp-promo-code-text">{offer.code}</span>
                  </div>
                  <button 
                    type="button" 
                    className={`hp-copy-code-btn ${isCopied ? "copied" : ""}`}
                    onClick={() => handleCopy(offer.code)}
                  >
                    {isCopied ? (
                      <>
                        <Check size={12} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={12} /> Copy Code
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  className="hp-claim-deal-btn"
                  onClick={() => handleClaim(offer.code)}
                >
                  <span>Apply Privilege & Book</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
