"use client";

import React, { useState, useEffect, useRef } from "react";
import "./cockpit-counter.css";

interface StatMetric {
  id: string;
  tag: string;
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  desc: string;
}

const METRICS: StatMetric[] = [
  {
    id: "fleet",
    tag: "01 // FLEET",
    target: 50,
    suffix: "+",
    label: "Exotic & Luxury Fleet",
    desc: "Supercars, grand tourers & executive sedans",
  },
  {
    id: "trips",
    tag: "02 // EXPERIENCE",
    target: 15000,
    suffix: "+",
    label: "VIP Drives Completed",
    desc: "Across Metro Manila & Luzon highways",
  },
  {
    id: "handover",
    tag: "03 // PRECISION",
    target: 99.8,
    decimals: 1,
    suffix: "%",
    label: "On-Time Handover",
    desc: "Airport terminals & 5-star hotel suites",
  },
  {
    id: "dispatch",
    tag: "04 // CONCIERGE",
    target: 15,
    prefix: "< ",
    suffix: " Min",
    label: "Instant Key Release",
    desc: "Paperless verification & 24/7 road care",
  },
];

function CounterItem({
  item,
  shouldAnimate,
}: {
  item: StatMetric;
  shouldAnimate: boolean;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    let frame = 0;
    const duration = 1600;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Smooth cubic ease out
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = item.target * ease;

      if (frame >= totalFrames) {
        setVal(item.target);
        clearInterval(timer);
      } else {
        setVal(current);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [item.target, shouldAnimate]);

  const displayString = item.decimals
    ? val.toFixed(item.decimals)
    : Math.floor(val).toLocaleString();

  return (
    <div className="fw-counter-item">
      <span className="fw-counter-index">{item.tag}</span>
      <div className="fw-counter-value">
        <span className="fw-counter-number">
          {item.prefix}
          {displayString}
        </span>
        <span className="fw-counter-suffix">{item.suffix}</span>
      </div>
      <h3 className="fw-counter-label">{item.label}</h3>
      <p className="fw-counter-desc">{item.desc}</p>
    </div>
  );
}

export default function CockpitCounter() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="fw-counter-section" id="counter" data-reveal>
      <div className="fw-counter-container">
        <div className="fw-counter-grid">
          {METRICS.map((item) => (
            <CounterItem key={item.id} item={item} shouldAnimate={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
