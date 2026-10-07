"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Wrench,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Service {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
}

const SERVICES: Service[] = [
  {
    id: "install",
    number: "01",
    title: "HVAC INSTALLATION",
    category: "ARCHITECTURAL INTEGRATION",
    tagline: "Precision built into the structural envelope.",
    description:
      "Full turnkey mechanical installation for modern residential and luxury villas. We coordinate directly with architects and general contractors to embed concealed spiral and rectangular ducting seamlessly into architectural bulkheads.",
    specs: [
      { label: "Duct Tightness", value: "Class 1 Air Barrier (<1% Loss)" },
      { label: "Vibration Mounts", value: "Acoustic Springs (18 dBA)" },
      { label: "Warranty", value: "10-Year Labor & Parts" },
    ],
    image: "/introduction/card_01_villa.jpg",
  },
  {
    id: "heat-pump",
    number: "02",
    title: "HEATING & COOLING",
    category: "DUAL-CIRCUIT HEAT PUMPS",
    tagline: "Sub-zero heating meets high-capacity summer cooling.",
    description:
      "Cold-climate inverter heat pumps delivering full thermal output down to -22°F outdoor ambient without auxiliary electric resistance strip heating. Continuous variable-speed modulation eliminates sudden indoor temperature swings.",
    specs: [
      { label: "Heating Range", value: "-22°F to +70°F" },
      { label: "Cooling Range", value: "Up to 115°F Ambient" },
      { label: "HSPF2 / SEER2", value: "11.8 / 22.5 Rating" },
    ],
    image: "/introduction/card_03_machine.jpg",
  },
  {
    id: "radiant",
    number: "03",
    title: "HYDRONIC RADIANT FLOORS",
    category: "IN-SLAB COMFORT",
    tagline: "Gentle upward radiant warmth beneath your feet.",
    description:
      "Cross-linked PEX in-slab hydronic tubing embedded in polished concrete or subfloor screed. Warms people and surfaces directly with zero air draft, zero dust circulation, and unmatched thermal retention throughout winter.",
    specs: [
      { label: "Operating Temp", value: "85°F - 110°F Low Temp" },
      { label: "Zoning", value: "Room-by-Room Actuators" },
      { label: "Efficiency Gain", value: "30% vs Forced Air" },
    ],
    image: "/introduction/card_04_radiant.jpg",
  },
  {
    id: "ventilation",
    number: "04",
    title: "VENTILATION & ERV",
    category: "INDOOR AIR QUALITY",
    tagline: "Continuous balanced fresh air exchange.",
    description:
      "Energy Recovery Ventilators (ERV) exhausting stale, humid air from kitchens and baths while drawing in fresh outdoor air. Counter-flow enthalpy cores recover up to 85% of sensible and latent energy before fresh air enters.",
    specs: [
      { label: "Thermal Recovery", value: "84.5% Enthalpy Efficiency" },
      { label: "Filtration", value: "MERV 16 + Active Carbon" },
      { label: "Static Sound", value: "< 0.8 Sones Silent Core" },
    ],
    image: "/introduction/card_05_airflow.jpg",
  },
  {
    id: "smart-control",
    number: "05",
    title: "SMART CLIMATE AUTOMATION",
    category: "NEURAL ZONING",
    tagline: "Predictive micro-climate sensors in every zone.",
    description:
      "Multi-point wireless room telemetry calculating mean radiant temperature, solar trajectory, and occupancy. Seamlessly integrates with Control4, Crestron, Lutron, and Apple HomeKit for effortless environmental control.",
    specs: [
      { label: "Sampling Rate", value: "10-Second Telemetry Interval" },
      { label: "Integrations", value: "Crestron / BACnet / HomeKit" },
      { label: "Savings", value: "Up to 34% Lower Energy Use" },
    ],
    image: "/introduction/card_06_equilibrium.jpg",
  },
  {
    id: "maintenance",
    number: "06",
    title: "PREVENTATIVE CARE & ACOUSTICS",
    category: "LIFECYCLE MANAGEMENT",
    tagline: "Proactive telemetry to safeguard continuous peak performance.",
    description:
      "Cloud-connected refrigerant pressure and airflow diagnostics alert our engineering dispatch team before comfort is ever compromised. Includes biannual airflow re-balancing, filter sanitization, and coil optimization.",
    specs: [
      { label: "Response SLA", value: "< 2-Hour Rapid Dispatch" },
      { label: "Telemetry", value: "24/7 Cloud Pressure Monitoring" },
      { label: "Filter Program", value: "Annual Automated Replacements" },
    ],
    image: "/introduction/card_02_acoustic.jpg",
  },
];

export default function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const current = SERVICES[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : SERVICES.length - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < SERVICES.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="services" className="relative w-full py-28 bg-[#040507]/90 text-white overflow-hidden border-t border-white/[0.08]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono tracking-widest uppercase text-zinc-400 mb-4">
              <Wrench className="w-3.5 h-3.5 text-amber-400" />
              <span>Section 06 — Service Offerings</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Architectural Climate Services.
            </h2>
            <p className="mt-3 text-base text-zinc-400 font-light">
              Tailored thermal and air distribution solutions engineered specifically for high-performance residential spaces.
            </p>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400 mr-2">
              {String(activeIdx + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
            </span>
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.15] text-white transition-colors cursor-pointer"
              aria-label="Previous service"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.15] text-white transition-colors cursor-pointer"
              aria-label="Next service"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Tab Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveIdx(i)}
              className={`px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeIdx === i
                  ? "bg-white text-black font-bold shadow-lg shadow-white/10"
                  : "bg-white/[0.03] text-zinc-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {s.number} {s.title}
            </button>
          ))}
        </div>

        {/* Large Pinned Visual Panel */}
        <div className="relative rounded-3xl bg-white/[0.02] border border-white/[0.1] overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
            {/* Left Narrative / Technical Specs */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-amber-400 tracking-widest uppercase">
                    {current.category}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs font-mono text-zinc-400">
                    PHASE {current.number}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
                  {current.title}
                </h3>

                <p className="mt-3 text-lg font-medium text-amber-200">
                  {current.tagline}
                </p>

                <p className="mt-4 text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* Technical Spec Metrics */}
              <div className="mt-8 pt-6 border-t border-white/[0.08]">
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 block mb-3">
                  Technical Parameters:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {current.specs.map((spec, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-zinc-400 block truncate">
                        {spec.label}
                      </span>
                      <span className="text-xs sm:text-sm font-mono font-bold text-white mt-1 block">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Cinematic Visual Preview */}
            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full bg-[#040507] border-t lg:border-t-0 lg:border-l border-white/[0.08] overflow-hidden group">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

              {/* Visual Caption Tag */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/80">
                <span className="px-3 py-1.5 rounded-lg bg-black/75 border border-white/[0.1] backdrop-blur-md">
                  FRAME REFERENCE: {current.number} / 06
                </span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white text-black font-bold uppercase text-[11px] hover:bg-zinc-200 transition-colors"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

