"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

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
  scope: string;
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
    project: "Alpine Glass Pavilion",
    metric: "17.4 dBA Noise Floor",
    scope: "9,400 Sq Ft • Triple Glazing • Sub-Zero Alpine",
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
    project: "Cantilever Ridge Estate",
    metric: "±0.2°F Room-to-Room Delta",
    scope: "14,200 Sq Ft • 8 Zones • Cantilever Concrete",
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
    project: "Acoustic Loft Studio",
    metric: "16.2 dBA Certified Silence",
    scope: "6,800 Sq Ft • Sound Isolated • Historic Loft",
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
    project: "Minimalist Concrete Sanctuary",
    metric: "0 Visible Supply Grilles",
    scope: "8,500 Sq Ft • Board-Formed Concrete • Radiant",
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
    project: "Alpine Peak Chalet",
    metric: "-22°F Operational Floor",
    scope: "11,000 Sq Ft • Timber Frame • Extreme Cold",
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
    project: "Desert Courtyard Compound",
    metric: "35% Annual Power Reduction",
    scope: "10,500 Sq Ft • High Solar Gain • Rammed Earth",
  },
];

export default function ReviewsPage() {
  const [filter, setFilter] = useState<"all" | "architect" | "contractor" | "homeowner">("all");

  const filtered = REVIEWS.filter((r) => (filter === "all" ? true : r.category === filter));

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#1D1D1E] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-44 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-5 sm:mb-6 backdrop-blur-md bg-white/[0.05] border border-white/[0.12] text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Verified Commissions & Case Studies</span>
          </div>

          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] text-white">
            Trusted by architects.{" "}
            <span className="bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">
              Felt by owners.
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-xl font-light leading-relaxed max-w-3xl text-zinc-400">
            Read verified feedback from leading residential design practices, luxury builders, and private
            estate owners who have lived with the AeroClimate invisible engineering experience.
          </p>

          {/* Filter Pills */}
          <div className="mt-6 sm:mt-10 inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full backdrop-blur-md max-w-full bg-white/[0.04] border border-white/[0.08]">
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
                  className={`px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white text-black font-bold shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="relative pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-[#252528] hover:border-white/[0.25] shadow-2xl transition-all duration-500 flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                {/* Card Top: Typographic Rating & Commission Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono tracking-widest text-amber-500 font-bold uppercase">
                      5.0 / 5.0
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">
                      VERIFIED
                    </span>
                  </div>
                  <span className="font-mono text-xs tracking-widest uppercase transition-colors text-zinc-500 group-hover:text-amber-400">
                    COMMISSION
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base leading-relaxed font-light mb-6 text-zinc-200">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Author & Project Metrics */}
              <div className="pt-5 border-t border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold uppercase tracking-tight text-white">
                      {rev.author}
                    </h4>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  </div>
                  <p className="text-xs text-zinc-400">
                    {rev.role} • {rev.firm}
                  </p>
                  <span className="text-[11px] font-mono block mt-0.5 text-zinc-500">
                    {rev.location}
                  </span>
                </div>

                {/* Project Specs Badge */}
                <div className="mt-4 p-3 rounded-xl border text-[11px] font-mono bg-white/[0.03] border-white/[0.06] text-zinc-300">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{rev.project}</span>
                    <span className="text-amber-500 font-bold">{rev.metric}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 block truncate">{rev.scope}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Commission Consultation CTA */}
        <div className="mt-14 sm:mt-20 p-6 sm:p-14 rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-[#252528] text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>100% Client Satisfaction Guaranteed</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-3 sm:mb-4 text-white">
            Ready to commission your residence?
          </h3>
          <p className="text-xs sm:text-base max-w-xl mx-auto font-light leading-relaxed mb-6 sm:mb-8 text-zinc-400">
            Submit your project blueprints or connect with our Denver engineering group for an in-depth
            HVAC acoustic and thermal load consultation.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl bg-white text-black hover:bg-zinc-200"
          >
            <span>Commission a Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
