"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  Wind,
  Flame,
  Snowflake,
  Volume2,
  VolumeX,
  Eye,
  Sliders,
  MapPin,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number;
  label: string;
  category: string;
  detail: string;
  metric: string;
}

interface EstateProject {
  id: string;
  tag: string;
  name: string;
  location: string;
  elevation: string;
  sqft: string;
  heroImage: string;
  challenge: string;
  solution: string;
  telemetry: {
    temp: string;
    sound: string;
    humidity: string;
    cfm: string;
    purity: string;
    cop: string;
  };
  hotspots: Hotspot[];
}

const ESTATES: EstateProject[] = [
  {
    id: "aspen",
    tag: "PROJECT 01 / ALPINE",
    name: "The Aspen Glass Pavilion",
    location: "Aspen, Colorado",
    elevation: "8,200 ft Elevation • Sub-Zero Climate",
    sqft: "9,400 Sq Ft",
    heroImage: "/introduction/card_01_villa.jpg",
    challenge:
      "Floor-to-ceiling structural glass curtain walls subject to -18°F exterior winter blizzards and intense solar thermal load during high-altitude summer sun.",
    solution:
      "Perimeter in-slab hydronic radiant warming trenches counteract downward cold glass drafts, coupled with variable-speed concealed high-induction ceiling washes.",
    telemetry: {
      temp: "72.0°F",
      sound: "17.4 dBA",
      humidity: "44%",
      cfm: "1,450 CFM",
      purity: "99.97%",
      cop: "4.82 COP",
    },
    hotspots: [
      {
        id: "trench",
        x: 32,
        y: 82,
        label: "Radiant Floor Matrix",
        category: "IN-SLAB HEATING",
        detail: "Oxygen-barrier cross-linked PEX-a hydronic loops embedded in Italian basalt slab.",
        metric: "74°F Slab Temp",
      },
      {
        id: "diffuser",
        x: 65,
        y: 28,
        label: "Flush Linear Slot Diffuser",
        category: "CONCEALED AIRFLOW",
        detail: "Continuous 1/2-inch architectural ceiling slot delivering zero-draft laminar air wash.",
        metric: "0 dB Draft Sensation",
      },
      {
        id: "sensor",
        x: 52,
        y: 60,
        label: "Breathing-Level Micro Sensor",
        category: "TELEMETRY",
        detail: "Decentralized room sensor calculating mean radiant temperature and humidity.",
        metric: "10-Sec Sampling",
      },
    ],
  },
  {
    id: "belair",
    tag: "PROJECT 02 / COASTAL RIDGE",
    name: "The Bel-Air Cantilever Villa",
    location: "Bel-Air, California",
    elevation: "High Solar Radiation • Coastal Humidity",
    sqft: "14,200 Sq Ft",
    heroImage: "/introduction/card_06_equilibrium.jpg",
    challenge:
      "Massive two-story open volumes with extreme western solar exposure. Severe risk of thermal stratification between lower salon and upper master wing.",
    solution:
      "Twin modulating inverter heat pumps paired with dual counter-flow ERVs and automated motorized balance dampers that dynamically equalize air density room-by-room.",
    telemetry: {
      temp: "69.5°F",
      sound: "18.1 dBA",
      humidity: "48%",
      cfm: "1,850 CFM",
      purity: "99.98%",
      cop: "5.10 COP",
    },
    hotspots: [
      {
        id: "erv",
        x: 78,
        y: 75,
        label: "Decentralized ERV Core",
        category: "ENTHALPY RECOVERY",
        detail: "Counter-flow core recovering 84% sensible and latent heat before fresh air introduction.",
        metric: "84% Enthalpy Gain",
      },
      {
        id: "damper",
        x: 48,
        y: 35,
        label: "Active Modulating Damper",
        category: "ZONE BALANCING",
        detail: "Precision stepless servo balancing airflow room-by-room in real time.",
        metric: "±0.2°F Room Delta",
      },
      {
        id: "plenum",
        x: 25,
        y: 50,
        label: "Insulated Return Plenum",
        category: "ACOUSTIC ATTENUATION",
        detail: "Double-walled acoustic return duct preventing air suction turbulence.",
        metric: "18 dBA Whisper Floor",
      },
    ],
  },
  {
    id: "tribeca",
    tag: "PROJECT 03 / URBAN RESIDENCE",
    name: "The Tribeca Acoustic Studio",
    location: "Tribeca, New York City",
    elevation: "Historic Cast-Iron • Audiophile Sound Spec",
    sqft: "6,800 Sq Ft",
    heroImage: "/introduction/card_02_acoustic.jpg",
    challenge:
      "Demanding audiophile sound studio requiring NC-15 sound floor (<18 dBA) with zero structural vibration transmitted through centuries-old timber joists.",
    solution:
      "Suspended spring-isolated mechanical air handlers, custom micro-perforated acoustic silencers, and laminar velocity reduction chambers.",
    telemetry: {
      temp: "70.5°F",
      sound: "16.2 dBA",
      humidity: "46%",
      cfm: "1,100 CFM",
      purity: "99.95%",
      cop: "4.70 COP",
    },
    hotspots: [
      {
        id: "springs",
        x: 35,
        y: 65,
        label: "Spring Vibration Isolators",
        category: "STRUCTURAL DECOUPLING",
        detail: "Dual-durometer neoprene and coiled spring suspension decouples mechanical motor vibrations.",
        metric: "98% Vibration Damp",
      },
      {
        id: "slats",
        x: 62,
        y: 40,
        label: "Acoustic Oak Resonators",
        category: "INTERIOR ARCHITECTURE",
        detail: "Concealed return air paths disguised seamlessly behind vertical acoustic timber wall fins.",
        metric: "Zero Visible Grilles",
      },
      {
        id: "merv",
        x: 80,
        y: 70,
        label: "Hospital Bio-Defense Filter",
        category: "INDOOR PURITY",
        detail: "MERV 16 surgical-grade particulate matrix capturing soot, pollen, and aerosols.",
        metric: "99.97% < 0.3 Microns",
      },
    ],
  },
  {
    id: "zen",
    tag: "PROJECT 04 / MINIMALIST COMPOUND",
    name: "The Kyoto Geometric Sanctuary",
    location: "Kyoto / North Pacific",
    elevation: "Temperate Forest • Strict Minimalist Envelope",
    sqft: "8,500 Sq Ft",
    heroImage: "/introduction/card_05_airflow.jpg",
    challenge:
      "Monolithic exposed architectural concrete surfaces where no visible grilles, ducts, or access hatches were permitted by the lead architect.",
    solution:
      "Shadow-gap air induction hidden along concrete ceiling expansion reveals, delivering complete air changes every 14 minutes invisibly.",
    telemetry: {
      temp: "71.0°F",
      sound: "17.0 dBA",
      humidity: "50%",
      cfm: "1,350 CFM",
      purity: "99.99%",
      cop: "4.95 COP",
    },
    hotspots: [
      {
        id: "gap",
        x: 45,
        y: 20,
        label: "Shadow-Gap Ceiling Reveal",
        category: "INVISIBLE SUPPLY",
        detail: "10mm negative reveal in architectural cast concrete doubling as high-velocity air delivery.",
        metric: "10mm Negative Reveal",
      },
      {
        id: "thermal",
        x: 30,
        y: 75,
        label: "Thermal Mass Storage",
        category: "PASSIVE RADIANT",
        detail: "Concrete slab acting as a thermal flywheel, storing daytime cool and nighttime warmth.",
        metric: "6-Hour Thermal Lag",
      },
      {
        id: "mesh",
        x: 75,
        y: 55,
        label: "Encrypted BACnet / IoT Gateway",
        category: "AUTOMATION",
        detail: "Low-latency wireless mesh controller syncing with custom Lutron and Crestron interfaces.",
        metric: "Sub-Second Latency",
      },
    ],
  },
];

