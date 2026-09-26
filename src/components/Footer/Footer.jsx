import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Check,
  Sparkles,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast({
        type: 'error',
        title: 'Invalid Email',
        message: 'Please enter a valid email address.',
      });
      return;
    }
    setSubscribed(true);
    addToast({
      type: 'success',
      title: 'Welcome to NEXORA VIP',
      message: 'You have been subscribed to exclusive weekly product drops!',
    });
    setEmail('');
  };

  return (
    <footer className="bg-white dark:bg-[#070b12] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      {/* Value propositions banner */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 py-8 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Free Express Shipping</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Complimentary on orders over $150</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">30-Day Hassle Returns</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Pre-paid label & full refunds</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Authentic Guarantee</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">100% verified original merchandise</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">24/7 VIP Concierge</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Instant dedicated support anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-600 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <span className="font-extrabold text-white text-lg">N</span>
                </div>
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
                NEXORA
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              The premier destination for cutting-edge electronics, artisanal streetwear, and designer home accents. Curated for discerning individuals who value craftsmanship and technological innovation.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                Join the Nexora Insider
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-brand-500/20 transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Join</span>
                </button>
              </form>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/shop?category=Electronics" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Fashion" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Fashion & Streetwear
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Shoes" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Sneakers & Footwear
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Accessories" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Watches & Accessories
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Beauty" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Clean Beauty & Wellness
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Gadgets" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Smart Tech & Gadgets
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/shop" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop?sort=newest" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop?sort=trending" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Trending Now
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  User Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/dashboard?tab=orders" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Track Your Shipment
                </Link>
              </li>
              <li>
                <span className="cursor-pointer hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Returns & Exchanges
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Global Shipping Policy
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Authenticity Verification
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-brand-600 dark:hover:text-brand-400 transition">
                  Privacy Policy & Terms
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 mt-10 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} NEXORA Inc. All rights reserved. Designed for premier commercial experience.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Supported Payments:</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-[10px] text-slate-600 dark:text-slate-300">VISA</span>
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-[10px] text-slate-600 dark:text-slate-300">MasterCard</span>
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-[10px] text-slate-600 dark:text-slate-300">Apple Pay</span>
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-[10px] text-slate-600 dark:text-slate-300">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
