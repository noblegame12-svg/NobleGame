"use client";

import { useEffect, useRef } from "react";

import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";

const SideRays = dynamic(() => import("./SideRays"), { ssr: false });

export default function Hero({ onShopClick }) {
  const { t } = useLanguage();
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = "/images/gaming_suitcase.webp";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      // Set canvas resolution matching the original image aspect ratio
      const renderWidth = 800; // high-resolution render width
      const scale = renderWidth / img.width;
      canvas.width = renderWidth;
      canvas.height = img.height * scale;

      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Get image pixel data
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Pixel-level keying to remove white background and smooth the edges
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Find the maximum color channel value
        const maxColorVal = Math.max(r, g, b);

        // Smooth transition threshold for bright/white pixels (CORS-safe)
        if (r > 225 && g > 225 && b > 225) {
          if (maxColorVal > 248) {
            data[i + 3] = 0; // completely transparent
          } else {
            // Linear fade out between 225 and 248 to prevent white jagged edges
            const alphaFactor = (248 - maxColorVal) / (248 - 225);
            data[i + 3] = Math.floor(data[i + 3] * alphaFactor);
          }
        }
      }

      // Put updated image pixel data back on canvas
      ctx.putImageData(imgData, 0, 0);
    };
  }, []);
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 lg:py-0 px-6 lg:px-16 bg-[#08080c] overflow-hidden">
      {/* Background Hero Image */}
      <div
        className="absolute inset-x-0 top-0 bottom-[-100px] bg-cover lg:bg-[position:right_bottom] bg-center bg-no-repeat opacity-80 z-0"
        style={{ backgroundImage: "url('/Background%20hero%20section.webp')" }}
      ></div>

      {/* Dark gradient overlay to fade the left side for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#08080c] via-[#08080c]/85 lg:via-[#08080c]/60 to-transparent z-0 pointer-events-none"></div>

      {/* SideRays Background Light Effects — placed after gradient so rays are visible above it */}
      <div className="absolute inset-0 w-full h-full z-[2] overflow-hidden pointer-events-none">
        <SideRays
          speed={2.5}
          rayColor1="#ffffff"
          rayColor2="#ee0003"
          intensity={1}
          spread={3}
          origin="top-left"
          tilt={41}
          saturation={1.5}
          blend={0}
          falloff={1}
          opacity={1}
        />
      </div>

      {/* Background grid overlays and glow elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-rog-red/10 blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-cyber-purple/10 blur-[180px] pointer-events-none z-0"></div>

      {/* Hero content container */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">

        {/* Left Column - Product details */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 lg:pr-12">

          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl leading-[1.1] tracking-tight text-white uppercase">
            <span className="block text-slate-400 text-2xl sm:text-3xl lg:text-4xl font-normal normal-case italic tracking-wide font-sans mb-2">
              {t("hero.subtitle")}
            </span>
            {t("hero.title")}
          </h1>

          <p className="max-w-xl text-slate-400 text-sm sm:text-base leading-relaxed font-sans font-normal">
            {t("hero.description")}
          </p>

          {/* Action text links - BELI & SEWA */}
          <div className="flex items-center gap-6 pt-4 font-display text-sm font-semibold tracking-widest text-slate-300">
            <a
              href="#featured-products"
              className="hover:text-rog-red hover:neon-text-red transition-all duration-200 border-b-2 border-transparent hover:border-rog-red pb-1"
              id="hero-beli-link"
            >
              {t("hero.buy")}
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="#ready-builds"
              className="hover:text-rog-red hover:neon-text-red transition-all duration-200 border-b-2 border-transparent hover:border-rog-red pb-1"
              id="hero-sewa-link"
            >
              {t("hero.rent")}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
