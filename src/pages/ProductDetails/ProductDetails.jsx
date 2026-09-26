import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ChevronRight,
  Share2,
  Sparkles,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs' | 'reviews'
  const [isAdded, setIsAdded] = useState(false);

  // New review form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      author: 'Sophia Martinez',
      rating: 5,
      date: 'September 12, 2026',
      verified: true,
      comment: 'Absolutely blown away by the quality. Build materials feel top notch, unboxing experience was pristine, and delivery took less than 48 hours.',
    },
    {
      id: 2,
      author: 'Julian Vance',
      rating: 5,
      date: 'August 29, 2026',
      verified: true,
      comment: 'Matches the pictures and specifications 100%. Highly recommended for anyone seeking true luxury grade items.',
    },
    {
      id: 3,
      author: 'Emma Lindqvist',
      rating: 4,
      date: 'August 14, 2026',
      verified: true,
      comment: 'Great craftsmanship. The details are very subtle and elegant. Will definitely order from NEXORA again.',
    }
  ]);

  // Reset selected image and quantity if product changes
  useEffect(() => {
    setSelectedImage(product.image);
    setQuantity(1);
  }, [id, product.image]);

  const images = product.images || [product.image];
  const isWishlisted = isInWishlist(product.id);

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const savings = product.price - discountedPrice;

  // Related products from same category
  const relatedProducts = PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, false);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        type: 'success',
        title: 'Link Copied',
        message: 'Product URL copied to clipboard!',
      });
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    const newRev = {
      id: Date.now(),
      author: reviewAuthor.trim(),
      rating: reviewRating,
      date: 'Just now',
      verified: true,
      comment: reviewComment.trim(),
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewAuthor('');
    setReviewComment('');
    addToast({
      type: 'success',
      title: 'Review Published',
      message: 'Thank you for your feedback!',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/shop" className="hover:text-brand-600 dark:hover:text-brand-400 transition">
          Shop
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link
          to={`/shop?category=${encodeURIComponent(product.category)}`}
          className="hover:text-brand-600 dark:hover:text-brand-400 transition"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 dark:text-white truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Gallery Column (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 shadow-md">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300 hover:scale-105 cursor-zoom-in"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.discount > 0 && (
                <span className="bg-rose-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md tracking-wider">
                  -{product.discount}% OFF
                </span>
              )}
              {product.isNewArrival && (
                <span className="bg-brand-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                  New Season
                </span>
              )}
            </div>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/90 dark:bg-dark-card/90 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 shadow-md backdrop-blur-sm transition"
              aria-label="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === img
                      ? 'border-brand-600 ring-4 ring-brand-500/20 shadow-md'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Column (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600 dark:text-brand-400">
                {product.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                In Stock ({product.stock} units available)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {product.rating}
              </span>
              <span className="text-xs text-slate-400">
                &bull; ({product.reviews} verified ratings)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <>
                  <span className="text-lg text-slate-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full">
                    Save ${savings.toFixed(2)} ({product.discount}%)
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Price includes all applicable import duties. Free shipping eligible.
            </p>
          </div>

          {/* Short description */}
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* Features Highlights */}
          {product.features && (
            <div className="space-y-2 py-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Key Highlights
              </p>
              <div className="space-y-1.5">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <Check className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-dark-card p-1">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold transition"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-sm text-slate-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-xl ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/25 active:scale-[0.98]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/40 dark:border-rose-900'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Buy Now Instant Checkout Button */}
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-slate-900 hover:bg-slate-950 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Instant Buy Now</span>
            </button>
          </div>

          {/* Value propositions */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80">
              <Truck className="w-4 h-4 mx-auto text-brand-500 mb-1" />
              <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Express Delivery</p>
              <p className="text-[10px] text-slate-400">1-3 Days</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80">
              <RotateCcw className="w-4 h-4 mx-auto text-cyan-500 mb-1" />
              <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">30-Day Returns</p>
              <p className="text-[10px] text-slate-400">Zero restocking fee</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80">
              <ShieldCheck className="w-4 h-4 mx-auto text-emerald-500 mb-1" />
              <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">2-Year Warranty</p>
              <p className="text-[10px] text-slate-400">Official protection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Overview, Specifications, Reviews */}
      <div className="border-t border-slate-200 dark:border-slate-800 pt-10">
        {/* Tab Switcher */}
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 px-4 font-bold text-sm transition relative ${
              activeTab === 'overview'
                ? 'text-brand-600 dark:text-brand-400'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Product Overview
            {activeTab === 'overview' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2 px-4 font-bold text-sm transition relative ${
              activeTab === 'specs'
                ? 'text-brand-600 dark:text-brand-400'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Technical Specifications
            {activeTab === 'specs' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-2 px-4 font-bold text-sm transition relative ${
              activeTab === 'reviews'
                ? 'text-brand-600 dark:text-brand-400'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Client Reviews ({reviewsList.length})
            {activeTab === 'reviews' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-full" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === 'overview' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Detailed Product Narrative
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {product.description}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Each unit undergoes rigorous laboratory testing and hand inspection prior to dispatch. NEXORA warrants every component against manufacturing variances.
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-xs sm:text-sm text-left">
                <tbody>
                  {product.specifications &&
                    Object.entries(product.specifications).map(([key, val], idx) => (
                      <tr
                        key={key}
                        className={idx % 2 === 0 ? 'bg-slate-50/50 dark:bg-slate-900/40' : ''}
                      >
                        <td className="px-5 py-3 font-semibold text-slate-500 dark:text-slate-400 w-1/3 border-b border-slate-100 dark:border-slate-800">
                          {key}
                        </td>
                        <td className="px-5 py-3 font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800">
                          {val}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8 max-w-3xl">
              {/* Existing Reviews List */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {rev.author}
                        </span>
                        {rev.verified && (
                          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>

              {/* Add a review form */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Write a Verified Review
                </h4>
                <form onSubmit={handleAddReview} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        placeholder="e.g. Liam Sterling"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Rating (Stars)
                      </label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 font-semibold"
                      >
                        <option value={5}>5 Stars - Exceptional</option>
                        <option value={4}>4 Stars - Very Good</option>
                        <option value={3}>3 Stars - Average</option>
                        <option value={2}>2 Stars - Below Expectations</option>
                        <option value={1}>1 Star - Poor</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your Detailed Review
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience regarding materials, delivery, fit, or performance..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition active:scale-95"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Curated Suggestions
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Related {product.category} Items
              </h3>
            </div>
            <Link
              to={`/shop?category=${encodeURIComponent(product.category)}`}
              className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <span>Explore category</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
