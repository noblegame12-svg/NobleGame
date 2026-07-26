"use client";

import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem }) {
  const { t } = useLanguage();
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const freeShippingThreshold = 150;
  const shippingLeft = freeShippingThreshold - subtotal;
  const shippingPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Background Dark Overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity cursor-pointer animate-fade-in"
      ></div>

      {/* Slide-out Drawer Box */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#08080c] border-l border-white/5 flex flex-col shadow-2xl relative animate-slide-left">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-rog-red" />
              <span className="font-display font-black text-sm tracking-widest text-white uppercase">{t("cartDrawer.yourCart")}</span>
              <span className="bg-slate-900 text-xs px-2 py-0.5 rounded-full font-bold text-slate-400">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            </div>
            
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-rog-red transition-colors p-1 cursor-pointer"
              id="close-cart-btn"
              aria-label="Close Cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Shipping Goal Tracker (Premium touch) */}
          <div className="px-6 py-4 bg-slate-950/60 border-b border-white/5 space-y-2">
            <div className="text-xs text-slate-400">
              {shippingLeft > 0 ? (
                <span>
                  {t("cartDrawer.spendMorePart1")}
                  <strong className="text-white">${shippingLeft.toFixed(2)}</strong>
                  {t("cartDrawer.spendMorePart2")}
                  <strong>{t("cartDrawer.freeShippingUpper")}</strong>!
                </span>
              ) : (
                <span className="text-emerald-500 font-bold">{t("cartDrawer.freeShippingQualified")}</span>
              )}
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-rog-red to-[#ff003c] h-full rounded-full transition-all duration-500 shadow-[0_0_10px_#e30016]"
                style={{ width: `${shippingPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center text-slate-600 border border-white/5">
                  <ShoppingBag size={28} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">{t("cartDrawer.cartEmpty")}</p>
                  <p className="text-xs text-slate-500 max-w-[240px]">{t("cartDrawer.cartEmptyDesc")}</p>
                </div>
                <button 
                  onClick={onClose}
                  className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-xs font-display font-bold uppercase rounded tracking-wider cursor-pointer text-slate-300 hover:text-white transition-colors"
                >
                  {t("cartDrawer.returnToStore")}
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-4 p-4 rounded-lg bg-slate-950/50 border border-white/5 hover:border-slate-800/80 transition-colors"
                  id={`cart-item-${item.id}`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded bg-[#0d0d12]/50 flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                    />
                  </div>

                  {/* Item Description */}
                  <div className="flex-1 flex flex-col justify-between text-left">
                    <div>
                      <h4 className="font-display font-bold text-xs text-white line-clamp-1 leading-tight">{item.name}</h4>
                      <p className="text-[10px] text-slate-500 uppercase mt-0.5">{item.category}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Qty Adjustment */}
                      <div className="flex items-center bg-[#060609] border border-white/5 rounded-md px-1 py-0.5">
                        <button 
                          onClick={() => onUpdateQty(item.id, item.qty - 1)}
                          className="p-1 text-slate-400 hover:text-white cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-xs font-bold text-white px-2.5 min-w-[20px] text-center font-sans">{item.qty}</span>
                        <button 
                          onClick={() => onUpdateQty(item.id, item.qty + 1)}
                          className="p-1 text-slate-400 hover:text-white cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <span className="font-display font-bold text-sm text-white">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="text-slate-600 hover:text-rog-red transition-colors p-1 self-start cursor-pointer"
                    title="Remove item"
                    id={`remove-item-${item.id}`}
                  >
                    <Trash2 size={14} />
                  </button>

                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Summary */}
          {cartItems.length > 0 && (
            <div className="px-6 py-6 bg-slate-950 border-t border-white/5 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-400 font-sans uppercase tracking-wider">{t("cartDrawer.subtotal")}</span>
                <span className="font-display font-black text-2xl text-white neon-text-red">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 text-left leading-normal font-sans">
                {t("cartDrawer.shippingTaxNotice")}
              </p>

              {/* Checkout CTA */}
              <button 
                className="w-full relative inline-flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-rog-red to-[#ff003c] hover:from-[#ff1a35] hover:to-rog-red text-white text-xs tracking-widest font-display font-black uppercase rounded shadow-lg shadow-rog-red/20 transition-all duration-300 cursor-pointer"
                id="cart-checkout-btn"
              >
                <span>{t("cartDrawer.proceedToCheckout")}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
