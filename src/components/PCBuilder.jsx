"use client";

import { useState } from "react";
import Image from "next/image";
import { Cpu, Server, Sliders, Palette, ShieldCheck, Zap } from "lucide-react";

export default function PCBuilder() {
  // RGB theme selection: "red" | "blue" | "purple"
  const [rgbTheme, setRgbTheme] = useState("red");

  const themes = {
    red: {
      name: "Crimson ROG Red",
      image: "/images/pc_case_red.webp",
      glowColor: "rgba(227, 0, 22, 0.4)",
      borderColor: "border-rog-red",
      textColor: "text-rog-red",
      glowText: "neon-text-red",
      bgDot: "bg-rog-red"
    },
    blue: {
      name: "Electric Cyber Blue",
      image: "/images/pc_case_blue.webp",
      glowColor: "rgba(0, 229, 255, 0.4)",
      borderColor: "border-electric-cyan",
      textColor: "text-electric-cyan",
      glowText: "neon-text-cyan",
      bgDot: "bg-electric-cyan"
    },
    purple: {
      name: "Vibrant Neon Purple",
      image: "/images/pc_case_purple.webp",
      glowColor: "rgba(157, 78, 221, 0.4)",
      borderColor: "border-cyber-purple",
      textColor: "text-cyber-purple",
      glowText: "neon-text-purple",
      bgDot: "bg-cyber-purple"
    }
  };

  const handleCycleColors = () => {
    const keys = Object.keys(themes);
    const currentIndex = keys.indexOf(rgbTheme);
    const nextIndex = (currentIndex + 1) % keys.length;
    setRgbTheme(keys[nextIndex]);
  };

  return (
    <section id="pc-builder" className="relative w-full bg-[#060609] py-24 px-6 lg:px-16 overflow-hidden border-t border-b border-white/5">
      {/* Target scanning lines background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      
      {/* Background glow matching the active theme */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none transition-all duration-700 opacity-20 z-0"
        style={{ backgroundColor: themes[rgbTheme].glowColor }}
      ></div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column - Dynamic PC Case Visualizer */}
        <div className="lg:col-span-6 flex flex-col items-center">
          
          {/* Main Case Viewer Frame */}
          <div className="relative w-full max-w-[420px] h-[400px] sm:h-[500px] flex items-center justify-center bg-slate-950/40 border border-white/5 hover:border-white/10 rounded-lg p-4 group transition-all duration-500 shadow-2xl">
            {/* Tech Corner Crosshairs */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-slate-700"></div>
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-slate-700"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-slate-700"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-slate-700"></div>

            {/* Glowing active RGB halo behind case */}
            <div 
              className="absolute w-[70%] h-[70%] rounded-full blur-[50px] opacity-40 transition-all duration-1000"
              style={{ backgroundColor: themes[rgbTheme].glowColor }}
            ></div>

            <div className="relative w-[90%] h-[90%] animate-float transition-all duration-500 hover:scale-105">
              <Image
                src={themes[rgbTheme].image}
                alt="Gaming PC Build Case"
                fill
                priority
                className="object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                sizes="(max-w-768px) 100vw, 40vw"
              />
            </div>
            
            {/* Ambient theme tag overlay */}
            <span className="absolute bottom-4 left-6 text-[10px] tracking-widest font-display text-slate-500 uppercase">
              ACTIVE RGB: <span className={`${themes[rgbTheme].textColor} font-black`}>{themes[rgbTheme].name}</span>
            </span>
          </div>

          {/* Carousel Swatch Controllers */}
          <div className="flex gap-4 items-center mt-8 bg-slate-950/80 px-6 py-3 rounded-full border border-white/5">
            <span className="text-slate-400 font-sans text-xs font-semibold mr-2">RGB PRESET:</span>
            
            {/* Red Swatch */}
            <button
              onClick={() => setRgbTheme("red")}
              className={`w-6 h-6 rounded-full bg-rog-red cursor-pointer transition-all duration-300 relative ${
                rgbTheme === "red" 
                  ? "scale-125 ring-2 ring-white/60 shadow-[0_0_12px_#e30016]" 
                  : "hover:scale-115 opacity-70"
              }`}
              id="preset-color-red"
              aria-label="Set Crimson ROG Red Preset"
            ></button>

            {/* Blue Swatch */}
            <button
              onClick={() => setRgbTheme("blue")}
              className={`w-6 h-6 rounded-full bg-electric-cyan cursor-pointer transition-all duration-300 relative ${
                rgbTheme === "blue" 
                  ? "scale-125 ring-2 ring-white/60 shadow-[0_0_12px_#00e5ff]" 
                  : "hover:scale-115 opacity-70"
              }`}
              id="preset-color-blue"
              aria-label="Set Electric Cyber Blue Preset"
            ></button>

            {/* Purple Swatch */}
            <button
              onClick={() => setRgbTheme("purple")}
              className={`w-6 h-6 rounded-full bg-cyber-purple cursor-pointer transition-all duration-300 relative ${
                rgbTheme === "purple" 
                  ? "scale-125 ring-2 ring-white/60 shadow-[0_0_12px_#9d4edd]" 
                  : "hover:scale-115 opacity-70"
              }`}
              id="preset-color-purple"
              aria-label="Set Vibrant Neon Purple Preset"
            ></button>
          </div>
        </div>

        {/* Right Column - Custom PC Build copy */}
        <div className="lg:col-span-6 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          <span className="text-xs sm:text-sm font-sans font-black tracking-[0.2em] text-rog-red uppercase">
            Build Your Own
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            BUILD YOUR <span className={`transition-colors duration-500 ${themes[rgbTheme].textColor} ${themes[rgbTheme].glowText}`}>NEW PC</span>
          </h2>
          <p className="max-w-xl text-slate-400 text-sm leading-relaxed font-sans font-normal">
            Take full control of your gaming gear. Choose the ideal case layout, configure dynamic cooling configurations, and adjust the layout to fit extreme multi-GPU builds.
          </p>

          {/* Interactive Specifications grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4">
            
            {/* Spec 1 - GPU Support */}
            <div className="flex gap-4 p-5 rounded bg-slate-950/60 border border-white/5 hover:border-slate-800 transition-colors duration-300">
              <div className={`p-3 bg-slate-900 rounded ${themes[rgbTheme].textColor} flex items-center justify-center`}>
                <Cpu size={24} />
              </div>
              <div className="flex flex-col text-left space-y-1">
                <h3 className="font-display font-bold text-sm text-white">16+ Inch GPU Support</h3>
                <p className="text-xs text-slate-500 leading-snug">Compatible with heavy triple-fan flagship GPUs.</p>
              </div>
            </div>

            {/* Spec 2 - Memory support */}
            <div className="flex gap-4 p-5 rounded bg-slate-950/60 border border-white/5 hover:border-slate-800 transition-colors duration-300">
              <div className={`p-3 bg-slate-900 rounded ${themes[rgbTheme].textColor} flex items-center justify-center`}>
                <Server size={24} />
              </div>
              <div className="flex flex-col text-left space-y-1">
                <h3 className="font-display font-bold text-sm text-white">8 DDR4/DDR5 Slots</h3>
                <p className="text-xs text-slate-500 leading-snug">Expands memory up to 256GB with overclock profiles.</p>
              </div>
            </div>

            {/* Spec 3 - Custom cooling ports */}
            <div className="flex gap-4 p-5 rounded bg-slate-950/60 border border-white/5 hover:border-slate-800 transition-colors duration-300">
              <div className={`p-3 bg-slate-900 rounded ${themes[rgbTheme].textColor} flex items-center justify-center`}>
                <Zap size={24} />
              </div>
              <div className="flex flex-col text-left space-y-1">
                <h3 className="font-display font-bold text-sm text-white">Triple Radiator Mounts</h3>
                <p className="text-xs text-slate-500 leading-snug">Supports top, side, and front water cooling radiators.</p>
              </div>
            </div>

            {/* Spec 4 - Metal protection */}
            <div className="flex gap-4 p-5 rounded bg-slate-950/60 border border-white/5 hover:border-slate-800 transition-colors duration-300">
              <div className={`p-3 bg-slate-900 rounded ${themes[rgbTheme].textColor} flex items-center justify-center`}>
                <ShieldCheck size={24} />
              </div>
              <div className="flex flex-col text-left space-y-1">
                <h3 className="font-display font-bold text-sm text-white">Tempered Glass & Steel</h3>
                <p className="text-xs text-slate-500 leading-snug">Industrial 4mm glass side panels with steel brackets.</p>
              </div>
            </div>

          </div>

          {/* Action Call buttons */}
          <div className="flex flex-wrap gap-4 pt-6 w-full justify-center lg:justify-start">
            <button 
              className="px-8 py-3.5 bg-slate-900 border border-white/10 hover:border-white/20 text-white hover:bg-slate-800 text-xs tracking-widest font-display font-black uppercase rounded transition-all duration-300 cursor-pointer"
              id="btn-pcbuilder-steps"
            >
              GET IT STEP
            </button>
            <button 
              onClick={handleCycleColors}
              className={`px-8 py-3.5 bg-gradient-to-r from-slate-950 to-slate-950 hover:from-slate-900 hover:to-slate-900 text-white border text-xs tracking-widest font-display font-black uppercase rounded cursor-pointer transition-all duration-300 flex items-center gap-2 ${themes[rgbTheme].borderColor}`}
              id="btn-pcbuilder-color"
            >
              <Palette size={14} className={themes[rgbTheme].textColor} />
              <span>COLOR PC CASE</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
