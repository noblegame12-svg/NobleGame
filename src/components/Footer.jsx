"use client";

import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="relative w-full bg-[#060609] border-t border-white/5 pt-14 pb-6 px-6 lg:px-16 overflow-hidden">

      {/* Brand & Sitemap Section */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-10 relative z-10 text-left">

        {/* Brand Block */}
        <div className="lg:col-span-4 space-y-4">
          <a href="#" className="flex items-center gap-3 group" id="footer-logo">
            <img src="/Noble Game White.webp" alt="Noble Game Logo" className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            <span className="font-display font-black text-lg lg:text-xl tracking-tighter text-white uppercase transition-colors duration-300 group-hover:text-white/90">
              Noble Game
            </span>
          </a>
          <p className="text-slate-500 text-xs leading-relaxed max-w-sm font-sans">
            {t("footer.brandDesc")}
          </p>
        </div>

        {/* Links Grid */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">

          {/* Column 1 - Layanan */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs tracking-wider text-white uppercase border-l-2 border-rog-red pl-2">
              {t("footer.colServices")}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500 font-sans">
              <li><a href="#" className="hover:text-white hover:underline transition-colors">{t("footer.buyPs")}</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors">{t("footer.rentPs")}</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors">{t("footer.rentalPackages")}</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors">{t("footer.deliveryServices")}</a></li>
            </ul>
          </div>

          {/* Column 2 - Produk */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs tracking-wider text-white uppercase border-l-2 border-rog-red pl-2">
              {t("footer.colProducts")}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500 font-sans">
              <li><a href="#" className="hover:text-white hover:underline transition-colors">{t("footer.psBox")}</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors">{t("footer.dualsenseController")}</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors">{t("footer.psGameCatalog")}</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors">{t("footer.gamingAccessories")}</a></li>
            </ul>
          </div>

          {/* Column 3 - Bantuan */}
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <h4 className="font-display font-bold text-xs tracking-wider text-white uppercase border-l-2 border-rog-red pl-2">
              {t("footer.colHelp")}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500 font-sans">
              <li><a href="/panduan-ps" className="hover:text-white hover:underline transition-colors text-rog-red font-semibold">{t("footer.psGuide")}</a></li>
              <li><a href="/#faq" className="hover:text-white hover:underline transition-colors">{t("footer.faqQna")}</a></li>
              <li><a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">{t("footer.contactSupport")}</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors">{t("footer.warrantyClaim")}</a></li>
              <li><a href="#" className="hover:text-white hover:underline transition-colors">{t("footer.termsOfService")}</a></li>
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom Footer Credits */}
      <div className="w-full max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-sans relative z-10 uppercase tracking-widest">
        <div>
          &copy; {new Date().getFullYear()} {t("footer.rightsReserved")}
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">{t("footer.privacyPolicy")}</a>
          <span>|</span>
          <a href="#" className="hover:text-white transition-colors">{t("footer.terms")}</a>
        </div>
        <button
          onClick={handleScrollTop}
          className="p-2 rounded bg-slate-950 border border-white/5 hover:border-rog-red text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
          title="Scroll to Top"
          id="btn-scroll-top"
        >
          <ArrowUp size={11} />
        </button>
      </div>

    </footer>
  );
}
