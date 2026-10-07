"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Cpu,
  Wind,
  Flame,
  ShieldCheck,
  Activity,
  Layers,
  Radio,
  Zap,
  Sliders,
  CheckCircle2,
  ArrowUpRight,
  Waves,
  Eye,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type LayerMode = "all" | "airflow" | "radiant" | "acoustic";

interface Pillar {
  id: string;
  tag: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  desc: string;
  primaryMetric: string;
  primaryLabel: string;
  secondaryMetric: string;
  secondaryLabel: string;
  specs: string[];
  x: number; // percentage on schematic
  y: number;
  glowColor: string;
  accentClass: string;
  icon: React.ElementType;
}

const PILLARS: Pillar[] = [
  {
    id: "precision",
    number: "01",
    tag: "01 / AERODYNAMICS",
    category: "CFD DUCT ARCHITECTURE",
    title: "PRECISION",
    subtitle: "Aerodynamic CFD Duct Architecture",
    desc: "Computational Fluid Dynamics modeled plenum transitions eliminate static turbulence and air backpressure, ensuring laminar delivery through concealed structural trunks.",
    primaryMetric: "0.02 in.",
    primaryLabel: "w.g. Static Pressure Loss",
    secondaryMetric: "1,250",
    secondaryLabel: "CFM Zero-Draft Induction",
    specs: [
      "Laser-welded galvanized spiral ductwork",
      "Aero-acoustic internal composite lining",
      "Mastic class-1 sealed joints (< 0.8% leakage)",
    ],
    x: 28,
    y: 38,
    glowColor: "rgba(56, 189, 248, 0.5)",
    accentClass: "text-sky-400 border-sky-400/30 bg-sky-400/10",
    icon: Wind,
  },
  {
    id: "balance",
    number: "02",
    tag: "02 / FLUID DYNAMICS",
    category: "MULTI-ZONE EQUILIBRIUM",
    title: "BALANCE",
    subtitle: "Laminar Airflow Equilibrium",
    desc: "Active motorized modulating dampers calibrate air volume room-by-room in real time, preventing thermal stratification between double-height ceilings and ground floors.",
    primaryMetric: "±0.2°F",
    primaryLabel: "Room-to-Room Delta",
    secondaryMetric: "16 Zones",
    secondaryLabel: "Independent Micro-Sensors",
    specs: [
      "Brushless servo-driven dampers (0-100% stepless)",
      "Dynamic volumetric balancing algorithm",
      "Dedicated dual-return air plenum manifolds",
    ],
    x: 72,
    y: 32,
    glowColor: "rgba(16, 185, 129, 0.5)",
    accentClass: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    icon: Sliders,
  },
  {
    id: "control",
    number: "03",
    tag: "03 / INTELLIGENCE",
    category: "NEURAL CLIMATE CORE",
    title: "CONTROL",
    subtitle: "Multi-Zone Neural Inverter Core",
    desc: "Sensors mounted at breathing level across every living quarter calculate solar angle, envelope load, and occupant count to modulate refrigerant velocity predictively.",
    primaryMetric: "10-100%",
    primaryLabel: "Continuous Variable Modulation",
    secondaryMetric: "< 10ms",
    secondaryLabel: "Telemetry Response Time",
    specs: [
      "Low-latency decentralized wireless mesh",
      "Solar trajectory thermal compensation",
      "Automated economizer fresh-air integration",
    ],
    x: 50,
    y: 58,
    glowColor: "rgba(245, 158, 11, 0.5)",
    accentClass: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    icon: Cpu,
  },
  {
    id: "efficiency",
    number: "04",
    tag: "04 / THERMODYNAMICS",
    category: "HYPER-INVERTER DRIVE",
    title: "EFFICIENCY",
    subtitle: "Inverter Heat Pump Thermodynamics",
    desc: "Twin-rotary neodymium inverter compressors extract ambient thermal energy even at -22°F outdoor chill, delivering 380% thermodynamic efficiency versus traditional boilers.",
    primaryMetric: "22.5",
    primaryLabel: "SEER2 / COP 4.85 Rating",
    secondaryMetric: "-22°F",
    secondaryLabel: "Cold-Climate Operation Floor",
    specs: [
      "Flash-injection vapor refrigerant cycle",
      "ECM permanent-magnet variable compressor",
      "Zero on-site greenhouse combustion",
    ],
    x: 20,
    y: 74,
    glowColor: "rgba(234, 88, 12, 0.5)",
    accentClass: "text-orange-400 border-orange-400/30 bg-orange-400/10",
    icon: Zap,
  },
  {
    id: "reliability",
    number: "05",
    tag: "05 / LONGEVITY",
    category: "COMMERCIAL-GRADE ENDURANCE",
    title: "RELIABILITY",
    subtitle: "Vibration-Isolated Architecture",
    desc: "Heavy-gauge acoustically floating mechanical cabinets, anti-corrosive gold-fin heat exchangers, and dual-sprung magnetic dampers engineered for 25+ years of silent operation.",
    primaryMetric: "18 dBA",
    primaryLabel: "Operating Acoustic Floor",
    secondaryMetric: "25+ Yrs",
    secondaryLabel: "Design Engineering Lifespan",
    specs: [
      "Dual neoprene sprung vibration isolators",
      "Marine-grade architectural aluminum chassis",
      "Continuous predictive bearing vibration analysis",
    ],
    x: 80,
    y: 76,
    glowColor: "rgba(168, 85, 247, 0.5)",
    accentClass: "text-purple-400 border-purple-400/30 bg-purple-400/10",
    icon: ShieldCheck,
  },
];

