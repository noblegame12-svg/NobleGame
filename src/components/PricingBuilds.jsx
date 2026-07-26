"use client";

import { Check, Shield, Star, Cpu } from "lucide-react";

export default function PricingBuilds({ onBuyBuild }) {
  const builds = [
    {
      id: "build-lite",
      name: "LITE BUILD",
      price: 1000,
      period: "per build",
      popular: false,
      specs: [
        "AMD Ryzen 5 7600X",
        "16GB DDR5 5200MHz",
        "NVIDIA RTX 4060 8GB",
        "1TB NVMe Gen4 SSD",
        "650W Bronze PSU",
        "1 Year Warranty"
      ],
      colorAccent: "border-slate-800 hover:border-slate-700",
      btnStyle: "bg-slate-900 hover:bg-slate-800 text-white"
    },
    {
      id: "build-core",
      name: "CORE BUILD",
      price: 1800,
      period: "per build",
      popular: false,
      specs: [
        "AMD Ryzen 7 7800X3D",
        "32GB DDR5 6000MHz",
        "NVIDIA RTX 4070 Ti Super",
        "2TB NVMe Gen4 SSD",
        "750W Gold Fully Modular",
        "2 Year Warranty"
      ],
      colorAccent: "border-slate-800 hover:border-slate-700",
      btnStyle: "bg-slate-900 hover:bg-slate-800 text-white"
    },
    {
      id: "build-premium",
      name: "PREMIUM BUILD",
      price: 2500,
      period: "per build",
      popular: true, // Highlighted
      specs: [
        "AMD Ryzen 9 7900X",
        "32GB DDR5 6400MHz Dual",
        "NVIDIA RTX 4080 Super 16GB",
        "2TB Extreme Gen5 SSD",
        "850W Platinum PSU",
        "3 Year On-Site Warranty"
      ],
      colorAccent: "border-cyber-purple neon-border-purple",
      btnStyle: "bg-gradient-to-r from-cyber-purple to-[#8a2be2] hover:from-cyber-purple-hover hover:to-cyber-purple text-white shadow-lg shadow-cyber-purple/20"
    },
    {
      id: "build-pro",
      name: "PRO BUILD",
      price: 4000,
      period: "per build",
      popular: false,
      specs: [
        "Intel Core i9-14900KS",
        "64GB DDR5 7200MHz Quad",
        "NVIDIA RTX 4090 24GB VRAM",
        "4TB Extreme Gen5 SSD",
        "1200W Titanium PSU",
        "5 Year VIP Warranty"
      ],
      colorAccent: "border-slate-800 hover:border-slate-700",
      btnStyle: "bg-slate-900 hover:bg-slate-800 text-white"
    }
  ];

  return (
    <section id="ready-builds" className="relative w-full bg-[#08080c] py-24 px-6 lg:px-16 overflow-hidden">
      {/* Background decoration halos */}
      <div className="absolute top-10 right-0 w-[400px] h-[400px] rounded-full bg-cyber-purple/5 blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] rounded-full bg-rog-red/5 blur-[160px] pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center space-y-4 mb-16 relative z-10">
        <span className="text-xs sm:text-sm font-sans font-black tracking-[0.2em] text-rog-red uppercase">
          Play Like The Pros
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
          READY PC BUILDS
        </h2>
        <p className="max-w-xl text-slate-400 text-sm leading-relaxed font-sans font-normal">
          Pick a pre-configured powerhouse, hand-assembled and tested by our experts. Ready to plug in, switch on, and dominate out of the box.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {builds.map((build) => (
          <div
            key={build.id}
            className={`group relative flex flex-col bg-slate-950 border rounded-lg p-6 lg:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_35px_rgba(0,0,0,0.8)] ${build.colorAccent}`}
            id={`pricing-card-${build.id}`}
          >
            {/* Highlighted Ribbon */}
            {build.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyber-purple text-white text-[9px] font-display font-black tracking-widest uppercase flex items-center gap-1 shadow-lg shadow-cyber-purple/30 z-20">
                <Star size={10} fill="white" />
                <span>RECOMMENDED</span>
              </div>
            )}

            {/* Header info */}
            <div className="text-center space-y-3 pb-6 border-b border-white/5">
              <h3 className="font-display font-black tracking-wider text-sm text-slate-400 uppercase">
                {build.name}
              </h3>
              <div className="flex items-baseline justify-center gap-1.5 font-display">
                <span className="text-sm font-bold text-slate-500">$</span>
                <span className="text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {build.price.toLocaleString("en-US")}
                </span>
                <span className="text-[10px] text-slate-500 font-sans tracking-wide lowercase">
                  /{build.period.split(" ")[1]}
                </span>
              </div>
            </div>

            {/* Spec breakdown list */}
            <ul className="flex-1 py-8 space-y-4 text-xs lg:text-sm text-slate-300 font-sans">
              {build.specs.map((spec, i) => (
                <li key={i} className="flex items-center gap-3">
                  {i === 0 ? (
                    <Cpu size={14} className="text-slate-500 group-hover:text-rog-red transition-colors flex-shrink-0" />
                  ) : (
                    <Check size={14} className="text-emerald-500 flex-shrink-0" />
                  )}
                  <span className="line-clamp-1">{spec}</span>
                </li>
              ))}
            </ul>

            {/* Purchase CTA */}
            <button
              onClick={() => onBuyBuild({
                id: build.id,
                name: build.name,
                price: build.price,
                image: "/images/pc_case_red.webp", // fallback case image
                category: "PC Builds",
                qty: 1
              })}
              className={`w-full py-3.5 text-xs font-display font-black tracking-widest uppercase rounded transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${build.btnStyle}`}
              id={`buy-btn-${build.id}`}
            >
              <span>BUY NOW</span>
            </button>
          </div>
        ))}
      </div>

      {/* Trust factors badge */}
      <div className="w-full max-w-2xl mx-auto mt-16 p-4 rounded-lg bg-[#0b0b0f] border border-white/5 flex flex-col sm:flex-row items-center justify-around gap-4 text-center sm:text-left text-slate-400 text-xs">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-rog-red" />
          <span>Full Hardware Testing Warranty</span>
        </div>
        <div className="hidden sm:block text-slate-700">|</div>
        <div className="flex items-center gap-2">
          <Cpu size={16} className="text-cyber-purple" />
          <span>Professional Custom Cabling Included</span>
        </div>
      </div>
    </section>
  );
}
