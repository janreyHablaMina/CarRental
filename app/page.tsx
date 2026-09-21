"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, CalendarDays, ChevronDown, Gauge, MapPin, Menu, Users, X, Zap } from "lucide-react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CarScene = dynamic(() => import("@/components/three/CarScene"), { ssr: false });
const vehicles = [
  { name: "City", category: "Economy", seats: 5, price: "1,500", tone: "silver" },
  { name: "Executive", category: "Sedan", seats: 5, price: "2,500", tone: "black" },
  { name: "Explorer", category: "SUV", seats: 7, price: "3,500", tone: "blue" },
  { name: "Prestige", category: "Luxury", seats: 5, price: "6,000", tone: "graphite" },
];
const steps = [
  ["01", "Choose Your Car", "Find the right shape, pace, and comfort for your trip."],
  ["02", "Book Your Drive", "Choose your dates and reserve in a few clear steps."],
  ["03", "Pick Up & Go", "Collect your keys and make the road entirely yours."],
];

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 84%" } });
      });
      ScrollTrigger.create({ trigger: document.documentElement, start: "top top", end: "bottom bottom", onUpdate: (self) => setProgress(self.progress) });
      ScrollTrigger.create({ trigger: "#hero", start: "top top", end: "bottom bottom", onUpdate: (self) => setHeroProgress(self.progress) });
    }, mainRef);
    return () => { context.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  const scrollTo = (id: string) => { document.querySelector(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return <main ref={mainRef} className="site-shell">
    <header className={`topbar ${progress > 0.015 ? "topbar-scrolled" : ""}`}>
      <button className="wordmark" onClick={() => scrollTo("#hero")} aria-label="DriveX home">DRIVE<span>X</span></button>
      <nav className="desktop-nav" aria-label="Primary navigation"><button onClick={() => scrollTo("#vehicles")}>Vehicles</button><button onClick={() => scrollTo("#how")}>How It Works</button><button onClick={() => scrollTo("#why")}>About</button><button onClick={() => scrollTo("#footer")}>Contact</button></nav>
      <button className="nav-cta desktop-cta" onClick={() => scrollTo("#booking")}>Book now <ArrowRight size={16} /></button>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      {menuOpen && <nav className="mobile-nav"><button onClick={() => scrollTo("#vehicles")}>Vehicles</button><button onClick={() => scrollTo("#how")}>How It Works</button><button onClick={() => scrollTo("#why")}>About</button><button onClick={() => scrollTo("#booking")}>Book Now</button></nav>}
    </header>
    <div className="progress-rail" aria-hidden="true"><span style={{ transform: `scaleY(${progress})` }} /></div>
    <div className="chapter-count" aria-hidden="true">{String(Math.min(6, Math.floor(heroProgress * 6) + 1)).padStart(2, "0")} <i /> 06</div>

    <section id="hero" className="story-section">
      <div className="scene-sticky"><CarScene progress={heroProgress} /></div>
      <div className="story-frame hero-copy">
        <p className="eyebrow">01 // The Flagship</p>
        <h1>Drive More.<br /><span>Experience More.</span></h1>
        <p className="hero-sub">Premium sports cars. Flexible rentals.<br />A smarter way to move.</p>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => scrollTo("#vehicles")}>Explore cars <ArrowRight size={18} /></button>
          <button className="text-button" onClick={() => scrollTo("#how")}>How DriveX works</button>
        </div>
      </div>
      <div className="story-frame profile-copy">
        <p className="eyebrow">02 // Dynamic Turn & Smoke</p>
        <h2>Awaken the<br /><span>Machine.</span></h2>
        <p>Tires spin and smoke surges as the supercar pivots with aggressive mid-engine torque.</p>
        <div className="feature-labels"><span>Dynamic Torque</span><span>Launch Control</span><span>Twin-Turbo V8</span></div>
      </div>
      <div className="story-frame experience-copy">
        <p className="eyebrow">03 // Aero & Rear Profile</p>
        <h2>Sculpted to<br /><span>Dominate.</span></h2>
        <p>Twin LED lightbars illuminate through billowing clouds, revealing active aero and race diffusers.</p>
        <div className="feature-labels"><span>Aero Diffuser</span><span>LED Taillights</span><span>Ground Effects</span></div>
      </div>
      <div className="story-frame interior-copy">
        <p className="eyebrow">04 // 360° Cinematic Turn</p>
        <h2>Unfiltered<br /><span>Power.</span></h2>
        <p>A full 360-degree turnaround caught mid-burnout, capturing raw exotic athleticism.</p>
        <div className="feature-labels"><span>Mid-Engine</span><span>Carbon Chassis</span><span>Active Dynamics</span></div>
      </div>
      <div className="story-frame performance-copy">
        <p className="eyebrow">05 // Pure Adrenaline</p>
        <h2>Engineered to<br /><span>Thrill.</span></h2>
        <p>Turn heads the instant you arrive. Experience uncompromising supercar performance at your command.</p>
        <div className="feature-labels"><span>Launch Ready</span><span>Track Stance</span><span>Exotic Fleet</span></div>
      </div>
      <div className="story-frame drive-copy">
        <p className="eyebrow">06 // Take the Wheel</p>
        <h2>Your Road.<br /><span>Your Rules.</span></h2>
        <p>Choose the vehicle that fits your journey and take off when you&apos;re ready.</p>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => scrollTo("#booking")}>Book this car <ArrowRight size={18} /></button>
          <button className="text-button" onClick={() => scrollTo("#vehicles")}>Explore collection</button>
        </div>
      </div>
      <button className="scroll-cue" onClick={() => scrollTo("#vehicles")}>Scroll to explore <ArrowDown size={15} /></button>
    </section>

    <section id="vehicles" className="vehicles-section section-pad">
      <div className="section-head" data-reveal><div><p className="eyebrow">The collection</p><h2>Choose Your Drive</h2></div><p>From city streets to open roads, meet a collection selected for the way you move.</p></div>
      <div className="category-tabs" data-reveal>{["All", "Economy", "Sedan", "SUV", "Luxury", "Sports"].map((tab, i) => <button className={i === 0 ? "active" : ""} key={tab}>{tab}</button>)}</div>
      <div className="vehicle-grid">{vehicles.map((vehicle, index) => <article className="vehicle-item" key={vehicle.name} data-reveal><div className={`vehicle-visual vehicle-${vehicle.tone}`}><span className="vehicle-index">0{index + 1}</span><div className="car-silhouette"><div className="car-roof" /><div className="car-body" /><i /><i /></div><span className="vehicle-category">{vehicle.category}</span></div><div className="vehicle-info"><div><p className="eyebrow">DriveX</p><h3>{vehicle.name}</h3></div><div className="specs"><span><Users size={15} /> {vehicle.seats} seats</span><span><Gauge size={15} /> Automatic</span><span><Zap size={15} /> Hybrid</span></div><div className="price"><small>From</small><strong>₱{vehicle.price}</strong><span>/ day</span></div><button className="round-button" aria-label={`View ${vehicle.name}`}><ArrowRight /></button></div></article>)}</div>
    </section>

    <section id="booking" className="booking-section section-pad"><div className="booking-intro" data-reveal><p className="eyebrow">Start your journey</p><h2>Ready to<br />Drive?</h2><p>Your next car is closer than you think.</p></div><form className="booking-form" data-reveal onSubmit={(e) => e.preventDefault()}><label><span><MapPin size={15} /> Pickup location</span><input placeholder="Where are you starting?" /><ChevronDown size={16} /></label><label><span><MapPin size={15} /> Drop-off location</span><input placeholder="Same location" /><ChevronDown size={16} /></label><label><span><CalendarDays size={15} /> Pickup date</span><input type="date" /></label><label><span><CalendarDays size={15} /> Return date</span><input type="date" /></label><label><span><Gauge size={15} /> Vehicle type</span><select defaultValue=""><option value="" disabled>Choose a category</option><option>Economy</option><option>Sedan</option><option>SUV</option><option>Luxury</option></select><ChevronDown size={16} /></label><button className="search-button">Search available cars <ArrowRight size={18} /></button></form></section>

    <section id="how" className="how-section section-pad"><div className="section-head" data-reveal><div><p className="eyebrow">Simple by design</p><h2>From choice<br />to open road.</h2></div></div><div className="steps-list">{steps.map(([number, title, copy]) => <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p><ArrowRight /></article>)}</div></section>

    <section id="why" className="why-section section-pad"><div className="why-title" data-reveal><p className="eyebrow">The DriveX standard</p><h2>Built Around<br /><span>Your Journey</span></h2></div><div className="why-list">{[["Flexible Rentals", "An afternoon, a weekend, or longer. Keep the car for exactly the time you need."], ["Transparent Pricing", "The price you see is the price you drive away with. No last-minute surprises."], ["Quality Vehicles", "Every car is inspected, maintained, and prepared before every drive."], ["Effortless Booking", "From search to confirmation in a few considered steps."]].map(([title, copy], i) => <article key={title} data-reveal><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="cinematic-cta"><Image src="/images/drivex-coastal-drive.png" alt="Black grand touring car on a coastal road at blue hour" fill sizes="100vw" className="cta-image" /><div className="cta-overlay" /><div className="cta-content" data-reveal><p className="eyebrow">The road is waiting</p><h2>Where will you<br />go next?</h2><p>Your next journey starts with DriveX.</p><div><button className="primary-button" onClick={() => scrollTo("#booking")}>Book your car <ArrowRight size={18} /></button><button className="text-button" onClick={() => scrollTo("#vehicles")}>Explore vehicles</button></div></div></section>

    <footer id="footer"><div className="footer-main"><div><div className="wordmark">DRIVE<span>X</span></div><p>Drive more. Experience more.</p></div><div><h4>Explore</h4><a href="#vehicles">Vehicles</a><a href="#how">How It Works</a><a href="#why">About</a><a href="mailto:hello@drivex.ph">Contact</a></div><div><h4>Support</h4><a href="#footer">Help Center</a><a href="#footer">Rental Policies</a><a href="#footer">Terms</a><a href="#footer">Privacy</a></div><div><h4>Follow</h4><a href="#footer">Instagram</a><a href="#footer">Facebook</a><a href="#footer">LinkedIn</a></div></div><div className="footer-bottom"><span>© 2026 DriveX. All rights reserved.</span><span>Manila, Philippines</span></div></footer>
  </main>;
}
