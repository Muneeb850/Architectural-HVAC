"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, PhoneCall } from "lucide-react";

export default function CtaSection() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="contact" className="relative w-full py-32 bg-[#FAF8F5] dark:bg-[#1D1D1E] text-[#141518] dark:text-white overflow-hidden border-t border-black/[0.06] dark:border-white/[0.08] transition-colors duration-500">
      {/* Subtle Luminous Warm Radial Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[350px] rounded-full blur-[160px] opacity-25 bg-gradient-to-r from-orange-300/40 via-amber-200/30 to-sky-200/40" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Animated Airflow Vector Line */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-500 to-transparent mb-8 animate-pulse" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.12] text-xs font-mono tracking-widest uppercase text-[#141518] dark:text-zinc-200 mb-6 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Architectural Consultation Booking</span>
        </div>

        {/* Large Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#141518] dark:text-white leading-tight">
          Ready to engineer{" "}
          <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-sky-600 bg-clip-text text-transparent">
            better comfort?
          </span>
        </h2>

        {/* Supporting text */}
        <p className="mt-4 max-w-xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
          Let&apos;s design a climate system around your space. We calculate heat loads, model airflow dynamics, and deliver silent, whole-home equilibrium.
        </p>

        {/* Form / Actions */}
        <div className="mt-10 w-full max-w-md">
          {submitted ? (
            <div className="p-6 rounded-2xl bg-white dark:bg-[#252528] border border-emerald-500/30 text-center animate-in fade-in duration-500 shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <h3 className="text-base font-bold text-[#141518] dark:text-white">Consultation Request Received</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Our engineering team will review your plans and respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or project address"
                className="flex-1 px-5 py-3.5 rounded-full bg-white dark:bg-[#252528] border border-black/[0.12] dark:border-white/[0.15] text-sm text-[#141518] dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#141518] dark:focus:border-white transition-colors shadow-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-full bg-[#141518] dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider hover:bg-black dark:hover:bg-zinc-200 transition-colors cursor-pointer shadow-md shadow-black/10"
              >
                Request Quote
              </button>
            </form>
          )}

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs text-zinc-500 dark:text-zinc-400">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline"
            >
              <span>Full Commission Configurator & Blueprint Upload</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <span className="hidden sm:inline">•</span>
            <a
              href="tel:+18005550199"
              className="inline-flex items-center gap-2 hover:text-[#141518] dark:hover:text-white transition-colors font-mono"
            >
              <PhoneCall className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              <span>Talk to an Engineer: (800) 555-0199</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
