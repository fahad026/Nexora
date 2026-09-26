import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

export default function SearchBar({ placeholder = "Search premium products, tech, fashion...", className = "", onSelectProduct }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const filtered = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    ).slice(0, 5);

    setResults(filtered);
  }, [query]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      if (onSelectProduct) onSelectProduct();
    }
  };

  const handleSelect = (productId) => {
    navigate(`/product/${productId}`);
    setIsOpen(false);
    setQuery('');
    if (onSelectProduct) onSelectProduct();
  };

  return (
    <div ref={searchRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-2.5 bg-slate-100 dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-full text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all shadow-inner"
        />
        <Search className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* Live autocomplete dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in-50 zoom-in-95">
          {results.length > 0 ? (
            <div>
              <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                  Matching Products
                </span>
                <span>{results.length} found</span>
              </div>
              <ul className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {results.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(product.id)}
                      className="w-full px-4 py-3 flex items-center gap-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">
                          {product.category}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.discount > 0 && (
                          <span className="text-[10px] font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded-full">
                            -{product.discount}%
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-2 px-3 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center justify-center gap-1.5 hover:underline"
                >
                  View all results for "{query}"
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                No products found matching <span className="font-semibold text-slate-900 dark:text-white">"{query}"</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">Try checking for typos or searching for categories like "Electronics" or "Fashion"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
