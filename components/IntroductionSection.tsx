"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ChevronDown,
} from "lucide-react";

interface SpatialCardData {
  id: number;
  badge: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  color: string;
  glowColor: string;
  stats: { label: string; value: string }[];
}

const CARDS: SpatialCardData[] = [
  {
    id: 1,
    badge: "01 / DUAL-ZONE MATRIX",
    category: "STRUCTURAL ARCHITECTURE",
    title: "CLIMATE MORPH",
    subtitle: "Adaptive Dual-Zone Thermal Envelope",
    description:
      "Precision cutaway reveals hidden insulated supply trunks and returns. The system independently balances sub-zero winter temperatures on one elevation while delivering radiant chilled air on the other.",
    image: "/introduction/card_01_villa.jpg",
    color: "from-amber-500/25 via-amber-600/10 to-transparent",
    glowColor: "rgba(217, 119, 6, 0.35)",
    stats: [
      { label: "AIR CHANNELS", value: "Dual Insulated" },
      { label: "TEMPERATURE BIAS", value: "±0.2°F Precision" },
    ],
  },
  {
    id: 2,
    badge: "02 / ACOUSTIC DYNAMICS",
    category: "SOUND ATTENUATION",
    title: "E.C.H.O. SILENCE",
    subtitle: "18 dBA Whisper Sound Equilibrium",
    description:
      "Aero-acoustic sound baffles absorb resonance before air enters the living envelope. High-velocity air currents travel through double-insulated plenum channels without vibration or audible turbulence.",
    image: "/introduction/card_02_acoustic.jpg",
    color: "from-sky-500/25 via-sky-600/10 to-transparent",
    glowColor: "rgba(14, 165, 233, 0.35)",
    stats: [
      { label: "SOUND PROFILE", value: "18 dBA Whisper" },
      { label: "DECIBEL CUT", value: "-14 dBA Reduction" },
    ],
  },
  {
    id: 3,
    badge: "03 / MECHANICAL HEART",
    category: "INVERTER DRIVETRAIN",
    title: "ROTARY DRIVE",
    subtitle: "Continuous Dynamic Load Modulation",
    description:
      "Twin-rotary neodymium inverter compressors modulate down to 10% minimal capacity. Microsecond telemetry matches heat gain and loss in real-time, delivering 64% lower consumption than standard staged pumps.",
    image: "/introduction/card_03_machine.jpg",
    color: "from-sky-500/25 via-sky-600/10 to-transparent",
    glowColor: "rgba(14, 165, 233, 0.35)",
    stats: [
      { label: "EFFICIENCY", value: "22.5 SEER2" },
      { label: "TURNDOWN RATIO", value: "10% - 100%" },
    ],
  },
  {
    id: 4,
    badge: "04 / HYDRONIC MATRIX",
    category: "THERMAL MASS STORAGE",
    title: "RADIANT MATRIX",
    subtitle: "Sub-Slab Hydronic Floor Heating",
    description:
      "Underfloor cross-linked PEX-a oxygen-barrier loops heat the architectural slab directly. Warmth rises silently through hardwood and polished stone, counteracting winter exterior cold glass draft cascades.",
    image: "/introduction/card_04_radiant.jpg",
    color: "from-amber-500/25 via-amber-600/10 to-transparent",
    glowColor: "rgba(217, 119, 6, 0.35)",
    stats: [
      { label: "LOOP NETWORK", value: "12 Radiant Zones" },
      { label: "SLAB TEMPERATURE", value: "74°F Continuous" },
    ],
  },
  {
    id: 5,
    badge: "05 / LAMINAR PURITY",
    category: "BIOLOGICAL AIR DEFENSE",
    title: "LAMINAR FLOW",
    subtitle: "1,250 CFM Zero-Draft Air Induction",
    description:
      "High-induction linear ceiling diffusers sweep fresh oxygen through open-concept living volumes. Hospital-grade MERV 16 filtration captures 99.97% of airborne particulate without reducing airflow velocity.",
    image: "/introduction/card_05_airflow.jpg",
    color: "from-sky-500/25 via-sky-600/10 to-transparent",
    glowColor: "rgba(14, 165, 233, 0.35)",
    stats: [
      { label: "CFM DELIVERY", value: "1,250 CFM" },
      { label: "AIR PURITY", value: "MERV 16 Bio-Grade" },
    ],
  },
  {
    id: 6,
    badge: "06 / TOTAL EQUILIBRIUM",
    category: "SEASONAL HARMONY",
    title: "EQUILIBRIUM",
    subtitle: "Whole-Enclosure Passive Synergy",
    description:
      "From sub-zero mountain blizzards to 105°F summer heatwaves, the entire villa transitions effortlessly between cooling and heating modes, maintaining uninterrupted comfort and interior serenity.",
    image: "/introduction/card_06_equilibrium.jpg",
    color: "from-amber-500/25 via-amber-600/10 to-transparent",
    glowColor: "rgba(217, 119, 6, 0.35)",
    stats: [
      { label: "YEAR-ROUND", value: "72°F Fixed" },
      { label: "RESPONSE TIME", value: "< 90 Seconds" },
    ],
  },
];

