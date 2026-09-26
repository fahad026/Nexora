import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award,
  Zap,
  Clock,
  Star,
  Quote,
  Flame,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import Hero from '../../components/Hero/Hero';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import { PRODUCTS, CATEGORIES, TESTIMONIALS } from '../../data/products';

export default function Home() {
  const trendingProducts = PRODUCTS.filter(p => p.isTrending).slice(0, 4);
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter(p => p.isNewArrival).slice(0, 4);

  // Promotional countdown timer state (mock flash sale)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 38,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Categories Section */}
      <section id="featured-categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore Collections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Featured Categories
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1.5 group"
          >
            <span>Browse All 7 Categories</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.slice(0, 4).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 3. Trending Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500 mb-1">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>Most Wanted This Week</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Trending Products
            </h2>
          </div>
          <Link
            to="/shop?sort=trending"
            className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1.5 group"
          >
            <span>See All Trending</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductGrid products={trendingProducts} columns={4} />
      </section>

      {/* 4. Promotional Banner (Flash Sale with Live Countdown) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-brand-950 to-slate-900 text-white p-8 sm:p-12 lg:p-16 border border-brand-900/60 shadow-2xl">
          {/* Ambient light inside banner */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                Limited Time Flash Event
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Unlock 20% Off Your Entire Cart with <span className="text-gradient">NEXORA20</span>
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Experience next-tier luxury audio, precision chronographs, and curated wardrobe essentials. Applies across all new seasonal arrivals.
              </p>

              {/* Countdown Clocks */}
              <div className="pt-2 flex items-center gap-3">
                <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2.5 min-w-[4.5rem] border border-white/10">
                  <span className="text-2xl font-black text-white font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-300">Hours</span>
                </div>
                <span className="text-xl font-bold text-slate-400">:</span>
                <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2.5 min-w-[4.5rem] border border-white/10">
                  <span className="text-2xl font-black text-white font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-300">Mins</span>
                </div>
                <span className="text-xl font-bold text-slate-400">:</span>
                <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2.5 min-w-[4.5rem] border border-white/10">
                  <span className="text-2xl font-black text-amber-400 font-mono">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] uppercase tracking-wider text-slate-300">Secs</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 active:scale-95 transition-all shadow-xl"
                >
                  <span>Claim Promotion Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Banner Graphic/Thumbnail side */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/15">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
                  alt="Promotion Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-xs font-semibold text-brand-300 uppercase tracking-widest">
                      Featured Piece
                    </span>
                    <h4 className="text-lg font-bold text-white">
                      AeroPulse Chronograph
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              <Award className="w-4 h-4" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Best Sellers
            </h2>
          </div>
          <Link
            to="/shop?sort=bestseller"
            className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1.5 group"
          >
            <span>View All Best Sellers</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductGrid products={bestSellers} columns={4} />
      </section>

      {/* 6. New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Just In Fresh</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/shop?sort=newest"
            className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1.5 group"
          >
            <span>Discover All New</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductGrid products={newArrivals} columns={4} />
      </section>

      {/* 7. Customer Reviews / Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Star className="w-3.5 h-3.5 fill-brand-500 text-brand-500" />
            Verified Client Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Loved by Connoisseurs Globally
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Discover why over 50,000 discerning collectors choose NEXORA for everyday luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 rounded-3xl p-7 shadow-sm flex flex-col justify-between relative hover:shadow-lg transition-shadow"
            >
              <div>
                <Quote className="w-8 h-8 text-brand-200 dark:text-brand-900/60 mb-3" />
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-500/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
