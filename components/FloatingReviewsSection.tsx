"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Review {
  id: string;
  author: string;
  role: string;
  firm: string;
  location: string;
  category: "architect" | "contractor" | "homeowner";
  quote: string;
  project: string;
  metric: string;
}

const REVIEWS: Review[] = [
  {
    id: "1",
    author: "Julian Vance",
    role: "Principal Architect",
    firm: "Vance & Partners Studio",
    location: "Aspen, Colorado",
    category: "architect",
    quote:
      "In modern glass residences, standard HVAC grilles ruin the ceiling planes. AeroClimate's concealed shadow reveals and zero-draft induction allowed us to preserve pure architectural geometry without sacrificing thermal comfort.",
    project: "Alpine Glass Pavilion (9,400 Sq Ft)",
    metric: "17.4 dBA Noise Floor",
  },
  {
    id: "2",
    author: "Elena Rostova",
    role: "Managing Director",
    firm: "Crestview Luxury Builders",
    location: "Bel-Air, California",
    category: "contractor",
    quote:
      "Their engineering coordination is unmatched. The in-slab hydronic balancing and modular inverter compressors cut installation friction by half. The acoustic isolation is so complete you cannot tell the system is running at full capacity.",
    project: "Cantilever Ridge Estate (14,200 Sq Ft)",
    metric: "±0.2°F Room-to-Room Delta",
  },
  {
    id: "3",
    author: "Marcus Sterling",
    role: "Private Homeowner",
    firm: "High-Fidelity Audio Collector",
    location: "Tribeca, New York City",
    category: "homeowner",
    quote:
      "I am an audiophile, and previous forced-air systems drove me crazy with duct resonance and motor roar. AeroClimate delivered a certified 16.2 dBA noise floor. It is utter, dead-silent serenity throughout the residence.",
    project: "Acoustic Loft Studio (6,800 Sq Ft)",
    metric: "16.2 dBA Certified Silence",
  },
  {
    id: "4",
    author: "Sophia Chen",
    role: "Design Director",
    firm: "Atelier Chen Interiors",
    location: "Kyoto / North Pacific",
    category: "architect",
    quote:
      "The zero visible hardware philosophy transformed how we designed the open-concept living pavilion. No ugly wall grilles, no ceiling protrusions—just pure, gentle conditioned air cascading from invisible shadow gaps.",
    project: "Minimalist Concrete Sanctuary (8,500 Sq Ft)",
    metric: "0 Visible Supply Grilles",
  },
  {
    id: "5",
    author: "David K. Lindqvist",
    role: "General Contractor",
    firm: "Nordic Heritage Construction",
    location: "Whistler, British Columbia",
    category: "contractor",
    quote:
      "At -20°F exterior conditions, most heat pumps fail and switch to expensive electric resistance strips. AeroClimate's cold-climate vapor flash compressors kept the entire 11,000 sq ft home at 72°F uninterrupted with 60% lower power consumption.",
    project: "Alpine Peak Chalet (11,000 Sq Ft)",
    metric: "-22°F Operational Floor",
  },
  {
    id: "6",
    author: "Arthur & Vivienne Vance",
    role: "Estate Homeowners",
    firm: "Modernist Residence",
    location: "Scottsdale, Arizona",
    category: "homeowner",
    quote:
      "Surviving 115°F desert heat waves without hot spots or drafts was something our previous contractor told us was impossible. AeroClimate balanced our double-height glass living room to perfection.",
    project: "Desert Courtyard Compound (10,500 Sq Ft)",
    metric: "35% Annual Power Reduction",
  },
];

