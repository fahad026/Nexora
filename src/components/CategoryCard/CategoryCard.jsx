import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(category.name)}`}
      className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6 border border-slate-200/60 dark:border-slate-800"
    >
      {/* Background Image */}
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent group-hover:from-slate-950/95 transition-all duration-300" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
            {category.count} Products
          </span>
          <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-brand-500 backdrop-blur-md text-white flex items-center justify-center transition-colors">
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
          {category.name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 line-clamp-1">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