type ScenarioType = "arctic" | "solstice" | "whisper" | "biopurge";

export default function ArchitecturalLivingLab() {
  const [activeEstate, setActiveEstate] = useState<EstateProject>(ESTATES[0]);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(ESTATES[0].hotspots[0]);
  const [xrayMode, setXrayMode] = useState<boolean>(false);
  const [activeScenario, setActiveScenario] = useState<ScenarioType>("whisper");

  const containerRef = useRef<HTMLDivElement>(null);
  const audioCanvasRef = useRef<HTMLCanvasElement>(null);

  // Sync default hotspot when estate switches
  const handleSelectEstate = (estate: EstateProject) => {
    setActiveEstate(estate);
    setSelectedHotspot(estate.hotspots[0]);
  };

  // Real-time Audio Spectrum Visualizer (Demonstrating inaudible 16-18 dBA sound floor)
  useEffect(() => {
    const canvas = audioCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 300);
      const height = (canvas.height = 42);

      ctx.clearRect(0, 0, width, height);

      // Bars visualization comparing conventional vs AeroClimate
      const bars = 28;
      const barWidth = 4;
      const spacing = (width - bars * barWidth) / (bars - 1);

      for (let i = 0; i < bars; i++) {
        // AeroClimate whisper quiet bars (extremely low amplitude)
        const baseH =
          activeScenario === "whisper"
            ? Math.sin(i * 0.4 + step) * 2 + 3
            : activeScenario === "biopurge"
            ? Math.sin(i * 0.6 + step) * 4 + 7
            : Math.sin(i * 0.5 + step) * 3 + 5;

        const x = i * (barWidth + spacing);
        const y = height - Math.max(2, baseH);

        // Gradient styling
        const grad = ctx.createLinearGradient(0, y, 0, height);
        grad.addColorStop(0, "#38bdf8");
        grad.addColorStop(1, "#10b981");

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, Math.max(2, baseH));
      }

      step += 0.05;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeScenario]);

  return (
    <section
      id="living-lab"
      ref={containerRef}
      className="relative w-full py-28 sm:py-36 bg-[#040507] text-white overflow-hidden border-t border-white/[0.08]"
    >
      {/* Background Radial Ambiance */}
      <div className="pointer-events-none absolute -top-40 left-1/3 w-[700px] h-[700px] rounded-full blur-[160px] opacity-20 bg-sky-500/30" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 w-[650px] h-[650px] rounded-full blur-[160px] opacity-15 bg-amber-500/25" />

      {/* Subtle CAD Grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono tracking-widest uppercase text-zinc-300 mb-4 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
              <span>Section 03 — Architectural Living Lab</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-emerald-400 font-bold">LIVE DIGITAL TWIN</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              Estate Climate{" "}
              <span className="bg-gradient-to-r from-amber-200 via-orange-400 to-sky-300 bg-clip-text text-transparent">
                Simulations.
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
              Explore how invisible climate architecture adapts inside four real luxury estates.
              Toggle X-Ray structural view, trigger environmental extremes, and inspect concealed
              mechanical details.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            <div className="px-4 py-2 rounded-xl bg-black/60 border border-white/[0.06]">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">ACTIVE ESTATE</span>
              <span className="text-sm font-mono font-bold text-white truncate max-w-[140px] block">
                {activeEstate.name}
              </span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-black/60 border border-white/[0.06]">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">ACOUSTIC PROFILE</span>
              <span className="text-sm font-mono font-bold text-emerald-400 block">
                {activeEstate.telemetry.sound}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Estate Selection Dock */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
          {ESTATES.map((estate) => {
            const isSelected = activeEstate.id === estate.id;
            return (
              <button
                key={estate.id}
                onClick={() => handleSelectEstate(estate)}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? "bg-white/[0.08] border-amber-400/60 shadow-xl shadow-amber-400/10"
                    : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.15]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-mono tracking-widest uppercase ${
                      isSelected ? "text-amber-400 font-bold" : "text-zinc-500"
                    }`}
                  >
                    {estate.tag.split(" / ")[0]}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">{estate.sqft}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold uppercase text-white tracking-tight truncate">
                  {estate.name}
                </h3>
                <span className="text-[11px] text-zinc-400 block mt-0.5 truncate">{estate.location}</span>
              </button>
            );
          })}
        </div>

        {/* Master Simulation Stage (Split Visual View & Telemetry HUD) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 Cols): Interactive Estate Visual & X-Ray Blueprint */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-[16/10] sm:aspect-[16/10] bg-[#06080d] rounded-3xl overflow-hidden border border-white/[0.12] shadow-2xl group select-none">
              {/* Architectural Image */}
              <Image
                src={activeEstate.heroImage}
                alt={activeEstate.name}
                fill
                priority
                className={`object-cover transition-all duration-700 ${
                  xrayMode ? "filter saturate-50 contrast-125 brightness-50" : "group-hover:scale-[1.02]"
                }`}
              />

              {/* X-Ray Mechanical Layer Overlay (Animated SVG Airflow & Duct Network) */}
              {xrayMode && (
                <div className="absolute inset-0 z-10 pointer-events-none bg-[#030712]/70 backdrop-blur-[2px] transition-all duration-500">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="coolFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
                      </linearGradient>
                      <linearGradient id="warmFlow" x1="0%" y1="100%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>

                    {/* Animated Floor Radiant Coils */}
                    <path
                      d="M 120 420 Q 240 400 360 420 T 600 420 T 840 420 T 1080 420"
                      fill="none"
                      stroke="url(#warmFlow)"
                      strokeWidth="3"
                      strokeDasharray="6 6"
                      className="animate-pulse opacity-80"
                    />

                    {/* Ceiling Flush Diffuser Airflow Vectors */}
                    <path
                      d="M 200 120 C 350 180, 500 160, 650 120 S 950 160, 1100 120"
                      fill="none"
                      stroke="url(#coolFlow)"
                      strokeWidth="2.5"
                      strokeDasharray="8 4"
                      className="opacity-75"
                    />

                    {/* Acoustic Vibration Springs in Mechanical Corner */}
                    <circle cx="140" cy="380" r="16" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
                    <circle cx="140" cy="380" r="6" fill="#10b981" />
                  </svg>

                  {/* Watermark Tag */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/80 border border-cyan-400/30 text-[11px] font-mono text-cyan-300">
                    INVISIBLE MECHANICAL X-RAY • CONCEALED TRUNKS & RISERS
                  </div>
                </div>
              )}

              {/* Interactive Reticle Hotspots on the Architectural Photograph */}
              {activeEstate.hotspots.map((h) => {
                const isSelected = selectedHotspot?.id === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => setSelectedHotspot(h)}
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "w-10 h-10 rounded-full bg-white text-black shadow-xl scale-125 ring-4 ring-amber-400/50"
                        : "w-8 h-8 rounded-full bg-black/80 text-white border border-white/50 hover:border-white hover:scale-110 shadow-lg backdrop-blur-md"
                    }`}
                    title={h.label}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span className="sr-only">{h.label}</span>
                  </button>
                );
              })}

              {/* Bottom HUD Bar on Visual Preview */}
              <div className="absolute bottom-0 inset-x-0 z-20 p-4 sm:p-5 bg-gradient-to-t from-black/95 via-black/80 to-transparent border-t border-white/[0.08] flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-white">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-bold">{activeEstate.location}</span>
                  </div>
                  <span className="text-zinc-600 hidden sm:inline">•</span>
                  <span className="text-xs text-zinc-400 hidden sm:inline font-mono">
                    {activeEstate.elevation}
                  </span>
                </div>

                {/* X-Ray Mode Toggle Button */}
                <button
                  onClick={() => setXrayMode(!xrayMode)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    xrayMode
                      ? "bg-cyan-400 text-black font-bold shadow-lg shadow-cyan-400/30"
                      : "bg-white/[0.06] text-zinc-300 hover:text-white border border-white/[0.12] hover:bg-white/[0.12]"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{xrayMode ? "Finish View" : "X-Ray Mode"}</span>
                </button>
              </div>
            </div>

            {/* Selected Hotspot Inspection Drawer */}
            {selectedHotspot && (
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                      {selectedHotspot.category}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-xs font-mono text-zinc-300">{selectedHotspot.label}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light">{selectedHotspot.detail}</p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] shrink-0">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">METRIC</span>
                  <span className="text-sm font-mono font-bold text-white block">
                    {selectedHotspot.metric}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (4 Cols): Climate Scenario Simulator & Live Telemetry */}
          <div className="lg:col-span-4 space-y-5">
            {/* Live Climate Scenario Controls */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl shadow-xl space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-400" />
                    <span>SCENARIO CALIBRATOR</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">ACTIVE</span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                  Test Living Conditions
                </h3>
              </div>

              {/* 4 Scenario Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "arctic", label: "Arctic -10°F", icon: Snowflake, color: "text-sky-400" },
                  { id: "solstice", label: "Peak Sun 102°F", icon: Flame, color: "text-orange-400" },
                  { id: "whisper", label: "Night Sleep", icon: VolumeX, color: "text-emerald-400" },
                  { id: "biopurge", label: "Bio Air Purge", icon: Wind, color: "text-cyan-400" },
                ].map((s) => {
                  const Icon = s.icon;
                  const isActive = activeScenario === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveScenario(s.id as ScenarioType)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        isActive
                          ? "bg-white text-black font-semibold shadow-md"
                          : "bg-white/[0.03] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-black" : s.color}`} />
                      <span className="text-xs font-mono uppercase tracking-wider">{s.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Live Telemetry Matrix */}
              <div className="space-y-3 pt-3 border-t border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">Interior Temperature</span>
                  <span className="text-sm font-mono font-bold text-white">
                    {activeScenario === "whisper"
                      ? "68.0°F (Sleep Mode)"
                      : activeScenario === "arctic"
                      ? "72.0°F (Radiant Heat)"
                      : activeScenario === "solstice"
                      ? "69.0°F (Deep Chill)"
                      : "71.0°F (Purged)"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">Sound Attenuation</span>
                  <span className="text-sm font-mono font-bold text-emerald-400">
                    {activeScenario === "whisper" ? "16.2 dBA (Inaudible)" : "18.0 dBA (Whisper)"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">Air Delivery Volume</span>
                  <span className="text-sm font-mono font-bold text-sky-400">
                    {activeScenario === "biopurge" ? "1,850 CFM (High Purge)" : activeEstate.telemetry.cfm}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">Relative Humidity</span>
                  <span className="text-sm font-mono font-bold text-zinc-200">
                    {activeEstate.telemetry.humidity} (Preservation Balance)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">Airborne Particulate Capture</span>
                  <span className="text-sm font-mono font-bold text-purple-400">
                    {"MERV 16 (99.97% < 0.3µm)"}
                  </span>
                </div>
              </div>

              {/* Real-Time Acoustic Noise Spectrum Visualizer */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ACOUSTIC SPECTRUM</span>
                  </span>
                  <span className="text-emerald-400 font-bold">16.2 dBA FLOOR</span>
                </div>
                <div className="w-full h-10 flex items-center justify-center">
                  <canvas ref={audioCanvasRef} className="w-full h-full block" />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>20 Hz</span>
                  <span>AeroSilence Chamber</span>
                  <span>20,000 Hz</span>
                </div>
              </div>
            </div>

            {/* Architectural Challenge & Solution Dossier */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block font-semibold">
                ARCHITECTURAL SOLUTION SUMMARY
              </span>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                <strong className="text-white font-medium">Challenge: </strong>
                {activeEstate.challenge}
              </p>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                <strong className="text-emerald-400 font-medium">Engineered Result: </strong>
                {activeEstate.solution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
