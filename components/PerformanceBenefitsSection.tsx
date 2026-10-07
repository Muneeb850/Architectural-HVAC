"use client";

import React, { useState } from "react";
import { Zap, Sliders, Heart, Calculator, Gauge } from "lucide-react";

interface Benefit {
  phrase: string;
  subphrase: string;
  description: string;
  stat: string;
  statLabel: string;
  barPercent: number;
  icon: React.ElementType;
  gradient: string;
  accentColor: string;
}

const BENEFITS: Benefit[] = [
  {
    phrase: "LESS WASTE.",
    subphrase: "Up to 60% Lower Annual Consumption",
    description:
      "Conventional HVAC systems repeatedly cycle on and off at full blast, spiking power demand and wearing down components. Variable-inverter modulation continuously sips only the exact wattage required to maintain target equilibrium.",
    stat: "60%",
    statLabel: "Reduction in parasitic cycling losses",
    barPercent: 60,
    icon: Zap,
    gradient: "from-amber-200 via-orange-400 to-amber-100",
    accentColor: "#f59e0b",
  },
  {
    phrase: "MORE CONTROL.",
    subphrase: "Sub-Degree Zone Precision",
    description:
      "Independent motorized dampers and multi-point telemetry decouple individual rooms from single-thermostat compromises. Your master suite stays crisp for sleeping while common living rooms remain cozy.",
    stat: "±0.2°F",
    statLabel: "Continuous zone setpoint variance",
    barPercent: 92,
    icon: Sliders,
    gradient: "from-sky-200 via-cyan-400 to-blue-200",
    accentColor: "#38bdf8",
  },
  {
    phrase: "BETTER COMFORT.",
    subphrase: "Acoustic Silence & Medical-Grade Air",
    description:
      "Engineered with floating vibration dampers and medical-grade MERV 16 filtration. The system captures 99.97% of airborne particulate matter while running at 18 dBA — quieter than a whisper in a library.",
    stat: "18 dBA",
    statLabel: "Operating sound profile at normal load",
    barPercent: 85,
    icon: Heart,
    gradient: "from-emerald-200 via-teal-300 to-emerald-100",
    accentColor: "#10b981",
  },
];

export default function PerformanceBenefitsSection() {
  const [squareFootage, setSquareFootage] = useState<number>(4500);

  // Calculated estimates based on square footage
  const estimatedSavings = Math.round((squareFootage * 0.95));
  const estimatedBTU = Math.round((squareFootage * 30));
  const zonesRecommended = Math.max(4, Math.round(squareFootage / 750));

  return (
    <section className="relative w-full py-32 bg-[#040507] text-white overflow-hidden border-t border-white/[0.08]">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-white/[0.02] via-transparent to-transparent" />
      <div className="pointer-events-none absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-1/4 -left-40 w-96 h-96 rounded-full bg-amber-500/10 blur-[130px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Section Intro */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono tracking-widest uppercase text-zinc-300 mb-4">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span>Section 08 — Thermodynamic Metrics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            Measurable Comfort. Zero Compromise.
          </h2>
          <p className="mt-4 text-base text-zinc-400 font-light leading-relaxed">
            Performance isn’t an abstract ideal. It’s measured in reduced kilowatt-hours, precise
            fractional-degree stability, and acoustic silence you can feel.
          </p>
        </div>

        {/* The 3 Core Pillars Cards */}
        <div className="space-y-12">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div
                key={i}
                className="group relative p-8 sm:p-14 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-700 backdrop-blur-xl overflow-hidden"
              >
                {/* Dynamic Hover Glow */}
                <div
                  className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                  style={{ background: benefit.accentColor }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Massive Bold Headline */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white">
                        <Icon className="w-5 h-5 text-amber-400" />
                      </div>
                      <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                        PERFORMANCE PILLAR 0{i + 1}
                      </span>
                    </div>

                    <h2
                      className={`text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter bg-gradient-to-r ${benefit.gradient} bg-clip-text text-transparent leading-[0.9]`}
                    >
                      {benefit.phrase}
                    </h2>

                    <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {benefit.subphrase}
                    </p>

                    <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-xl">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Big Stat Counter Callout + Progress Bar */}
                  <div className="lg:col-span-5 flex flex-col justify-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-5xl sm:text-7xl font-black font-mono text-white tracking-tight">
                        {benefit.stat}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 uppercase">VERIFIED</span>
                    </div>

                    <span className="text-xs sm:text-sm font-mono text-zinc-400 mt-1 max-w-xs">
                      {benefit.statLabel}
                    </span>

                    {/* Visual Progress Indicator */}
                    <div className="w-full h-1.5 rounded-full bg-white/[0.08] mt-6 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${benefit.barPercent}%`,
                          background: `linear-gradient(to right, ${benefit.accentColor}, #ffffff)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Architectural Sizing & Savings Estimator */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/[0.1] backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-white/[0.08]">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
                <Calculator className="w-3.5 h-3.5" />
                <span>ESTIMATION MATRIX</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                Interactive Residence Climate Audit
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                Slide to calibrate for your residence footprint and review projected thermodynamic metrics.
              </p>
            </div>

            {/* Current Footprint Badge */}
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/60 border border-white/[0.1]">
              <span className="text-xs font-mono text-zinc-400">FOOTPRINT:</span>
              <span className="text-2xl font-black font-mono text-white">
                {squareFootage.toLocaleString()}
              </span>
              <span className="text-xs font-mono text-zinc-500">SQ FT</span>
            </div>
          </div>

          {/* Slider Control */}
          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-xs font-mono text-zinc-500">
              <span>2,000 SQ FT (PENTHOUSE)</span>
              <span>12,000 SQ FT (ESTATE)</span>
            </div>
            <input
              type="range"
              min="2000"
              max="12000"
              step="500"
              value={squareFootage}
              onChange={(e) => setSquareFootage(Number(e.target.value))}
              className="w-full h-2 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* 3 Calculated Stat Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-xs font-mono text-zinc-400 uppercase block mb-1">
                Estimated Annual Power Savings
              </span>
              <span className="text-3xl font-mono font-black text-amber-400">
                ${estimatedSavings.toLocaleString()}
              </span>
              <span className="text-[11px] font-mono text-zinc-500 block mt-1">
                Based on 22.5 SEER2 vs staged baseline
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-xs font-mono text-zinc-400 uppercase block mb-1">
                Required Thermal Load
              </span>
              <span className="text-3xl font-mono font-black text-white">
                {estimatedBTU.toLocaleString()}
              </span>
              <span className="text-[11px] font-mono text-zinc-500 block mt-1">
                BTU/hr continuous peak capacity
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-xs font-mono text-zinc-400 uppercase block mb-1">
                Recommended Micro-Zones
              </span>
              <span className="text-3xl font-mono font-black text-sky-400">
                {zonesRecommended} Zones
              </span>
              <span className="text-[11px] font-mono text-zinc-500 block mt-1">
                Independent damper actuators
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
