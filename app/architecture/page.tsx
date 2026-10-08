"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

interface Pillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stat: string;
  statLabel: string;
  specs: { label: string; value: string }[];
}

const PILLARS: Pillar[] = [
  {
    id: "diffusers",
    number: "01",
    title: "Concealed Linear Diffusers",
    subtitle: "Ceiling Shadow Reveals with Zero-Draft Induction",
    description:
      "Conventional industrial grilles disrupt clean architectural plaster ceilings. AeroClimate integrates continuous 1/2-inch shadow reveals flush with drywall, acoustic wood fins, or curtain wall headers. Air cascades gently across high-glazed envelopes without drafts.",
    image: "/introduction/card_05_airflow.jpg",
    stat: "1,250 CFM",
    statLabel: "Silent Air Delivery",
    specs: [
      { label: "SLOT REVEAL WIDTH", value: "12 mm (0.47 in)" },
      { label: "AIR VELOCITY", value: "< 25 FPM (Zero-Draft)" },
      { label: "GLAZING BALANCE", value: "Triple-Glazed Perimeter" },
      { label: "CEILING INTEGRATION", value: "Flush Plaster & Millwork" },
    ],
  },
  {
    id: "hydronics",
    number: "02",
    title: "Sub-Slab Hydronic Radiant",
    subtitle: "Thermal Mass Storage Embedded Beneath Natural Basalt & Oak",
    description:
      "Cross-linked high-density PEX-a oxygen-barrier loops cast directly into structural floorplates transform the residence itself into a self-regulating thermal battery. Gentle infrared radiance rises naturally, countering cold glass drafts without fan noise.",
    image: "/introduction/card_04_radiant.jpg",
    stat: "74.0°F",
    statLabel: "Slab Equilibrium",
    specs: [
      { label: "NETWORK TOPOLOGY", value: "12 Independent Radiant Zones" },
      { label: "WATER TEMPERATURE", value: "85°F Low-Temp Supply" },
      { label: "THERMAL DRIFT", value: "±0.2°F Room-to-Room" },
      { label: "TUBING LIFETIME", value: "100+ Year PEX-a Oxygen Barrier" },
    ],
  },
  {
    id: "acoustics",
    number: "03",
    title: "Aero-Acoustic Attenuation",
    subtitle: "16.5 dBA Noise Floor Quieter than a Rustling Leaf",
    description:
      "Engineered specifically for audiophile listening rooms, private recording suites, and serene bedrooms. Acoustic spring dampers, tuned Helmholtz resonator silencers, and double-insulated plenum turns eliminate all motor hum and air friction roar.",
    image: "/introduction/card_02_acoustic.jpg",
    stat: "16.5 dBA",
    statLabel: "Operating Sound Floor",
    specs: [
      { label: "SOUND PROFILE", value: "16.5 dBA Certified (NC-15)" },
      { label: "VIBRATION ISOLATION", value: "Neoprene & Steel Spring Mounts" },
      { label: "MOTOR FREQUENCY", value: "Sub-Audible Inverter Waveform" },
      { label: "DECIBEL CUT", value: "-14 dBA Lower than Code Standard" },
    ],
  },
  {
    id: "inverters",
    number: "04",
    title: "Twin-Rotary Inverter Drivetrain",
    subtitle: "Flash Vapor Injection with Continuous 10%–100% Modulation",
    description:
      "Standard staged heat pumps cycle harshly on and off, wasting electricity and generating thermal swings. Our variable-capacity twin-rotary inverter compressors modulate down to 10% load, maintaining effortless thermal balance even at -22°F exterior conditions.",
    image: "/introduction/card_03_machine.jpg",
    stat: "22.5 SEER2",
    statLabel: "Seasonal Efficiency",
    specs: [
      { label: "MODULATION RATIO", value: "10% to 100% Microsecond Dynamic" },
      { label: "COLD-CLIMATE FLOOR", value: "-22°F Operational Threshold" },
      { label: "POWER SAVINGS", value: "64% Lower Seasonal Consumption" },
      { label: "REFRIGERANT", value: "Ultra-Low GWP Engineered Matrix" },
    ],
  },
];

