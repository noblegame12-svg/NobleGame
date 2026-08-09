"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function PanduanItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/10 last:border-b-0 py-3.5 transition-colors">
      <button
        onClick={onToggle}
        id={item.id}
        className="w-full flex items-center justify-between gap-3 text-left cursor-pointer group py-1"
        aria-expanded={isOpen}
      >
        <span
          className={`font-sans font-semibold text-xs sm:text-sm leading-snug transition-colors duration-300 flex-1 pr-2 ${
            isOpen ? "text-white" : "text-slate-300 group-hover:text-white"
          }`}
        >
          {item.question}
        </span>
        <span
          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-rog-red text-white rotate-180"
              : "bg-slate-800/60 text-slate-400 group-hover:bg-slate-700"
          }`}
        >
          <ChevronDown size={12} />
        </span>
      </button>

      <div
        style={{
          maxHeight: isOpen ? "200px" : "0px",
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.3s ease, opacity 0.25s ease",
          overflow: "hidden",
        }}
      >
        <div className="pt-2 pb-2 pl-9 pr-2">
          <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed font-sans">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState(null);
  const { t } = useLanguage();

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const simplePanduanList = t("faq.items") || [];

  return (
    <section
      id="faq"
      className="relative w-full bg-[#060609] py-14 px-4 sm:px-6 lg:px-16 overflow-hidden border-t border-white/5"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[2px] bg-gradient-to-r from-transparent via-rog-red/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Title & Info */}
          <div className="lg:col-span-4 space-y-4 text-center lg:text-left">
            <div className="space-y-1.5">
              <span className="text-[10px] font-sans font-black tracking-[0.25em] text-rog-red uppercase block">
                {t("faq.eyebrow")}
              </span>
              <h2 className="font-display font-black text-xl lg:text-2xl text-white uppercase tracking-tight leading-tight">
                {t("faq.titlePart1")}
                <span className="text-rog-red">{t("faq.titlePart2")}</span>
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed pt-1 max-w-md mx-auto lg:mx-0 font-sans">
                {t("faq.desc")}
              </p>
            </div>

            {/* Direct CTA button to full guide */}
            <div className="pt-3 flex flex-col items-center lg:items-start gap-3">
              <Link
                href="/panduan-ps"
                id="home-panduan-link"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-rog-red hover:bg-[#ff1a35] text-white text-xs font-display font-bold tracking-wider uppercase rounded-lg transition-all shadow-md shadow-rog-red/20 hover:scale-105"
              >
                <span>{t("faq.ctaButton")}</span>
                <ArrowRight size={14} />
              </Link>
              <p className="text-slate-500 text-[10px] font-sans">
                {t("faq.ctaSubtext")}
              </p>
            </div>
          </div>

          {/* Right Column: Simple Panduan List */}
          <div className="lg:col-span-8 space-y-2.5">
            {simplePanduanList.map((item) => (
              <PanduanItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
