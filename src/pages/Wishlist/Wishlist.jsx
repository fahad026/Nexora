import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function Wishlist() {
  const { wishlist, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    wishlist.forEach((item) => {
      addToCart(item, 1, false);
    });
  };

  if (wishlistCount === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-3xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Heart className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
          Your Wishlist is Empty
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
          Save your favorite timepieces, acoustic headphones, and seasonal fashion to monitor price drops and availability.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold text-sm shadow-xl shadow-brand-500/25 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Discover Products to Save</span>
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
            Saved Wishlist ({wishlistCount} {wishlistCount === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Items saved to your personal collection. Stored across sessions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddAllToCart}
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-brand-500/20 active:scale-95 transition"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add All to Cart</span>
          </button>
          <button
            onClick={clearWishlist}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Grid of Wishlist Items */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
