"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Eye, Heart, Star } from "lucide-react";

export default function FeaturedProducts({ onAddToCart }) {
  const [activeTab, setActiveTab] = useState("ALL");

  const products = [
    {
      id: "prod-mouse-1",
      name: "Blandit aliquet elit",
      category: "MICE",
      subCategory: "Hardware",
      price: 229.00,
      image: "/images/gaming_mouse.webp",
      badge: "HOT",
      rating: 5
    },
    {
      id: "prod-headset-1",
      name: "Cras ligula ultricies",
      category: "HEADSETS",
      subCategory: "Hardware",
      price: 189.00,
      image: "/images/gaming_headset.webp",
      badge: "SALE",
      rating: 4
    },
    {
      id: "prod-kbd-1",
      name: "Eget tincidunt nibh",
      category: "KEYBOARDS",
      subCategory: "Hardware",
      price: 259.00,
      image: "/images/gaming_keyboard.webp",
      badge: "",
      rating: 5
    },
    {
      id: "prod-mouse-2",
      name: "Porttitor accumsan tincidunt",
      category: "MICE",
      subCategory: "Hardware",
      price: 219.00,
      image: "/images/gaming_mouse.webp",
      badge: "",
      rating: 4
    },
    {
      id: "prod-kbd-2",
      name: "Parturient vel lectus",
      category: "KEYBOARDS",
      subCategory: "Hardware",
      price: 229.00,
      image: "/images/gaming_keyboard.webp",
      badge: "NEW",
      rating: 5
    },
    {
      id: "prod-mouse-3",
      name: "Praesent massa sapien",
      category: "MICE",
      subCategory: "Hardware",
      price: 249.00,
      image: "/images/gaming_mouse.webp",
      badge: "",
      rating: 5
    },
    {
      id: "prod-headset-2",
      name: "Quisque velit nisl",
      category: "HEADSETS",
      subCategory: "Hardware",
      price: 249.00,
      image: "/images/gaming_headset.webp",
      badge: "SALE",
      rating: 4
    },
    {
      id: "prod-headset-3",
      name: "Tempus quis convallis",
      category: "HEADSETS",
      subCategory: "Hardware",
      price: 289.00,
      image: "/images/gaming_headset.webp",
      badge: "",
      rating: 5
    }
  ];

  // Filter products based on activeTab
  const filteredProducts = activeTab === "ALL" 
    ? products 
    : products.filter(p => p.category === activeTab);

  const tabs = ["ALL", "MICE", "HEADSETS", "KEYBOARDS"];

  return (
    <section id="featured-products" className="relative w-full bg-[#08080c] py-24 px-6 lg:px-16 overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-rog-red/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyber-purple/5 blur-[150px] pointer-events-none"></div>

      {/* Header Info */}
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center space-y-4 mb-16 relative z-10">
        <span className="text-xs sm:text-sm font-sans font-black tracking-[0.2em] text-rog-red uppercase">
          The Takeover Is Complete
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
          FEATURED PRODUCTS
        </h2>
        <p className="max-w-xl text-slate-400 text-sm leading-relaxed font-sans font-normal">
          Equip your gaming battlestation with our highest-rated hardware and accessories. Engineered for extreme reliability and peak performance.
        </p>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-2 justify-center pt-8 border-b border-white/5 w-full max-w-xl pb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 text-xs font-display font-bold tracking-widest uppercase transition-all duration-300 relative border-b-2 cursor-pointer ${
                activeTab === tab
                  ? "text-rog-red border-rog-red"
                  : "text-slate-400 border-transparent hover:text-white"
              }`}
              id={`tab-filter-${tab.toLowerCase()}`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-rog-red shadow-[0_0_12px_#e30016]"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col bg-slate-950/80 border border-white/5 hover:border-rog-red/35 rounded overflow-hidden p-6 transition-all duration-500 hover:shadow-[0_15px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(227,0,22,0.05)] cursor-pointer"
            id={`product-card-${product.id}`}
          >
            {/* Badge (NEW, HOT, SALE) */}
            {product.badge && (
              <span className={`absolute top-4 left-4 text-[10px] font-display font-black tracking-wider px-2 py-0.5 rounded z-20 ${
                product.badge === "SALE" 
                  ? "bg-emerald-600 text-white" 
                  : product.badge === "HOT" 
                    ? "bg-rog-red text-white" 
                    : "bg-cyber-purple text-white"
              }`}>
                {product.badge}
              </span>
            )}

            {/* Favorite button */}
            <button 
              className="absolute top-4 right-4 z-20 text-slate-400 hover:text-rog-red transition-colors p-1"
              id={`fav-btn-${product.id}`}
              aria-label="Add to Wishlist"
            >
              <Heart size={16} />
            </button>

            {/* Product Image Frame */}
            <div className="relative w-full h-[180px] mb-6 flex items-center justify-center bg-[#0d0d12]/40 rounded overflow-hidden">
              <div className="relative w-[75%] h-[75%] group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700 ease-out">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]"
                  sizes="(max-w-768px) 100vw, 25vw"
                />
              </div>
              
              {/* Quick Actions Panel on hover */}
              <div className="absolute inset-0 bg-[#060609]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-10">
                <button 
                  onClick={() => onAddToCart(product)}
                  className="p-3 bg-rog-red text-white rounded hover:bg-[#ff1a35] shadow-lg shadow-rog-red/20 transition-all duration-300 hover:scale-110 cursor-pointer"
                  title="Add to Cart"
                  id={`add-cart-overlay-${product.id}`}
                >
                  <ShoppingCart size={18} />
                </button>
                <button 
                  className="p-3 bg-slate-900 text-slate-300 rounded hover:text-white border border-white/5 transition-all duration-300 hover:scale-110 cursor-pointer"
                  title="Quick View"
                  id={`quick-view-${product.id}`}
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>

            {/* Product Meta */}
            <div className="flex flex-col space-y-2 mt-auto">
              <span className="text-[10px] font-sans font-black tracking-widest text-slate-500 uppercase">
                {product.subCategory}
              </span>
              <h3 className="font-display font-bold text-sm tracking-wide text-slate-300 group-hover:text-white transition-colors duration-300 line-clamp-1">
                {product.name}
              </h3>
              
              {/* Stars Rating */}
              <div className="flex gap-1 text-amber-500">
                {Array.from({ length: product.rating }).map((_, i) => (
                  <Star key={i} size={10} fill="currentColor" />
                ))}
                {Array.from({ length: 5 - product.rating }).map((_, i) => (
                  <Star key={i} size={10} className="text-slate-700" />
                ))}
              </div>

              {/* Price & Add to Cart Inline (Fallback for mobile/tap) */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-2">
                <span className="font-display font-extrabold text-white text-base">
                  ${product.price.toFixed(2)}
                </span>
                
                <button 
                  onClick={() => onAddToCart(product)}
                  className="flex lg:hidden items-center gap-1.5 px-3 py-1.5 bg-rog-red hover:bg-[#ff1a35] text-white text-[10px] font-display font-black tracking-wider uppercase rounded transition-colors duration-300 cursor-pointer"
                  id={`add-cart-inline-${product.id}`}
                >
                  <ShoppingCart size={10} />
                  <span>ADD</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
