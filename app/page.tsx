"use client";

import Navbar from "@/components/Navbar";
import CinematicScrollEngine from "@/components/CinematicScrollEngine";
import IntroductionSection from "@/components/IntroductionSection";
import InvisibleArchitectureSection from "@/components/InvisibleArchitectureSection";
import SeasonTransformationSection from "@/components/SeasonTransformationSection";
import FloatingReviewsSection from "@/components/FloatingReviewsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#1D1D1E] text-white selection:bg-amber-500/20 selection:text-amber-300">
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
    </div>
  );
}

