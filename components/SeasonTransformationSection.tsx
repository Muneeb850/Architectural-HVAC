"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowLeftRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function SeasonTransformationSection() {
  const { isDark } = useTheme();
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState<number>(1200);

  useEffect(() => {
    const updateWidth = () => {
      if (stageRef.current) {
        setStageWidth(stageRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <section
      id="seasons"
      className={`relative w-full py-28 overflow-hidden border-t transition-colors duration-500 ${
        isDark ? "bg-[#1D1D1E] text-white border-white/[0.08]" : "bg-[#FAF8F5] text-[#141518] border-black/[0.06]"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-md transition-colors ${
              isDark
                ? "bg-white/[0.05] border border-white/[0.12] text-zinc-200"
                : "bg-black/[0.04] border border-black/[0.08] text-[#141518]"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Section 04 — Seasonal Equilibrium</span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight transition-colors ${
              isDark ? "text-white" : "text-[#141518]"
            }`}
          >
            One System.{" "}
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                isDark ? "from-amber-300 to-amber-100" : "from-amber-600 to-amber-700"
              }`}
            >
              Every Season.
            </span>
          </h2>

          <p
            className={`mt-4 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto transition-colors ${
              isDark ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            Designed to maintain comfort as the world outside changes. The architecture remains rock solid while the internal thermodynamics adapt instantly to sub-zero blizzards or scorching heatwaves.
          </p>

          {/* Preset Buttons */}
          <div
            className={`mt-6 sm:mt-8 flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl sm:rounded-xl backdrop-blur-md max-w-full transition-colors ${
              isDark ? "bg-white/[0.04] border border-white/[0.08]" : "bg-black/[0.04] border border-black/[0.08]"
            }`}
          >
            <button
              onClick={() => setSliderPos(20)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-lg text-[11px] sm:text-xs font-mono uppercase transition-all cursor-pointer ${
                sliderPos < 35
                  ? "bg-amber-600 text-white font-bold shadow-md shadow-amber-600/20"
                  : isDark
                  ? "text-zinc-400 hover:text-white"
                  : "text-zinc-600 hover:text-[#141518]"
              }`}
            >
              <span>Winter (-4°F)</span>
            </button>
            <button
              onClick={() => setSliderPos(50)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-lg text-[11px] sm:text-xs font-mono uppercase transition-all cursor-pointer ${
                sliderPos >= 35 && sliderPos <= 65
                  ? isDark
                    ? "bg-white text-black font-bold shadow-md"
                    : "bg-[#141518] text-white font-bold shadow-md shadow-black/10"
                  : isDark
                  ? "text-zinc-400 hover:text-white"
                  : "text-zinc-600 hover:text-[#141518]"
              }`}
            >
              <span>50/50 Split</span>
            </button>
            <button
              onClick={() => setSliderPos(80)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-lg text-[11px] sm:text-xs font-mono uppercase transition-all cursor-pointer ${
                sliderPos > 65
                  ? "bg-sky-600 text-white font-bold shadow-md shadow-sky-600/20"
                  : isDark
                  ? "text-zinc-400 hover:text-white"
                  : "text-zinc-600 hover:text-[#141518]"
              }`}
            >
              <span>Summer (+89°F)</span>
            </button>
          </div>
        </div>

        {/* Interactive Comparison Stage */}
        <div
          ref={stageRef}
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[650px] min-h-[340px] sm:min-h-0 bg-[#06080d] rounded-3xl overflow-hidden border border-black/[0.1] shadow-2xl select-none cursor-ew-resize group"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* Base Layer: Summer Full Reference */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/introduction/card_06_equilibrium.jpg"
              alt="Summer Twilight Architectural Villa"
              fill
              className="object-cover"
            />
          </div>

          {/* Clipped Top Layer: Winter / Alpine Morph with Radiant Floor */}
          <div
            className={`absolute inset-0 h-full overflow-hidden will-change-[width] ${
              isDragging ? "transition-none" : "transition-[width] duration-500 ease-out"
            }`}
            style={{ width: `${sliderPos}%` }}
          >
            <div style={{ width: `${stageWidth}px`, height: "100%" }} className="relative h-full">
              <Image
                src="/introduction/card_01_villa.jpg"
                alt="Winter Alpine Architectural Villa"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Draggable Divider Handle */}
          <div
            className={`absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-[0_0_20px_rgba(255,255,255,0.8)] will-change-[left] ${
              isDragging ? "transition-none" : "transition-[left] duration-500 ease-out"
            }`}
            style={{ left: `${sliderPos}%` }}
          >
            {/* Center Circular Grabber */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white text-black shadow-2xl flex items-center justify-center border-2 border-black cursor-ew-resize group-hover:scale-110 transition-transform">
              <ArrowLeftRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-black" />
            </div>

            {/* Top Indicator Label */}
            <div className="absolute top-3 sm:top-4 -translate-x-1/2 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-black/80 border border-white/20 text-[9px] sm:text-[10px] font-mono text-white whitespace-nowrap backdrop-blur-md">
              DRAG
            </div>
          </div>

          {/* Mobile Single Responsive Overlay Card */}
          <div className="block sm:hidden pointer-events-none absolute bottom-3 inset-x-3 z-20 p-3 rounded-xl bg-black/85 border border-white/15 backdrop-blur-md text-left">
            {sliderPos < 50 ? (
              <div>
                <div className="text-amber-400 text-[11px] font-mono font-bold uppercase mb-0.5">
                  Winter Mode (-4°F)
                </div>
                <p className="text-[11px] text-zinc-300 leading-snug line-clamp-2">
                  Sub-zero heat pumps and radiant hydronic floor loops maintain steady 72°F interior warmth.
                </p>
              </div>
            ) : (
              <div>
                <div className="text-sky-400 text-[11px] font-mono font-bold uppercase mb-0.5">
                  Summer Mode (+89°F)
                </div>
                <p className="text-[11px] text-zinc-300 leading-snug line-clamp-2">
                  Concealed laminar ceiling diffusers blanket living volumes in whisper-quiet cooling.
                </p>
              </div>
            )}
          </div>

          {/* Desktop Left Label Overlay (Winter State) */}
          <div className="hidden sm:block pointer-events-none absolute bottom-6 left-6 z-20 p-4 rounded-xl bg-black/80 border border-amber-500/30 backdrop-blur-md max-w-xs">
            <div className="text-amber-400 text-xs font-mono font-bold uppercase mb-1">
              Winter Mode (-4°F)
            </div>
            <p className="text-xs text-zinc-300">
              Outdoor heat pump extracts thermal calories from sub-zero air. Glowing in-slab hydronic coils and upstairs warm air registers keep the interior at a rock-solid 72°F.
            </p>
          </div>

          {/* Desktop Right Label Overlay (Summer State) */}
          <div className="hidden sm:block pointer-events-none absolute bottom-6 right-6 z-20 p-4 rounded-xl bg-black/80 border border-sky-500/30 backdrop-blur-md max-w-xs text-right">
            <div className="text-sky-400 text-xs font-mono font-bold uppercase mb-1">
              Summer Mode (+89°F)
            </div>
            <p className="text-xs text-zinc-300">
              High-induction cool air diffusers blanket the living and kitchen areas. Whisper-quiet dehumidification removes moisture while conserving 40% more energy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
