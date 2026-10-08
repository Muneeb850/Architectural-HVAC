"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

interface FeatureMode {
  id: string;
  tag: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  stat: string;
  statLabel: string;
  callout: {
    x: number; // percentage
    y: number;
    title: string;
    text: string;
  };
}

const MODES: FeatureMode[] = [
  {
    id: "laminar",
    tag: "01 / LAMINAR CONCEALMENT",
    title: "Concealed Linear Diffusers",
    tagline: "Airflow you feel as pure comfort, never as a draft.",
    description:
      "Continuous 1/2-inch shadow reveals integrated into ceiling plaster replace standard industrial grilles. Conditioned air cascades gently down perimeter glass walls, balancing indoor volumes with zero audible air turbulence.",
    image: "/introduction/card_05_airflow.jpg",
    stat: "1,250 CFM",
    statLabel: "Zero-Draft Air Induction",
    callout: {
      x: 55,
      y: 22,
      title: "Shadow-Gap Ceiling Reveal",
      text: "Continuous 12mm flush architectural slot diffuser",
    },
  },
  {
    id: "radiant",
    tag: "02 / HYDRONIC MATRIX",
    title: "Sub-Slab In-Floor Heating",
    tagline: "Silent upward warmth rising through natural stone and hardwood.",
    description:
      "Cross-linked PEX-a oxygen barrier tubing embedded within structural slabs transforms entire floorplates into gentle, self-regulating thermal storage radiators. Winter drafts from snowy exterior glass are neutralized before entering.",
    image: "/introduction/card_04_radiant.jpg",
    stat: "74.0°F",
    statLabel: "Continuous Slab Equilibrium",
    callout: {
      x: 42,
      y: 78,
      title: "Hydronic Radiant Network",
      text: "12 room-by-room zoned PEX loops beneath basalt slab",
    },
  },
  {
    id: "acoustic",
    tag: "03 / AERO-ACOUSTICS",
    title: "Acoustic Attenuation",
    tagline: "Silence so complete, you'll forget climate systems exist.",
    description:
      "Custom double-attenuated return chambers and spring-isolated mechanical air handlers suppress mechanical hum and air velocity roar. The operating sound floor sits below 18 dBA — quieter than the rustle of leaves.",
    image: "/introduction/card_02_acoustic.jpg",
    stat: "16.5 dBA",
    statLabel: "Ultra-Quiet Operating Floor",
    callout: {
      x: 65,
      y: 45,
      title: "Acoustic Oak Resonators",
      text: "Concealed return paths disguised behind vertical timber fins",
    },
  },
];