export default function FloatingReviewsSection() {
  const { isDark } = useTheme();
  const [filter, setFilter] = useState<"all" | "architect" | "contractor" | "homeowner">("all");

  const filteredReviews = REVIEWS.filter((r) => (filter === "all" ? true : r.category === filter));

  return (
    <section
      id="reviews"
      className={`relative w-full py-20 sm:py-36 overflow-hidden transition-colors duration-500 border-t ${
        isDark
          ? "bg-[#1D1D1E] text-white border-white/[0.08]"
          : "bg-[#FAF8F5] text-[#141518] border-black/[0.06]"
      }`}
    >
      {/* Background Radial Ambiance */}
      <div
        className={`pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[180px] opacity-20 transition-all duration-700 ${
          isDark ? "bg-amber-400/15" : "bg-amber-300/35"
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-18">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-5 backdrop-blur-md transition-colors ${
              isDark
                ? "bg-white/[0.05] border border-white/[0.12] text-zinc-300"
                : "bg-black/[0.04] border border-black/[0.08] text-[#141518]"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Section 05 — Architectural Reviews</span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight transition-colors ${
              isDark ? "text-white" : "text-[#141518]"
            }`}
          >
            Trusted by architects.{" "}
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                isDark ? "from-amber-300 to-amber-100" : "from-amber-600 to-amber-700"
              }`}
            >
              Felt by owners.
            </span>
          </h2>

          <p
            className={`mt-4 text-sm sm:text-lg font-light leading-relaxed max-w-2xl mx-auto transition-colors ${
              isDark ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            Real feedback from leading residential architects, general contractors, and luxury estate
            homeowners on the invisible difference.
          </p>

          {/* Interactive Filter Pills */}
          <div
            className={`mt-6 sm:mt-8 inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full backdrop-blur-md transition-colors max-w-full ${
              isDark ? "bg-white/[0.04] border border-white/[0.08]" : "bg-black/[0.04] border border-black/[0.08]"
            }`}
          >
            {[
              { id: "all", label: "All Commissions" },
              { id: "architect", label: "Architects" },
              { id: "contractor", label: "Contractors" },
              { id: "homeowner", label: "Estate Owners" },
            ].map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as typeof filter)}
                  className={`px-3 sm:px-5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? isDark
                        ? "bg-white text-black font-bold shadow-md"
                        : "bg-[#141518] text-white font-bold shadow-md shadow-black/10"
                      : isDark
                      ? "text-zinc-400 hover:text-white"
                      : "text-zinc-600 hover:text-[#141518]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Floating Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {filteredReviews.map((rev, index) => (
            <div
              key={rev.id}
              className={`group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-500 flex-col justify-between hover:-translate-y-1.5 ${
                index >= 4 ? "hidden md:flex" : "flex"
              } ${
                isDark
                  ? "bg-[#252528]/80 border-white/[0.1] hover:border-white/[0.25] hover:bg-[#28282C] shadow-2xl shadow-black/40"
                  : "bg-white/90 border-black/[0.08] hover:border-black/[0.18] hover:bg-white shadow-xl shadow-black/[0.04]"
              }`}
            >
              <div>
                {/* Card Top: Typographic Rating & Commission Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono tracking-widest text-amber-500 font-bold uppercase">
                      5.0 / 5.0
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase">
                      VERIFIED
                    </span>
                  </div>

                  <span
                    className={`font-mono text-xs tracking-widest uppercase transition-colors ${
                      isDark ? "text-zinc-600 group-hover:text-amber-400/80" : "text-zinc-400 group-hover:text-amber-500/80"
                    }`}
                  >
                    COMMISSION
                  </span>
                </div>

                {/* Review Text */}
                <p
                  className={`text-sm sm:text-base leading-relaxed font-light mb-6 transition-colors ${
                    isDark ? "text-zinc-200" : "text-zinc-700"
                  }`}
                >
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Card Footer: Author Credentials & Verified Project Tag */}
              <div className={`pt-5 border-t transition-colors ${isDark ? "border-white/[0.08]" : "border-black/[0.08]"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4
                        className={`text-sm font-bold uppercase tracking-tight transition-colors ${
                          isDark ? "text-white" : "text-[#141518]"
                        }`}
                      >
                        {rev.author}
                      </h4>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    </div>
                    <p className={`text-xs transition-colors ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                      {rev.role} • {rev.firm}
                    </p>
                    <span className={`text-[11px] font-mono block mt-0.5 ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                      {rev.location}
                    </span>
                  </div>
                </div>

                {/* Verified Commission Badge */}
                <div
                  className={`mt-4 p-2.5 rounded-xl border flex items-center justify-between text-[11px] font-mono transition-colors ${
                    isDark
                      ? "bg-white/[0.03] border-white/[0.06] text-zinc-300"
                      : "bg-black/[0.02] border-black/[0.06] text-zinc-700"
                  }`}
                >
                  <span className="truncate pr-2 font-medium">{rev.project}</span>
                  <span className="text-amber-500 font-bold shrink-0">{rev.metric}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

