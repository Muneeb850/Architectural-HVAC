"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/[0.08] py-16 bg-[#151516] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#252528] border border-white/[0.12] shadow-sm overflow-hidden">
                <span className="font-mono text-xs font-black tracking-tighter text-amber-500 select-none">
                  A<span className="text-zinc-400">|</span>C
                </span>
              </div>
              <span className="text-base font-bold tracking-tight text-white font-mono">
                AERO<span className="text-amber-500">|</span>CLIMATE
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-light max-w-sm">
              Whole-home architectural climate engineering. Inverter heat pumps, concealed ductwork distribution, in-slab hydronic radiant warmth, and acoustic whisper-quiet comfort.
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>HQ & Fabrication: Denver, Colorado</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2 font-semibold">
              Navigation
            </span>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="hover:text-white transition-colors">
                  Architecture & Systems
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  Client Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Booking
                </Link>
              </li>
            </ul>
          </div>

          {/* Systems Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2 font-semibold">
              Engineering Systems
            </span>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/architecture" className="hover:text-white transition-colors">
                  Concealed Linear Diffusers
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="hover:text-white transition-colors">
                  Sub-Slab Hydronic Loops
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="hover:text-white transition-colors">
                  Acoustic Attenuation (16.5 dBA)
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="hover:text-white transition-colors">
                  Cold-Climate Inverters (-22°F)
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="hover:text-white transition-colors">
                  Energy Recovery ERV (85%)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Consultation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2 font-semibold">
              Consultation
            </span>
            <p className="text-xs text-zinc-400">
              Direct engineering inquiries and architect blueprint reviews:
            </p>
            <div className="pt-1">
              <a
                href="mailto:engineering@aeroclimate.io"
                className="text-xs font-mono text-white hover:text-amber-400 transition-colors block font-semibold"
              >
                engineering@aeroclimate.io
              </a>
              <span className="text-xs font-mono text-zinc-400 block mt-1">
                +1 (800) 555-0199
              </span>
            </div>

            <div className="pt-4 flex items-center gap-3 text-xs font-mono text-zinc-400">
              <span className="hover:text-white transition-colors cursor-pointer">LinkedIn</span>
              <span>•</span>
              <span className="hover:text-white transition-colors cursor-pointer">Instagram</span>
              <span>•</span>
              <span className="hover:text-white transition-colors cursor-pointer">ArchDaily</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-400 gap-4">
          <p>© 2026 AERO|CLIMATE Engineering Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Architect Terms</span>
            <span className="hover:text-white cursor-pointer">System Telemetry</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
