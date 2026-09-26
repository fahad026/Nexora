import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star, ShieldCheck, Zap, Play } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-50/50 via-transparent to-transparent dark:from-brand-950/20 dark:via-transparent dark:to-transparent py-12 md:py-20 lg:py-24">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-500/20 via-cyan-400/20 to-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-dark-card border border-brand-200 dark:border-brand-900/60 shadow-sm text-xs font-semibold text-brand-700 dark:text-brand-300">
              <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-spin-slow" />
              <span>Next-Generation Luxury E-Commerce</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              <span className="text-slate-500 dark:text-slate-400 font-normal">Fall/Winter 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Where Precision Tech Meets{' '}
              <span className="text-gradient">Haute Couture</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Experience the pinnacle of curated craftsmanship. From lossless acoustic audio and aerospace titanium timepieces to tailored gabardine outerwear.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/shop"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 transition-all duration-300 group"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#featured-categories"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-dark-card hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Explore Categories</span>
              </a>
            </div>

            {/* Social Proof & Metrics */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">50k+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Curated Orders</p>
              </div>
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">4.9</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Client Rating</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">99.8%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative background glow frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-600 to-cyan-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-subtle" />

              {/* Main Card */}
              <div className="relative rounded-3xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 p-4 sm:p-6 shadow-2xl overflow-hidden">
                {/* Hero Showcase Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                    alt="Featured Studio Pro Headset"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Hot Deal Tag */}
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
                    <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>Flagship of the Year</span>
                  </div>

                  {/* Floating specs pill */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 p-3 rounded-2xl shadow-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        Studio Pro Wireless
                      </p>
                      <p className="text-[11px] text-brand-600 dark:text-brand-400 font-medium">
                        Hybrid ANC &bull; 50hr Reserve
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                        $349.99
                      </span>
                    </div>
                  </div>
                </div>

                {/* Micro preview strip underneath */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 text-center">
                    <p className="text-[10px] text-slate-400">Audio Fidelity</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Hi-Res LDAC</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 text-center">
                    <p className="text-[10px] text-slate-400">Housing</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Aluminum</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 text-center">
                    <p className="text-[10px] text-slate-400">Warranty</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">2-Year Full</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
