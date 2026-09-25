"use client";

import "./stats-counter.css";
import React, { useEffect, useState, useRef } from "react";
import { ShieldCheck, Clock, Star, Zap, CheckCircle2, Radio, Award } from "lucide-react";

interface MetricData {
  id: string;
  tag: string;
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  title: string;
  subtitle: string;
  badge: string;
}

const METRICS: MetricData[] = [
  {
    id: "01",
    tag: "DISPATCH VOLUME",
    target: 14850,
    suffix: "+",
    title: "VIP Trips Executed",
    subtitle: "Zero mechanical incidents across 4 years of luxury fleet operation",
    badge: "FLEET CERTIFIED",
  },
  {
    id: "02",
    tag: "RELIABILITY INDEX",
    target: 99.8,
    decimals: 1,
    suffix: "%",
    title: "Punctual Handover Rate",
    subtitle: "GPS-coordinated airport tarmac & executive hotel curb arrivals",
    badge: "FLIGHT TRACKED",
  },
  {
    id: "03",
    tag: "DISPATCH VELOCITY",
    target: 15,
    prefix: "< ",
    suffix: "m",
    title: "Average VIP Turnaround",
    subtitle: "Instant paperless identity verification with keyless smartphone access",
    badge: "RAPID DEPLOY",
  },
  {
    id: "04",
    tag: "SATISFACTION RATING",
    target: 4.98,
    decimals: 2,
    suffix: " ★",
    title: "Verified Driver Score",
    subtitle: "Rated by 3,400+ corporate executives, entrepreneurs, and car enthusiasts",
    badge: "TOP TIER",
  },
];

function MetricColumn({ metric }: { metric: MetricData }) {
  const [val, setVal] = useState(0);
  const colRef = useRef<HTMLDivElement>(null);
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
            const current = metric.target * ease;

            if (frame >= totalFrames) {
              setVal(metric.target);
              clearInterval(timer);
            } else {
              setVal(current);
            }
          }, frameDuration);
        }
      },
      { threshold: 0.15 }
    );

    if (colRef.current) {
      observer.observe(colRef.current);
    }
    return () => observer.disconnect();
  }, [metric.target]);

  const formattedValue = metric.decimals 
    ? val.toFixed(metric.decimals) 
    : Math.floor(val).toLocaleString();

  return (
    <div ref={colRef} className="hp-telemetry-col">
      <div className="hp-col-header">
        <span className="hp-col-tag">{metric.tag}</span>
        <span className="hp-col-index">{metric.id}</span>
      </div>

      <div className="hp-col-metric">
        <span className="hp-metric-digits">
          {metric.prefix}{formattedValue}
        </span>
        <span className="hp-metric-suffix">{metric.suffix}</span>
      </div>

      <div className="hp-col-body">
        <h4 className="hp-col-title">{metric.title}</h4>
        <p className="hp-col-sub">{metric.subtitle}</p>
      </div>

      <div className="hp-col-footer">
        <span className="hp-col-badge">{metric.badge}</span>
      </div>
    </div>
  );
}

export default function StatsCounter() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Manila",
        }) + " PHT"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hp-telemetry-strip" id="metrics">
      {/* Top HUD Telemetry Bar */}
      <div className="hp-telemetry-topbar">
        <div className="hp-topbar-left">
          <span className="hp-pulse-indicator" />
          <span className="hp-topbar-label">DRIVEX FLEET TELEMETRY // SYSTEM STATUS: ACTIVE</span>
          <span className="hp-topbar-divider">/</span>
          <span className="hp-topbar-hub">5 NATIONWIDE HUBS ONLINE</span>
        </div>
        <div className="hp-topbar-right">
          <span className="hp-topbar-clock">{timeString || "10:00:00 PHT"}</span>
          <span className="hp-topbar-status">READY FOR DISPATCH</span>
        </div>
      </div>

      {/* Main 4-Segment Minimalist Metric Strip */}
      <div className="hp-telemetry-grid">
        {METRICS.map((metric) => (
          <MetricColumn key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Bottom Architectural Guarantee Ticker */}
      <div className="hp-telemetry-bottom-strip">
        <div className="hp-guarantee-item">
          <CheckCircle2 size={13} className="hp-guarantee-icon" />
          <span>₱0 Hidden Deposit Deductions</span>
        </div>
        <div className="hp-guarantee-sep">&bull;</div>
        <div className="hp-guarantee-item">
          <CheckCircle2 size={13} className="hp-guarantee-icon" />
          <span>Tier-1 Comprehensive Insurance Included</span>
        </div>
        <div className="hp-guarantee-sep">&bull;</div>
        <div className="hp-guarantee-item">
          <CheckCircle2 size={13} className="hp-guarantee-icon" />
          <span>Guaranteed Curbside Handover</span>
        </div>
        <div className="hp-guarantee-sep">&bull;</div>
        <div className="hp-guarantee-item">
          <CheckCircle2 size={13} className="hp-guarantee-icon" />
          <span>24/7 Priority Roadside VIP Dispatch</span>
        </div>
      </div>
    </section>
  );
}
