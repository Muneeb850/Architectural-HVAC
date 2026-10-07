"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";

interface FrameData {
  id: string;
  act: string;
  number: string;
  frameIndex: number;
  timeSec: string;
  title: string;
  subtitle: string;
  category: string;
  desc: string;
  src: string;
  specs: { label: string; value: string; color: string }[];
  accentColor: string;
}

const FRAMES: FrameData[] = [
  {
    id: "act01",
    act: "Act 01",
    number: "01",
    frameIndex: 0,
    timeSec: "0.0s",
    title: "YOU SEE THE BUILDING.",
    subtitle: "WE SHOW WHAT MAKES IT COMFORTABLE.",
    category: "THE ARCHITECTURAL CUTAWAY",
    desc: "Opening exterior cutaway in daylight snow. Showcases basement mechanical plant, insulated vertical risers, living quarters, bedroom suites, and the outdoor heat pump in complete spatial balance.",
    src: "/mockups/frames/01_act01_architectural_cutaway.png",
    specs: [
      { label: "RESOLUTION", value: "2560x1440 QHD", color: "text-white" },
      { label: "SCENE", value: "Daylight Exterior Cutaway", color: "text-amber-400" },
      { label: "CFD BALANCE", value: "Dual Heating/Cooling", color: "text-sky-400" },
    ],
    accentColor: "border-amber-500/40 text-amber-400",
  },
  {
    id: "act02",
    act: "Act 02",
    number: "02",
    frameIndex: 35,
    timeSec: "1.5s",
    title: "COMFORT DOESN'T START AT THE THERMOSTAT.",
    subtitle: "IT STARTS BEHIND THE WALLS.",
    category: "DUCTWORK & THERMAL DISTRIBUTION",
    desc: "Camera begins pushing inward through the exterior wall. Concealed galvanized supply trunks, sealed mastic joints, and dual-zone thermal airflow pathways become visibly active.",
    src: "/mockups/frames/02_act02_ductwork_distribution.png",
    specs: [
      { label: "STATIC LOSS", value: "0.02 in. w.g.", color: "text-emerald-400" },
      { label: "LEFT ZONE", value: "72°F Radiant Supply", color: "text-amber-400" },
      { label: "RIGHT ZONE", value: "68°F Chilled Diffuser", color: "text-sky-400" },
    ],
    accentColor: "border-amber-500/40 text-amber-400",
  },
  {
    id: "act03",
    act: "Act 03",
    number: "03",
    frameIndex: 75,
    timeSec: "3.1s",
    title: "SILENT AIR DISTRIBUTION.",
    subtitle: "ZERO DRAFTS. ZERO NOISE.",
    category: "INTERIOR ACOUSTIC LIVING VOLUME",
    desc: "Traveling past the kitchen island and open dining volume. Shows decoupled vibration spring hangers, laser-welded spiral ducts, and whisper-quiet air delivery.",
    src: "/mockups/frames/03_act03_interior_acoustic_volume.png",
    specs: [
      { label: "ACOUSTICS", value: "18 dBA (Whisper)", color: "text-white" },
      { label: "DUCTWORK", value: "Spiral Decoupled", color: "text-sky-400" },
      { label: "ISOLATION", value: "Acoustic Springs", color: "text-emerald-400" },
    ],
    accentColor: "border-emerald-500/40 text-emerald-400",
  },
  {
    id: "act04",
    act: "Act 04",
    number: "04",
    frameIndex: 105,
    timeSec: "4.4s",
    title: "AIR SHOULD MOVE WITH PURPOSE.",
    subtitle: "1,250 CFM AERODYNAMIC LAMINAR FLOW.",
    category: "LAMINAR AIRFLOW & CEILING REGISTERS",
    desc: "Inside the double-height studio interior. Luminous green airflow lines trace laminar air currents along architectural ceiling slats with high-induction diffusers.",
    src: "/mockups/frames/04_act04_laminar_ceiling_airflow.png",
    specs: [
      { label: "VELOCITY", value: "1,250 CFM Laminar", color: "text-emerald-400" },
      { label: "FILTRATION", value: "MERV 16 Medical Grade", color: "text-sky-400" },
      { label: "INDUCTION", value: "Slot Registers", color: "text-amber-400" },
    ],
    accentColor: "border-emerald-500/40 text-emerald-400",
  },
  {
    id: "act05",
    act: "Act 05",
    number: "05",
    frameIndex: 135,
    timeSec: "5.6s",
    title: "ONE SYSTEM.",
    subtitle: "EVERY SEASON.",
    category: "THE ARCHITECTURAL VILLA MORPH",
    desc: "Camera transitions outside as the building morphs into a modern acoustic studio villa with floor-to-ceiling glazing facing snow-covered pine trees.",
    src: "/mockups/frames/05_act05_architectural_villa_morph.png",
    specs: [
      { label: "ENVELOPE", value: "Triple Glazed Studio", color: "text-white" },
      { label: "EXTERIOR", value: "-4°F Mountain Blizzard", color: "text-sky-400" },
      { label: "INTERIOR", value: "72°F Uniform Equilibrium", color: "text-amber-400" },
    ],
    accentColor: "border-orange-500/40 text-orange-400",
  },
  {
    id: "act05b",
    act: "Act 05B",
    number: "06",
    frameIndex: 165,
    timeSec: "6.9s",
    title: "THE MACHINE BEHIND THE COMFORT.",
    subtitle: "104°F HYDRONIC RADIANT WARMTH.",
    category: "RADIANT HYDRONIC IN-SLAB ACTIVATION",
    desc: "Outdoor hyper-inverter heat pump running silently in the snow, routing warm refrigerant and powering in-slab hydronic loops that illuminate through the concrete floor.",
    src: "/mockups/frames/06_act05b_radiant_hydronic_activation.png",
    specs: [
      { label: "FLOOR TEMP", value: "104°F Radiant Screed", color: "text-amber-400" },
      { label: "INVERTER", value: "Modulates 10-100%", color: "text-sky-400" },
      { label: "EFFICIENCY", value: "350% COP in Winter", color: "text-emerald-400" },
    ],
    accentColor: "border-amber-500/40 text-amber-400",
  },
  {
    id: "act06",
    act: "Act 06",
    number: "07",
    frameIndex: 191,
    timeSec: "8.0s",
    title: "SEE THE DIFFERENCE.",
    subtitle: "FEEL THE COMFORT.",
    category: "COMPLETE ARCHITECTURAL INTEGRATION",
    desc: "The reference frame from your screenshot: sunset golden glow in the mountains, glowing studio villa, illuminated in-slab radiant heating, and outdoor heat pump operating in perfect harmony.",
    src: "/mockups/frames/07_act06_final_sunset_equilibrium.png",
    specs: [
      { label: "STATUS", value: "Equilibrium Reached", color: "text-emerald-400" },
      { label: "LIGHTING", value: "Golden Sunset Villa", color: "text-amber-400" },
      { label: "INTEGRATION", value: "Full Turnkey System", color: "text-white" },
    ],
    accentColor: "border-amber-500/40 text-amber-400",
  },
];

