"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { ShieldCheck, Clock, Award, Sparkles, ArrowRight } from "lucide-react";
import "./booking-page.css";

function BookingPageContent() {
  const searchParams = useSearchParams();
  const { openBooking, isModalOpen } = useBooking();

  const vehicleIdParam = searchParams.get("vehicle") || undefined;
  const pickupParam = searchParams.get("pickup") || undefined;
  const dateParam = searchParams.get("date") || undefined;

  useEffect(() => {
    // Automatically trigger the booking modal when visiting /booking
    openBooking({
      vehicleId: vehicleIdParam,
      pickupLocation: pickupParam,
      pickupDate: dateParam,
      step: 1,
    });
  }, [vehicleIdParam, pickupParam, dateParam]);

  return (
    <main className="booking-page-wrap">
      <div className="booking-page-container">
        <div className="booking-page-hero">
          <p className="eyebrow">DriveX Direct Concierge</p>
          <h1>Reserve & Verify Your Vehicle</h1>
          <p>
            Experience frictionless exotic car rental with instant digital verification.
            Upload your driver&apos;s license and billing proof for 15-minute express dispatch.
          </p>

          <div className="booking-page-badges">
            <div className="booking-page-badge">
              <ShieldCheck size={14} color="var(--accent)" /> Tier-1 CDW & TPL Insurance Included
            </div>
            <div className="booking-page-badge">
              <Clock size={14} color="var(--accent)" /> 15-Minute VIP Document Verification
            </div>
            <div className="booking-page-badge">
              <Award size={14} color="var(--accent)" /> Direct Curbside Handover in Metro Manila
            </div>
          </div>

          <div style={{ marginTop: 40 }}>
            {!isModalOpen && (
              <button
                type="button"
                className="primary-button"
                onClick={() =>
                  openBooking({
                    vehicleId: vehicleIdParam,
                    pickupLocation: pickupParam,
                    pickupDate: dateParam,
                    step: 1,
                  })
                }
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "16px 36px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <Sparkles size={18} /> Open Reservation Portal <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="booking-page-wrap" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Loading concierge portal...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
