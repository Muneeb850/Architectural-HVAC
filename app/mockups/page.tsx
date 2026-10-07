"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Download,
  Maximize2,
  Copy,
  Check,
} from "lucide-react";

interface MockupItem {
  id: string;
  number: string;
  title: string;
  filename: string;
  category: string;
  desc: string;
  typo: string;
  typoRole: string;
  mood: string;
  moodDesc: string;
  swatches: { name: string; hex: string; role: string }[];
}

const MOCKUPS: MockupItem[] = [
  {
    id: "bg-matrix",
    number: "BG-00",
    title: "Master Background Comparison Matrix",
    filename: "/mockups/bg_00_master_comparison_matrix.png",
    category: "BACKGROUND COLOR IMPLEMENTATIONS — 6 ARCHITECTURAL TECHNIQUES",
    desc: "Comprehensive side-by-side comparison of flat #000000 vs 6 architectural background techniques with live UI cards, contrast levels, and code",
    typo: "Display Matrix & Swatch Tokens",
    typoRole: "Full architectural comparative palette evaluation",
    mood: "Architectural Color Science",
    moodDesc: "Demonstrates how elevating pure black with ambient gradients, graphite grids, or espresso undertones enhances visual volume",
    swatches: [
      { name: "Flat Black", hex: "#000000", role: "Current baseline void" },
      { name: "Obsidian Mesh", hex: "#040507", role: "Option 01: Ambient radial spotlights" },
      { name: "Arch Graphite", hex: "#0B0E12", role: "Option 02: CAD blueprint drafting grid" },
      { name: "Smoked Espresso", hex: "#0F0C0A", role: "Option 03: Luxury residential hearth warmth" },
      { name: "Midnight Oceanic", hex: "#060B14", role: "Option 04: Aerospace navy contrast" },
    ],
  },
  {
    id: "bg-01",
    number: "BG-01",
    title: "Option 01: Obsidian Noir + Atmospheric Mesh",
    filename: "/mockups/bg_01_obsidian_ambient_mesh.png",
    category: "BACKGROUND COLOR IMPLEMENTATIONS — RECOMMENDED",
    desc: "Base #040507 elevated with subtle radial amber (warm loops) and glacier cyan (cool diffusers) breathing spotlights",
    typo: "High-Contrast Swiss Neo-Grotesk",
    typoRole: "Maximal cinematic drama with zero OLED cutoff harshness",
    mood: "Atmospheric Volumetric Noir",
    moodDesc: "Preserves the deep-black luxury feel while giving spatial depth and volumetric lighting behind architectural models",
    swatches: [
      { name: "Base Obsidian", hex: "#040507", role: "Deep non-reflective foundation" },
      { name: "Atmospheric Amber", hex: "rgba(245,158,11,0.06)", role: "Subtle warm ambient back-light" },
      { name: "Glacier Cyan", hex: "rgba(56,189,248,0.06)", role: "Subtle cool ambient back-light" },
      { name: "Glass Surface", hex: "#0B0D12", role: "Foreground telemetry card" },
      { name: "Titanium White", hex: "#FFFFFF", role: "Crisp primary typography" },
    ],
  },
  {
    id: "bg-02",
    number: "BG-02",
    title: "Option 02: Architectural Graphite & Blueprint Grid",
    filename: "/mockups/bg_02_architectural_graphite.png",
    category: "BACKGROUND COLOR IMPLEMENTATIONS",
    desc: "Sophisticated Scandinavian slate (#0B0E12) overlaid with an ultra-subtle 50px microscopic CAD drafting grid (3% opacity)",
    typo: "Technical Monospace & Architectural Serif/Sans",
    typoRole: "Precision drafting aesthetic with structural layout guidelines",
    mood: "Engineering Blueprint Studio",
    moodDesc: "Evokes technical craftsmanship, engineering drawings, and CAD modeling precision",
    swatches: [
      { name: "Arch Graphite", hex: "#0B0E12", role: "Sophisticated engineering base" },
      { name: "Blueprint Grid", hex: "rgba(255,255,255,0.03)", role: "50px microscopic CAD structure" },
      { name: "Slate Glass", hex: "#131922", role: "Structured modular card panel" },
      { name: "Electric Cyan", hex: "#38BDF8", role: "Telemetry highlights & diffusers" },
      { name: "Bone White", hex: "#F1F5F9", role: "Clean high-contrast typography" },
    ],
  },
  {
    id: "bg-03",
    number: "BG-03",
    title: "Option 03: Smoked Timber / Warm Architectural Espresso",
    filename: "/mockups/bg_03_warm_smoked_espresso.png",
    category: "BACKGROUND COLOR IMPLEMENTATIONS",
    desc: "Deep espresso-charcoal undertones (#0F0C0A) paired with a subtle center hearth amber glow at 6% opacity",
    typo: "Warm Neo-Grotesk Display",
    typoRole: "Tactile luxury residential aesthetic with soft warmth",
    mood: "Aspen Mountain Chalet",
    moodDesc: "Grounds the radiant heating elements and creates an immediate emotional connection to domestic winter warmth",
    swatches: [
      { name: "Smoked Espresso", hex: "#0F0C0A", role: "Warm non-sterile architectural foundation" },
      { name: "Hearth Glow", hex: "rgba(217,119,6,0.06)", role: "Subtle radiant hearth luminescence" },
      { name: "Walnut Glass", hex: "#1A1411", role: "Refined organic UI cards" },
      { name: "Sunken Bronze", hex: "#B45309", role: "Warm metallic accents" },
      { name: "Champagne White", hex: "#FFFBEB", role: "Soft, welcoming luxury typography" },
    ],
  },
  {
    id: "bg-04",
    number: "BG-04",
    title: "Option 04: Midnight Oceanic Blueprint",
    filename: "/mockups/bg_04_midnight_oceanic_blueprint.png",
    category: "BACKGROUND COLOR IMPLEMENTATIONS",
    desc: "Deep maritime navy base (#060B14) with a subtle marine cyan lighting wash at 6% opacity for aerospace airflow contrast",
    typo: "Aerospace Precision Sans",
    typoRole: "Maximum chromatic contrast for cool laminar air and telemetry badges",
    mood: "Maritime Aerospace Engineering",
    moodDesc: "Reduces visual fatigue, deepens perceived contrast, and makes cool airflow paths and cyan diffusers pop vividly",
    swatches: [
      { name: "Midnight Oceanic", hex: "#060B14", role: "Deep maritime aerospace foundation" },
      { name: "Marine Cyan Flare", hex: "rgba(14,165,233,0.06)", role: "Aerodynamic lighting wash" },
      { name: "Sapphire Glass", hex: "#0E1726", role: "Translucent spatial card container" },
      { name: "Laser Amber", hex: "#F59E0B", role: "Vivid complementary heating highlight" },
      { name: "Alpine White", hex: "#FFFFFF", role: "Crystal-clear typography" },
    ],
  },
  {
    id: "bg-05",
    number: "BG-05",
    title: "Option 05: Dynamic Section-Adaptive Blends",
    filename: "/mockups/bg_05_dynamic_section_adaptive.png",
    category: "BACKGROUND COLOR IMPLEMENTATIONS",
    desc: "Background shifts dynamically as you scroll: Obsidian -> Oceanic Airflow -> Hearth Amber Heating -> Equilibrium",
    typo: "Adaptive Cinematic Typography",
    typoRole: "Story-driven visual pacing that shifts with the engineering narrative",
    mood: "Continuous Thermodynamic Journey",
    moodDesc: "Instead of one static color, the website foundation morphs smoothly between sections using CSS cubic-bezier transitions",
    swatches: [
      { name: "Hero Cutaway", hex: "#040406", role: "Deep obsidian cutaway backdrop" },
      { name: "3D Airflow Cards", hex: "#060C13", role: "Cool oceanic midnight tone" },
      { name: "Hydronic Heating", hex: "#0E0B08", role: "Warm hearth charcoal tone" },
      { name: "Season Split", hex: "#08080C", role: "Split temperature transition stage" },
      { name: "Final Reveal CTA", hex: "#08090C", role: "Deep balanced luxury finale" },
    ],
  },
  {
    id: "bg-06",
    number: "BG-06",
    title: "Option 06: Cinematic Micro-Noise Onyx Texture",
    filename: "/mockups/bg_06_cinematic_micro_noise_onyx.png",
    category: "BACKGROUND COLOR IMPLEMENTATIONS",
    desc: "Deep onyx foundation (#08090B) with an ultra-fine 2.5% opacity SVG film grain overlay (mix-blend-mode: overlay)",
    typo: "Editorial Architectural Magazine",
    typoRole: "Tactile high-end print texture with zero digital color banding",
    mood: "35mm Architectural Film Cinema",
    moodDesc: "Eliminates 8-bit monitor color banding, softens gradient steps, and provides an organic tactile print finish",
    swatches: [
      { name: "Deep Onyx Base", hex: "#08090B", role: "Rich non-reflective tactile foundation" },
      { name: "Film Grain Noise", hex: "rgba(255,255,255,0.025)", role: "Anti-banding 35mm film grain overlay" },
      { name: "Frosted Onyx", hex: "#111317", role: "Micro-textured frosted glass cards" },
      { name: "Warm Amber Glow", hex: "#F59E0B", role: "Organic flame and hydronic warmth" },
      { name: "Chalk White", hex: "#F8FAFC", role: "Razor-sharp magazine typography" },
    ],
  },
  {
    id: "custom-palette",
    number: "10",
    title: "Thermodynamic Spectrum (Your Palette)",
    filename: "/mockups/10_thermodynamic_spectrum_custom_palette.png",
    category: "YOUR UPLOADED COLOR PALETTE — ACTIVE THEME",
    desc: "Sampled from your reference: Warm Orange #F69A4B, Pale Cyan #C8FFFD, Sky Cyan #7EDCE9, Fresh Green #98ED80 & Pure White #FFFFFF",
    typo: "Swiss Neo-Grotesk Display (Inter / Geist)",
    typoRole: "Architectural luxury minimalism with tabular monospace telemetry data",
    mood: "Thermodynamic Heat & Chilled Airflow Spectrum",
    moodDesc: "Balanced radiant floor heating (Orange), soft chilled envelope (Pale Cyan), active diffusers (Sky Cyan), and medical IAQ filtration (Fresh Green)",
    swatches: [
      { name: "Warm Orange", hex: "#F69A4B", role: "Radiant Floor & Hearth Loops" },
      { name: "Pale Cyan", hex: "#C8FFFD", role: "Soft Ambient Chilled Envelope" },
      { name: "Sky Cyan", hex: "#7EDCE9", role: "Chilled Air Induction Diffusers" },
      { name: "Fresh Green", hex: "#98ED80", role: "MERV 16 IAQ Airflow & Velocity" },
      { name: "Pure White", hex: "#FFFFFF", role: "Clean High-Contrast Typography" },
    ],
  },
  {
    id: "palette-spec",
    number: "11",
    title: "Palette Breakdown & CSS Tokens",
    filename: "/mockups/11_exact_uploaded_palette_breakdown.png",
    category: "EXACT COLOR PALETTE SPECIFICATION & CSS CODE",
    desc: "Full comparative stripe breakdown, exact RGB/HEX specs, design roles, and CSS variables",
    typo: "Full Typographic Hierarchy Matrix",
    typoRole: "CSS variable definitions ready for drop-in styling",
    mood: "Design System Token Sheet",
    moodDesc: "Full thermal spectrum role mapping and implementation tokens",
    swatches: [
      { name: "Band 1", hex: "#F69A4B", role: "Radiant Floor & Heat" },
      { name: "Band 2", hex: "#C8FFFD", role: "Pale Chilled Air" },
      { name: "Band 3", hex: "#7EDCE9", role: "Sky Cyan Diffusers" },
      { name: "Band 4", hex: "#98ED80", role: "Fresh Leaf Green IAQ" },
      { name: "Band 5", hex: "#FFFFFF", role: "Pure White Display" },
    ],
  },
  {
    id: "01",
    number: "01",
    title: "Obsidian Noir",
    filename: "/mockups/01_obsidian_noir_pure_black.png",
    category: "MASTER REFERENCE VIDEO PALETTE",
    desc: "Pure Void #000000 with radiant amber and glacier cyan thermodynamic balance",
    typo: "Inter / Geist Neo-Grotesk Display",
    typoRole: "Tight -0.04em letter-spacing, Swiss minimalism, tabular monospace telemetry",
    mood: "Architectural Dark Cinema",
    moodDesc: "Infinite OLED contrast; the building cutaway and amber radiant loops float weightlessly without bezel friction",
    swatches: [
      { name: "Void", hex: "#000000", role: "Infinite deep background" },
      { name: "Amber", hex: "#F59E0B", role: "Heating loops & warm air" },
      { name: "Glacier", hex: "#38BDF8", role: "Cool chilled diffusers" },
      { name: "Titanium", hex: "#FFFFFF", role: "Crisp primary typography" },
      { name: "Emerald", hex: "#10B981", role: "Laminar airflow efficiency" },
    ],
  },
  {
    id: "02",
    number: "02",
    title: "Architectural Slate",
    filename: "/mockups/02_architectural_slate_blueprint.png",
    category: "SCANDINAVIAN TECHNICAL STUDIO",
    desc: "Graphite Canvas #080C14 with technical blueprint cyan and cadet steel chassis",
    typo: "DIN 1451 / Space Grotesk CAD",
    typoRole: "Architectural drafting lettering with static pressure & cleanroom dimension numbers",
    mood: "CAD Engineering Studio",
    moodDesc: "Subtle isometric grid lines, surgical cyan data badges, and precision mechanical layout drawings",
    swatches: [
      { name: "Graphite", hex: "#080C14", role: "Graphite blueprint canvas" },
      { name: "Blueprint", hex: "#00E5FF", role: "Airflow ducts & schematics" },
      { name: "Cobalt", hex: "#3B82F6", role: "Secondary ventilation zones" },
      { name: "Steel", hex: "#1E293B", role: "Mechanical chassis & panels" },
      { name: "Clean", hex: "#F8FAFC", role: "High-contrast telemetry labels" },
    ],
  },
  {
    id: "03",
    number: "03",
    title: "Thermal Dual-Zone",
    filename: "/mockups/03_thermal_dual_zone_contrast.png",
    category: "HIGH-CONTRAST THERMODYNAMICS",
    desc: "Volcanic Basalt #040406 with ember flare hearth & sub-zero mountain snow",
    typo: "Cinzel / Playfair Modern Editorial",
    typoRole: "Dramatic editorial serif pairing with ultra-clean technical badges",
    mood: "Extreme Thermodynamic Split",
    moodDesc: "Simultaneous sub-zero mountain exterior cold (-4°F) on right vs radiant in-slab floor heat (104°F) on left",
    swatches: [
      { name: "Obsidian", hex: "#040406", role: "Volcanic night canvas" },
      { name: "Volcano", hex: "#EA580C", role: "Left furnace & in-slab loop" },
      { name: "Frost Cyan", hex: "#06B6D4", role: "Right chilled diffuser" },
      { name: "Solar", hex: "#FBBF24", role: "Heat exchanger core" },
      { name: "Alpine", hex: "#E2E8F0", role: "Aerodynamic current trails" },
    ],
  },
  {
    id: "04",
    number: "04",
    title: "Biophilic Clean Air",
    filename: "/mockups/04_biophilic_clean_air_wellness.png",
    category: "PASSIVE HOUSE & WELLNESS IAQ",
    desc: "Forest Shadow #020905 with luminous oxygen emerald and glacier mint",
    typo: "Plus Jakarta Sans / Outfit",
    typoRole: "Modern organic sans-serif with rounded geometric breathing room",
    mood: "Passive House Wellness Luxury",
    moodDesc: "Hospital-grade MERV 16 air purification, silent 18 dBA acoustic noise, and continuous fresh HRV circulation",
    swatches: [
      { name: "Forest", hex: "#020905", role: "Biophilic deep shadow" },
      { name: "Oxygen", hex: "#00E676", role: "MERV 16 laminar airflow" },
      { name: "Glacier Mint", hex: "#69F0AE", role: "Fresh outdoor intake air" },
      { name: "Damper Slate", hex: "#06120B", role: "Acoustic damper insulation" },
      { name: "Pristine", hex: "#ECFDF5", role: "Ultra-clean air quality indicators" },
    ],
  },
  {
    id: "05",
    number: "05",
    title: "Titanium Monolith",
    filename: "/mockups/05_titanium_monolith_industrial.png",
    category: "AEROSPACE INDUSTRIAL ENGINEERING",
    desc: "Matte Titanium #0C0D12 with ultraviolet LED and precision inverter telemetry",
    typo: "JetBrains Mono / Chakra Industrial",
    typoRole: "Aerospace technical monospace with variable capacity readouts",
    mood: "Industrial Machinery Precision",
    moodDesc: "Twin-rotary inverter compressor modulation (10%-100%) with 22.5 SEER2 annual energy efficiency diagnostics",
    swatches: [
      { name: "Matte Titanium", hex: "#0C0D12", role: "Aerospace chassis foundation" },
      { name: "Ultraviolet", hex: "#6366F1", role: "Smart variable capacity telemetry" },
      { name: "Laser Cyan", hex: "#38BDF8", role: "Dual-inverter status lamp" },
      { name: "Brushed Steel", hex: "#334155", role: "Structural frame border" },
      { name: "HUD White", hex: "#F1F5F9", role: "Primary digital readouts" },
    ],
  },
  {
    id: "06",
    number: "06",
    title: "Champagne Luxury",
    filename: "/mockups/06_champagne_luxury_aspen_chalet.png",
    category: "ARCHITECTURAL DIGEST ASPEN CHALET",
    desc: "Smoked Oak #0B0907 with bronze gold alabaster and cashmere warmth",
    typo: "Italiana / Tenor Serif Luxury",
    typoRole: "Bespoke high-end architectural editorial serif with wide tracking",
    mood: "Understated Quiet Luxury",
    moodDesc: "Aspen winter retreat; invisible in-slab hydronic coils and cashmere whisper acoustics (16 dBA)",
    swatches: [
      { name: "Smoked Oak", hex: "#0B0907", role: "Warm timber carbon" },
      { name: "Bronze Gold", hex: "#D97706", role: "Radiant floor warmth" },
      { name: "Cashmere", hex: "#D4B996", role: "Soft acoustic insulation" },
      { name: "Alabaster", hex: "#F5F5F0", role: "Warm limestone white" },
      { name: "Espresso", hex: "#3E2723", role: "Deep thermal foundation" },
    ],
  },
  {
    id: "07",
    number: "07",
    title: "Arctic Polar Cryo",
    filename: "/mockups/07_arctic_polar_cryo_climate.png",
    category: "HIGH-CAPACITY CHILLED WATER PLANT",
    desc: "Polar Midnight #030712 with electric chilled-water cyan and silver frost",
    typo: "Cabinet Grotesk / General Sans",
    typoRole: "Ultra-clean alpine sans-serif with zero visual friction",
    mood: "Cryo Chilled Induction",
    moodDesc: "Continuous 54°F chilled hydronic loop, precision 42% RH dewpoint lock, and high-induction ceiling diffusers",
    swatches: [
      { name: "Polar Navy", hex: "#030712", role: "Sub-zero polar canvas" },
      { name: "Chilled Sky", hex: "#0EA5E9", role: "Chilled water supply line" },
      { name: "Glacier Cyan", hex: "#38BDF8", role: "Cool ceiling registers" },
      { name: "Silver Mist", hex: "#CBD5E1", role: "Condensation-free ductwork" },
      { name: "Arctic White", hex: "#FFFFFF", role: "Clean room illumination" },
    ],
  },
  {
    id: "08",
    number: "08",
    title: "Design System Specs",
    filename: "/mockups/08_design_system_typography_colors.png",
    category: "COMPLETE DESIGN SYSTEM SPECIFICATION",
    desc: "Comparative typography scale matrix & thermal color psychology tokens",
    typo: "Display (80px), H2 (48px), Metric (36px), Body (18px), Monospace HUD (13px)",
    typoRole: "Full typographic scale hierarchy and letter-spacing rules",
    mood: "Design System Blueprint",
    moodDesc: "Complete CSS token guide for developers and designers",
    swatches: [
      { name: "Warm Hearth", hex: "#F59E0B", role: "Heating loops & radiant floor" },
      { name: "Chilled Diffuser", hex: "#38BDF8", role: "Cool supply air & diffusers" },
      { name: "Laminar Air", hex: "#10B981", role: "MERV 16 filtration & efficiency" },
      { name: "CAD Blueprint", hex: "#00E5FF", role: "Static pressure & engineering" },
      { name: "Quiet Bronze", hex: "#D97706", role: "Architectural luxury materials" },
    ],
  },
  {
    id: "09",
    number: "09",
    title: "Master Comparison Matrix",
    filename: "/mockups/09_master_themes_comparison_matrix.png",
    category: "GRAND COMPARATIVE DASHBOARD",
    desc: "Side-by-side comparative dashboard displaying all 6 themes simultaneously",
    typo: "Multi-Theme Matrix",
    typoRole: "Side-by-side comparative evaluation of all font pairings and contrast ratios",
    mood: "Executive Decision Matrix",
    moodDesc: "Instant visual contrast comparison across all 6 art directions",
    swatches: [
      { name: "Theme 01", hex: "#F59E0B", role: "Obsidian Noir" },
      { name: "Theme 02", hex: "#00E5FF", role: "Architectural Slate" },
      { name: "Theme 03", hex: "#EA580C", role: "Thermal Dual-Zone" },
      { name: "Theme 04", hex: "#00E676", role: "Biophilic Clean Air" },
      { name: "Theme 05", hex: "#6366F1", role: "Titanium Monolith" },
    ],
  },
];

