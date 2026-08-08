"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { useLanguage } from "@/context/LanguageContext";
import {
  Camera,
  Search,
  ChevronRight,
  ChevronLeft,
  X,
  Maximize2,
  Sparkles,
  ShieldCheck,
  Gamepad2,
  Box,
  Tv,
  Monitor,
  LayoutGrid,
  MessageCircle,
  Share2,
  Check,
  Download,
  Info,
  SlidersHorizontal,
  ChevronDown,
  Filter,
  Play,
  Video
} from "lucide-react";

export default function GalleryPage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const { language, t } = useLanguage();

  // Cart handlers
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

  const categories = [
    { id: "all", label: t("galleryPage.categories.all"), icon: LayoutGrid },
    { id: "video", label: t("galleryPage.categories.video"), icon: Video },
    { id: "box", label: t("galleryPage.categories.box"), icon: Box },
    { id: "console", label: t("galleryPage.categories.console"), icon: Tv },
    { id: "controller", label: t("galleryPage.categories.controller"), icon: Gamepad2 },
    { id: "setup", label: t("galleryPage.categories.setup"), icon: Camera },
  ];

  const items = t("galleryPage.items") || [];

  // Filtered Items
  const filteredItems = useMemo(() => {
    let list = Array.isArray(items) ? items : [];
    if (activeTab !== "all") {
      list = list.filter((item) => item.category === activeTab);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.specs.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeTab, searchQuery, items]);

  const selectedPhoto = selectedPhotoIndex !== null ? filteredItems[selectedPhotoIndex] : null;

  // Keyboard navigation for Lightbox modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === "Escape") {
        setSelectedPhotoIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, filteredItems.length]);

  const handleCopyLink = () => {
    if (!selectedPhoto) return;
    navigator.clipboard.writeText(window.location.origin + selectedPhoto.image);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#060609] text-slate-100 flex flex-col font-sans antialiased overflow-x-hidden selection:bg-rog-red selection:text-white">
      {/* Decorative scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-5">
        <div className="w-full h-[3px] bg-slate-100 animate-scanline"></div>
      </div>

      {/* Background Glow ambient */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-rog-red/10 via-red-900/5 to-transparent blur-3xl pointer-events-none z-0" />

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
            <span className="text-rog-red font-semibold uppercase">{t("galleryPage.breadcrumb")}</span>
          </nav>

          {/* Page Title */}
          <div className="mb-6 sm:mb-8">
            <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl uppercase text-white tracking-tight leading-none">
              {t("galleryPage.title")}
            </h1>
          </div>

          {/* Category Filter Bar: All Photos button + Filter Dropdown button */}
          <div className="relative flex items-center gap-3 mb-6 sm:mb-8 text-xs">
            {/* Backdrop overlay to close dropdown on click outside */}
            {isFilterDropdownOpen && (
              <div
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none"
                onClick={() => setIsFilterDropdownOpen(false)}
              />
            )}

            {/* All Photos Main Button */}
            <button
              onClick={() => {
                setActiveTab("all");
                setSearchQuery("");
                setIsFilterDropdownOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-display text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                activeTab === "all" && !searchQuery
                  ? "bg-rog-red text-white border-rog-red shadow-lg shadow-rog-red/20 scale-[1.02]"
                  : "bg-slate-900/80 text-slate-300 border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              <LayoutGrid size={15} />
              <span>{t("galleryPage.categories.all")}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-sans font-normal ${activeTab === "all" && !searchQuery ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"}`}>
                {items.length}
              </span>
            </button>

            {/* Filter Dropdown Toggle Button */}
            <div className="relative z-50">
              <button
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-display text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                  activeTab !== "all" || isFilterDropdownOpen
                    ? "bg-rog-red text-white border-rog-red shadow-lg shadow-rog-red/20"
                    : "bg-slate-900/80 text-slate-300 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                <SlidersHorizontal size={15} className={activeTab !== "all" || isFilterDropdownOpen ? "text-white" : "text-rog-red"} />
                <span>
                  {activeTab === "all"
                    ? (language === "en" ? "Filter" : "Filter")
                    : categories.find((c) => c.id === activeTab)?.label}
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isFilterDropdownOpen ? "rotate-180 text-white" : "text-slate-400"}`}
                />
              </button>

              {/* Filter Panel (Bottom Sheet on Mobile, Floating Dropdown on Desktop) */}
              {isFilterDropdownOpen && (
                <div className="fixed inset-x-0 bottom-0 z-50 bg-white text-slate-900 rounded-t-3xl shadow-2xl p-5 border-t border-slate-200 animate-slideUp max-h-[85vh] overflow-y-auto sm:animate-fadeIn sm:absolute sm:inset-auto sm:left-0 sm:top-full sm:mt-2 sm:w-64 sm:rounded-2xl sm:p-2 sm:border sm:border-slate-200 sm:shadow-2xl sm:max-h-none sm:overflow-visible">
                  
                  {/* Mobile Header Drag Bar & Title */}
                  <div className="sm:hidden flex flex-col items-center mb-4">
                    <div className="w-12 h-1 bg-slate-300 rounded-full mb-3" />
                    <div className="w-full flex items-center justify-between font-display font-bold text-xs tracking-wider uppercase text-slate-900 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal size={15} className="text-rog-red" />
                        <span>{language === "en" ? "Filter Category" : "Filter Kategori"}</span>
                      </div>
                      <button
                        onClick={() => setIsFilterDropdownOpen(false)}
                        className="p-1 rounded-full text-slate-400 hover:text-slate-900 cursor-pointer"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Category Options List */}
                  <div className="space-y-1.5 sm:space-y-1">
                    {categories.map((cat) => {
                      const IconComponent = cat.icon;
                      const isSelected = activeTab === cat.id && !searchQuery;
                      const count = cat.id === "all" ? items.length : items.filter((i) => i.category === cat.id).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveTab(cat.id);
                            setSearchQuery("");
                            setIsFilterDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 sm:px-3.5 py-3 sm:py-2.5 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-rog-red text-white shadow-md shadow-rog-red/30"
                              : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                          }`}
                        >
                          <div className="flex items-center gap-3 sm:gap-2.5">
                            <IconComponent size={17} className={isSelected ? "text-white" : "text-slate-500"} />
                            <span className="text-xs sm:text-xs">{cat.label}</span>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${isSelected ? "bg-white/25 text-white" : "bg-slate-100 text-slate-600 border border-slate-200"}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Result Banner */}
          {searchQuery && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-slate-900/80 border border-white/10 rounded-xl px-4 sm:px-5 py-3 mb-6 sm:mb-8 text-xs font-sans">
              <span className="text-slate-300">
                {language === "en" ? (
                  <>Showing search results for &quot;<strong className="text-rog-red">{searchQuery}</strong>&quot; ({filteredItems.length} photos found)</>
                ) : (
                  <>Menampilkan hasil foto untuk &quot;<strong className="text-rog-red">{searchQuery}</strong>&quot; ({filteredItems.length} foto ditemukan)</>
                )}
              </span>
              <button
                onClick={() => setSearchQuery("")}
                className="text-rog-red hover:underline font-bold"
              >
                {language === "en" ? "View All Photos" : "Lihat Semua Foto"}
              </button>
            </div>
          )}

          {/* Gallery Photo Grid (Pure Images Only) */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredItems.map((item, idx) => {
                const isVideo = item.type === "video" || item.image?.endsWith(".mp4");
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className="group relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-xl transition-all duration-300 hover:border-rog-red/60 hover:shadow-2xl hover:shadow-rog-red/20 cursor-pointer"
                  >
                    {isVideo ? (
                      <>
                        <video
                          src={item.image}
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                          <div className="p-3.5 rounded-full bg-rog-red text-white shadow-xl shadow-rog-red/40 transform group-hover:scale-110 transition-transform">
                            <Play size={24} className="fill-white translate-x-0.5" />
                          </div>
                        </div>
                        <span className="absolute top-3 left-3 px-2 py-1 rounded bg-black/80 backdrop-blur-md text-white font-display text-[10px] font-bold tracking-wider uppercase border border-white/20 flex items-center gap-1">
                          <Video size={12} className="text-rog-red" />
                          <span>VIDEO</span>
                        </span>
                      </>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}

                    {/* Subtle Hover Overlay */}
                    {!isVideo && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="p-3 rounded-full bg-rog-red/90 text-white shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <Maximize2 size={22} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/20 border border-white/5 rounded-2xl p-6">
              <Camera size={40} className="mx-auto text-slate-600 mb-3" />
              <h3 className="font-display text-sm sm:text-base font-bold text-white uppercase mb-1">
                {language === "en" ? "No Photos Found" : "Foto Tidak Ditemukan"}
              </h3>
              <p className="text-slate-500 text-xs font-sans max-w-md mx-auto mb-4">
                {language === "en"
                  ? `No product photos found matching "${searchQuery}". Try selecting another category or resetting your search.`
                  : `Tidak ada foto produk yang sesuai dengan "${searchQuery}". Coba pilih kategori lain atau reset kata kunci pencarian.`}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-sans font-semibold transition-colors"
              >
                {language === "en" ? "Reset All Filters" : "Reset Semua Filter"}
              </button>
            </div>
          )}

          {/* Real-time Photo Request Banner */}
          <div className="mt-12 sm:mt-16 bg-gradient-to-r from-slate-900 via-rog-red/20 to-slate-900 border border-rog-red/40 rounded-xl sm:rounded-2xl p-5 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(238,0,3,0.1),transparent)] pointer-events-none" />

            <div className="space-y-1.5 sm:space-y-2 text-center md:text-left relative z-10">
              <h3 className="font-display font-black text-lg sm:text-2xl text-white uppercase tracking-tight leading-snug">
                {t("galleryPage.requestPhotoTitle")}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-sans max-w-xl">
                {t("galleryPage.requestPhotoDesc")}
              </p>
            </div>

            <a
              href="https://wa.me/6282142745084?text=Halo%20Noble%20Game,%20saya%20ingin%20minta%20foto/video%20fisik%20realtime%20unit%20produk"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-rog-red hover:bg-[#ff1a35] text-white font-display font-bold text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-rog-red/30 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageCircle size={16} />
              {t("galleryPage.requestPhotoButton")}
            </a>
          </div>

        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-fadeIn">

          {/* Modal Header */}
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-white z-10 py-2">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-rog-red text-white font-display font-bold text-xs tracking-wider uppercase">
                {selectedPhoto.badge}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {selectedPhotoIndex + 1} / {filteredItems.length}
              </span>
            </div>

            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="p-2.5 rounded-full bg-slate-900 border border-white/20 text-slate-300 hover:text-white hover:border-rog-red transition-all cursor-pointer"
              title="Close (ESC)"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body with Large Image & Arrows */}
          <div className="relative flex-1 flex items-center justify-center w-full max-w-7xl mx-auto my-2 overflow-hidden">
            {/* Prev Arrow */}
            <button
              onClick={() => setSelectedPhotoIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)}
              className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-slate-950/80 border border-white/20 text-white hover:bg-rog-red hover:border-rog-red transition-all cursor-pointer shadow-2xl"
              title="Previous Photo"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Main Media (Image or Video) */}
            <div className="relative max-h-full max-w-full flex items-center justify-center p-2">
              {selectedPhoto.type === "video" || selectedPhoto.image?.endsWith(".mp4") ? (
                <video
                  src={selectedPhoto.image}
                  controls
                  autoPlay
                  className="max-h-[65vh] sm:max-h-[70vh] w-auto max-w-full rounded-xl shadow-2xl border border-white/10"
                />
              ) : (
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="max-h-[65vh] sm:max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
                />
              )}
            </div>

            {/* Next Arrow */}
            <button
              onClick={() => setSelectedPhotoIndex((prev) => (prev + 1) % filteredItems.length)}
              className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-slate-950/80 border border-white/20 text-white hover:bg-rog-red hover:border-rog-red transition-all cursor-pointer shadow-2xl"
              title="Next Photo"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Modal Footer / Details Panel (White Base) */}
          <div className="w-full max-w-4xl mx-auto bg-white text-slate-900 border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-2xl z-10 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-mono text-rog-red uppercase font-bold tracking-wider">
                  {selectedPhoto.categoryLabel} // DOCUMENTED {selectedPhoto.date}
                </span>
                <h2 className="font-display font-black text-base sm:text-xl text-slate-900 uppercase tracking-tight">
                  {selectedPhoto.title}
                </h2>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-sans font-semibold rounded-lg transition-colors cursor-pointer border border-slate-200"
                >
                  {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                  <span>{copied ? "Copied Link!" : "Copy Link"}</span>
                </button>
                <a
                  href={`https://wa.me/6282142745084?text=Halo%20Noble%20Game,%20saya%20tertarik%20dengan%20unit%20di%20foto:%20${encodeURIComponent(selectedPhoto.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-rog-red hover:bg-[#ff1a35] text-white text-xs font-display font-bold uppercase tracking-wider rounded-lg transition-colors shadow-md shadow-rog-red/30 cursor-pointer"
                >
                  <MessageCircle size={14} />
                  <span>Tanya Unit</span>
                </a>
              </div>
            </div>

            <div className="text-xs text-slate-600 font-sans leading-relaxed">
              <p className="mb-2">{selectedPhoto.description}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-mono">
                <Info size={12} className="text-rog-red" />
                <span><strong className="text-slate-900">SPESIFIKASI:</strong> {selectedPhoto.specs}</span>
              </div>
            </div>
          </div>

        </div>
      )}

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
