"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import "./home-contact.css";
import HomeSectionDivider from "./HomeSectionDivider";

export default function HomeContactSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <HomeSectionDivider />
      <section className="home-contact-section" id="contact" data-reveal>
      {/* FULL WIDTH CINEMATIC NATURE TRIP / MOVING CAR EXPERIENCE */}
      <div className="home-video-fullwidth">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="/images/drivex-coastal-drive.png"
          className="home-car-video-element"
        >
          <source src="/videos/nature-road-trip.mp4" type="video/mp4" />
          <source src="https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/footage/road.mp4" type="video/mp4" />
          <source src="/videos/luxury-car.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* Soft Luxury Vignette Overlay */}
        <div className="home-travel-vignette" />

        {/* Pure Cinematic Text Overlay Directly on Video (No Card) */}
        <div className="home-cinematic-overlay-content">
          <div className="home-cinematic-text-block">
            <p className="home-cinematic-eyebrow">05 // The DriveX Standard</p>
            <h2 className="home-cinematic-title">The Art of the Extraordinary Journey</h2>
            <p className="home-cinematic-desc">
              DriveX was created to redefine automotive luxury in the Philippines. Discover the standard that separates our grand touring experience from ordinary car rentals.
            </p>
            <div className="home-cinematic-actions">
              <Link href="/#vehicles" className="home-cinematic-btn-primary">
                Explore Fleet <ArrowRight size={15} />
              </Link>
              <Link href="/contact" className="home-cinematic-btn-ghost">
                Speak with Concierge
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Minimalist Video Controls */}
        <div className="home-travel-video-ctrls">
          <button
            type="button"
            className="home-travel-ctrl-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause scenic video" : "Play scenic video"}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>

          <button
            type="button"
            className="home-travel-ctrl-btn"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            <span>{isMuted ? "Muted" : "Sound On"}</span>
          </button>
        </div>
      </div>
    </section>
    </>
  );
}