export default function EngineeringSection() {
  const [activePillar, setActivePillar] = useState<Pillar>(PILLARS[0]);
  const [layerMode, setLayerMode] = useState<LayerMode>("all");
  const [isScanning, setIsScanning] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const waveformCanvasRef = useRef<HTMLCanvasElement>(null);

  // GSAP ScrollTrigger Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (stageRef.current) {
        gsap.from(stageRef.current, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Live Acoustic Soundwave Canvas Visualizer (18 dBA whisper oscillation)
  useEffect(() => {
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 240);
      const height = (canvas.height = 48);

      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Sine wave simulation for acoustic dampening
      ctx.beginPath();
      ctx.lineWidth = 1.8;
      ctx.strokeStyle =
        activePillar.id === "reliability"
          ? "#a855f7"
          : activePillar.id === "balance"
          ? "#10b981"
          : activePillar.id === "efficiency"
          ? "#f97316"
          : "#38bdf8";

      for (let x = 0; x < width; x++) {
        // Amplitude is very low (whisper quiet at 18 dBA)
        const amplitude =
          activePillar.id === "reliability" ? 4 : activePillar.id === "precision" ? 7 : 5;
        const freq = 0.04;
        const envelope = Math.sin((x / width) * Math.PI); // Taper edges
        const y = height / 2 + Math.sin(x * freq + phase) * amplitude * envelope;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += 0.04;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [activePillar]);

  return (
    <section
      id="engineering"
      ref={containerRef}
      className="relative w-full py-28 sm:py-36 bg-[#040507] text-white overflow-hidden border-t border-white/[0.08]"
    >
      {/* Dynamic Ambient Background Glows */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full blur-[160px] opacity-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${activePillar.glowColor} 0%, transparent 70%)`,
        }}
      />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-15 bg-sky-500/30" />

      {/* Engineering Precision Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-4xl mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono tracking-widest uppercase text-zinc-300 mb-5">
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Section 03 — Thermodynamic Blueprint</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-emerald-400 font-bold">CFD ACTIVE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
            The Five Pillars of{" "}
            <span className="bg-gradient-to-r from-amber-200 via-orange-400 to-sky-400 bg-clip-text text-transparent">
              Thermal Mastery.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-zinc-400 leading-relaxed font-light max-w-3xl">
            Every cubic foot of air inside the residence is mathematically engineered. Discover how
            precision aerodynamics, variable-speed thermodynamics, and micro-zone sensors achieve
            flawless equilibrium.
          </p>

          {/* Interactive Diagnostic Filter Dock */}
          <div className="mt-8 flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mr-2 hidden sm:inline">
              TELEMETRY LAYER:
            </span>
            {(
              [
                { id: "all", label: "00 / ALL SYSTEMS", icon: Layers },
                { id: "airflow", label: "01 / CFD AIRFLOW", icon: Wind },
                { id: "radiant", label: "02 / HYDRONIC MATRIX", icon: Flame },
                { id: "acoustic", label: "03 / ACOUSTIC DAMPING", icon: Waves },
              ] as const
            ).map((layer) => {
              const Icon = layer.icon;
              const isActive = layerMode === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => setLayerMode(layer.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                      : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{layer.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Central Master Stage: Schematic HUD + Telemetry Engine */}
        <div ref={stageRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center Column (7 Cols): Interactive Holographic Schematic */}
          <div className="lg:col-span-7 relative flex flex-col">
            <div className="relative aspect-[16/10] sm:aspect-[16/10] bg-[#06080d] rounded-2xl border border-white/[0.12] overflow-hidden shadow-2xl group">
              {/* Top Telemetry Header Bar */}
              <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-[#040507]/90 to-transparent border-b border-white/[0.06] backdrop-blur-sm">
                <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-white font-bold">SCHEMATIC HUD</span>
                  <span className="text-zinc-600">|</span>
                  <span>ISO 1250-CFM CUTAWAY</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="text-zinc-400">FOCUS:</span>
                  <span className="text-amber-400 font-bold uppercase">{activePillar.title}</span>
                  <button
                    onClick={() => setIsScanning(!isScanning)}
                    className="p-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
                    title="Toggle Telemetry Scanline"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Central Cutaway Image with Atmospheric Layer Tones */}
              <div className="relative w-full h-full p-4 sm:p-6 flex items-center justify-center">
                <Image
                  src="/clean_unsharp_qhd.jpg"
                  alt="Engineering System Cross Section"
                  fill
                  priority
                  className={`object-contain p-2 sm:p-4 transition-all duration-700 ${
                    layerMode === "airflow"
                      ? "hue-rotate-180 brightness-110 contrast-125"
                      : layerMode === "radiant"
                      ? "hue-rotate-300 saturate-150"
                      : layerMode === "acoustic"
                      ? "brightness-90 contrast-110"
                      : "contrast-105"
                  } group-hover:scale-[1.02]`}
                />

                {/* Animated HUD Scanline */}
                {isScanning && (
                  <div className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scanline border-b border-cyan-400/30" />
                )}

                {/* Dynamic SVG Energy Flow Circulation Lines */}
                <svg
                  className="pointer-events-none absolute inset-0 w-full h-full z-20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Connecting Guideline between Central Hub and Active Node */}
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`${activePillar.x}%`}
                    y2={`${activePillar.y}%`}
                    stroke="url(#flowGradient)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="opacity-70"
                  />

                  {/* Pulsating target circle on active node */}
                  <circle
                    cx={`${activePillar.x}%`}
                    cy={`${activePillar.y}%`}
                    r="24"
                    fill="none"
                    stroke={activePillar.id === "control" ? "#f59e0b" : "#38bdf8"}
                    strokeWidth="1.2"
                    className="animate-ping opacity-60"
                  />
                  <circle
                    cx={`${activePillar.x}%`}
                    cy={`${activePillar.y}%`}
                    r="12"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                </svg>

                {/* Interactive Target Nodes on the Architectural Model */}
                {PILLARS.map((pillar) => {
                  const isSelected = activePillar.id === pillar.id;
                  const Icon = pillar.icon;
                  return (
                    <button
                      key={pillar.id}
                      onClick={() => setActivePillar(pillar)}
                      style={{ left: `${pillar.x}%`, top: `${pillar.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "w-11 h-11 rounded-full bg-white text-black shadow-xl scale-110 ring-4 ring-amber-400/40"
                          : "w-8 h-8 rounded-full bg-[#0a0d14]/90 text-white border border-white/40 hover:border-white hover:scale-110 shadow-md backdrop-blur-md"
                      }`}
                      title={pillar.title}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? "text-black" : "text-zinc-300"}`} />
                      <span className="sr-only">{pillar.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom HUD Status Bar */}
              <div className="absolute bottom-0 inset-x-0 z-30 flex items-center justify-between px-4 py-3 bg-gradient-to-t from-[#040507]/95 via-[#040507]/80 to-transparent border-t border-white/[0.06] backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1 rounded bg-white/[0.06] border border-white/[0.1] text-[10px] font-mono text-zinc-300">
                    NODE: {activePillar.tag}
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                    <span>CALIBRATED STEADY STATE</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
                  <span>COORD:</span>
                  <span className="text-white font-bold">
                    [{activePillar.x}.0, {activePillar.y}.0]
                  </span>
                </div>
              </div>
            </div>

            {/* Quick-Select Pillar Pills below Schematic */}
            <div className="mt-4 grid grid-cols-5 gap-2">
              {PILLARS.map((pillar) => {
                const isSelected = activePillar.id === pillar.id;
                const Icon = pillar.icon;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActivePillar(pillar)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white/[0.08] border-amber-400/60 shadow-lg shadow-amber-400/10 text-white"
                        : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 mb-1 ${
                        isSelected ? "text-amber-400" : "text-zinc-500"
                      }`}
                    />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider truncate w-full">
                      {pillar.title}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500 hidden sm:inline">
                      {pillar.number}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column (5 Cols): Real-time Telemetry & Detailed Engineering Dossier */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            {/* Primary Specification Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.1] backdrop-blur-xl shadow-2xl relative overflow-hidden">
              {/* Subtle Corner Accent Glow */}
              <div
                className="pointer-events-none absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20"
                style={{ background: activePillar.glowColor }}
              />

              {/* Node Identification Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold tracking-wider uppercase bg-white/[0.06] border border-white/[0.1] text-amber-400">
                    PILLAR {activePillar.number}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    {activePillar.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mt-5 space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white leading-tight">
                  {activePillar.subtitle}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-light">
                  {activePillar.desc}
                </p>
              </div>

              {/* Dual Telemetry Dials / Metrics */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {/* Metric A */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight block">
                    {activePillar.primaryMetric}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 mt-1 block">
                    {activePillar.primaryLabel}
                  </span>
                </div>

                {/* Metric B */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-amber-400 tracking-tight block">
                    {activePillar.secondaryMetric}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 mt-1 block">
                    {activePillar.secondaryLabel}
                  </span>
                </div>
              </div>

              {/* Live Waveform Visualizer for Acoustic Equilibrium */}
              <div className="mt-5 p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 uppercase">
                    <Waves className="w-3.5 h-3.5 text-sky-400" />
                    <span>Acoustic Frequency Monitor</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">18.0 dBA FLOOR</span>
                </div>
                <div className="w-full h-12 flex items-center justify-center">
                  <canvas ref={waveformCanvasRef} className="w-full h-full block" />
                </div>
              </div>

              {/* Architectural Design Verification Checklist */}
              <div className="mt-6 space-y-2.5 pt-5 border-t border-white/[0.08]">
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block font-semibold">
                  Engineering Verification Standards:
                </span>
                {activePillar.specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Live Integration Stat Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-white block">
                    ARCHITECTURAL HVAC INTEGRATION
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    Zero exposed piping • Fully concealed bulkheads
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
