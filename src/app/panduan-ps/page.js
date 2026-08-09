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
  Tag,
  AlertTriangle,
  Tv,
  ChevronDown
} from "lucide-react";

export default function PanduanPSPage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [openId, setOpenId] = useState(null);
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
    { id: "semua", label: t("panduanPage.categories.semua"), icon: Tag, count: t("panduanPage.counts.semua") },
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
    <div className="relative min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-rog-red selection:text-white">
      {/* Background Glow ambient */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-rog-red/5 via-red-100/20 to-transparent blur-3xl pointer-events-none z-0" />

      {/* Main Navbar */}
      <Navbar
        isLight={true}
        cartCount={totalCartCount}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
      />

      <main className="flex-1 w-full pt-20 sm:pt-28 pb-16 sm:pb-20 relative z-10">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">

          {/* 2-Column Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 sm:mb-16">
            
            {/* Left Column (Sticky Sidebar on Desktop, Sticky Filter/Search Bar on Mobile) */}
            <div className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-28 lg:self-start space-y-4 sm:space-y-6 lg:space-y-8 z-20">
              
              {/* Header Section (Breadcrumb, Title, Subtitle) - Scrolls naturally on mobile, stays in sidebar on desktop */}
              <div className="space-y-3 sm:space-y-4">
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-500 font-sans">
                  <Link href="/" className="hover:text-slate-900 transition-colors">
                    {language === "en" ? "HOME" : "BERANDA"}
                  </Link>
                  <ChevronRight size={12} className="text-slate-400" />
                  <span className="text-rog-red font-semibold uppercase">{t("panduanPage.title")}</span>
                </nav>

                <h1 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl uppercase text-slate-900 tracking-tight leading-tight">
                  {t("panduanPage.title")}
                </h1>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                  {t("panduanPage.subtitle")}
                </p>
              </div>

              {/* Search Bar & Categories Container (Sticky on Mobile at top-[64px], Normal in sidebar on Desktop) */}
              <div className="sticky top-[64px] sm:top-[74px] lg:static z-30 bg-slate-50/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none py-2.5 lg:py-0 -mx-4 px-4 lg:mx-0 lg:px-0 border-b border-slate-200/80 lg:border-none space-y-2.5 lg:space-y-6 shadow-sm lg:shadow-none transition-all">
                
                {/* Search Bar */}
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search size={16} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("panduanPage.searchPlaceholder")}
                    className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rog-red focus:ring-2 focus:ring-rog-red/20 shadow-sm transition-all font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-slate-900 font-semibold"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Quick Category Navigation Tabs (Horizontal Scroll on Mobile, Vertical Stack on Desktop) */}
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 text-xs [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  <span className="hidden lg:block text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 px-1 mb-0.5">
                    {language === "en" ? "Categories" : "Kategori Panduan"}
                  </span>
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
                        className={`flex-shrink-0 lg:w-full flex items-center justify-between gap-2.5 px-3.5 lg:px-4 py-2 lg:py-3 rounded-xl font-sans text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border whitespace-nowrap ${isActive
                            ? "bg-rog-red text-white border-rog-red shadow-md shadow-rog-red/20 scale-[1.01]"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
                          }`}
                      >
                        <div className="flex items-center gap-2 lg:gap-2.5">
                          <IconComponent size={14} className={isActive ? "text-white" : "text-slate-500"} />
                          <span>{cat.label}</span>
                        </div>
                        <span
                          className={`text-[9px] sm:text-[10px] px-1.5 lg:px-2 py-0.5 rounded-full font-sans font-normal ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                            }`}
                        >
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: FAQ Cards List */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-4 sm:space-y-6">
              {/* Search Result Banner if active */}
              {searchQuery && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-white border border-slate-200 rounded-xl px-4 sm:px-5 py-3 text-xs font-sans shadow-md">
                  <span className="text-slate-700">
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
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-7 shadow-sm divide-y divide-slate-200/80">
                  {filteredPanduan.map((item) => {
                    const isOpen = openId === item.id;
                    return (
                      <div
                        key={item.id}
                        className="py-4.5 first:pt-0 last:pb-0 transition-colors"
                      >
                        <button
                          onClick={() => setOpenId(isOpen ? null : item.id)}
                          className="w-full text-left flex items-start justify-between gap-4 group cursor-pointer py-1 focus:outline-none"
                          aria-expanded={isOpen}
                        >
                          <div className="space-y-1 flex-1 pr-2">
                            {/* Small Elegant Tag & Label */}
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-block text-[9px] font-sans font-bold uppercase tracking-widest ${
                                  item.isWarning ? "text-red-500" : "text-rog-red"
                                }`}
                              >
                                {item.badge}
                              </span>
                              {item.isWarning && (
                                <span className="text-[9px] text-red-500 font-bold bg-red-50 border border-red-200/60 px-1.5 py-0.2 rounded">
                                  {language === "en" ? "PROHIBITED" : "DILARANG"}
                                </span>
                              )}
                              <span className="text-slate-400 text-[9px] font-mono font-medium ml-auto sm:ml-0">
                                FAQ // #{item.num}
                              </span>
                            </div>

                            <h3 className="font-sans font-bold text-sm sm:text-base text-slate-900 group-hover:text-rog-red transition-colors uppercase tracking-tight leading-snug">
                              {item.num}. {item.title}
                            </h3>
                          </div>

                          <span
                            className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isOpen
                                ? "bg-rog-red text-white rotate-180 shadow-md shadow-rog-red/20"
                                : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-900"
                            }`}
                          >
                            <ChevronDown size={14} />
                          </span>
                        </button>

                        {/* Expandable Answer Section */}
                        <div
                          className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                            isOpen ? "grid-rows-[1fr] opacity-100 pt-3 pb-1" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className={`p-4 sm:p-5 rounded-xl font-sans text-xs sm:text-sm leading-relaxed ${
                              item.isWarning
                                ? "bg-red-50/60 border border-red-200/80 text-slate-800"
                                : "bg-slate-50 border border-slate-200/70 text-slate-700"
                            }`}>
                              <p className="whitespace-pre-line">{item.answer}</p>

                              <div className="mt-3.5 pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                                <span className="text-[10px] text-slate-500 font-sans">
                                  {language === "en"
                                    ? "Have further questions? Contact our support."
                                    : "Punya pertanyaan lanjutan? Hubungi support kami."}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopyText(`${item.title}\n${item.answer}`, item.id);
                                  }}
                                  className="inline-flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-slate-900 transition-colors font-sans cursor-pointer py-1 px-2.5 bg-white rounded border border-slate-200/80 shadow-2xs"
                                >
                                  {copiedId === item.id ? (
                                    <>
                                      <Check size={12} className="text-emerald-600" />
                                      <span className="text-emerald-600 font-semibold">{t("panduanPage.copied")}</span>
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
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 sm:py-16 bg-white border border-slate-200 rounded-2xl p-4 shadow-md">
                  <HelpCircle size={36} className="mx-auto text-slate-400 mb-3 sm:w-10 sm:h-10" />
                  <h3 className="font-sans text-sm sm:text-base font-bold text-slate-900 uppercase mb-1">
                    {language === "en" ? "Guide Not Found" : "Panduan Tidak Ditemukan"}
                  </h3>
                  <p className="text-slate-500 text-xs font-sans max-w-md mx-auto mb-4">
                    {language === "en"
                      ? `Sorry, we could not find topics matching "${searchQuery}". Try another keyword or contact our support.`
                      : `Maaf, kami tidak dapat menemukan topik dengan kata kunci "${searchQuery}". Coba cari kata kunci lain atau hubungi tim bantuan kami.`}
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-sans font-semibold transition-colors"
                  >
                    {language === "en" ? "Reset Search" : "Reset Pencarian"}
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Direct Support Banner */}
          <div className="mt-12 sm:mt-16 bg-gradient-to-r from-white via-red-50/50 to-white border border-rog-red/30 rounded-xl sm:rounded-2xl p-5 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(238,0,3,0.05),transparent)] pointer-events-none" />

            <div className="space-y-1.5 sm:space-y-2 text-center md:text-left relative z-10">
              <div className="inline-flex items-center gap-1.5 text-rog-red font-sans text-[10px] sm:text-xs font-bold tracking-widest uppercase">
                <MessageCircle size={14} className="sm:w-4 sm:h-4" />
                {language === "en" ? "24/7 Technical & Rental Support" : "Bantuan Kendala Teknis & Sewa 24/7"}
              </div>
              <h3 className="font-sans font-extrabold text-lg sm:text-2xl text-slate-900 uppercase tracking-tight leading-snug">
                {t("panduanPage.needHelpTitle")}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-sans max-w-xl">
                {t("panduanPage.needHelpDesc")}
              </p>
            </div>

            <a
              href="https://wa.me/6282142745084"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-rog-red hover:bg-[#ff1a35] text-white font-display font-bold text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-rog-red/20 hover:scale-105 active:scale-95 cursor-pointer"
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
