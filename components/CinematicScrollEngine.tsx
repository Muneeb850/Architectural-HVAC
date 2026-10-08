"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronDown,
  Play,
  Pause,
  ArrowRight,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 192;

interface Chapter {
  start: number;
  end: number;
  id: string;
  number: string;
  title: string;
}

const CHAPTERS: Chapter[] = [
  { start: 0.0, end: 0.16, id: "hero", number: "01", title: "Architecture" },
  { start: 0.16, end: 0.33, id: "cutaway", number: "02", title: "Inside Walls" },
  { start: 0.33, end: 0.50, id: "airflow", number: "03", title: "Airflow Flow" },
  { start: 0.50, end: 0.67, id: "machine", number: "04", title: "The Machine" },
  { start: 0.67, end: 0.84, id: "seasons", number: "05", title: "Villa Morph" },
  { start: 0.84, end: 1.0, id: "climax", number: "06", title: "Sanctuary" },
];

// Persistent module-level cache for high-res frames so they stay in memory permanently
const globalFrameCache: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
const requestedFrames = new Set<number>();

function loadSingleFrame(index: number, onLoaded?: () => void) {
  if (index < 0 || index >= TOTAL_FRAMES) return;
  if (globalFrameCache[index] || requestedFrames.has(index)) return;

  requestedFrames.add(index);
  const img = new window.Image();
  const num = String(index).padStart(3, "0");
  img.src = `/sequence/frame_${num}.webp`;
  img.onload = () => {
    globalFrameCache[index] = img;
    onLoaded?.();
  };
}

