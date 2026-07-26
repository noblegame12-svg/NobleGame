"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar({ cartCount, onCartToggle }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="w-full z-50 absolute top-0 left-0 bg-transparent">
      {/* Top Bar (Desktop) */}
      <div className="hidden md:flex w-full bg-transparent text-[11px] font-sans tracking-widest uppercase text-slate-400 py-3.5 px-6 lg:px-16 justify-between items-center">
        <div className="flex gap-6 items-center">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => setLanguage("en")}
              className={`cursor-pointer transition-colors ${
                language === "en"
                  ? "text-rog-red font-bold underline underline-offset-4"
                  : "text-slate-400 hover:text-white"
              }`}
              id="lang-btn-en"
            >
              EN
            </button>
            <span className="text-slate-600">/</span>
            <button
              onClick={() => setLanguage("id")}
              className={`cursor-pointer transition-colors ${
                language === "id"
                  ? "text-rog-red font-bold underline underline-offset-4"
                  : "text-slate-400 hover:text-white"
              }`}
              id="lang-btn-id"
            >
              ID
            </button>
          </div>
          <span className="text-slate-600">|</span>
          <div>{t("navbar.contactFreeShipping")}</div>
        </div>

        <div className="flex gap-6 items-center">
          <a href="/#faq" className="hover:text-white transition-colors">
            {t("navbar.contactUs")}
          </a>
          <span className="text-slate-600">|</span>
          <a href="/#faq" className="hover:text-white transition-colors">
            {t("navbar.faq")}
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="w-full bg-transparent py-4 px-4 sm:px-6 lg:px-16 flex items-center justify-between relative min-h-[70px] sm:min-h-[76px]">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group" id="nav-logo">
          <img src="/Noble Game White.webp" alt="Noble Game Logo" className="h-9 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          <span className="font-display font-black text-lg sm:text-xl lg:text-2xl tracking-tighter text-white uppercase transition-colors duration-300 group-hover:text-white/90">
            Noble Game
          </span>
        </Link>

        {/* Desktop Menu (Text only, no button shape) */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 font-display text-xs sm:text-sm font-semibold tracking-widest text-slate-300">
          <Link href="/#featured-products" className="hover:text-rog-red hover:neon-text-red transition-all duration-200 border-b-2 border-transparent hover:border-rog-red pb-1" id="menu-beli">
            {t("navbar.buy")}
          </Link>
          <Link href="/#ready-builds" className="hover:text-rog-red hover:neon-text-red transition-all duration-200 border-b-2 border-transparent hover:border-rog-red pb-1" id="menu-sewa">
            {t("navbar.rent")}
          </Link>
          <Link href="/panduan-ps" className="hover:text-rog-red hover:neon-text-red transition-all duration-200 border-b-2 border-transparent hover:border-rog-red pb-1 text-slate-300 hover:text-white" id="menu-panduan-ps">
            {t("navbar.psGuide")}
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white transition-colors cursor-pointer focus:outline-none"
            aria-label="Toggle Navigation Menu"
            id="mobile-menu-btn"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-[#08080c]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 transition-all animate-fadeIn">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <span className="text-xs text-slate-400 flex items-center gap-1.5 font-sans uppercase tracking-wider">
              <Globe size={14} className="text-rog-red" /> Language / Bahasa
            </span>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                  language === "en"
                    ? "bg-rog-red text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
                id="mobile-lang-en"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("id")}
                className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                  language === "id"
                    ? "bg-rog-red text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
                id="mobile-lang-id"
              >
                ID
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5 font-display text-sm font-bold tracking-widest text-slate-300">
            <Link
              href="/#featured-products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-rog-red transition-colors border-b border-white/5 pb-2 text-slate-200"
            >
              {t("navbar.buy")}
            </Link>
            <Link
              href="/#ready-builds"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-rog-red transition-colors border-b border-white/5 pb-2 text-slate-200"
            >
              {t("navbar.rent")}
            </Link>
            <Link
              href="/panduan-ps"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-rog-red transition-colors border-b border-white/5 pb-2 text-rog-red font-extrabold"
            >
              {t("navbar.psGuide")}
            </Link>
            <Link
              href="/#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-rog-red transition-colors border-b border-white/5 pb-2 text-slate-400 font-normal text-xs"
            >
              {t("navbar.faqHelp")}
            </Link>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-rog-red transition-colors text-slate-400 font-normal text-xs"
            >
              {t("navbar.contactUsWhatsapp")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