export default function ArchitecturePage() {
  const [activePillar, setActivePillar] = useState<string>("diffusers");

  const current = PILLARS.find((p) => p.id === activePillar) || PILLARS[0];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#1D1D1E] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-44 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-5 sm:mb-6 backdrop-blur-md bg-white/[0.05] border border-white/[0.12] text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Architectural Engineering Systems</span>
          </div>

          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] text-white">
            The invisible architecture of{" "}
            <span className="bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">
              thermal equilibrium.
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-xl font-light leading-relaxed max-w-3xl text-zinc-400">
            Explore the core engineering pillars that allow modern minimalist residences to achieve absolute
            silence, zero visible grilles, and razor-sharp thermal precision across extreme elevations.
          </p>
        </div>
      </section>

      {/* Interactive Architecture Explorer */}
      <section className="relative pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-8 sm:mb-12">
          {PILLARS.map((p) => {
            const isActive = activePillar === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePillar(p.id)}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-white text-black font-bold shadow-md"
                    : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white"
                }`}
              >
                <span>{p.number} — {p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.1] bg-[#252528] shadow-2xl transition-all duration-500">
          {/* Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[500px] bg-black">
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Stat Floating Badge */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/80 border border-white/15 backdrop-blur-md">
              <span className="text-xl sm:text-3xl font-black font-mono text-white block">
                {current.stat}
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-amber-400 uppercase tracking-wider">
                {current.statLabel}
              </span>
            </div>
          </div>

          {/* Details & Specs (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500 font-bold mb-3">
                <span>SYSTEM {current.number}</span>
                <span>•</span>
                <span>ARCHITECTURAL STANDARD</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-2 text-white">
                {current.title}
              </h2>
              <p className="text-sm font-semibold text-amber-400 mb-5">
                {current.subtitle}
              </p>
              <p className="text-sm leading-relaxed font-light mb-8 text-zinc-300">
                {current.description}
              </p>

              {/* Technical Specifications List */}
              <div className="space-y-3 pt-6 border-t border-white/[0.08]">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-2 font-bold tracking-wider">
                  Technical Specifications:
                </span>
                {current.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-500">{spec.label}</span>
                    <span className="font-bold text-right text-zinc-200">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/[0.08] flex items-center justify-between">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider transition-colors hover:text-amber-400 text-zinc-300"
              >
                <span>Request Blueprint CAD Family</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Comparison Matrix */}
      <section className="relative pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold block mb-2">
            Comparative Analysis
          </span>
          <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
            AeroClimate vs. Standard HVAC
          </h3>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base font-light text-zinc-400">
            How architectural precision engineering differs from off-the-shelf residential heating and cooling.
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex items-center justify-between mb-2.5 px-1 sm:hidden text-[11px] font-mono text-zinc-500">
          <span>SPECIFICATION MATRIX</span>
          <span>Swipe horizontally →</span>
        </div>

        <div className="overflow-x-auto rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-[#252528]">
          <table className="w-full min-w-[620px] text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                <th className="p-4 sm:p-5 font-bold uppercase text-zinc-400">Metric / Dimension</th>
                <th className="p-4 sm:p-5 font-bold uppercase text-zinc-400">Standard Luxury Forced Air</th>
                <th className="p-4 sm:p-5 font-bold uppercase text-amber-400 bg-amber-500/10">AeroClimate System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-zinc-200">Visible Hardware</td>
                <td className="p-4 sm:p-5 text-zinc-400">Exposed 4x10 & 6x12 ceiling stamped grilles</td>
                <td className="p-4 sm:p-5 font-bold text-amber-400 bg-amber-500/5">0 Visible Supply Grilles (12mm reveals)</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-zinc-200">Sound Profile (Noise Floor)</td>
                <td className="p-4 sm:p-5 text-zinc-400">32 – 44 dBA (Audible fan rush & duct roar)</td>
                <td className="p-4 sm:p-5 font-bold text-amber-400 bg-amber-500/5">&lt; 18 dBA Certified Whisper Floor</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-zinc-200">Room-to-Room Delta</td>
                <td className="p-4 sm:p-5 text-zinc-400">±3.5°F to 5.0°F hot/cold spots across double-height glass</td>
                <td className="p-4 sm:p-5 font-bold text-amber-400 bg-amber-500/5">±0.2°F Room-to-Room Precision Equilibrium</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-zinc-200">Sub-Zero Heat Capacity</td>
                <td className="p-4 sm:p-5 text-zinc-400">Derates below 25°F; triggers expensive heat strips</td>
                <td className="p-4 sm:p-5 font-bold text-amber-400 bg-amber-500/5">100% Heating Output Down to -22°F</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-zinc-200">Slab Radiant Synergy</td>
                <td className="p-4 sm:p-5 text-zinc-400">Separate system requiring separate contractor coordination</td>
                <td className="p-4 sm:p-5 font-bold text-amber-400 bg-amber-500/5">Unified Hydronic + Inverter Architecture</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-zinc-200">Air Purification</td>
                <td className="p-4 sm:p-5 text-zinc-400">Standard MERV 8 fiberglass filters</td>
                <td className="p-4 sm:p-5 font-bold text-amber-400 bg-amber-500/5">MERV 16 Hospital-Grade + Energy Recovery ERV</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CTA Banner */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-12 rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-[#252528] text-center">
          <h4 className="text-xl sm:text-3xl font-black uppercase tracking-tight mb-3 text-white">
            Ready to integrate with your architectural drawings?
          </h4>
          <p className="text-xs sm:text-base max-w-xl mx-auto font-light mb-6 sm:mb-8 text-zinc-400">
            Our mechanical engineering team coordinates directly with lead architects, MEP contractors, and structural engineers.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md bg-white text-black hover:bg-zinc-200"
          >
            <span>Commission an Engineering Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
