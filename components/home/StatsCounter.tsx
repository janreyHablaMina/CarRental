"use client";

import React, { useEffect, useState, useRef } from "react";
import { Trophy, ShieldCheck, Clock, Star, Activity } from "lucide-react";

interface CounterItemProps {
  icon: React.ReactNode;
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  sub: string;
}

function AnimatedCounter({ icon, target, prefix = "", suffix = "", decimals = 0, label, sub }: CounterItemProps) {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = target * easeProgress;

            if (frame >= totalFrames) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, frameDuration);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString();

  return (
    <div ref={cardRef} className="hp-stat-card">
      <div className="hp-stat-icon-wrap">{icon}</div>
      <div className="hp-stat-number">
        {prefix}{displayValue}{suffix}
      </div>
      <div className="hp-stat-label">{label}</div>
      <div className="hp-stat-sub">{sub}</div>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="hp-stats-section" id="metrics">
      <div className="hp-stats-container">
        <div className="hp-stats-header">
          <div className="hp-stats-title-wrap">
            <h3>Precision in Every Mile</h3>
            <p>Live operational metrics across Metro Manila, Clark, and Cebu lounges.</p>
          </div>
          <div className="hp-live-telemetry-badge">
            <span className="pulse-orb" />
            <span>Live Telemetry Stream Active</span>
          </div>
        </div>

        <div className="hp-stats-grid">
          <AnimatedCounter
            icon={<Trophy size={20} />}
            target={14850}
            suffix="+"
            label="VIP Trips Executed"
            sub="Zero mechanical incidents across 4 years"
          />
          <AnimatedCounter
            icon={<ShieldCheck size={20} />}
            target={99.8}
            decimals={1}
            suffix="%"
            label="On-Time Curbside Handover"
            sub="GPS-coordinated tarmac & valet arrivals"
          />
          <AnimatedCounter
            icon={<Clock size={20} />}
            target={15}
            suffix=" Min"
            label="Average VIP Turnaround"
            sub="Paperless mobile license verification"
          />
          <AnimatedCounter
            icon={<Star size={20} />}
            target={4.98}
            decimals={2}
            suffix=" / 5.0"
            label="Client Satisfaction Rating"
            sub="Based on 3,400+ verified exotic rentals"
          />
        </div>
      </div>
    </section>
  );
}