export default function MockupsPage() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const active = MOCKUPS[activeIndex];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#040507] text-white p-4 sm:p-6 lg:p-10 select-none">
      {/* Top Header */}
      <header className="max-w-7xl mx-auto mb-8 border-b border-white/[0.08] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Architectural Visual Design Studio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Visual Themes & Typography Mockups
          </h1>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl font-light">
            High-resolution visual mockups saved in your project folder (<code className="bg-white/10 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-xs">public/mockups/</code> & <code className="bg-white/10 px-1.5 py-0.5 rounded text-zinc-300 font-mono text-xs">mockups/</code>). Inspect smooth color schemes, themes, and typography specs below.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/frames"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-mono uppercase tracking-wider text-amber-400 transition-colors font-bold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Inspect Acts 1–6 Frames</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-xs font-mono uppercase tracking-wider text-zinc-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Live Site</span>
          </Link>
        </div>
      </header>

      {/* Main Showcase Container */}
      <main className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Horizontal Navigation Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 custom-scrollbar">
          {MOCKUPS.map((item, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all shrink-0 cursor-pointer text-xs font-mono tracking-wider uppercase ${
                  isCurrent
                    ? "bg-white text-black font-bold border-white shadow-xl shadow-white/10 scale-[1.02]"
                    : "bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.08] border-white/[0.08]"
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    idx === 0
                      ? "bg-amber-400"
                      : idx === 1
                      ? "bg-sky-400"
                      : idx === 2
                      ? "bg-orange-500"
                      : idx === 3
                      ? "bg-emerald-400"
                      : idx === 4
                      ? "bg-indigo-400"
                      : idx === 5
                      ? "bg-amber-600"
                      : idx === 6
                      ? "bg-cyan-400"
                      : "bg-purple-400"
                  }`}
                />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Big Active Mockup Card */}
        <section className="bg-zinc-950/80 border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
                {active.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mt-1">
                {active.title}
              </h2>
              <p className="text-xs text-zinc-400 font-mono mt-1">{active.desc}</p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={active.filename}
                download
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-lg shadow-white/10"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save 1600x900 PNG</span>
              </a>
              <a
                href={active.filename}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.15] text-xs uppercase tracking-wider font-semibold text-white transition-all"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Screen</span>
              </a>
            </div>
          </div>

          {/* High-Resolution Mockup Image Display */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.1] bg-black shadow-2xl group">
            <Image
              src={active.filename}
              alt={active.title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            />
          </div>

          {/* Interactive Color Swatches Bar */}
          <div className="mt-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3 flex items-center justify-between">
              <span>Smooth Color Tokens (Click to Copy HEX)</span>
              <span className="text-[11px] text-zinc-500">5 Active Palette Roles</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {active.swatches.map((sw) => {
                const isCopied = copiedHex === sw.hex;
                return (
                  <button
                    key={sw.name}
                    onClick={() => handleCopy(sw.hex)}
                    className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 transition-all flex items-center justify-between group cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-7 h-7 rounded-lg border border-white/20 shadow-md shrink-0"
                        style={{ backgroundColor: sw.hex }}
                      />
                      <div>
                        <span className="text-xs font-bold text-white block truncate">
                          {sw.name}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono block">
                          {sw.hex}
                        </span>
                      </div>
                    </div>
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Typography & Design Rationale Specifications */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[11px] font-mono text-zinc-500 uppercase block mb-1">
                Typography Pairing
              </span>
              <span className="text-sm font-bold text-white block">{active.typo}</span>
              <span className="text-xs text-zinc-400 font-mono mt-1 block leading-relaxed">
                {active.typoRole}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[11px] font-mono text-zinc-500 uppercase block mb-1">
                Atmosphere & Mood
              </span>
              <span className="text-sm font-bold text-white block">{active.mood}</span>
              <span className="text-xs text-zinc-400 font-mono mt-1 block leading-relaxed">
                {active.moodDesc}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[11px] font-mono text-zinc-500 uppercase block mb-1">
                Storytelling Objective
              </span>
              <span className="text-sm font-bold text-amber-400 block">
                {active.category}
              </span>
              <span className="text-xs text-zinc-400 font-mono mt-1 block leading-relaxed">
                Communicates HVAC as architectural luxury engineering rather than contractor equipment.
              </span>
            </div>
          </div>
        </section>

        {/* Gallery Grid (All 9 Mockups) */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold uppercase text-white tracking-wide">
                All 9 Mockup Boards
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Saved in <code className="text-zinc-300">c:\Users\Rana Muneeb\OneDrive\Desktop\web\public\mockups\</code>
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-500">1600x900 PNG Assets</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCKUPS.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveIndex(idx);
                  window.scrollTo({ top: 120, behavior: "smooth" });
                }}
                className={`group bg-zinc-950/60 border rounded-2xl p-4 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-1 ${
                  idx === activeIndex
                    ? "border-white/50 ring-1 ring-white/20 bg-zinc-900/60"
                    : "border-white/[0.08] hover:border-white/30"
                }`}
              >
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black mb-3 border border-white/[0.06]">
                  <Image
                    src={item.filename}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">BOARD {item.number}</span>
                </div>
                <h4 className="text-sm font-bold text-white uppercase mt-0.5">{item.title}</h4>
                <p className="text-xs text-zinc-400 font-mono mt-1 truncate">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

