"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShieldCheck,
  Search,
  ChevronRight,
  HelpCircle,
  MessageCircle,
  Copy,
  Check,
  Sparkles,
  AlertTriangle,
  Tv
} from "lucide-react";

export default function PanduanPSPage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const { language, t } = useLanguage();

  // Cart handling
  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const handleUpdateQty = (id, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };
  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCopyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = [
    { id: "semua", label: t("panduanPage.categories.semua"), icon: Sparkles, count: t("panduanPage.counts.semua") },
    { id: "layanan", label: t("panduanPage.categories.layanan"), icon: ShieldCheck, count: t("panduanPage.counts.layanan") },
    { id: "operasional", label: t("panduanPage.categories.operasional"), icon: Tv, count: t("panduanPage.counts.operasional") },
  ];

  const allPanduan = t("panduanPage.allPanduan") || [];

  // Filtered Panduan List based on tab & search query
  const filteredPanduan = useMemo(() => {
    let list = Array.isArray(allPanduan) ? allPanduan : [];
    if (activeTab !== "semua") {
      list = list.filter((item) => item.category === activeTab);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q) ||
          item.badge.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeTab, searchQuery, allPanduan]);

  return (
    <div className="relative min-h-screen bg-[#060609] text-slate-100 flex flex-col font-sans antialiased overflow-x-hidden selection:bg-rog-red selection:text-white">
      {/* Decorative scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-5">
        <div className="w-full h-[3px] bg-slate-100 animate-scanline"></div>
      </div>

      {/* Background Glow ambient */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-rog-red/10 via-red-900/5 to-transparent blur-3xl pointer-events-none z-0" />

      {/* Main Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
      />

      <main className="flex-1 w-full pt-20 sm:pt-28 pb-16 sm:pb-20 relative z-10">
        <div className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-16">

          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-400 mb-4 sm:mb-6 font-sans">
            <Link href="/" className="hover:text-white transition-colors">
              {language === "en" ? "HOME" : "BERANDA"}
            </Link>
            <ChevronRight size={12} className="text-slate-600" />
            <span className="text-rog-red font-semibold uppercase">{t("panduanPage.title")}</span>
          </nav>

          {/* Page Hero Header */}
          <div className="relative rounded-xl sm:rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950/80 to-[#08080c] border border-white/10 p-5 sm:p-10 lg:p-12 overflow-hidden shadow-2xl mb-8 sm:mb-12">
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 sm:w-96 h-64 sm:h-96 bg-rog-red/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-60 sm:w-80 h-60 sm:h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full bg-rog-red/10 border border-rog-red/30 text-rog-red text-[10px] sm:text-[11px] font-sans font-bold tracking-widest uppercase mb-3 sm:mb-4">
                <Sparkles size={12} />
                OFFICIAL RENTAL &amp; OPERATIONAL GUIDE
              </div>

              <h1 className="font-display font-black text-xl sm:text-4xl lg:text-5xl uppercase text-white tracking-tight leading-snug sm:leading-none mb-3 sm:mb-4">
                {t("panduanPage.title")}
              </h1>

              <p className="text-slate-400 text-xs sm:text-base leading-relaxed font-sans mb-6 sm:mb-8">
                {t("panduanPage.subtitle")}
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-slate-400">
                  <Search size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("panduanPage.searchPlaceholder")}
                  className="w-full pl-10 sm:pl-11 pr-10 py-3 sm:py-3.5 bg-slate-950/90 border border-white/15 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rog-red focus:ring-1 focus:ring-rog-red transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-white"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Category Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-10 text-xs [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = activeTab === cat.id && !searchQuery;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveTab(cat.id);
                    setSearchQuery("");
                  }}
                  className={`flex items-center gap-2 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl font-display text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer border ${isActive
                      ? "bg-rog-red text-white border-rog-red shadow-lg shadow-rog-red/20 scale-[1.02]"
                      : "bg-slate-900/60 text-slate-400 border-white/5 hover:border-white/20 hover:text-white hover:bg-slate-900"
                    }`}
                >
                  <IconComponent size={14} className={isActive ? "text-white sm:w-4 sm:h-4" : "text-slate-400 sm:w-4 sm:h-4"} />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-sans font-normal ${isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-500"
                      }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Result Banner if active */}
          {searchQuery && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-slate-900/80 border border-white/10 rounded-xl px-4 sm:px-5 py-3 mb-6 sm:mb-8 text-xs font-sans">
              <span className="text-slate-300">
                {language === "en" ? (
                  <>Showing search results for &quot;<strong className="text-rog-red">{searchQuery}</strong>&quot; ({filteredPanduan.length} topics found)</>
                ) : (
                  <>Menampilkan hasil pencarian untuk &quot;<strong className="text-rog-red">{searchQuery}</strong>&quot; ({filteredPanduan.length} pertanyaan ditemukan)</>
                )}
              </span>
              <button
                onClick={() => setSearchQuery("")}
                className="text-rog-red hover:underline font-bold"
              >
                {language === "en" ? "View All Guides" : "Lihat Semua Panduan"}
              </button>
            </div>
          )}

          {/* Guides List */}
          {filteredPanduan.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              {filteredPanduan.map((item) => (
                <div
                  key={item.id}
                  className={`bg-slate-900/40 border rounded-xl sm:rounded-2xl p-5 sm:p-7 backdrop-blur-sm shadow-xl transition-all duration-300 ${item.isWarning
                      ? "border-red-500/40 bg-red-950/10 hover:border-red-500/70"
                      : "border-white/10 hover:border-rog-red/40"
                    }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-sans font-black uppercase tracking-wider ${item.isWarning
                            ? "bg-red-600/20 text-red-400 border border-red-500/40"
                            : "bg-rog-red/10 text-rog-red border border-rog-red/30"
                          }`}
                      >
                        {item.badge}
                      </span>
                      {item.isWarning && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-red-400 font-bold">
                          <AlertTriangle size={12} /> {language === "en" ? "PROHIBITED" : "DILARANG"}
                        </span>
                      )}
                    </div>
                    <span className="text-slate-600 text-[10px] sm:text-xs font-mono font-semibold">
                      FAQ // #{item.num}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-tight mb-3">
                    {item.num}. {item.title}
                  </h3>

                  <div className="bg-slate-950/80 border border-white/5 rounded-xl p-4 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                    <p className="whitespace-pre-line">{item.answer}</p>

                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 font-sans">
                        {language === "en" ? "Have further questions? Contact our support." : "Punya pertanyaan lanjutan? Hubungi support kami."}
                      </span>
                      <button
                        onClick={() => handleCopyText(`${item.title}\n${item.answer}`, item.id)}
                        className="inline-flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-white transition-colors font-sans cursor-pointer py-1"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check size={12} className="text-emerald-400" />
                            <span className="text-emerald-400">{t("panduanPage.copied")}</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>{t("panduanPage.copyLink")}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16 bg-slate-900/20 border border-white/5 rounded-2xl p-4">
              <HelpCircle size={36} className="mx-auto text-slate-600 mb-3 sm:w-10 sm:h-10" />
              <h3 className="font-display text-sm sm:text-base font-bold text-white uppercase mb-1">
                {language === "en" ? "Guide Not Found" : "Panduan Tidak Ditemukan"}
              </h3>
              <p className="text-slate-500 text-xs font-sans max-w-md mx-auto mb-4">
                {language === "en"
                  ? `Sorry, we could not find topics matching "${searchQuery}". Try another keyword or contact our support.`
                  : `Maaf, kami tidak dapat menemukan topik dengan kata kunci "${searchQuery}". Coba cari kata kunci lain atau hubungi tim bantuan kami.`}
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-sans font-semibold transition-colors"
              >
                {language === "en" ? "Reset Search" : "Reset Pencarian"}
              </button>
            </div>
          )}

          {/* Direct Support Banner */}
          <div className="mt-12 sm:mt-16 bg-gradient-to-r from-slate-900 via-rog-red/20 to-slate-900 border border-rog-red/40 rounded-xl sm:rounded-2xl p-5 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(238,0,3,0.1),transparent)] pointer-events-none" />

            <div className="space-y-1.5 sm:space-y-2 text-center md:text-left relative z-10">
              <div className="inline-flex items-center gap-1.5 text-rog-red font-display text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                <MessageCircle size={14} className="sm:w-4 sm:h-4" />
                {language === "en" ? "24/7 Technical & Rental Support" : "Bantuan Kendala Teknis & Sewa 24/7"}
              </div>
              <h3 className="font-display font-black text-lg sm:text-2xl text-white uppercase tracking-tight leading-snug">
                {t("panduanPage.needHelpTitle")}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-sans max-w-xl">
                {t("panduanPage.needHelpDesc")}
              </p>
            </div>

            <a
              href="https://wa.me/6282142745084"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-rog-red hover:bg-[#ff1a35] text-white font-display font-bold text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-rog-red/30 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageCircle size={16} />
              {t("panduanPage.needHelpButton")}
            </a>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
