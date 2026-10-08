"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingThemeToggle from "@/components/FloatingThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Send,
} from "lucide-react";

export default function ContactPage() {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Modern Glass Villa",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "Modern Glass Villa",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 overflow-x-hidden ${
        isDark ? "bg-[#1D1D1E] text-white" : "bg-[#FAF8F5] text-[#141518]"
      }`}
    >
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-28 sm:pt-44 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-5 sm:mb-6 backdrop-blur-md transition-colors ${
              isDark
                ? "bg-white/[0.05] border border-white/[0.12] text-zinc-300"
                : "bg-black/[0.04] border border-black/[0.08] text-[#141518]"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Studio Intake — Denver Engineering HQ</span>
          </div>

          <h1
            className={`text-3xl sm:text-6xl font-black uppercase tracking-tight leading-[1.08] transition-colors ${
              isDark ? "text-white" : "text-[#141518]"
            }`}
          >
            Get in touch.{" "}
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                isDark ? "from-amber-300 to-amber-100" : "from-amber-600 to-amber-700"
              }`}
            >
              Start your project.
            </span>
          </h1>

          <p
            className={`mt-4 sm:mt-5 text-sm sm:text-lg font-light leading-relaxed max-w-2xl transition-colors ${
              isDark ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            Connect directly with our architectural climate engineers for project inquiries,
            blueprint assessments, or bespoke whole-home climate specifications.
          </p>
        </div>
      </section>

      {/* Main Content Grid: Simple Form & Contact Information */}
      <section className="relative pb-24 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Simple Form (Left 7 Cols) */}
          <div className="lg:col-span-7">
            <div
              className={`p-5 sm:p-10 rounded-2xl sm:rounded-3xl border transition-all duration-300 shadow-xl ${
                isDark
                  ? "bg-[#252528]/80 border-white/[0.1]"
                  : "bg-white border-black/[0.08]"
              }`}
            >
              {isSubmitted ? (
                <div className="py-12 text-center animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-emerald-500">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3">
                    Message Received
                  </h2>
                  <p
                    className={`text-sm sm:text-base max-w-md mx-auto font-light leading-relaxed mb-6 ${
                      isDark ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    Thank you, <span className="font-semibold text-amber-500">{formData.name || "Client"}</span>.
                    Our engineering studio has received your message and will get back to you within 24 hours.
                  </p>

                  <button
                    onClick={handleReset}
                    type="button"
                    className={`px-7 py-3 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                      isDark
                        ? "bg-white text-black hover:bg-zinc-200"
                        : "bg-[#141518] text-white hover:bg-black"
                    }`}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold uppercase tracking-tight mb-1">
                      Send a Message
                    </h2>
                    <p
                      className={`text-xs font-light ${
                        isDark ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      Fill out the form below and an engineer will reply shortly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-2 text-zinc-500">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Julian Vance"
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none ${
                          isDark
                            ? "bg-[#1D1D1E] border-white/[0.15] text-white focus:border-amber-400"
                            : "bg-[#FAF8F5] border-black/[0.12] text-[#141518] focus:border-amber-600"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-2 text-zinc-500">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="julian@example.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none ${
                          isDark
                            ? "bg-[#1D1D1E] border-white/[0.15] text-white focus:border-amber-400"
                            : "bg-[#FAF8F5] border-black/[0.12] text-[#141518] focus:border-amber-600"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-2 text-zinc-500">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (303) 555-0182"
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none ${
                          isDark
                            ? "bg-[#1D1D1E] border-white/[0.15] text-white focus:border-amber-400"
                            : "bg-[#FAF8F5] border-black/[0.12] text-[#141518] focus:border-amber-600"
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider mb-2 text-zinc-500">
                        Project Type
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none ${
                          isDark
                            ? "bg-[#1D1D1E] border-white/[0.15] text-white focus:border-amber-400"
                            : "bg-[#FAF8F5] border-black/[0.12] text-[#141518] focus:border-amber-600"
                        }`}
                      >
                        <option>Modern Glass Villa</option>
                        <option>Alpine Mountain Chalet</option>
                        <option>Urban Penthouse / Loft</option>
                        <option>Architectural Estate</option>
                        <option>Existing Residence Retrofit</option>
                        <option>General Engineering Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider mb-2 text-zinc-500">
                      Project Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your home, location, architectural requirements, or climate objectives..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none resize-none ${
                        isDark
                          ? "bg-[#1D1D1E] border-white/[0.15] text-white focus:border-amber-400"
                          : "bg-[#FAF8F5] border-black/[0.12] text-[#141518] focus:border-amber-600"
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 shadow-xl cursor-pointer disabled:opacity-50 ${
                      isDark
                        ? "bg-white text-black hover:bg-zinc-200"
                        : "bg-[#141518] text-white hover:bg-black"
                    }`}
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    {isSubmitting ? (
                      <Send className="w-3.5 h-3.5 animate-pulse" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Direct Studio Details (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`p-5 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 shadow-xl ${
                isDark
                  ? "bg-[#252528]/80 border-white/[0.1]"
                  : "bg-white border-black/[0.08]"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-amber-600 dark:text-amber-400 font-bold mb-4">
                <MapPin className="w-3.5 h-3.5" />
                <span>Fabrication & Studio HQ</span>
              </div>

              <h3 className="text-xl font-bold uppercase tracking-tight mb-2">
                Denver Engineering HQ
              </h3>
              <p
                className={`text-xs font-light leading-relaxed mb-6 ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                1840 Wynkoop Street, Suite 400<br />
                Denver, Colorado 80202<br />
                <span className="font-mono text-[11px] text-zinc-500">GPS: 39.7539° N, 104.9984° W</span>
              </p>

              <div className="space-y-4 pt-5 border-t border-black/[0.08] dark:border-white/[0.08]">
                <div className="flex items-start gap-3">
                  <PhoneCall className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Telephone</span>
                    <a
                      href="tel:+18005550199"
                      className="text-xs font-mono font-bold hover:text-amber-500 transition-colors"
                    >
                      +1 (800) 555-0199
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Direct Email</span>
                    <a
                      href="mailto:engineering@aeroclimate.io"
                      className="text-xs font-mono font-bold hover:text-amber-500 transition-colors"
                    >
                      engineering@aeroclimate.io
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block">Studio Hours</span>
                    <span className="text-xs font-mono">Mon–Fri: 08:00 – 18:00 Mountain</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Assurance Box */}
            <div
              className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 ${
                isDark
                  ? "bg-white/[0.02] border-white/[0.06] text-zinc-400"
                  : "bg-black/[0.02] border-black/[0.06] text-zinc-600"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#141518] dark:text-white">
                  Engineering Commitment
                </span>
              </div>
              <p className="text-xs font-light leading-relaxed">
                All blueprints and design specifications are treated under mutual confidentiality.
                Our team responds to all inquiries within one business day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingThemeToggle />
    </div>
  );
}
