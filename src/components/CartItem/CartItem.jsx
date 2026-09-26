import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const discountedPrice = item.discount
    ? item.price * (1 - item.discount / 100)
    : item.price;

  const itemTotal = discountedPrice * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-5 border-b border-slate-200/80 dark:border-slate-800/80 group">
      {/* Product Image */}
      <Link
        to={`/product/${item.id}`}
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700/60"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          {item.category}
        </span>
        <Link
          to={`/product/${item.id}`}
          className="block font-semibold text-sm sm:text-base text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition truncate mt-0.5"
        >
          {item.name}
        </Link>

        {/* Pricing */}
        <div className="flex items-center gap-2 mt-1.5 text-xs sm:text-sm">
          <span className="font-bold text-slate-900 dark:text-white">
            ${discountedPrice.toFixed(2)}
          </span>
          {item.discount > 0 && (
            <>
              <span className="text-slate-400 line-through text-xs">
                ${item.price.toFixed(2)}
              </span>
              <span className="text-rose-500 font-semibold text-[10px] bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                -{item.discount}%
              </span>
            </>
          )}
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6 mt-2 sm:mt-0">
        {/* Quantity Controls */}
        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-1">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-9 text-center font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            disabled={item.quantity >= (item.stock || 99)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-40 transition"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Total Price for this item */}
        <div className="text-right min-w-[5rem]">
          <p className="text-base font-extrabold text-slate-900 dark:text-white">
            ${itemTotal.toFixed(2)}
          </p>
          <p className="text-[11px] text-slate-400">Total</p>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
