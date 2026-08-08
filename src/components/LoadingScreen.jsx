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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#08080c] text-white select-none transition-opacity duration-500 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Center Content: Logo + Brand Side by Side */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 px-4 text-center">
        <img
          src="/Noble Game White.webp"
          alt="Noble Game Logo"
          className="h-6 sm:h-8 w-auto object-contain flex-shrink-0"
        />
        <h1 className="font-display font-black text-xs sm:text-sm tracking-widest uppercase text-white leading-none">
          NOBLE GAME
        </h1>
      </div>

      {/* Percentage Counter + webteam.dev in Bottom Right Corner */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 flex flex-col items-end pointer-events-auto select-none">
        <div className="flex items-baseline leading-none font-display font-bold text-3xl sm:text-5xl text-white tracking-tight tabular-nums opacity-90">
          <span>{progress}</span>
          <span className="text-rog-red text-lg sm:text-2xl font-bold ml-0.5">%</span>
        </div>

        <a
          href="https://webteam.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 text-[10px] sm:text-xs font-sans tracking-wider text-slate-400 hover:text-white transition-colors font-medium"
        >
          Webteam.dev
        </a>
      </div>
    </div>
  );
}
