"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Categories() {
  const [activeId, setActiveId] = useState(null);
  const { t } = useLanguage();

  const categoryList = [
    { 
      id: "cat-box", 
      title: t("categories.box.title"), 
      image: "/Categories/Box.webp", 
      tagline: t("categories.box.tagline"), 
      glowColor: "rgba(227, 0, 22, 0.4)", 
      description: t("categories.box.description") 
    },
    { 
      id: "cat-console", 
      title: t("categories.console.title"), 
      image: "/Categories/Console.webp", 
      tagline: t("categories.console.tagline"), 
      glowColor: "rgba(0, 229, 255, 0.4)", 
      description: t("categories.console.description") 
    },
    { 
      id: "cat-dualshock", 
      title: t("categories.dualshock.title"), 
      image: "/Categories/Dualshock.webp", 
      tagline: t("categories.dualshock.tagline"), 
      glowColor: "rgba(157, 78, 221, 0.4)", 
      description: t("categories.dualshock.description") 
    },
    { 
      id: "cat-monitor", 
      title: t("categories.monitor.title"), 
      image: "/Categories/Monitor.webp", 
      tagline: t("categories.monitor.tagline"), 
      glowColor: "rgba(16, 185, 129, 0.4)", 
      description: t("categories.monitor.description") 
    },
  ];

  const handleClick = (id) => setActiveId((prev) => (prev === id ? null : id));

  return (
    <section className="relative w-full bg-[#060609] border-t border-b border-white/5 overflow-hidden">
      {/* Container: Vertically stacked on mobile (flex-col), Horizontally expanding on desktop (md:flex-row) */}
      <div className="flex flex-col md:flex-row w-full min-h-[560px] md:min-h-[600px]">
        {categoryList.map((category, index) => {
          const active = activeId === category.id;
          const collapsed = activeId !== null && activeId !== category.id;
          const glowSolid = category.glowColor.replace(", 0.4)", ", 1)");
          const isLargeScale = category.id === "cat-console" || category.id === "cat-dualshock";
          const baseScale = isLargeScale ? 1.35 : 1.0;
          const activeScale = isLargeScale ? 1.5 : 1.08;

          return (
            <div
              key={category.id}
              id={category.id}
              onClick={() => handleClick(category.id)}
              className="relative overflow-hidden flex flex-col justify-end cursor-pointer bg-slate-950 border-b md:border-b-0 md:border-r border-white/10 transition-all duration-500 ease-out"
              style={{
                // Mobile height behavior: active expands, collapsed shrinks
                minHeight: active ? "260px" : collapsed ? "70px" : "140px",
                flex: active ? "3.5 0 0%" : collapsed ? "0.4 0 0%" : "1 0 0%",
              }}
            >
              {/* Background Overlays */}
              <div 
                className="absolute inset-0 z-10 transition-colors duration-500"
                style={{ backgroundColor: active ? "rgba(6,6,9,0.45)" : collapsed ? "rgba(6,6,9,0.85)" : "rgba(6,6,9,0.7)" }}
              />
              <div 
                className="absolute inset-0 z-10 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: category.glowColor, opacity: active ? 0.15 : 0 }}
              />

              {/* Glowing Accent Lines */}
              <div 
                className="absolute top-0 left-0 right-0 h-[2px] z-20 origin-left transition-transform duration-500"
                style={{ backgroundColor: glowSolid, boxShadow: `0 0 14px ${category.glowColor}`, transform: active ? "scaleX(1)" : "scaleX(0)" }}
              />

              {/* Category Image */}
              <div 
                className="absolute inset-0 z-0 transition-all duration-700 ease-out overflow-hidden"
                style={{
                  opacity: active ? 0.9 : collapsed ? 0.25 : 0.55,
                  transform: active ? `scale(${activeScale})` : `scale(${baseScale})`,
                  filter: active ? "grayscale(0%)" : "grayscale(70%)",
                }}
              >
                <div className="relative w-full h-full">
                  <Image src={category.image} alt={`${category.title} Category`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              </div>

              {/* Card Content Banner */}
              <div className="relative z-20 w-full flex flex-col justify-end p-4 sm:p-6 transition-all duration-500">
                
                {/* Tagline */}
                <span 
                  className="font-sans font-black tracking-widest uppercase transition-colors duration-300 text-[9px] sm:text-[10px] block"
                  style={{ color: active ? "rgba(255,255,255,0.9)" : "rgba(148,163,184,1)" }}
                >
                  {category.tagline}
                </span>

                {/* Main Title */}
                <h3 
                  className="font-display font-black tracking-[0.15em] uppercase transition-all duration-300 mt-0.5"
                  style={{
                    fontSize: active ? "clamp(1.4rem, 4vw, 2.2rem)" : "1.15rem",
                    color: active ? "#ffffff" : "rgb(226,232,240)",
                    textShadow: active ? `0 0 18px ${glowSolid}, 0 0 40px ${category.glowColor}` : "none",
                  }}
                >
                  {category.title}
                </h3>

                {/* Description (visible when active) */}
                <p 
                  className="font-sans text-xs sm:text-sm text-slate-300 max-w-xl transition-all duration-500"
                  style={{
                    maxHeight: active ? "120px" : "0px",
                    opacity: active ? 0.9 : 0,
                    marginTop: active ? "8px" : "0px",
                    overflow: "hidden",
                    lineHeight: "1.6"
                  }}
                >
                  {category.description}
                </p>

                {/* Action Button (visible when active) */}
                <div 
                  className="overflow-hidden transition-all duration-500"
                  style={{ 
                    maxHeight: active ? "60px" : "0px", 
                    opacity: active ? 1 : 0, 
                    marginTop: active ? "14px" : "0" 
                  }}
                >
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="font-sans text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded border transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
                    style={{ borderColor: glowSolid, color: glowSolid, background: "rgba(0,0,0,0.4)" }}
                  >
                    {t("categories.explore")} &rarr;
                  </button>
                </div>
              </div>

              {/* Step counter */}
              <div 
                className="absolute top-3 right-4 z-20 font-mono text-[11px] text-slate-400 font-bold transition-opacity duration-500"
                style={{ opacity: active ? 0.6 : 0.3 }}
              >
                {`0${index + 1} //`}
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
