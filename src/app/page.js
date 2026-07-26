"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import DualSensePromo from "@/components/DualSensePromo";
import VideoCtaSection from "@/components/VideoCtaSection";
import ProductShowcase from "@/components/ProductShowcase";
import FeaturedProducts from "@/components/FeaturedProducts";
import PCBuilder from "@/components/PCBuilder";
import PricingBuilds from "@/components/PricingBuilds";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add item to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
    // Auto open cart drawer when adding item
    setIsCartOpen(true);
  };

  // Update item quantity inside cart
  const handleUpdateQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, qty: newQty } : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Trigger scroll to Shop
  const handleScrollToShop = () => {
    const shopSection = document.getElementById("featured-products");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Count total quantity of items in cart
  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="relative min-h-screen bg-slate-950 flex flex-col font-sans antialiased overflow-x-hidden">

      {/* Decorative scanline overlay (gaming aesthetic) */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-5">
        <div className="w-full h-[3px] bg-slate-100 animate-scanline"></div>
      </div>

      {/* Main Navigation Header */}
      <Navbar
        cartCount={totalCartCount}
        onCartToggle={() => setIsCartOpen(!isCartOpen)}
      />

      <main className="flex-1 w-full">
        {/* Motherboard Hero section */}
        <Hero onShopClick={handleScrollToShop} />

        {/* Categories Section */}
        <Categories />

        {/* DualSense Promotion Section */}
        <DualSensePromo onAddToCart={handleAddToCart} />

        {/* Premium Product Showcase */}
        <ProductShowcase />

        {/* Video CTA — Beli atau Sewa */}
        <VideoCtaSection />



        {/* Featured Hardware Section */}
        {/* <FeaturedProducts onAddToCart={handleAddToCart} />*/}

        {/* Custom PC builder Section */}
        {/*<PCBuilder />*/}

        {/* Pricing PC Builds Section */}
        {/*<PricingBuilds onBuyBuild={handleAddToCart} />*/}
      </main>

      {/* FAQ Section */}
      <FAQ />

      {/* Footer & Newsletter signup */}
      <Footer />

      {/* Shopping Cart Drawer overlay */}
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