export default function IntroductionSection() {
  const [continuousIndex, setContinuousIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [screenWidth, setScreenWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200);

  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Background 3D Ambient Particle Simulation (Matching the video's floating glowing dust)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    // Particle pool
    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.8 + 0.2, // Depth factor
      radius: Math.random() * 2.8 + 1,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      color:
        Math.random() > 0.5
          ? "rgba(14, 165, 233, " // Subzero Glacier Sky
          : "rgba(217, 119, 6, ", // Warm Architectural Amber
      alpha: Math.random() * 0.5 + 0.15,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx * p.z;
        p.y += p.vy * p.z;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha * p.z})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // GSAP ScrollTrigger PINNING: Automatic scroll navigation across all 6 cards
  useEffect(() => {
    if (!sectionRef.current || !pinContainerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=2600", // Snappy scroll travel across the 6 cards
      pin: pinContainerRef.current,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.05, // Instant 1:1 scrub response synchronized with Lenis
      onUpdate: (self) => {
        const progress = self.progress; // 0 to 1
        const virtualIdx = progress * (CARDS.length - 1); // 0 to 5
        setContinuousIndex(virtualIdx);
        setActiveIndex(Math.min(Math.round(virtualIdx), CARDS.length - 1));
      },
    });

    scrollTriggerRef.current = st;

    // Refresh after DOM layout settling
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      st.kill();
    };
  }, []);

  // Click on a dot or card to scroll smoothly to that card's position
  const scrollToCard = useCallback((cardIndex: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;

    const targetProgress = cardIndex / (CARDS.length - 1);
    const targetScroll = st.start + targetProgress * (st.end - st.start);

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }, []);

  // Subtle Mouse Parallax Tilt for the center card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x: x * 12, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      id="introduction"
      className="relative w-full border-t select-none bg-[#1D1D1E] text-white border-white/[0.08]"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinContainerRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
      >
        {/* 3D Particle Canvas Background */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 w-full h-full opacity-40 z-0"
        />

        {/* Ambient Backlight Accents */}
        <div className="pointer-events-none absolute top-1/4 left-1/4 w-[650px] h-[650px] rounded-full bg-amber-500/[0.04] blur-[180px] -z-10" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[650px] h-[650px] rounded-full bg-sky-500/[0.04] blur-[180px] -z-10" />

        {/* Header (Top) */}
        <div className="relative z-10 text-center max-w-3xl mx-auto pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-2 sm:mb-3 backdrop-blur-md bg-white/[0.05] border-white/[0.12] text-zinc-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Spatial Architecture</span>
            <span className="text-zinc-500 hidden sm:inline">|</span>
            <span className="text-sky-400 font-semibold hidden sm:inline">
              Scroll Down To Advance
            </span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-5xl font-black uppercase tracking-tight leading-tight text-white">
            Explore The Spatial{" "}
            <span className="bg-gradient-to-r bg-clip-text text-transparent from-amber-300 to-amber-100">
              Climate Universe.
            </span>
          </h2>
        </div>

        {/* ========================================================
            3D SPATIAL PERSPECTIVE CARDS STAGE (AUTOMATICALLY SCROLL-DRIVEN)
        ======================================================== */}
        <div
          className="relative z-10 w-full flex-1 flex items-center justify-center my-auto"
          style={{
            perspective: "1400px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {CARDS.map((card, i) => {
            // Continuous difference from scroll position: creates butter-smooth 3D gliding
            const diff = i - continuousIndex;
            const isVisible = Math.abs(diff) <= 2.2;

            if (!isVisible) return null;

            const isCenter = Math.abs(diff) < 0.5;

            // Responsive horizontal spacing on mobile vs desktop
            const cardSpacing =
              screenWidth < 640
                ? Math.min(screenWidth * 0.78, 280)
                : 430;

            // 3D Spatial Position Math (Smooth real-time curve based on scroll position)
            const tx = diff * cardSpacing;
            const tz = -Math.abs(diff) * 230;
            const ry = -Math.max(Math.min(diff * 30, 60), -60);
            const scale = Math.max(0.68, 1 - Math.abs(diff) * 0.14);
            const opacity = Math.max(0, 1 - Math.abs(diff) * 0.32);
            const zIndex = Math.round(50 - Math.abs(diff) * 10);

            // Apply interactive mouse parallax tilt when card is centered
            let rx = 0;
            let finalRy = ry;
            let finalTz = tz;
            if (isCenter) {
              rx = mouseTilt.y * (1 - Math.abs(diff) * 2);
              finalRy += mouseTilt.x * (1 - Math.abs(diff) * 2);
              finalTz += 50; // Pop forward slightly into focus
            }

            return (
              <div
                key={card.id}
                onClick={() => scrollToCard(i)}
                onMouseMove={isCenter ? handleMouseMove : undefined}
                onMouseLeave={isCenter ? handleMouseLeave : undefined}
                className="absolute w-[94%] max-w-[370px] sm:max-w-[580px] md:max-w-[700px] lg:max-w-[780px] aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden will-change-transform cursor-pointer select-none"
                style={{
                  transform: `translate3d(${tx}px, 0px, ${finalTz}px) rotateY(${finalRy}deg) rotateX(${rx}deg) scale(${scale})`,
                  transformStyle: "preserve-3d",
                  opacity,
                  zIndex,
                  boxShadow: isCenter
                    ? `0 30px 80px -20px ${card.glowColor}, 0 20px 40px -15px rgba(0,0,0,0.9)`
                    : "0 20px 50px -10px rgba(0,0,0,0.8)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                {/* Outer Glass Rim Border */}
                <div
                  className={`absolute inset-0 rounded-3xl border ${
                    isCenter ? "border-white/40 ring-1 ring-white/20" : "border-white/15"
                  } transition-colors duration-300 pointer-events-none z-30`}
                />

                {/* High-Resolution Architectural Sequence Background */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 92vw, 780px"
                    priority={isCenter}
                    className="object-cover"
                  />
                  {/* Filmic Cinematic Dark Mask Over Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/35" />
                  <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/80" />
                  {/* Subtle Colored Aurora Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-75`} />
                </div>

                {/* Card Holographic Reflection Highlight */}
                {isCenter && (
                  <div
                    className="pointer-events-none absolute inset-0 rounded-3xl opacity-30"
                    style={{
                      background: `radial-gradient(circle at ${50 + mouseTilt.x * 2}% ${
                        50 - mouseTilt.y * 2
                      }%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
                    }}
                  />
                )}

                {/* Card Content Layout */}
                <div className="relative z-20 h-full p-4 sm:p-7 md:p-9 flex flex-col justify-between">
                  {/* Card Top Header */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/75 border border-white/20 text-[9px] sm:text-xs font-mono uppercase tracking-widest text-amber-300 font-bold backdrop-blur-md shadow-md">
                      <span>{card.badge}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline">
                        {card.category}
                      </span>
                      <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold text-white backdrop-blur-md">
                        0{card.id}
                      </span>
                    </div>
                  </div>

                  {/* Card Center Display Typography */}
                  <div className="my-auto py-1 sm:py-2">
                    <h3 className="text-xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                      {card.title}
                    </h3>
                    <p className="mt-0.5 sm:mt-1 text-xs sm:text-lg font-bold bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                      {card.subtitle}
                    </p>
                    <p className="mt-1.5 sm:mt-2.5 text-[11px] sm:text-sm text-zinc-200 line-clamp-2 sm:line-clamp-3 md:line-clamp-none max-w-xl font-medium leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                      {card.description}
                    </p>
                  </div>

                  {/* Card Bottom Telemetry Bar */}
                  <div className="pt-2 sm:pt-3 border-t border-white/15 flex items-center justify-between gap-2 sm:gap-3">
                    <div className="flex items-center gap-3 sm:gap-6 font-mono text-xs">
                      {card.stats.map((s, sIdx) => (
                        <div key={sIdx} className="flex flex-col">
                          <span className="text-[8px] sm:text-[10px] text-zinc-400 uppercase tracking-wider">
                            {s.label}
                          </span>
                          <span className="font-bold text-white text-[11px] sm:text-sm sm:text-base">
                            {s.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {isCenter && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const el = document.getElementById("invisible-architecture");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white text-black text-[10px] sm:text-[11px] font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer shadow-md shrink-0"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================
            SCROLL-DRIVEN PROGRESS CONTROLLER (NO BUTTONS)
        ======================================================== */}
        <div className="relative z-10 flex flex-col items-center gap-2 max-w-md mx-auto pb-2">
          {/* Clickable Step Dots */}
          <div className="flex items-center gap-2">
            {CARDS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollToCard(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === activeIndex
                    ? "w-8 bg-amber-500 shadow-sm"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Scroll to card ${dotIdx + 1}`}
              />
            ))}
          </div>

          {/* Current Step Label */}
          <span className="text-xs font-mono uppercase tracking-widest font-semibold text-zinc-300">
            0{activeIndex + 1} / 0{CARDS.length} — {CARDS[activeIndex].title}
          </span>

          {/* Scroll Prompt with Animated Arrow */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase animate-bounce pt-0.5 text-zinc-400">
            <span>Scroll To Advance Cards</span>
            <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
