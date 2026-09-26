import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight, ShieldCheck, Truck, Check, Sparkles, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function OrderSummary({ showCheckoutButton = true }) {
  const {
    subtotal,
    discountAmount,
    shippingCost,
    tax,
    total,
    coupon,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
    freeShippingProgress,
    amountForFreeShipping,
    cartItems,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyCoupon(promoInput);
      setPromoInput('');
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm sticky top-24">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Order Summary
      </h3>

      {/* Free Shipping Progress */}
      <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
            <Truck className="w-4 h-4 text-brand-500" />
            {amountForFreeShipping === 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                You've unlocked Free Shipping!
              </span>
            ) : (
              <span>Add <strong className="text-brand-600 dark:text-brand-400">${amountForFreeShipping.toFixed(2)}</strong> for Free Delivery</span>
            )}
          </span>
          <span className="text-slate-400 font-bold">{Math.round(freeShippingProgress)}%</span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-600 to-cyan-500 rounded-full transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 text-sm border-b border-slate-100 dark:border-slate-800/80 pb-5">
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-rose-500 font-medium">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Discount ({coupon?.label || 'Promo'})
            </span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Estimated Shipping</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            {shippingCost === 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE</span>
            ) : (
              `$${shippingCost.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Estimated Tax (8%)</span>
          <span className="font-semibold text-slate-900 dark:text-white">
            ${tax.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="py-4 border-b border-slate-100 dark:border-slate-800/80 flex items-baseline justify-between">
        <div>
          <p className="text-base font-bold text-slate-900 dark:text-white">Total</p>
          <p className="text-xs text-slate-400">Including taxes and duties</p>
        </div>
        <p className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          ${total.toFixed(2)}
        </p>
      </div>

      {/* Promo Code Input */}
      <div className="mt-5">
        {coupon ? (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <div>
                <p className="font-bold text-brand-700 dark:text-brand-300">
                  {coupon.code} Applied
                </p>
                <p className="text-brand-600/80 dark:text-brand-400/80">{coupon.label}</p>
              </div>
            </div>
            <button
              onClick={removeCoupon}
              className="p-1 rounded-full text-brand-500 hover:text-rose-500 transition"
              aria-label="Remove coupon"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Promo code (try NEXORA20)"
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 uppercase"
            />
            <button
              type="submit"
              disabled={!promoInput.trim()}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 font-semibold text-xs transition disabled:opacity-50"
            >
              Apply
            </button>
          </form>
        )}
      </div>

      {/* Checkout Button */}
      {showCheckoutButton && (
        <div className="mt-6">
          <Link
            to="/checkout"
            className={`w-full py-4 px-6 rounded-2xl font-bold text-sm text-center flex items-center justify-center gap-2 transition-all duration-300 shadow-xl ${
              cartItems.length === 0
                ? 'pointer-events-none opacity-50 bg-slate-200 dark:bg-slate-800 text-slate-400'
                : 'bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white shadow-brand-500/25 hover:shadow-brand-500/40'
            }`}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Trust Badges */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>256-bit bank-grade SSL secure checkout</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>30-day money-back satisfaction guarantee</span>
        </div>
      </div>
    </div>
  );
}
