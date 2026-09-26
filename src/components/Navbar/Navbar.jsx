import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  User,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Search,
  LogOut,
  Package,
  Settings,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../SearchBar/SearchBar';
import { CATEGORIES } from '../../data/products';

export default function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCategoryMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname, location.search]);

  // Track scroll for subtle shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClasses = ({ isActive }) =>
    `text-sm font-semibold transition-colors duration-200 py-1.5 px-3 rounded-full ${
      isActive
        ? 'text-brand-600 dark:text-brand-400 bg-brand-50/80 dark:bg-brand-950/40'
        : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full transition-all">
      {/* Top Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-gradient-to-r from-brand-900 via-brand-700 to-indigo-900 text-white text-xs font-medium py-2 px-4 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex-1 text-center flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>
                <strong>PREMIUM LAUNCH SALE:</strong> Use promo code <code className="bg-white/20 px-1.5 py-0.5 rounded font-mono font-bold">NEXORA20</code> for 20% OFF + Free Express Shipping!
              </span>
            </div>
            <button
              onClick={() => setShowAnnouncement(false)}
              className="text-white/70 hover:text-white transition p-1"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <nav
        className={`w-full glass-nav border-b border-slate-200/80 dark:border-slate-800 transition-all duration-300 ${
          isScrolled ? 'shadow-md dark:shadow-slate-950/40 py-2.5' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-cyan-400 p-0.5 shadow-md shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-shadow">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <span className="font-extrabold text-white text-xl tracking-tighter">N</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white">
                  NEXORA
                </span>
                <span className="text-[9px] uppercase tracking-widest text-brand-600 dark:text-brand-400 font-bold -mt-1">
                  Luxury Tech & Style
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              <NavLink to="/" className={navLinkClasses}>
                Home
              </NavLink>
              <NavLink to="/shop" className={navLinkClasses}>
                Shop All
              </NavLink>

              {/* Categories Mega Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoryMenuOpen(prev => !prev)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 py-1.5 px-3 rounded-full transition"
                >
                  <span>Categories</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCategoryMenuOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-3 z-50 animate-in fade-in-50 zoom-in-95"
                    onMouseLeave={() => setIsCategoryMenuOpen(false)}
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 mb-1">
                      Curated Collections
                    </div>
                    <div className="space-y-1">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/shop?category=${encodeURIComponent(cat.name)}`}
                          onClick={() => setIsCategoryMenuOpen(false)}
                          className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <span>{cat.name}</span>
                          <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                            {cat.count} items
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <NavLink to="/shop?sort=newest" className={navLinkClasses}>
                New Arrivals
              </NavLink>
              <NavLink to="/shop?sort=trending" className={navLinkClasses}>
                Trending
              </NavLink>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:block flex-1 max-w-xs lg:max-w-sm mx-2">
              <SearchBar />
            </div>

            {/* Icons & Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-700" />
                )}
              </button>

              {/* Wishlist Link with Badge */}
              <Link
                to="/wishlist"
                className="relative w-10 h-10 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="View wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Link with Badge */}
              <Link
                to="/cart"
                className="relative w-10 h-10 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="View shopping bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm animate-pulse-subtle">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Account Menu */}
              <div className="relative">
                {isAuthenticated ? (
                  <button
                    onClick={() => setIsUserMenuOpen(prev => !prev)}
                    className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <img
                      src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}
                      alt={user?.name || "User"}
                      className="w-8 h-8 rounded-xl object-cover ring-2 ring-brand-500/30"
                    />
                    <span className="hidden xl:inline text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:inline" />
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="hidden sm:flex items-center gap-1.5 py-2 px-4 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold transition shadow-sm"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </Link>
                )}

                {/* User Dropdown */}
                {isUserMenuOpen && isAuthenticated && (
                  <div
                    className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-2 z-50 animate-in fade-in-50 zoom-in-95"
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                  >
                    <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/40 px-2 py-0.5 rounded-full">
                        {user.tier || 'Member'}
                      </span>
                    </div>

                    <div className="space-y-0.5 py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        <User className="w-4 h-4 text-brand-500" />
                        <span>My Account</span>
                      </Link>
                      <Link
                        to="/dashboard?tab=orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        <Package className="w-4 h-4 text-cyan-500" />
                        <span>Orders ({user.orders?.length || 0})</span>
                      </Link>
                      <Link
                        to="/dashboard?tab=settings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span>Settings</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                className="lg:hidden w-10 h-10 rounded-2xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                aria-label="Open mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar Row */}
          <div className="md:hidden mt-3 pt-2">
            <SearchBar onSelectProduct={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-dark-card/95 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              <div className="space-y-1">
                <NavLink
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-2xl font-bold text-sm text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-2xl font-bold text-sm text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Shop All Products
                </NavLink>
                <NavLink
                  to="/shop?sort=newest"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-2xl font-bold text-sm text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  New Arrivals
                </NavLink>
                <NavLink
                  to="/shop?sort=trending"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-2xl font-bold text-sm text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Trending Now
                </NavLink>
              </div>

              {/* Categories list in mobile menu */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-4 mb-2">
                  Browse by Category
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/shop?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* User authentication shortcut in mobile menu */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between font-semibold text-sm text-slate-900 dark:text-white"
                    >
                      <span>My Dashboard ({user.name})</span>
                      <User className="w-4 h-4 text-brand-600" />
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full py-2.5 px-4 rounded-2xl text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 py-3 text-center rounded-2xl bg-brand-600 text-white font-bold text-sm shadow-md"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 py-3 text-center rounded-2xl border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-800 dark:text-slate-200"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