export default function InvisibleArchitectureSection() {
  const { isDark } = useTheme();
  const [activeMode, setActiveMode] = useState<FeatureMode>(MODES[0]);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Subtle Ambient Breeze Particles Canvas (floating gentle flow across the visual)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1000);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle pool
    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speedX: 0.3 + Math.random() * 0.6,
      speedY: (Math.random() - 0.5) * 0.2,
      size: 1 + Math.random() * 1.5,
      opacity: 0.15 + Math.random() * 0.35,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="invisible-architecture"
      ref={containerRef}
      className={`relative w-full py-28 sm:py-36 overflow-hidden border-t transition-colors duration-500 ${
        isDark ? "bg-[#1D1D1E] text-white border-white/[0.08]" : "bg-[#FAF8F5] text-[#141518] border-black/[0.06]"
      }`}
    >
      {/* Background Subtle Warm Radial Glow */}
      <div
        className={`pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[180px] opacity-25 transition-all duration-700 ${
          isDark ? "bg-amber-400/10" : "bg-amber-300/30"
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Clean, Open Typography with NO Boxes */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md transition-colors ${
              isDark
                ? "bg-white/[0.05] border border-white/[0.12] text-zinc-200"
                : "bg-black/[0.04] border border-black/[0.08] text-[#141518]"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Section 03 — Invisible Architecture</span>
          </div>

          <h2
            className={`text-4xl sm:text-6xl font-black uppercase tracking-tight leading-[1.05] transition-colors ${
              isDark ? "text-white" : "text-[#141518]"
            }`}
          >
            Engineered to be felt.{" "}
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                isDark ? "from-amber-300 to-amber-100" : "from-amber-600 to-amber-700"
              }`}
            >
              Never seen or heard.
            </span>
          </h2>

          <p
            className={`mt-5 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto transition-colors ${
              isDark ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            True luxury is the complete absence of noise, drafts, and bulky mechanical grilles. Every
            duct, damper, and hydronic loop is seamlessly concealed within architectural reveals.
          </p>

          {/* Minimalist Floating Tabs - Clean pills, NO Cluttered Boxes */}
          <div
            className={`mt-6 sm:mt-8 flex flex-wrap justify-center sm:inline-flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl sm:rounded-full backdrop-blur-md max-w-full transition-colors ${
              isDark ? "bg-white/[0.04] border border-white/[0.08]" : "bg-black/[0.04] border border-black/[0.08]"
            }`}
          >
            {MODES.map((mode) => {
              const isActive = activeMode.id === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode)}
                  className={`px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? isDark
                        ? "bg-white text-black font-bold shadow-md"
                        : "bg-[#141518] text-white font-bold shadow-md shadow-black/10"
                      : isDark
                      ? "text-zinc-400 hover:text-white"
                      : "text-zinc-600 hover:text-[#141518]"
                  }`}
                >
                  {mode.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cinematic Full-Bleed Showcase Visual */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/10] min-h-[380px] sm:min-h-0 max-h-[640px] rounded-3xl overflow-hidden border border-black/[0.1] shadow-2xl bg-[#06080d] group">
          {/* Main Visual Image with Smooth Crossfade */}
          <Image
            src={activeMode.image}
            alt={activeMode.title}
            fill
            priority
            className="object-cover transition-all duration-1000 group-hover:scale-[1.02]"
          />

          {/* Gentle dark gradient vignetting at edges for contrast */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

          {/* Ambient Breeze Particles Canvas */}
          <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 w-full h-full z-10" />

          {/* Floating Reticle Hotspot on the Image */}
          <div
            style={{ left: `${activeMode.callout.x}%`, top: `${activeMode.callout.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          >
            {/* Pulsating target point */}
            <div className="relative flex items-center justify-center">
              <span className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white/25 animate-ping absolute" />
              <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-white text-black flex items-center justify-center shadow-xl cursor-pointer">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-amber-500" />
              </div>
            </div>

            {/* Floating Annotation Tag */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-7 sm:top-9 w-48 sm:w-64 p-2.5 sm:p-3 rounded-xl border backdrop-blur-md text-left shadow-2xl pointer-events-none transition-colors ${
                isDark
                  ? "bg-[#252528]/95 text-white border-white/[0.12]"
                  : "bg-white/95 text-[#141518] border-black/[0.1]"
              }`}
            >
              <span
                className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-widest block font-bold ${
                  isDark ? "text-amber-400" : "text-amber-600"
                }`}
              >
                CONCEALED DETAIL
              </span>
              <p className={`text-[11px] sm:text-xs font-semibold mt-0.5 ${isDark ? "text-white" : "text-[#141518]"}`}>
                {activeMode.callout.title}
              </p>
              <p
                className={`text-[10px] sm:text-[11px] mt-0.5 leading-snug font-light ${
                  isDark ? "text-zinc-300" : "text-zinc-600"
                }`}
              >
                {activeMode.callout.text}
              </p>
            </div>
          </div>

          {/* Bottom Floating Information Overlay */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div className="max-w-xl">
              <span className="text-[10px] sm:text-xs font-mono text-amber-300 uppercase tracking-widest block mb-0.5 sm:mb-1">
                {activeMode.tag}
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-white drop-shadow-md">
                {activeMode.title}
              </h3>
              <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-zinc-200 font-light leading-relaxed max-w-lg drop-shadow line-clamp-2 sm:line-clamp-none">
                {activeMode.description}
              </p>
            </div>

            {/* Clean Live Metric Callout */}
            <div className="px-3.5 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-black/75 border border-white/[0.15] backdrop-blur-md self-start sm:self-auto shrink-0 shadow-xl">
              <span className="text-xl sm:text-3xl font-black font-mono text-white block">
                {activeMode.stat}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-zinc-300 block mt-0.5">
                {activeMode.statLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Editorial 3-Column Architectural Principles (Clean Text, NO Dark Boxes) */}
        <div
          className={`mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pt-12 border-t transition-colors ${
            isDark ? "border-white/[0.08]" : "border-black/[0.08]"
          }`}
        >
          <div className="space-y-2">
            <span
              className={`text-xs font-mono tracking-widest uppercase block font-semibold ${
                isDark ? "text-amber-400" : "text-amber-700"
              }`}
            >
              01 / AESTHETIC PURITY
            </span>
            <h4 className={`text-lg font-bold uppercase tracking-tight ${isDark ? "text-white" : "text-[#141518]"}`}>
              Zero Visible Grilles
            </h4>
            <p className={`text-sm font-light leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              Air diffusers are designed in concert with structural expansion joints and cabinetry reveals.
              The mechanical engineering never intrudes on architectural vision.
            </p>
          </div>

          <div className="space-y-2">
            <span
              className={`text-xs font-mono tracking-widest uppercase block font-semibold ${
                isDark ? "text-sky-400" : "text-sky-700"
              }`}
            >
              02 / ACOUSTIC FLOOR
            </span>
            <h4 className={`text-lg font-bold uppercase tracking-tight ${isDark ? "text-white" : "text-[#141518]"}`}>
              18 dBA Sound Attenuation
            </h4>
            <p className={`text-sm font-light leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              Vibration springs, internal acoustic baffles, and low-velocity plenum ducts keep sound output
              lower than a whispered conversation in an empty library.
            </p>
          </div>

          <div className="space-y-2">
            <span
              className={`text-xs font-mono tracking-widest uppercase block font-semibold ${
                isDark ? "text-amber-400" : "text-amber-700"
              }`}
            >
              03 / WHOLE-HOME BALANCE
            </span>
            <h4 className={`text-lg font-bold uppercase tracking-tight ${isDark ? "text-white" : "text-[#141518]"}`}>
              ±0.2°F Zone Accuracy
            </h4>
            <p className={`text-sm font-light leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              Decentralized micro-sensors and motorized dampers dynamically modulate airflow room-by-room,
              eliminating hot spots across double-height rooms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
