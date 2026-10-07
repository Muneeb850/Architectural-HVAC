"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function FloatingThemeToggle() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 pointer-events-auto">
      <button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className={`group flex items-center gap-2 p-2.5 sm:px-4 sm:py-2.5 rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-300 cursor-pointer ${
          isDark
            ? "bg-[#252528]/90 border-white/[0.15] text-white hover:bg-[#2C2C30] hover:border-white/[0.25] shadow-black/60"
            : "bg-[#FAF8F5]/90 border-black/[0.1] text-[#141518] hover:bg-white hover:border-black/[0.2] shadow-black/10"
        }`}
      >
        <div
          className={`flex items-center justify-center w-6 h-6 rounded-full transition-transform duration-500 ${
            isDark ? "bg-amber-400/20 text-amber-300 rotate-180" : "bg-black/5 text-amber-600 rotate-0"
          }`}
        >
          {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </div>

        <span className="hidden sm:inline text-[11px] font-mono uppercase tracking-wider font-bold">
          {isDark ? "Graphite (#1D1D1E)" : "Cream (#FAF8F5)"}
        </span>
      </button>
    </div>
  );
}

