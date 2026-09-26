import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  X,
  Sparkles,
  Grid3X3,
  LayoutGrid,
} from 'lucide-react';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import { PRODUCTS } from '../../data/products';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state sync
  const querySearch = searchParams.get('search') || '';
  const queryCategory = searchParams.get('category') || 'all';
  const querySort = searchParams.get('sort') || 'featured';

  const [searchQuery, setSearchQuery] = useState(querySearch);
  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [sortBy, setSortBy] = useState(querySort);
  const [priceRange, setPriceRange] = useState([0, 800]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [gridColumns, setGridColumns] = useState(4);

  // Sync state if URL changes (e.g. from navbar category click or search)
  useEffect(() => {
    if (queryCategory) setSelectedCategory(queryCategory);
    if (querySearch !== searchQuery) setSearchQuery(querySearch);
    if (querySort) setSortBy(querySort);
  }, [queryCategory, querySearch, querySort]);

  // Update URL params
  const updateUrlParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === 'featured') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    updateUrlParam('category', cat);
    setVisibleCount(8);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    updateUrlParam('sort', newSort);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateUrlParam('search', searchQuery);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange([0, 800]);
    setMinRating(0);
    setInStockOnly(false);
    setDiscountOnly(false);
    setSortBy('featured');
    setSearchParams({});
    setVisibleCount(8);
  };

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesTag = product.tags && product.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesCat && !matchesDesc && !matchesTag) return false;
      }

      // 2. Category filter
      if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
        if (product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // 3. Price filter
      const effectivePrice = product.discount
        ? product.price * (1 - product.discount / 100)
        : product.price;
      if (effectivePrice < priceRange[0] || effectivePrice > priceRange[1]) {
        return false;
      }

      // 4. Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      // 5. In-stock filter
      if (inStockOnly && product.stock <= 0) {
        return false;
      }

      // 6. Discount filter
      if (discountOnly && (!product.discount || product.discount <= 0)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
      const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;

      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'trending') return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      if (sortBy === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return 0; // default featured
    });
  }, [searchQuery, selectedCategory, priceRange, minRating, inStockOnly, discountOnly, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  // Active filters list for display
  const activeFilters = [];
  if (selectedCategory !== 'all') {
    activeFilters.push({ label: `Category: ${selectedCategory}`, remove: () => handleCategorySelect('all') });
  }
  if (searchQuery) {
    activeFilters.push({ label: `Search: "${searchQuery}"`, remove: () => { setSearchQuery(''); updateUrlParam('search', ''); } });
  }
  if (priceRange[0] > 0 || priceRange[1] < 800) {
    activeFilters.push({ label: `$${priceRange[0]} - $${priceRange[1]}`, remove: () => setPriceRange([0, 800]) });
  }
  if (minRating > 0) {
    activeFilters.push({ label: `Rating: ${minRating}+ Stars`, remove: () => setMinRating(0) });
  }
  if (inStockOnly) {
    activeFilters.push({ label: 'In Stock Only', remove: () => setInStockOnly(false) });
  }
  if (discountOnly) {
    activeFilters.push({ label: 'Discounted Only', remove: () => setDiscountOnly(false) });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          The Nexora Collection
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore All Products
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
          Discover handcrafted electronics, luxury chronographs, footwear, and curated wellness formulas.
        </p>
      </div>

      {/* Main Layout (Sidebar + Products) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Component (Desktop and Mobile) */}
        <FilterSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          minRating={minRating}
          onRatingChange={setMinRating}
          inStockOnly={inStockOnly}
          onInStockChange={setInStockOnly}
          discountOnly={discountOnly}
          onDiscountOnlyChange={setDiscountOnly}
          onResetFilters={handleResetFilters}
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          totalResults={filteredProducts.length}
        />

        {/* Products Column */}
        <div className="flex-1 w-full min-w-0">
          {/* Controls Bar */}
          <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog..."
                className="w-full pl-10 pr-10 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    updateUrlParam('search', '');
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Right Controls: Sort & Mobile filter trigger */}
            <div className="flex items-center gap-2 justify-between md:justify-end">
              {/* Mobile Filter Drawer Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200"
              >
                <SlidersHorizontal className="w-4 h-4 text-brand-500" />
                <span>Filters {activeFilters.length > 0 && `(${activeFilters.length})`}</span>
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/30 cursor-pointer"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="trending">Trending First</option>
                  <option value="newest">New Arrivals</option>
                  <option value="bestseller">Best Sellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Layout Switcher (3 or 4 cols on desktop) */}
              <div className="hidden xl:flex items-center gap-1 border border-slate-200 dark:border-slate-700 rounded-xl p-1 bg-slate-50 dark:bg-slate-800">
                <button
                  onClick={() => setGridColumns(3)}
                  className={`p-1.5 rounded-lg transition ${gridColumns === 3 ? 'bg-white dark:bg-slate-700 text-brand-600 shadow-sm' : 'text-slate-400'}`}
                  aria-label="3 columns"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridColumns(4)}
                  className={`p-1.5 rounded-lg transition ${gridColumns === 4 ? 'bg-white dark:bg-slate-700 text-brand-600 shadow-sm' : 'text-slate-400'}`}
                  aria-label="4 columns"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs text-slate-400 font-semibold">Active Filters:</span>
              {activeFilters.map((af, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60 text-xs font-semibold text-brand-700 dark:text-brand-300"
                >
                  {af.label}
                  <button onClick={af.remove} className="hover:text-rose-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 font-semibold underline ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-4 text-xs font-medium text-slate-500 dark:text-slate-400 px-1">
            <span>
              Showing <strong>{visibleProducts.length}</strong> of <strong>{filteredProducts.length}</strong> products
            </span>
          </div>

          {/* Products Grid */}
          <ProductGrid
            products={visibleProducts}
            columns={gridColumns}
            onResetFilters={handleResetFilters}
          />

          {/* Load More Button / Pagination */}
          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount(c => c + 8)}
                className="px-8 py-3.5 rounded-full bg-white dark:bg-dark-card hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                Load More Products ({filteredProducts.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
