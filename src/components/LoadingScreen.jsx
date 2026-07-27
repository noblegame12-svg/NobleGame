"use client";

import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Lock scrolling while loader is active
    document.body.style.overflow = "hidden";

    // Smooth artificial progress animation (approx 2.4 seconds to reach 100%)
    const startTime = Date.now();
    const duration = 2400; // 2.4 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setProgress(calculatedProgress);

      if (calculatedProgress >= 100) {
        clearInterval(interval);
        // Delay slightly at 100% before initiating fade out
        setTimeout(() => {
          setIsFadingOut(true);
          // Unlock scroll
          document.body.style.overflow = "";

          // Hide completely after fade out transition finishes (600ms)
          setTimeout(() => {
            setIsHidden(true);
          }, 600);
        }, 300);
      }
    }, 30);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col justify-between items-center bg-[#08080c] text-white select-none transition-opacity duration-600 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Top spacing element for flex centering */}
      <div className="w-full h-12" />

      {/* Center Content: Logo + Brand + Progress */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        {/* Noble Game Logo (Clean standalone logo, no card shape or background rings) */}
        <div className="mb-2">
          <img
            src="/Noble Game White.webp"
            alt="Noble Game Logo"
            className="w-28 h-28 sm:w-36 sm:h-36 object-contain"
          />
        </div>

        {/* Brand Name */}
        <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl tracking-widest uppercase text-white">
          NOBLE GAME
        </h1>

        {/* Progress Bar Container */}
        <div className="w-64 sm:w-80 mt-4 space-y-2">
          {/* Bar track */}
          <div className="relative w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/10">
            {/* Solid White Progress Bar */}
            <div
              className="h-full bg-white transition-all duration-75 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Percentage */}
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase tracking-widest px-1">
            <span>LOADING</span>
            <span className="text-white font-bold">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Credits - Design by webteam.dev */}
      <div className="relative z-10 pb-8 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-sans tracking-wide text-slate-400">
        <span className="text-slate-400 font-normal">Design by</span>
        <a
          href="https://webteam.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold tracking-wider text-slate-200 hover:text-white hover:underline underline-offset-4 decoration-white transition-colors"
        >
          webteam.dev
        </a>
      </div>
    </div>
  );
}
