"use client";

import "./stats-counter.css";
import React, { useEffect, useState, useRef } from "react";
import { Trophy, ShieldCheck, Clock, Star, Sparkles } from "lucide-react";

interface MetricItem {
  id: string;
  icon: React.ReactNode;
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  sub: string;
}

const METRICS: MetricItem[] = [
  {
    id: "trips",
    icon: <Trophy size={18} />,
    target: 14850,
    suffix: "+",
    label: "VIP Trips Completed",
    sub: "Zero mechanical incidents across 4 years",
  },
  {
    id: "handover",
    icon: <ShieldCheck size={18} />,
    target: 99.8,
    decimals: 1,
    suffix: "%",
    label: "On-Time Handover",
    sub: "GPS-coordinated airport & hotel arrivals",
  },
  {
    id: "speed",
    icon: <Clock size={18} />,
    target: 15,
    prefix: "< ",
    suffix: " Min",
    label: "Rapid Concierge Turnaround",
    sub: "Paperless verification & instant unlock",
  },
  {
    id: "rating",
    icon: <Star size={18} />,
    target: 4.98,
    decimals: 2,
    suffix: " / 5.0",
    label: "Verified Client Rating",
    sub: "Rated by 3,400+ executive drivers",
  },
];

function MetricCard({ item }: { item: MetricItem }) {
  const [val, setVal] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = item.target * ease;

            if (frame >= totalFrames) {
              setVal(item.target);
              clearInterval(timer);
            } else {
              setVal(current);
            }
          }, frameDuration);
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, [item.target]);

  const formattedValue = item.decimals 
    ? val.toFixed(item.decimals) 
    : Math.floor(val).toLocaleString();

  return (
    <div ref={cardRef} className="hp-metric-card">
      <div className="hp-metric-card-top">
        <div className="hp-metric-icon">{item.icon}</div>
      </div>
      
      <div className="hp-metric-value">
        <span className="hp-metric-number">
          {item.prefix}{formattedValue}
        </span>
        <span className="hp-metric-suffix">{item.suffix}</span>
      </div>

      <h4 className="hp-metric-label">{item.label}</h4>
      <p className="hp-metric-sub">{item.sub}</p>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="hp-counter-section" id="metrics">
      <div className="hp-counter-ambient-glow" />
      
      <div className="hp-counter-inner">
        {/* Balanced Luxury Header */}
        <div className="hp-counter-header">
          <div className="hp-counter-badge">
            <span className="hp-pulse-dot" />
            <span>LIVE FLEET TELEMETRY // 5 HUBS ACTIVE</span>
          </div>
          <h3 className="hp-counter-heading">Precision in Every Mile</h3>
        </div>

        {/* 4 Balanced Cards */}
        <div className="hp-counter-grid">
          {METRICS.map((item) => (
            <MetricCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
