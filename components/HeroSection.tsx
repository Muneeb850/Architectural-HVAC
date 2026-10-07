"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Flame,
  Snowflake,
  Wind,
  Gauge,
  Layers,
  Cpu,
  Eye,
  CheckCircle2,
  X,
} from "lucide-react";

interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  type: "heat" | "cool" | "mechanical" | "control";
  temp?: string;
  flow?: string;
  description: string;
  specs: string[];
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "heat-pump",
    x: 16.5,
    y: 69.5,
    title: "Outdoor Inverter Heat Pump",
    type: "heat",
    temp: "-4°F Ext Ambient",
    flow: "R-410A High Vapor Flow",
    description:
      "Cold-climate inverter compressor extracting thermal energy from sub-zero winter air with advanced flash injection.",
    specs: ["Sub-Zero Performance down to -22°F", "Variable-Speed Inverter Driver", "Ultra-Quiet 48 dBA Acoustic Shroud"],
  },
  {
    id: "upper-heating",
    x: 36.8,
    y: 27.5,
    title: "Zone 1: Master Suite Heating",
    type: "heat",
    temp: "72.4°F Target",
    flow: "320 CFM Warm Supply",
    description:
      "Ceiling register delivering laminar warm airflow waves to maintain consistent warmth across bedroom living quarters.",
    specs: ["Dual-Direction Radiant Deflector", "Micro-zone Temperature Sensor", "Silent Anti-Draught Calibration"],
  },
  {
    id: "lower-heating",
    x: 32.5,
    y: 53.5,
    title: "Zone 2: Main Living Heating",
    type: "heat",
    temp: "71.8°F Target",
    flow: "410 CFM Warm Supply",
    description:
      "Even low-velocity circulation blankets the primary living room, counteracting perimeter heat loss along exterior snowy walls.",
    specs: ["Floor-to-Ceiling Thermal Balance", "Automated Occupancy Detection", "Integrated Floor Return Path"],
  },
  {
    id: "thermostat",
    x: 44.4,
    y: 58.2,
    title: "Smart Central Dual-Zone Thermostat",
    type: "control",
    temp: "Multi-Zone Synchronized",
    flow: "Continuous AI Balancing",
    description:
      "Wall-mounted circular intelligence core monitoring differential pressures, humidity levels, and zone temperatures.",
    specs: ["Wireless Mesh Room Sensors", "Predictive Weather Optimization", "Dual-Setpoint Auto Switchover"],
  },
  {
    id: "upper-cooling",
    x: 61.8,
    y: 27.5,
    title: "Zone 3: Upper Lounge Cooling",
    type: "cool",
    temp: "68.2°F Target",
    flow: "360 CFM Chilled Flow",
    description:
      "High-induction ceiling diffuser disbursing conditioned cool airflow downward across high-solar-gain upstairs rooms.",
    specs: ["High-Induction Swirl Vane Diffuser", "Rapid Humidity Extraction", "UV-C Airborne Sanitization"],
  },
  {
    id: "kitchen-cooling",
    x: 65.2,
    y: 53.5,
    title: "Zone 4: Kitchen & Dining Cooling",
    type: "cool",
    temp: "69.0°F Target",
    flow: "450 CFM Chilled Flow",
    description:
      "Direct cooling compensation counteracting culinary heat gains while keeping dining and patio-facing zones refreshingly cool.",
    specs: ["Dynamic Thermal Load Response", "Multi-Stage Filtration Cycle", "Low-Turbulence Air Distribution"],
  },
  {
    id: "central-handler",
    x: 45.6,
    y: 79.5,
    title: "Basement Air Handler & Variable Furnace",
    type: "mechanical",
    temp: "Central Distribution Core",
    flow: "1,540 CFM Max System Capacity",
    description:
      "Heavy-duty mechanical nerve center combining variable-speed ECM blower, multi-zone dampers, and high-efficiency filtration.",
    specs: ["ECM Variable-Speed Blower", "MERV 16 Medical Filtration Rack", "Insulated Acoustical Acoustic Cabinet"],
  },
  {
    id: "water-heater",
    x: 34.6,
    y: 79.8,
    title: "Hybrid Heat Pump Water Heater",
    type: "mechanical",
    temp: "135°F Domestic Supply",
    flow: "80 Gallon Capacity",
    description:
      "High-recovery storage tank utilizing hydronic heat recovery directly tied into the whole-home mechanical grid.",
    specs: ["3.85 UEF Energy Factor", "Built-in Leak Defense & Shutoff", "Zero Emission Clean Operation"],
  },
];

