"use client";

import Image from "next/image";
import ColorBends from './ColorBends';
import { useLanguage } from "@/context/LanguageContext";

export default function ProductShowcase() {
  const { t } = useLanguage();

  return (
    <section id="product-showcase" className="relative w-full bg-[#08080c] py-24 px-6 lg:px-16 border-b border-white/5 overflow-hidden">
      {/* Background gradient & grids */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080c] to-[#08080c] z-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20 z-0" />

      {/* LightRays Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <ColorBends
          colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
          rotation={90}
          speed={0.2}
          scale={3.8}
          frequency={1}
          warpStrength={1}
          mouseInfluence={0}
          noise={0.15}
          parallax={0.5}
          iterations={1}
          intensity={1.5}
          bandWidth={6}
          transparent
          autoRotate={0}
          color="#A855F7"
        />
      </div>

      {/* Radial lights / glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-rog-red/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] sm:w-[200px] h-[100px] sm:h-[200px] rounded-full bg-electric-cyan/10 blur-[60px] pointer-events-none z-0" />

      {/* Red accent glow line at the top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rog-red/30 to-transparent z-10" />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center relative z-10">

        {/* Eyebrow & Title */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            {t("productShowcase.title")}
          </h2>
        </div>

        {/* Technical Highlights / Specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 w-full max-w-5xl mb-8 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
          <div className="px-6 pb-6 md:pb-0 flex flex-col items-center justify-center text-center space-y-2">
            <h3 className="font-display font-bold text-base text-rog-red tracking-widest uppercase">
              {t("productShowcase.ruggedTitle")}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-xs">
              {t("productShowcase.ruggedDesc")}
            </p>
          </div>

          <div className="px-6 py-6 md:py-0 flex flex-col items-center justify-center text-center space-y-2">
            <h3 className="font-display font-bold text-base text-rog-red tracking-widest uppercase">
              {t("productShowcase.monitorTitle")}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-xs">
              {t("productShowcase.monitorDesc")}
            </p>
          </div>

          <div className="px-6 pt-6 md:pt-0 flex flex-col items-center justify-center text-center space-y-2">
            <h3 className="font-display font-bold text-base text-rog-red tracking-widest uppercase">
              {t("productShowcase.powerTitle")}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-xs">
              {t("productShowcase.powerDesc")}
            </p>
          </div>
        </div>

        {/* Product Price Display (Mobile Only) */}
        <div className="flex flex-col items-center justify-center mb-6 relative z-20 group cursor-default select-none hover:scale-105 transition-transform duration-300 ease-out md:hidden">
          <span className="text-[10px] sm:text-xs font-sans font-black tracking-[0.25em] text-slate-500 uppercase group-hover:text-slate-400 transition-colors duration-300">
            {t("productShowcase.priceTagline")}
          </span>
          <div className="flex items-baseline gap-0.5 mt-1">
            <span className="text-xl sm:text-2xl font-display font-black text-rog-red transition-all duration-300 group-hover:text-rog-red-hover group-hover:scale-110">$</span>
            <span className="text-5xl sm:text-7xl font-display font-black tracking-tight text-white neon-text-red transition-all duration-300 group-hover:text-white">899</span>
            <span className="text-lg sm:text-xl font-display font-bold text-slate-400 transition-all duration-300 group-hover:text-slate-300">.00</span>
          </div>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-rog-red to-transparent mt-3 transition-all duration-300 group-hover:w-28 group-hover:via-rog-red-hover" />
        </div>

        {/* Product Image Wrapper */}
        <div className="relative w-full max-w-6xl aspect-[16/9] flex items-center justify-center py-2 sm:py-4">
          <div className="relative w-full h-full scale-110 sm:scale-115 transition-transform duration-500">
            <Image
              src="/Product noBG.webp"
              alt="Premium Playstation Box Product"
              fill
              className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
              priority
              sizes="(max-w-1200px) 100vw, 95vw"
            />
          </div>

          {/* Product Price Display (Desktop Only) */}
          <div className="hidden md:flex absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20 flex-col items-center justify-center group cursor-default select-none hover:scale-105 transition-transform duration-300 ease-out">
            <span className="text-[10px] font-sans font-black tracking-[0.25em] text-slate-500 uppercase group-hover:text-slate-400 transition-colors duration-300">
              {t("productShowcase.priceTagline")}
            </span>
            <div className="flex items-baseline gap-0.5 mt-1">
              <span className="text-xl lg:text-2xl font-display font-black text-rog-red transition-all duration-300 group-hover:text-rog-red-hover group-hover:scale-110">$</span>
              <span className="text-5xl lg:text-7xl font-display font-black tracking-tight text-white neon-text-red transition-all duration-300 group-hover:text-white">899</span>
              <span className="text-lg lg:text-xl font-display font-bold text-slate-400 transition-all duration-300 group-hover:text-slate-300">.00</span>
            </div>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-rog-red to-transparent mt-3 transition-all duration-300 group-hover:w-28 group-hover:via-rog-red-hover" />
          </div>
        </div>

      </div>
    </section>
  );
}
