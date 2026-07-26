"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const covers = [
  { id: "game-gow",     key: "gow",    name: "God of War Ragnarök",   src: "/images/covers/gow.webp" },
  { id: "game-cyber",   key: "cyber",  name: "Cyberpunk 2077",         src: "/images/covers/cyberpunk.webp" },
  { id: "game-elden",   key: "elden",  name: "Elden Ring",             src: "/images/covers/elden_ring.webp" },
  { id: "game-horizon", key: "horizon", name: "Horizon Forbidden West", src: "/images/covers/horizon.webp" },
  { id: "game-racing",  key: "racing",  name: "Gran Turismo 7",         src: "/images/covers/racing.webp" },
  { id: "game-ghost",   key: "ghost",   name: "Ghost of Tsushima",      src: "/images/covers/samurai.webp" },
];

export default function DualSensePromo({ onAddToCart }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const { t } = useLanguage();

  // Change the active game info panel every 4 seconds in sync with scroll speed
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setActiveIdx((prev) => (prev + 1) % covers.length);
        setFadeIn(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeCover = covers[activeIdx];
  const activeGenre = t(`dualsensePromo.games.${activeCover.key}.genre`);
  const activeDesc = t(`dualsensePromo.games.${activeCover.key}.desc`);

  // Duplicated covers for seamless infinite loop
  const loopCovers = [...covers, ...covers];

  return (
    <section className="relative w-full h-[460px] sm:h-[480px] md:h-[460px] lg:h-[540px] bg-[#08080c] overflow-hidden border-b border-white/5">

      {/* Background image — DualSense controller */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: "url('/Dualsense.webp')" }}
      />

      {/* Left gradient to darken over controller background on desktop */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#08080c] via-[#08080c]/80 to-transparent z-10 pointer-events-none" />

      {/* Top / bottom edge fade */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#08080c] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#08080c] to-transparent z-10 pointer-events-none" />

      {/* Red top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rog-red/40 to-transparent z-20" />

      {/* ── Main layout ── */}
      <div className="absolute inset-0 z-20 flex items-center px-4 sm:px-10 lg:px-20">
        <div className="w-full max-w-5xl mx-auto flex items-center gap-6 lg:gap-14">

          {/* ── Vertical looping image strip (reference layout) ── */}
          <div className="relative flex-shrink-0 h-[360px] sm:h-[400px] lg:h-[460px] w-[140px] sm:w-[175px] overflow-hidden rounded-2xl border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            {/* Top / bottom fade on the strip itself */}
            <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#08080c] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#08080c] to-transparent z-10 pointer-events-none" />

            {/* Scrolling track — duplicated to create seamless loop */}
            <div className="vertical-scroll-track flex flex-col gap-3 py-3">
              {loopCovers.map((cover, i) => (
                <div
                  key={`${cover.id}-${i}`}
                  className="relative flex-shrink-0 w-full aspect-[3/4] rounded-xl overflow-hidden border border-white/8 hover:border-rog-red/60 group transition-all duration-300 cursor-pointer hover:shadow-[0_0_18px_rgba(227,0,22,0.35)]"
                  onClick={() => {
                    const idx = covers.findIndex((c) => c.id === cover.id);
                    if (idx !== -1) {
                      setFadeIn(false);
                      setTimeout(() => {
                        setActiveIdx(idx);
                        setFadeIn(true);
                      }, 200);
                    }
                  }}
                >
                  <img
                    src={cover.src}
                    alt={cover.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                    <span className="text-[9px] font-bold text-white uppercase tracking-wide line-clamp-2 leading-tight">
                      {cover.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Game info panel ── */}
          <div className="flex flex-col text-left max-w-xs sm:max-w-sm lg:max-w-lg -translate-y-6 sm:-translate-y-8">
            
            {/* Section Title (Static) */}
            <div className="mb-4">
              <span className="text-[8px] sm:text-[9px] font-sans font-black tracking-[0.3em] text-rog-red uppercase block mb-0.5">
                {t("dualsensePromo.sectionTagline")}
              </span>
              <h2 className="font-display font-bold text-xs sm:text-sm lg:text-base text-white/80 uppercase tracking-widest">
                {t("dualsensePromo.sectionTitle")}
              </h2>
            </div>

            {/* Changing / rolling game details (Animated) */}
            <div
              style={{
                opacity: fadeIn ? 1 : 0,
                transform: fadeIn ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
              className="flex flex-col text-left h-[160px] sm:h-[140px] lg:h-[130px]"
            >
              {/* Genre */}
              <span className="text-[10px] font-extrabold text-slate-500 tracking-widest uppercase mb-1">
                {activeGenre}
              </span>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white uppercase tracking-tight leading-none mb-3">
                {activeCover.name}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-md">
                {activeDesc}
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
