import React from 'react';
import { Star, X, RotateCcw, Filter, Check } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  inStockOnly,
  onInStockChange,
  onDiscountOnlyChange,
  discountOnly,
  onResetFilters,
  isOpen = false,
  onClose,
  totalResults = 0,
}) {
  const content = (
    <div className="space-y-6">
      {/* Header for mobile or desktop */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base">
          <Filter className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <span>Filters</span>
          <span className="text-xs font-normal text-slate-400">({totalResults} items)</span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs font-semibold text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          Categories
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => onSelectCategory('all')}
            className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition ${
              selectedCategory === 'all'
                ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <span>All Categories</span>
            {selectedCategory === 'all' && <Check className="w-4 h-4 text-brand-600" />}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition ${
                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Price Range
          </h4>
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="800"
          step="20"
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
          className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
        />

        {/* Quick price presets */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {[
            { label: 'Under $100', range: [0, 100] },
            { label: '$100 - $250', range: [100, 250] },
            { label: '$250 - $500', range: [250, 500] },
            { label: '$500+', range: [500, 800] },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => onPriceChange(preset.range)}
              className={`py-1.5 px-2.5 rounded-lg text-xs font-medium text-center border transition ${
                priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1]
                  ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          Minimum Rating
        </h4>
        <div className="space-y-1.5">
          {[4.5, 4.0, 3.5].map((rating) => (
            <button
              key={rating}
              onClick={() => onRatingChange(minRating === rating ? 0 : rating)}
              className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition ${
                minRating === rating
                  ? 'bg-amber-50 text-amber-900 dark:bg-amber-950/30 dark:text-amber-300 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{rating} stars & above</span>
              </div>
              {minRating === rating && <Check className="w-4 h-4 text-amber-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle switches (In Stock & Deals) */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Special Options
        </h4>

        {/* In Stock Only */}
        <label className="flex items-center justify-between cursor-pointer py-1">
          <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            In Stock Only
          </span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 dark:bg-slate-800 dark:border-slate-700 cursor-pointer"
          />
        </label>

        {/* Discount Only */}
        <label className="flex items-center justify-between cursor-pointer py-1">
          <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            On Sale / Discounted
          </span>
          <input
            type="checkbox"
            checked={discountOnly}
            onChange={(e) => onDiscountOnlyChange(e.target.checked)}
            className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 dark:bg-slate-800 dark:border-slate-700 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop static sidebar */}
      <div className="hidden lg:block w-64 shrink-0 bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm sticky top-24 self-start">
        {content}
      </div>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <div className="relative ml-auto w-full max-w-xs h-full bg-white dark:bg-dark-card border-l border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-y-auto flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="font-bold text-lg text-slate-900 dark:text-white">Filter Products</span>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 rounded-2xl bg-brand-600 text-white font-semibold text-sm shadow-lg shadow-brand-500/25"
            >
              Show Results
            </button>
          </div>
        </div>
      )}
    </>
  );
}
