import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import QuickViewModal from '../QuickViewModal/QuickViewModal';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleOpenQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div className="group relative bg-white dark:bg-dark-card rounded-2xl md:rounded-3xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-brand-950/20 transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-[4/3] sm:aspect-square w-full bg-slate-100 dark:bg-slate-900/60 overflow-hidden">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.discount > 0 && (
              <span className="bg-rose-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wide">
                -{product.discount}%
              </span>
            )}
            {product.isNewArrival && (
              <span className="bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
                New
              </span>
            )}
            {product.isTrending && !product.isNewArrival && (
              <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wider">
                Trending
              </span>
            )}
          </div>

          {/* Action buttons (Wishlist & Quick View) */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            <button
              onClick={handleToggleWishlist}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
                isWishlisted
                  ? 'bg-rose-50 text-rose-500 dark:bg-rose-950/80'
                  : 'bg-white/90 dark:bg-dark-card/90 text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 backdrop-blur-sm'
              }`}
              aria-label="Add to wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={handleOpenQuickView}
              className="w-9 h-9 rounded-full bg-white/90 dark:bg-dark-card/90 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 flex items-center justify-center transition-all duration-200 shadow-md backdrop-blur-sm"
              aria-label="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Add Overlay on Desktop */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 hidden sm:block z-10">
            <button
              onClick={handleQuickAdd}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg backdrop-blur-md transition-all ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900/90 hover:bg-slate-950 text-white dark:bg-white/95 dark:text-slate-900 dark:hover:bg-white active:scale-95'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {product.category}
              </span>
              {/* Rating */}
              <div className="flex items-center gap-1 text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {product.rating}
                </span>
                <span className="text-slate-400 text-[11px]">({product.reviews})</span>
              </div>
            </div>

            <Link to={`/product/${product.id}`} className="block group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-2 leading-snug">
                {product.name}
              </h3>
            </Link>
          </div>

          <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Mobile-only quick add icon */}
            <button
              onClick={handleQuickAdd}
              className="sm:hidden w-8 h-8 rounded-full bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center"
              aria-label="Add to cart"
            >
              {isAdded ? <Check className="w-4 h-4 text-emerald-500" /> : <ShoppingBag className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
