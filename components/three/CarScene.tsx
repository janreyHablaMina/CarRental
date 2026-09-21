"use client";

import { useEffect, useRef, useState } from "react";

type SceneProps = { progress: number };

// Full cinematic 360-degree burnout sequence from final.zip (240 frames)
const START_FRAME = 1;
const END_FRAME = 240;
const TOTAL_ACTIVE_FRAMES = END_FRAME - START_FRAME + 1; // 240 frames

const getFramePath = (offsetIndex: number) => {
  const frameNum = String(
    Math.min(END_FRAME, Math.max(START_FRAME, START_FRAME + offsetIndex))
  ).padStart(3, "0");
  return `/frames/ezgif-frame-${frameNum}.jpg`;
};

export default function CarScene({ progress }: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const animFrameIdRef = useRef<number | null>(null);

  const [hudFrame, setHudFrame] = useState(START_FRAME);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Update target frame smoothly from scroll progress
  useEffect(() => {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    targetFrameRef.current = clampedProgress * (TOTAL_ACTIVE_FRAMES - 1);
  }, [progress]);

  // Preload active frames starting from frame 44
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_ACTIVE_FRAMES).fill(null);

    // Frame 44 loaded first and drawn immediately
    const firstImg = new window.Image();
    firstImg.src = getFramePath(0);
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      drawSpecificFrame(0);
    };

    // Preload all remaining active frames into browser cache
    for (let i = 1; i < TOTAL_ACTIVE_FRAMES; i++) {
      const img = new window.Image();
      img.src = getFramePath(i);
      img.onload = () => {
        imagesRef.current[i] = img;
      };
    }
  }, []);

  // Dedicated draw function without clearRect to prevent any blinking/flashing
  const drawSpecificFrame = (frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let img = imagesRef.current[frameIdx];
    // If exact frame is not loaded yet, find closest available frame
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_ACTIVE_FRAMES; offset++) {
        const left = frameIdx - offset;
        const right = frameIdx + offset;
        if (left >= 0 && imagesRef.current[left]?.complete && imagesRef.current[left]!.naturalWidth > 0) {
          img = imagesRef.current[left];
          break;
        }
        if (right < TOTAL_ACTIVE_FRAMES && imagesRef.current[right]?.complete && imagesRef.current[right]!.naturalWidth > 0) {
          img = imagesRef.current[right];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const scale = Math.max(canvasW / imgW, canvasH / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const drawX = (canvasW - drawW) / 2;
    const drawY = (canvasH - drawH) / 2;

    // Direct draw over previous content — NO clearRect! This guarantees 0% flicker/blink
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    lastDrawnFrameRef.current = frameIdx;
  };

  // Continuous smooth requestAnimationFrame loop with damping/lerp
  useEffect(() => {
    let active = true;

    const renderLoop = () => {
      if (!active) return;

      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      // Smooth damping lerp: smoothly glides between frames instead of abrupt jumping
      if (Math.abs(diff) > 0.02) {
        currentFrameRef.current += diff * 0.12;
      } else {
        currentFrameRef.current = target;
      }

      const frameToDraw = Math.round(currentFrameRef.current);

      if (frameToDraw !== lastDrawnFrameRef.current) {
        drawSpecificFrame(frameToDraw);
        setHudFrame(START_FRAME + frameToDraw);
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      active = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  // Handle canvas size with window resizing and device pixel ratio
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      if (lastDrawnFrameRef.current >= 0) {
        drawSpecificFrame(lastDrawnFrameRef.current);
      } else {
        drawSpecificFrame(0);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Subtle interactive mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Chapter HUD indicator
  const hudPhase =
    hudFrame < 45
      ? "01 // THE FLAGSHIP"
      : hudFrame < 90
      ? "02 // ROTATION & SMOKE BURST"
      : hudFrame < 135
      ? "03 // AERO PROFILE & REAR TAILLIGHTS"
      : hudFrame < 175
      ? "04 // HIGH-OCTANE DRIFT"
      : hudFrame < 215
      ? "05 // 360° CINEMATIC TURN"
      : "06 // READY TO DRIVE";

  return (
    <div className="car-showcase-container">
      {/* Studio ambient backlight */}
      <div
        className="studio-ambient-glow"
        style={{
          transform: `translate(${mouse.x * 20}px, ${mouse.y * 14}px)`,
        }}
      />

      {/* Frame canvas with gentle 3D parallax tilt */}
      <div
        className="canvas-frame-wrapper"
        style={{
          transform: `perspective(1200px) rotateX(${-mouse.y * 2}deg) rotateY(${mouse.x * 3}deg)`,
        }}
      >
        <canvas ref={canvasRef} className="car-sequence-canvas" />
      </div>

      {/* Vignettes for crisp text readability */}
      <div className="cinematic-vignette-left" />
      <div className="cinematic-vignette-right" />
      <div className="cinematic-vignette-bottom" />

      {/* Live HUD Telemetry */}
      <div className="car-hud-badge">
        <span className="hud-pulse" />
        <span className="hud-code">DRIVEX // FRAME {String(hudFrame).padStart(3, "0")}/240</span>
        <span className="hud-sep">|</span>
        <span className="hud-angle">{hudPhase}</span>
      </div>
    </div>
  );
}
