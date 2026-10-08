"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function CtaSection() {
  const { isDark } = useTheme();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className={`relative w-full py-20 sm:py-32 overflow-hidden border-t transition-colors duration-500 ${
        isDark ? "bg-[#1D1D1E] text-white border-white/[0.08]" : "bg-[#FAF8F5] text-[#141518] border-black/[0.06]"
      }`}
    >
      {/* Subtle Luminous Warm Radial Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className={`w-[800px] h-[350px] rounded-full blur-[160px] opacity-20 transition-all duration-700 ${
            isDark ? "bg-amber-400/10" : "bg-amber-300/30"
          }`}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Animated Airflow Vector Line */}
        <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-transparent via-amber-500 to-transparent mb-6 sm:mb-8 animate-pulse" />

        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-5 sm:mb-6 backdrop-blur-md transition-colors ${
            isDark
              ? "bg-white/[0.05] border border-white/[0.12] text-zinc-200"
              : "bg-black/[0.04] border border-black/[0.08] text-[#141518]"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Architectural Consultation Booking</span>
        </div>

        {/* Large Headline */}
        <h2
          className={`text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight transition-colors ${
            isDark ? "text-white" : "text-[#141518]"
          }`}
        >
          Ready to engineer{" "}
          <span
            className={`bg-gradient-to-r bg-clip-text text-transparent ${
              isDark ? "from-amber-300 to-amber-100" : "from-amber-600 to-amber-700"
            }`}
          >
            better comfort?
          </span>
        </h2>

        {/* Supporting text */}
        <p
          className={`mt-3 sm:mt-4 max-w-xl text-sm sm:text-lg font-light leading-relaxed transition-colors ${
            isDark ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          Let&apos;s design a climate system around your space. We calculate heat loads, model airflow dynamics, and deliver silent, whole-home equilibrium.
        </p>

        {/* Form / Actions */}
        <div className="mt-8 sm:mt-10 w-full max-w-md">
          {submitted ? (
            <div
              className={`p-6 rounded-2xl border text-center animate-in fade-in duration-500 shadow-sm transition-colors ${
                isDark ? "bg-[#252528] border-emerald-500/30 text-white" : "bg-white border-emerald-500/30 text-[#141518]"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                OK
              </div>
              <h3 className="text-base font-bold">Consultation Request Received</h3>
              <p className={`text-xs mt-1 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                Our engineering team will review your plans and respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or project address"
                className={`flex-1 px-5 py-3.5 rounded-full text-sm transition-colors shadow-sm focus:outline-none ${
                  isDark
                    ? "bg-[#252528] text-white border border-white/[0.15] placeholder-zinc-500 focus:border-white"
                    : "bg-white text-[#141518] border border-black/[0.12] placeholder-zinc-400 focus:border-[#141518]"
                }`}
              />
              <button
                type="submit"
                className={`px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-black/10 ${
                  isDark
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "bg-[#141518] text-white hover:bg-black"
                }`}
              >
                Request Quote
              </button>
            </form>
          )}

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs text-zinc-500 dark:text-zinc-400 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline"
            >
              <span>Full Commission Configurator & Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <span className="hidden sm:inline">•</span>
            <a
              href="tel:+18005550199"
              className="inline-flex items-center gap-2 hover:text-[#141518] dark:hover:text-white transition-colors font-mono"
            >
              <span>Talk to an Engineer: (800) 555-0199</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
