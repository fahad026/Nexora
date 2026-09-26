import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { PackageOpen, Sparkles } from 'lucide-react';

export default function ProductGrid({
  products = [],
  isLoading = false,
  columns = 4,
  emptyTitle = "No products found",
  emptySubtitle = "Try adjusting your search criteria, category or price filters.",
  onResetFilters,
}) {
  if (isLoading) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns} gap-4 sm:gap-6`}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-dark-card rounded-2xl md:rounded-3xl border border-slate-200/80 dark:border-slate-800 p-4 animate-pulse space-y-4"
          >
            <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
              <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 px-4 text-center bg-white dark:bg-dark-card rounded-3xl border border-slate-200/80 dark:border-slate-800 my-4 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto mb-4">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {emptyTitle}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
          {emptySubtitle}
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-500/20 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  // Dynamic grid column class mappings
  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={`grid ${gridClasses[columns] || gridClasses[4]} gap-4 sm:gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