export default function CinematicScrollEngine() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);

  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [, setLoadedFramesCount] = useState<number>(0);

  const currentFrameRef = useRef<number>(0);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  // Render a frame to canvas with high-DPI retina sharpness and instant closest-frame fallback
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    // Check requested frame first
    let img = globalFrameCache[frameIndex];

    // If exact frame is not yet loaded, find closest loaded frame in memory immediately
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const left = frameIndex - offset;
        const right = frameIndex + offset;
        if (left >= 0 && globalFrameCache[left]?.complete && globalFrameCache[left]?.naturalWidth) {
          img = globalFrameCache[left];
          break;
        }
        if (right < TOTAL_FRAMES && globalFrameCache[right]?.complete && globalFrameCache[right]?.naturalWidth) {
          img = globalFrameCache[right];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const imgRatio = iw / ih;
    const canvasRatio = cw / ch;

    let renderW: number;
    let renderH: number;
    let renderX: number;
    let renderY: number;

    // Object-fit: cover for edge-to-edge immersion
    if (canvasRatio > imgRatio) {
      renderW = cw;
      renderH = cw / imgRatio;
      renderX = 0;
      renderY = (ch - renderH) / 2;
    } else {
      renderH = ch;
      renderW = ch * imgRatio;
      renderX = (cw - renderW) / 2;
      renderY = 0;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "medium";
    ctx.drawImage(img, renderX, renderY, renderW, renderH);

    currentFrameRef.current = frameIndex;
  }, []);

  // Resize canvas according to window devicePixelRatio (capped to native 2560x1440 for max performance)
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.min(Math.round(width * dpr), 2560);
    canvas.height = Math.min(Math.round(height * dpr), 1440);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  // Multi-tier prioritized progressive preloading
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    // 1. Instant load chapter anchor frames so every act is 100% sharp immediately
    const chapterAnchors = [0, 35, 75, 115, 150, 185];
    chapterAnchors.forEach((idx) => {
      loadSingleFrame(idx, () => {
        setLoadedFramesCount((prev) => prev + 1);
        if (currentFrameRef.current === idx) renderFrame(idx);
      });
    });

    // 2. Tier 1 (Keyframes every 8th frame: 0, 8, 16... 191) -> only 24 frames!
    // Downloads in ~150ms and guarantees any scroll position has a sharp frame nearby right away!
    const tier1: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i += 8) tier1.push(i);
    if (!tier1.includes(TOTAL_FRAMES - 1)) tier1.push(TOTAL_FRAMES - 1);

    tier1.forEach((idx) => {
      loadSingleFrame(idx, () => {
        setLoadedFramesCount((prev) => prev + 1);
        if (Math.abs(currentFrameRef.current - idx) <= 8) {
          renderFrame(currentFrameRef.current);
        }
      });
    });

    // 3. Tier 2 (Every 4th frame: 4, 12, 20...)
    const timerTier2 = setTimeout(() => {
      for (let i = 4; i < TOTAL_FRAMES; i += 8) {
        loadSingleFrame(i, () => setLoadedFramesCount((prev) => prev + 1));
      }
    }, 80);

    // 4. Tier 3 (Every 2nd frame: 2, 6, 10...)
    const timerTier3 = setTimeout(() => {
      for (let i = 2; i < TOTAL_FRAMES; i += 4) {
        loadSingleFrame(i, () => setLoadedFramesCount((prev) => prev + 1));
      }
    }, 200);

    // 5. Tier 4 (All remaining odd frames)
    const timerTier4 = setTimeout(() => {
      for (let i = 1; i < TOTAL_FRAMES; i += 2) {
        loadSingleFrame(i, () => setLoadedFramesCount((prev) => prev + 1));
      }
    }, 350);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timerTier2);
      clearTimeout(timerTier3);
      clearTimeout(timerTier4);
    };
  }, [handleResize, renderFrame]);

  // Setup GSAP ScrollTrigger PINNING with silky 1:1 scrub tracking (zero lag with Lenis)
  useEffect(() => {
    if (!sectionRef.current || !pinContainerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    let rafId: number | null = null;
    let targetFrame = 0;

    const scheduleFrameRender = (idx: number) => {
      targetFrame = idx;
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          rafId = null;
          renderFrame(targetFrame);
        });
      }
    };

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=1500", // Snappy 1500px scroll travel (1 comfortable wheel scroll per chapter step)
      pin: pinContainerRef.current,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 0.05, // Instant 1:1 response with Lenis smooth scrolling (no double-lag)
      onUpdate: (self) => {
        const progress = self.progress;

        // Map scroll progress to 0..191 frame index
        const frameIndex = Math.min(
          Math.max(Math.round(progress * (TOTAL_FRAMES - 1)), 0),
          TOTAL_FRAMES - 1
        );

        // Prime immediate neighborhood so upcoming frames are prioritized
        for (let offset = -2; offset <= 2; offset++) {
          const neighbor = frameIndex + offset;
          if (neighbor >= 0 && neighbor < TOTAL_FRAMES) {
            loadSingleFrame(neighbor);
          }
        }

        scheduleFrameRender(frameIndex);

        // Update HUD percentage readout directly (zero React overhead)
        if (percentTextRef.current) {
          percentTextRef.current.textContent = `${Math.round(progress * 100)}%`;
        }

        // Update active chapter index only when crossing chapter thresholds
        const chIdx = CHAPTERS.findIndex((c) => progress >= c.start && progress <= c.end);
        if (chIdx !== -1) {
          setActiveChapterIndex((prev) => (prev !== chIdx ? chIdx : prev));
        }
      },
    });

    scrollTriggerInstanceRef.current = st;

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      st.kill();
    };
  }, [renderFrame]);

  // Jump to specific chapter via ScrollTrigger
  const jumpToChapter = (chapter: Chapter) => {
    const st = scrollTriggerInstanceRef.current;
    if (!st) return;

    const targetScroll = st.start + (chapter.start + 0.02) * (st.end - st.start);
    if (typeof window !== "undefined" && (window as unknown as { lenis?: { scrollTo: (t: number, opts?: unknown) => void } }).lenis) {
      (window as unknown as { lenis: { scrollTo: (t: number, opts?: unknown) => void } }).lenis.scrollTo(targetScroll, { duration: 1 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  // Toggle Video Playback Mode (Cinematic Movie Experience)
  const toggleVideoPlayback = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (isPlayingVideo) {
      video.pause();
      setIsPlayingVideo(false);
    } else {
      setIsPlayingVideo(true);
      video.currentTime = 0;
      video.play().catch((err) => {
        console.error("Video playback prevented:", err);
        setIsPlayingVideo(false);
      });
    }
  };

  return (
    <div ref={sectionRef} id="hero" className="relative w-full bg-[#040507] text-white">
      {/* PINNED CONTAINER (Locked in place by GSAP ScrollTrigger) */}
      <div
        ref={pinContainerRef}
        className="relative w-full h-screen overflow-hidden bg-[#040507] flex items-center justify-center select-none"
      >
        {/* Instant Fallback Poster (Always visible underneath) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/hero-poster.jpg"
            alt="HVAC Architecture Poster"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* 2.5K QHD Canvas Frame Scrubber (Instant GPU-composited frame scrubbing) */}
        <canvas
          ref={canvasRef}
          style={{ filter: "contrast(1.05) brightness(1.02) saturate(1.03)" }}
          className={`absolute inset-0 w-full h-full object-cover will-change-transform transition-opacity duration-300 ${
            isPlayingVideo ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />

        {/* High-Resolution HTML5 Video Element (Used when user clicks Play Flythrough) */}
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          playsInline
          muted
          loop
          preload="auto"
          onClick={() => toggleVideoPlayback()}
          className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-500 cursor-pointer ${
            isPlayingVideo ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onEnded={() => setIsPlayingVideo(false)}
        />

        {/* Cinematic Vignette & Edge Masks */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040507] via-transparent to-[#040507]/70 opacity-90" />
        <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#040507]/75" />

        {/* Ambient Warm & Cool Spotlights (Obsidian Noir Palette) */}
        <div
          className="pointer-events-none absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full blur-[160px] transition-all duration-700"
          style={{
            background:
              activeChapterIndex >= 4
                ? "radial-gradient(circle, rgba(245, 158, 11, 0.38) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(234, 88, 12, 0.3) 0%, transparent 70%)",
            opacity: activeChapterIndex < 4 ? 0.35 : 0.65,
          }}
        />
        <div
          className="pointer-events-none absolute -top-40 -right-40 w-[650px] h-[650px] rounded-full blur-[160px] transition-all duration-700"
          style={{
            background:
              activeChapterIndex >= 4
                ? "radial-gradient(circle, rgba(56, 189, 248, 0.28) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(14, 165, 233, 0.35) 0%, transparent 70%)",
            opacity: activeChapterIndex < 4 ? 0.45 : 0.25,
          }}
        />

        {/* ========================================================
            NARRATIVE OVERLAYS (SYNCHRONIZED BY CHAPTER THRESHOLDS)
        ======================================================== */}

        {/* --------------------------------------------------------
            ACT 01: HERO OPENING
        -------------------------------------------------------- */}
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 transition-all duration-500 ${
            activeChapterIndex === 0
              ? "opacity-100 translate-y-0 z-20 pointer-events-auto"
              : "opacity-0 -translate-y-12 pointer-events-none invisible z-0"
          }`}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/75 border border-white/20 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-amber-300 mb-5 sm:mb-6 backdrop-blur-md shadow-lg shadow-black/80 font-semibold max-w-full truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span className="truncate">Architectural Climate Engineering</span>
              <span className="text-zinc-500 hidden sm:inline">|</span>
              <span className="text-amber-400 font-bold hidden sm:inline">2.5K Ultra-Sharp</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              <span className="block tracking-tight text-white">COMFORT,</span>
              <span className="block mt-1 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(245,158,11,0.5)]">
                ENGINEERED.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg text-zinc-100 font-medium leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] px-2 sm:px-0">
              Intelligent heating, cooling, and laminar airflow designed around the way you live. Visualizing what happens behind the walls.
            </p>

            {/* CTAs & Controls */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 relative z-30">
              <button
                type="button"
                onClick={toggleVideoPlayback}
                className="group relative z-30 inline-flex items-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-black text-[11px] sm:text-xs font-bold tracking-wider uppercase hover:bg-zinc-200 transition-all shadow-xl shadow-white/10 cursor-pointer active:scale-95"
              >
                {isPlayingVideo ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-black" />
                    <span>Pause Movie</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>Play 4K Flythrough</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => jumpToChapter(CHAPTERS[1])}
                className="relative z-30 inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-black/60 border border-white/20 text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase hover:bg-white/10 transition-colors backdrop-blur-md cursor-pointer shadow-lg active:scale-95"
              >
                <span>Scroll To Explore</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Scroll Indicator */}
            <div
              onClick={() => jumpToChapter(CHAPTERS[1])}
              className="mt-8 sm:mt-12 flex flex-col items-center gap-1 text-zinc-300 font-mono text-[10px] sm:text-[11px] tracking-widest uppercase animate-bounce drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] cursor-pointer"
            >
              <span>Scroll To Explore Architecture</span>
              <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------
            ACT 02: SECTION 02 — THE STRUCTURAL CUTAWAY
        -------------------------------------------------------- */}
        <div
          className={`absolute inset-0 flex flex-col justify-end lg:justify-center items-start px-5 sm:px-12 lg:px-20 pb-20 sm:pb-24 lg:pb-0 transition-all duration-500 ${
            activeChapterIndex === 1
              ? "opacity-100 translate-x-0 z-20 pointer-events-auto"
              : activeChapterIndex < 1
              ? "opacity-0 translate-x-12 pointer-events-none invisible z-0"
              : "opacity-0 -translate-x-12 pointer-events-none invisible z-0"
          }`}
        >
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/70 border border-white/20 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold mb-3 sm:mb-4 backdrop-blur-md drop-shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Section 02 — The Structural Cutaway</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Comfort doesn&apos;t start at the thermostat.
            </h2>

            <p className="mt-2 sm:mt-3 text-base sm:text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              It starts behind the walls.
            </p>

            <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-zinc-100 font-medium leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] max-w-lg line-clamp-3 sm:line-clamp-none">
              As the camera cuts through the envelope, hidden supply trunks and insulated return paths appear. Dual-zone architecture balances sub-zero winter temperatures on the left and summer cooling on the right.
            </p>
          </div>
        </div>

        {/* --------------------------------------------------------
            ACT 03: SECTION 03 — THE AIRFLOW STORY
        -------------------------------------------------------- */}
        <div
          className={`absolute inset-0 flex flex-col justify-end lg:justify-center items-start sm:items-end px-5 sm:px-12 lg:px-20 pb-20 sm:pb-24 lg:pb-0 transition-all duration-500 ${
            activeChapterIndex === 2
              ? "opacity-100 translate-y-0 z-20 pointer-events-auto"
              : activeChapterIndex < 2
              ? "opacity-0 translate-y-12 pointer-events-none invisible z-0"
              : "opacity-0 -translate-y-12 pointer-events-none invisible z-0"
          }`}
        >
          <div className="max-w-xl text-left sm:text-right flex flex-col items-start sm:items-end">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/70 border border-white/20 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-sky-300 font-bold mb-3 sm:mb-4 backdrop-blur-md drop-shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>Section 03 — Airflow Dynamics</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              Air should move with purpose.
            </h2>

            <p className="mt-2 sm:mt-3 text-base sm:text-2xl font-bold text-sky-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              Laminar circulation without turbulence or drafts.
            </p>

            <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-zinc-100 font-medium leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] max-w-lg line-clamp-3 sm:line-clamp-none">
              Luminous energy lines trace aerodynamic currents. Fresh air enters through high-induction ceiling registers, displacing stale air without acoustic noise.
            </p>
          </div>
        </div>

        {/* --------------------------------------------------------
            ACT 04: SECTION 04 — THE HIDDEN MACHINE
        -------------------------------------------------------- */}
        <div
          className={`absolute inset-0 flex flex-col justify-end lg:justify-center items-start px-5 sm:px-12 lg:px-20 pb-20 sm:pb-24 lg:pb-0 transition-all duration-500 ${
            activeChapterIndex === 3
              ? "opacity-100 translate-y-0 z-20 pointer-events-auto"
              : activeChapterIndex < 3
              ? "opacity-0 translate-y-12 pointer-events-none invisible z-0"
              : "opacity-0 -translate-y-12 pointer-events-none invisible z-0"
          }`}
        >
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/70 border border-white/20 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-sky-300 font-bold mb-3 sm:mb-4 backdrop-blur-md drop-shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>Section 04 — Technical Mechanical Core</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              The machine behind the comfort.
            </h2>

            <p className="mt-2 sm:mt-3 text-base sm:text-2xl font-bold text-sky-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              Precision engineering, hidden behind the experience.
            </p>

            <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-zinc-100 font-medium leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] max-w-lg line-clamp-3 sm:line-clamp-none">
              Transitioning into the acoustic mechanical heart. High-inverter compressors modulate down to 10% capacity, matching thermal envelope load microsecond by microsecond with zero energy waste.
            </p>
          </div>
        </div>

        {/* --------------------------------------------------------
            ACT 05: SECTION 05 — VILLA MORPH & SEASONS
        -------------------------------------------------------- */}
        <div
          className={`absolute inset-0 flex flex-col justify-end lg:justify-center items-start sm:items-end px-5 sm:px-12 lg:px-20 pb-20 sm:pb-24 lg:pb-0 transition-all duration-500 ${
            activeChapterIndex === 4
              ? "opacity-100 translate-x-0 z-20 pointer-events-auto"
              : activeChapterIndex < 4
              ? "opacity-0 translate-x-12 pointer-events-none invisible z-0"
              : "opacity-0 -translate-x-12 pointer-events-none invisible z-0"
          }`}
        >
          <div className="max-w-xl text-left sm:text-right flex flex-col items-start sm:items-end">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/70 border border-white/20 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold mb-3 sm:mb-4 backdrop-blur-md drop-shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Section 05 — The Morphing Transformation</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              One system. Every season.
            </h2>

            <p className="mt-2 sm:mt-3 text-base sm:text-2xl font-bold bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              Designed to maintain comfort as the world outside changes.
            </p>

            <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-zinc-100 font-medium leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] max-w-lg line-clamp-3 sm:line-clamp-none">
              Floor-to-ceiling glazing meets sub-zero mountain snow outside, while glowing in-slab hydronic coils and sleek wall mini-splits envelope the living spaces in total warmth.
            </p>
          </div>
        </div>

        {/* --------------------------------------------------------
            ACT 06: SECTION 09 — THE FINAL REVEAL
        -------------------------------------------------------- */}
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 transition-all duration-500 ${
            activeChapterIndex === 5
              ? "opacity-100 translate-y-0 z-20 pointer-events-auto"
              : "opacity-0 translate-y-12 pointer-events-none invisible z-0"
          }`}
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/70 border border-white/20 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-4 sm:mb-5 backdrop-blur-md drop-shadow-md">
              <span>Act 06 — Complete Architectural Integration</span>
            </div>

            <h2 className="text-3xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              See the difference.{" "}
              <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(245,158,11,0.5)]">
                Feel the comfort.
              </span>
            </h2>

            <p className="mt-3 sm:mt-5 max-w-xl text-sm sm:text-lg text-zinc-100 font-medium leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] px-2 sm:px-0">
              From foundation to roofline, intelligent engineering transforms invisible air into seamless living luxury.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 relative z-30">
              <a
                href="#seasons"
                className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-black text-[11px] sm:text-xs font-bold tracking-wider uppercase hover:bg-zinc-200 transition-colors shadow-xl shadow-white/10"
              >
                Inspect Engineering Specs
              </a>
              <a
                href="#contact"
                className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-black/60 border border-white/20 text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase hover:bg-white/10 transition-colors backdrop-blur-md shadow-lg"
              >
                Request Consultation
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================
            CINEMATIC HUD & CAMERA TELEMETRY FOOTER
        ======================================================== */}
        <div className="pointer-events-none absolute bottom-4 sm:bottom-5 left-3 sm:left-6 right-3 sm:right-6 z-30 flex items-center justify-between text-zinc-400 font-mono text-[10px] sm:text-[11px] gap-2">
          {/* Left: Frame counter & Playback toggle */}
          <div className="flex items-center gap-2 sm:gap-3 bg-[#000000]/85 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/[0.12] backdrop-blur-md pointer-events-auto shadow-xl">
            <button
              onClick={toggleVideoPlayback}
              className="flex items-center gap-1.5 text-white hover:text-amber-400 transition-colors font-bold cursor-pointer whitespace-nowrap"
            >
              {isPlayingVideo ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
              <span>{isPlayingVideo ? "PAUSE" : "PLAY"}</span>
              <span className="hidden sm:inline">{isPlayingVideo ? " MOVIE" : " FLYTHROUGH"}</span>
            </button>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-emerald-400 font-semibold hidden md:inline">2.5K QHD</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span ref={percentTextRef} className="text-zinc-400 hidden sm:inline">0%</span>
          </div>

          {/* Right: Chapter Title indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#000000]/85 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/[0.12] backdrop-blur-md ml-auto pointer-events-auto shadow-xl whitespace-nowrap">
            <span className="hidden sm:inline text-zinc-500 uppercase text-[10px]">CH:</span>
            <span className="text-white font-semibold">
              {CHAPTERS[activeChapterIndex]?.title}
            </span>
          </div>
        </div>

        {/* ========================================================
            RIGHT TIMELINE SCRUB TRACK (INTERACTIVE JUMP BUTTONS)
        ======================================================== */}
        <aside aria-label="Cinematic Timeline Navigation" className="hidden lg:flex flex-col items-end gap-3 absolute right-6 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
          {CHAPTERS.map((chap, idx) => {
            const isActive = activeChapterIndex === idx;
            return (
              <button
                key={chap.id}
                onClick={() => jumpToChapter(chap)}
                className="group flex items-center gap-3 text-right cursor-pointer"
              >
                <span
                  className={`text-[11px] font-mono tracking-wider transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                    isActive ? "opacity-100 text-white font-semibold" : "text-zinc-400"
                  }`}
                >
                  {chap.number} {chap.title}
                </span>
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 border ${
                    isActive
                      ? "w-3 h-3 bg-white border-white scale-110 shadow-lg shadow-white/50"
                      : "bg-white/20 border-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            );
          })}
        </aside>

        {/* Soft Editorial Fade into Dark Graphite (#1D1D1E) Page Flow */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-44 bg-gradient-to-b from-transparent via-[#1D1D1E]/60 to-[#1D1D1E] z-20 transition-all duration-500" />
      </div>
    </div>
  );
}