export default function HeroSection({ hideHeader = true }: { hideHeader?: boolean }) {
  const [activeTab, setActiveTab] = useState<"all" | "heating" | "cooling">("all");
  const [imageStyle, setImageStyle] = useState<"seamless" | "cutout" | "original">("seamless");
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);

  // Selected image asset based on user preference
  const imageSources = {
    seamless: "/hvac-house-seamless.png",
    cutout: "/hvac-house-black.png",
    original: "/hvac-house.jpg",
  };

  const filteredHotspots = HOTSPOTS.filter((h) => {
    if (activeTab === "all") return true;
    if (activeTab === "heating") return h.type === "heat" || h.type === "mechanical" || h.type === "control";
    if (activeTab === "cooling") return h.type === "cool" || h.type === "mechanical" || h.type === "control";
    return true;
  });

  return (
    <section className="relative w-full bg-[#040507] text-white overflow-hidden flex flex-col justify-between selection:bg-orange-500/30 selection:text-orange-200">
      {/* Pure Black Ambient Glow Accents (Left Orange Warmth / Right Ice Blue Cooling) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Left Winter / Heat Orange Glow */}
        <div
          className={`absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full blur-[140px] transition-opacity duration-700 ${
            activeTab === "cooling" ? "opacity-10" : "opacity-35"
          }`}
          style={{ background: "radial-gradient(circle, rgba(234, 88, 12, 0.45) 0%, rgba(0,0,0,0) 70%)" }}
        />
        {/* Right Summer / Cool Blue Glow */}
        <div
          className={`absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full blur-[140px] transition-opacity duration-700 ${
            activeTab === "heating" ? "opacity-10" : "opacity-35"
          }`}
          style={{ background: "radial-gradient(circle, rgba(14, 165, 233, 0.45) 0%, rgba(0,0,0,0) 70%)" }}
        />
        {/* Center Ground Glow */}
        <div
          className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full blur-[160px] opacity-20"
          style={{ background: "radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(0,0,0,0) 70%)" }}
        />
      </div>

      {/* Top Navigation Bar (Hidden when embedded) */}
      {!hideHeader && (
        <header className="relative z-30 w-full border-b border-white/[0.08] bg-[#040507]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.12] shadow-inner overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-sky-500/20" />
              <div className="flex items-center">
                <Flame className="w-4 h-4 text-orange-400 -mr-1" />
                <Snowflake className="w-4 h-4 text-sky-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-lg text-white font-mono">
                  AERO<span className="text-orange-400">|</span>CLIMATE
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.06] text-zinc-300 border border-white/[0.08]">
                  Dual-Zone
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 tracking-wide hidden sm:block">
                Whole-Home Thermal Architecture
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm text-zinc-400">
            <a href="#cross-section" className="text-white hover:text-orange-400 transition-colors font-medium">
              Architectural Cutaway
            </a>
            <a href="#dual-flow" className="hover:text-white transition-colors">
              Zoned Airflow
            </a>
            <a href="#mechanicals" className="hover:text-white transition-colors">
              Basement Core
            </a>
            <a href="#efficiency" className="hover:text-white transition-colors">
              SEER2 Telemetry
            </a>
          </nav>

          {/* Status Badge & Action */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-300">Dual Circuit: Active</span>
            </div>

            <button
              onClick={() => setSelectedHotspot(HOTSPOTS[3])}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 via-amber-500 to-sky-500 text-black text-xs font-semibold hover:opacity-95 transition-opacity shadow-lg shadow-orange-500/10 cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5 text-black" />
              <span>Smart Hub</span>
            </button>
          </div>
        </div>
      </header>
      )}

      {/* Main Hero Header Section */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 text-center flex flex-col items-center">
        {/* Season Indicator Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-white/20 text-xs font-mono text-zinc-100 mb-4 backdrop-blur-md shadow-lg shadow-black/80 font-medium">
          <span className="flex items-center gap-1.5 text-orange-400 font-semibold">
            <Flame className="w-3.5 h-3.5" />
            Winter Heating -4°F
          </span>
          <span className="text-zinc-500">|</span>
          <span className="flex items-center gap-1.5 text-sky-400 font-semibold">
            <Snowflake className="w-3.5 h-3.5" />
            Summer Cooling +89°F
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl leading-[1.15] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
          Simultaneous Climate Control.{" "}
          <span className="bg-gradient-to-r from-orange-400 via-amber-200 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(245,158,11,0.4)]">
            One Whole-Home Architecture.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-4 max-w-2xl text-zinc-100 font-normal text-sm sm:text-base leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
          Full cross-sectional engineering showing multi-level airflow distribution: cold-climate heat pump outdoor extraction on the left, central basement mechanicals below, and precision dual-zone delivery across every room.
        </p>

        {/* View Controls & Mode Selectors */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {/* Active Flow Filter Buttons */}
          <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-white text-black font-semibold shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              All Zones Active
            </button>
            <button
              onClick={() => setActiveTab("heating")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === "heating"
                  ? "bg-orange-500 text-white font-semibold shadow-md shadow-orange-500/20"
                  : "text-zinc-400 hover:text-orange-400"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              Heating Circuit (Left)
            </button>
            <button
              onClick={() => setActiveTab("cooling")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === "cooling"
                  ? "bg-sky-500 text-white font-semibold shadow-md shadow-sky-500/20"
                  : "text-zinc-400 hover:text-sky-400"
              }`}
            >
              <Snowflake className="w-3.5 h-3.5" />
              Cooling Circuit (Right)
            </button>
          </div>

          {/* Hotspot Toggle */}
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
              showHotspots
                ? "bg-white/[0.08] border-white/[0.2] text-white"
                : "bg-transparent border-white/[0.08] text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showHotspots ? "Hotspots Visible" : "Hotspots Hidden"}</span>
          </button>

          {/* Background Display Mode Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            <button
              onClick={() => setImageStyle("seamless")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                imageStyle === "seamless"
                  ? "bg-white/[0.15] text-white border border-white/[0.1]"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Sky removed with feathered pure black #000000 background"
            >
              Seamless Black (#000)
            </button>
            <button
              onClick={() => setImageStyle("cutout")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                imageStyle === "cutout"
                  ? "bg-white/[0.15] text-white border border-white/[0.1]"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Architectural Cutout on pure black"
            >
              Pure Cutout
            </button>
            <button
              onClick={() => setImageStyle("original")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                imageStyle === "original"
                  ? "bg-white/[0.15] text-white border border-white/[0.1]"
                  : "text-zinc-400 hover:text-white"
              }`}
              title="Full Studio Reference Cross-Section"
            >
              Full Reference
            </button>
          </div>
        </div>
      </div>

      {/* Hero Visual: The HVAC Architectural Cutaway House */}
      <div id="cross-section" className="relative z-10 w-full max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 my-auto">
        <div className="relative w-full aspect-[1024/575] bg-[#040507] rounded-2xl overflow-hidden shadow-2xl shadow-black/80 flex items-center justify-center">
          {/* Main Visual Image */}
          <div className="relative w-full h-full">
            <Image
              src={imageSources[imageStyle]}
              alt="Multi-Zone HVAC House Cross Section Cutaway Diagram"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className={`object-contain transition-all duration-500 ${
                activeTab === "heating"
                  ? "brightness-105"
                  : activeTab === "cooling"
                  ? "brightness-105"
                  : ""
              }`}
            />
          </div>

          {/* Dynamic Heating / Cooling Zone Overlays on User Tab Select */}
          {activeTab === "heating" && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-orange-500/[0.12] via-transparent to-black/60 transition-all duration-500" />
          )}
          {activeTab === "cooling" && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-sky-500/[0.12] transition-all duration-500" />
          )}

          {/* Interactive Component Hotspots */}
          {showHotspots &&
            filteredHotspots.map((hotspot) => {
              const isSelected = selectedHotspot?.id === hotspot.id;
              const isHeat = hotspot.type === "heat";
              const isCool = hotspot.type === "cool";
              const isControl = hotspot.type === "control";

              return (
                <div
                  key={hotspot.id}
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                  onClick={() => setSelectedHotspot(isSelected ? null : hotspot)}
                >
                  {/* Ping Animation Rings */}
                  <span
                    className={`absolute -inset-2 rounded-full opacity-60 animate-ping ${
                      isHeat
                        ? "bg-orange-500"
                        : isCool
                        ? "bg-sky-500"
                        : isControl
                        ? "bg-emerald-500"
                        : "bg-amber-400"
                    }`}
                  />

                  {/* Marker Pin Icon */}
                  <button
                    aria-label={hotspot.title}
                    className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-125 ${
                      isSelected
                        ? "scale-125 ring-2 ring-white"
                        : ""
                    } ${
                      isHeat
                        ? "bg-orange-950/80 border-orange-400 text-orange-400 shadow-orange-500/30"
                        : isCool
                        ? "bg-sky-950/80 border-sky-400 text-sky-400 shadow-sky-500/30"
                        : isControl
                        ? "bg-emerald-950/80 border-emerald-400 text-emerald-400 shadow-emerald-500/30"
                        : "bg-zinc-900/90 border-amber-300 text-amber-300 shadow-amber-500/20"
                    }`}
                  >
                    {isHeat ? (
                      <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
                    ) : isCool ? (
                      <Snowflake className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
                    ) : isControl ? (
                      <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    ) : (
                      <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    )}
                  </button>

                  {/* Hover Tooltip (Quick Title) */}
                  <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] px-2.5 py-1 rounded bg-[#040507]/95 border border-white/[0.15] text-[11px] font-medium text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-30">
                    <span className="block truncate">{hotspot.title}</span>
                    {hotspot.temp && (
                      <span className="text-[10px] text-zinc-400 font-mono block">
                        {hotspot.temp}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

          {/* Active Hotspot HUD Detail Flyout Modal */}
          {selectedHotspot && (
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-40 bg-[#040507]/95 border border-white/[0.15] backdrop-blur-xl rounded-xl p-4 sm:p-5 shadow-2xl text-left animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`p-1.5 rounded-lg ${
                      selectedHotspot.type === "heat"
                        ? "bg-orange-500/20 text-orange-400"
                        : selectedHotspot.type === "cool"
                        ? "bg-sky-500/20 text-sky-400"
                        : selectedHotspot.type === "control"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {selectedHotspot.type === "heat" ? (
                      <Flame className="w-4 h-4" />
                    ) : selectedHotspot.type === "cool" ? (
                      <Snowflake className="w-4 h-4" />
                    ) : selectedHotspot.type === "control" ? (
                      <Cpu className="w-4 h-4" />
                    ) : (
                      <Wind className="w-4 h-4" />
                    )}
                  </span>
                  <div>
                    <h2 className="text-sm font-bold text-white leading-tight">
                      {selectedHotspot.title}
                    </h2>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {selectedHotspot.temp} • {selectedHotspot.flow}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="text-zinc-400 hover:text-white p-1 rounded-md bg-white/[0.04] text-xs font-mono cursor-pointer flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="mt-3 text-xs text-zinc-300 leading-relaxed">
                {selectedHotspot.description}
              </p>

              {/* Engineering Specs */}
              <div className="mt-3 pt-3 border-t border-white/[0.08] space-y-1.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">
                  System Specifications:
                </span>
                {selectedHotspot.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Live System Telemetry Banner below the Graphic */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl bg-[#040507]/90 border border-white/[0.08] backdrop-blur-md">
          {/* Telemetry 1: Winter Heating Loop */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-orange-500/20 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                Left Zone (Winter)
              </span>
              <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded">
                +72°F Target
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold font-mono text-white">72.4°F</span>
              <span className="text-[11px] text-zinc-500">Ext: -4°F (Snow)</span>
            </div>
            <div className="mt-2 w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-amber-400 h-full w-[94%]" />
            </div>
          </div>

          {/* Telemetry 2: Summer Cooling Loop */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-sky-500/20 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Snowflake className="w-3.5 h-3.5 text-sky-400" />
                Right Zone (Summer)
              </span>
              <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">
                +68°F Target
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold font-mono text-white">68.2°F</span>
              <span className="text-[11px] text-zinc-500">Ext: +89°F (Sunny)</span>
            </div>
            <div className="mt-2 w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-sky-500 to-cyan-400 h-full w-[88%]" />
            </div>
          </div>

          {/* Telemetry 3: Ductwork Airflow CFM */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-zinc-300" />
                Airflow Velocity
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                Laminar
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold font-mono text-white">1,250</span>
              <span className="text-[11px] text-zinc-400 font-mono">CFM Speed</span>
            </div>
            <div className="mt-2 w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full w-[76%]" />
            </div>
          </div>

          {/* Telemetry 4: Efficiency Rating */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-purple-400" />
                SEER2 Rating
              </span>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                Tier A+++
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold font-mono text-white">22.5</span>
              <span className="text-[11px] text-zinc-400 font-mono">SEER2 / 11.8 HSPF2</span>
            </div>
            <div className="mt-2 w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-full w-[95%]" />
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

