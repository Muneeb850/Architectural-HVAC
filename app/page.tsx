"use client";

import Navbar from "@/components/Navbar";
import CinematicScrollEngine from "@/components/CinematicScrollEngine";
import IntroductionSection from "@/components/IntroductionSection";
import InvisibleArchitectureSection from "@/components/InvisibleArchitectureSection";
import SeasonTransformationSection from "@/components/SeasonTransformationSection";
import FloatingReviewsSection from "@/components/FloatingReviewsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import FloatingThemeToggle from "@/components/FloatingThemeToggle";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { isDark } = useTheme();

  return (
    <div
      className={`relative w-full min-h-screen selection:bg-amber-500/20 selection:text-amber-900 transition-colors duration-500 ${
        isDark ? "bg-[#1D1D1E] text-white" : "bg-[#FAF8F5] text-[#141518]"
      }`}
    >
      {/* Minimal Glass Navbar */}
      <Navbar />

      {/* Section 01: Cinematic Scroll-Driven Canvas Engine (650vh Interactive Scrub) */}
      <CinematicScrollEngine />

      {/* Section 02: Introduction Section (Spatial 3D Card Runway) */}
      <IntroductionSection />

      {/* Section 03: Invisible Architecture (Clean, Simple, Cinematic Reveal) */}
      <InvisibleArchitectureSection />

      {/* Section 04: Season Transformation (Interactive Split Comparison) */}
      <SeasonTransformationSection />

      {/* Section 05: Floating Architectural Reviews Section */}
      <FloatingReviewsSection />

      {/* Section 06: Architectural Consultation CTA */}
      <CtaSection />

      {/* Footer */}
      <Footer />

      {/* Floating Light/Dark Theme Switcher (Cream #FAF8F5 <-> Dark Graphite #1D1D1E) */}
      <FloatingThemeToggle />
    </div>
  );
}

