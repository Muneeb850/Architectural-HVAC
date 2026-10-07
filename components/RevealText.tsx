"use client";

import React from "react";

interface MaskedHeadingProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

export function MaskedHeading({ children, className = "", delayMs = 0 }: MaskedHeadingProps) {
  return (
    <div className="overflow-hidden inline-block">
      <div
        className={`transform transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
        style={{ transitionDelay: `${delayMs}ms` }}
      >
        {children}
      </div>
    </div>
  );
}

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delayOffsetMs?: number;
}

export function SplitTextWords({ text, className = "", wordClassName = "", delayOffsetMs = 0 }: SplitTextProps) {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span
            className={`inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${wordClassName}`}
            style={{ transitionDelay: `${delayOffsetMs + i * 40}ms` }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

interface CharacterRevealProps {
  text: string;
  className?: string;
  charClassName?: string;
  delayOffsetMs?: number;
}

export function CharacterReveal({ text, className = "", charClassName = "", delayOffsetMs = 0 }: CharacterRevealProps) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`inline-block transition-all duration-500 ease-out ${charClassName}`}
          style={{ transitionDelay: `${delayOffsetMs + i * 25}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

export function BlurReveal({ children, className = "", delayMs = 0 }: BlurRevealProps) {
  return (
    <div
      className={`transition-all duration-1000 ease-out ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

