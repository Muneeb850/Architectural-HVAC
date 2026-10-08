"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Architecture", href: "/architecture" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { isDark } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHeroDark = pathname === "/" && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? isDark
            ? "bg-[#1D1D1E]/92 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-sm"
            : "bg-[#FAF8F5]/92 backdrop-blur-xl border-b border-black/[0.08] py-3.5 shadow-sm"
          : pathname !== "/"
          ? isDark
            ? "bg-[#1D1D1E]/80 backdrop-blur-md border-b border-white/[0.06] py-4"
            : "bg-[#FAF8F5]/80 backdrop-blur-md border-b border-black/[0.06] py-4"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className={`relative flex items-center justify-center w-8 h-8 rounded-lg border transition-colors overflow-hidden ${
              isHeroDark
                ? "bg-white/[0.05] border-white/[0.15] group-hover:border-white/[0.3]"
                : isDark
                ? "bg-[#252528] border-white/[0.12] group-hover:border-white/[0.25]"
                : "bg-white border-black/[0.1] group-hover:border-black/[0.2] shadow-sm"
            }`}
          >
            <span className="font-mono text-xs font-black tracking-tighter text-amber-500 select-none">
              A<span className={isHeroDark || isDark ? "text-zinc-400" : "text-zinc-500"}>|</span>C
            </span>
          </div>
          <div className="flex flex-col">
            <span
              className={`text-sm font-bold tracking-tight font-mono flex items-center gap-1 transition-colors ${
                isHeroDark || isDark ? "text-white" : "text-[#141518]"
              }`}
            >
              AERO<span className="text-amber-500">|</span>CLIMATE
            </span>
            <span
              className={`text-[9px] tracking-widest uppercase font-mono transition-colors ${
                isHeroDark || isDark ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              Architectural HVAC
            </span>
          </div>
        </Link>

        {/* Clean Center Multi-Page Links */}
        <div
          className={`hidden md:flex items-center gap-8 text-[12px] font-medium tracking-wider uppercase transition-colors`}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 font-mono transition-all duration-300 ${
                  isActive
                    ? isDark
                      ? "text-amber-400 font-bold"
                      : "text-amber-600 font-bold"
                    : scrolled
                    ? isDark
                      ? "text-zinc-300 hover:text-white"
                      : "text-zinc-600 hover:text-[#141518]"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <div
            className={`hidden lg:flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono transition-colors ${
              scrolled
                ? isDark
                  ? "bg-white/[0.04] border border-white/[0.08] text-zinc-300"
                  : "bg-black/[0.04] border border-black/[0.08] text-zinc-600"
                : "bg-white/[0.03] border border-white/[0.08] text-zinc-400"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Studio Live</span>
          </div>

          <Link
            href="/contact"
            className={`group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md ${
              scrolled
                ? isDark
                  ? "text-black bg-white hover:bg-zinc-200 shadow-black/30"
                  : "text-white bg-[#141518] hover:bg-black shadow-black/10"
                : "text-black bg-white hover:bg-zinc-200 shadow-white/5"
            }`}
          >
            <span>Request a Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              isHeroDark
                ? "text-white bg-white/10 border-white/20 hover:bg-white/20"
                : isDark
                ? "text-zinc-200 bg-white/[0.06] border-white/[0.12] hover:bg-white/[0.12]"
                : "text-[#141518] bg-black/[0.04] border-black/[0.1] hover:bg-black/[0.08]"
            }`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-5 pt-4 pb-7 border-b backdrop-blur-2xl animate-in slide-in-from-top-2 duration-300 shadow-2xl ${
            isDark
              ? "bg-[#1D1D1E]/98 border-white/[0.1] text-zinc-300"
              : "bg-[#FAF8F5]/98 border-black/[0.1] text-zinc-700"
          }`}
        >
          <div className="flex flex-col space-y-2 text-xs font-mono uppercase tracking-wider">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-3 px-3 rounded-xl flex items-center justify-between transition-colors ${
                    isActive
                      ? isDark
                        ? "text-amber-400 font-bold bg-white/[0.05]"
                        : "text-amber-600 font-bold bg-black/[0.04]"
                      : isDark
                      ? "hover:text-white hover:bg-white/[0.03]"
                      : "hover:text-[#141518] hover:bg-black/[0.02]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                </Link>
              );
            })}
          </div>
          <div className={`pt-4 border-t mt-4 ${isDark ? "border-white/[0.08]" : "border-black/[0.08]"}`}>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors shadow-lg ${
                isDark ? "text-black bg-white hover:bg-zinc-200" : "text-white bg-[#141518] hover:bg-black"
              }`}
            >
              Request a Quote
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

