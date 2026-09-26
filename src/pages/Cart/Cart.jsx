import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem/CartItem';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

export default function Cart() {
  const { cartItems, clearCart, cartCount, shippingMethod, setShippingMethod } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-3xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto mb-6 shadow-inner">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
          Looks like you haven't added any luxury items yet. Explore our curated catalog of precision audio, designer watches, and streetwear.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold text-sm shadow-xl shadow-brand-500/25 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Start Exploring Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Shopping Bag ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review your selected items before proceeding to secure checkout.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Cart
          </button>
          <Link
            to="/shop"
            className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Main Grid: Items on left (7 cols), Order Summary on right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-7 bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-2">
          {/* Items Header */}
          <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Product</span>
            <span className="hidden sm:inline">Quantity & Total</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Shipping Delivery Speed Selector */}
          <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Select Shipping Speed
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'standard', name: 'Standard (3-5 Days)', price: 'FREE over $150 ($12)' },
                { id: 'express', name: 'Express (1-2 Days)', price: '$24.00' },
                { id: 'overnight', name: 'Overnight VIP', price: '$45.00' },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    shippingMethod === opt.id
                      ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 text-brand-900 dark:text-brand-200 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">{opt.name}</span>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={opt.id}
                      checked={shippingMethod === opt.id}
                      onChange={() => setShippingMethod(opt.id)}
                      className="text-brand-600 focus:ring-brand-500"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {opt.price}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <OrderSummary showCheckoutButton={true} />
        </div>
      </div>
    </div>
  );
}