export default function FramesPage() {
  const [selectedIdx, setSelectedIdx] = useState<number>(6); // Default to Act 06 (user's reference frame)
  const [viewMode, setViewMode] = useState<"detail" | "grid">("detail");
  const current = FRAMES[selectedIdx];

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev > 0 ? prev - 1 : FRAMES.length - 1));
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev < FRAMES.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#000000]/90 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/[0.1] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Live Website</span>
            </Link>
            <div className="h-4 w-px bg-white/[0.1] hidden sm:block" />
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
              ARCHITECTURAL FRAMES INSPECTOR
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("detail")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors ${
                viewMode === "detail"
                  ? "bg-white text-black font-bold"
                  : "bg-white/[0.05] text-zinc-400 hover:text-white"
              }`}
            >
              Frame Viewer
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-black font-bold"
                  : "bg-white/[0.05] text-zinc-400 hover:text-white"
              }`}
            >
              All Frames Matrix
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Intro Banner */}
        <div className="mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Obsidian Noir 2.5K Frame Sequence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Every Frame Rendered in Obsidian Noir
            </h1>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-light">
              Just like your reference frame (Act 06), all key architectural stages are now rendered with the floating Obsidian Noir glass card, high-impact typography, and 100% background visibility.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/mockups/frames/00_master_all_frames_matrix.png"
              target="_blank"
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
            >
              <Download className="w-4 h-4" />
              <span>Download Master Matrix</span>
            </a>
          </div>
        </div>

        {viewMode === "grid" ? (
          /* ALL FRAMES MATRIX VIEW */
          <div className="space-y-6">
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/[0.12] bg-[#000000] shadow-2xl">
              <Image
                src="/mockups/frames/00_master_all_frames_matrix.png"
                alt="Master All Frames Matrix"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FRAMES.map((f, i) => (
                <div
                  key={f.id}
                  onClick={() => {
                    setSelectedIdx(i);
                    setViewMode("detail");
                  }}
                  className="group relative p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/50 cursor-pointer transition-all"
                >
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-3 bg-zinc-950">
                    <Image
                      src={f.src}
                      alt={f.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
                    <span className="text-amber-400 font-bold">{f.act}</span>
                    <span>Frame {String(f.frameIndex).padStart(3, "0")} ({f.timeSec})</span>
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase truncate">
                    {f.title} {f.subtitle}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* SINGLE FRAME DETAIL INSPECTOR */
          <div className="space-y-6">
            {/* Thumbnail Step Picker */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {FRAMES.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedIdx(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    selectedIdx === i
                      ? "bg-amber-400 text-black font-bold shadow-lg shadow-amber-400/20 ring-2 ring-amber-400"
                      : "bg-white/[0.04] text-zinc-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  <span>{f.act}</span>
                  <span className="text-[10px] opacity-75">F{String(f.frameIndex).padStart(3, "0")}</span>
                </button>
              ))}
            </div>

            {/* Main Stage */}
            <div className="relative w-full aspect-[16/9] bg-[#000000] rounded-3xl overflow-hidden border border-white/[0.12] shadow-2xl group">
              <Image
                src={current.src}
                alt={current.title}
                fill
                className="object-contain"
                priority
              />

              {/* Prev / Next Stage Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-white/[0.15] text-white hover:bg-black/95 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                aria-label="Previous Frame"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 border border-white/[0.15] text-white hover:bg-black/95 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                aria-label="Next Frame"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Bottom Stage Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="px-3.5 py-1.5 rounded-xl bg-black/80 border border-white/[0.12] text-xs font-mono text-zinc-300 backdrop-blur-md">
                  CURRENT FRAME: {current.act} • FRAME {String(current.frameIndex).padStart(3, "0")} / 191 ({current.timeSec})
                </span>
                <a
                  href={current.src}
                  target="_blank"
                  download
                  className="pointer-events-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-black text-xs font-bold font-mono uppercase hover:bg-zinc-200 transition-colors shadow-lg"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Full 2.5K</span>
                </a>
              </div>
            </div>

            {/* Frame Specifications Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-1">
                    {current.act} — {current.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                    {current.title} {current.subtitle}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-zinc-500">
                    STEP {selectedIdx + 1} OF {FRAMES.length}
                  </span>
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.1] hover:bg-white/[0.1] text-white cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.1] hover:bg-white/[0.1] text-white cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-center">
                <div className="md:col-span-8">
                  <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                    {current.desc}
                  </p>
                </div>
                <div className="md:col-span-4 grid grid-cols-3 md:grid-cols-1 gap-2.5">
                  {current.specs.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-zinc-500 block uppercase">
                        {s.label}
                      </span>
                      <span className={`text-xs font-mono font-bold mt-0.5 block ${s.color}`}>
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

