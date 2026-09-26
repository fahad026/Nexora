import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
  Calendar,
  Sparkles,
  MapPin,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  // Fallback dummy order if directly navigated
  const order = location.state?.order || {
    id: 'NX-94821',
    customerName: 'Alexander Wright',
    customerEmail: 'alexander.wright@nexora.io',
    shippingAddress: '742 Evergreen Terrace, Penthouse B, San Francisco, CA 94107',
    deliveryMethod: 'Express Air Courier (1-2 Days)',
    estimatedDelivery: 'Oct 2, 2026',
    paymentMethod: 'CREDIT CARD',
    items: [
      {
        id: 'prod-001',
        name: 'Nexora Studio Pro Wireless Headphones',
        category: 'Electronics',
        price: 297.49,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
      }
    ],
    subtotal: 297.49,
    discount: 0,
    shipping: 0,
    tax: 23.80,
    total: 321.29,
  };

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
      });
    } catch (e) {
      console.log('Confetti triggered');
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Success Badge & Headline */}
      <div className="text-center space-y-4 mb-10">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner animate-in zoom-in-75 duration-300">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Payment Verified &bull; Order Confirmed</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Thank You For Your Order!
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          We've sent an electronic receipt and parcel dispatch notice to{' '}
          <strong className="text-slate-900 dark:text-white">{order.customerEmail}</strong>.
        </p>
      </div>

      {/* Main Order Card */}
      <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
        {/* Header Details */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
              Order Identifier
            </span>
            <span className="text-xl font-black text-slate-900 dark:text-white font-mono">
              #{order.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-left sm:text-right">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
                Estimated Delivery
              </span>
              <span className="text-sm font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {order.estimatedDelivery}
              </span>
            </div>
          </div>
        </div>

        {/* Milestone Tracker */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Consignment Progress
          </h4>
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto font-bold text-xs shadow-md">
                ✓
              </div>
              <p className="font-bold text-slate-900 dark:text-white">Placed</p>
              <p className="text-[10px] text-slate-400">Confirmed</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center mx-auto font-bold text-xs shadow-md animate-pulse">
                2
              </div>
              <p className="font-bold text-slate-900 dark:text-white">Preparing</p>
              <p className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold">Active</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto font-bold text-xs">
                3
              </div>
              <p className="font-medium text-slate-400">In Transit</p>
              <p className="text-[10px] text-slate-400">Courier</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto font-bold text-xs">
                4
              </div>
              <p className="font-medium text-slate-400">Delivered</p>
              <p className="text-[10px] text-slate-400">Destination</p>
            </div>
          </div>
        </div>

        {/* Items Purchased */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Items in This Shipment ({order.items?.length || 0})
          </h4>
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {order.items?.map((item, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                  />
                  <div>
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                      {item.name}
                    </h5>
                    <p className="text-xs text-slate-400">
                      Qty: {item.quantity} &bull; {item.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Destination & Payment info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              Delivery Destination
            </span>
            <p className="text-xs font-bold text-slate-900 dark:text-white">{order.customerName}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">{order.shippingAddress}</p>
            <p className="text-xs text-brand-600 dark:text-brand-400 font-medium pt-1">{order.deliveryMethod}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal:</span>
              <span className="font-bold text-slate-900 dark:text-white">${order.subtotal?.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-rose-500">
                <span>Discount:</span>
                <span className="font-bold">-${order.discount?.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-500">
              <span>Shipping:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {order.shipping === 0 ? 'FREE' : `$${order.shipping?.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Taxes:</span>
              <span className="font-bold text-slate-900 dark:text-white">${order.tax?.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline">
              <span className="font-bold text-slate-900 dark:text-white text-sm">Total Paid:</span>
              <span className="text-xl font-black text-slate-900 dark:text-white">${order.total?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/shop"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-500/25 active:scale-95 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>

          <Link
            to="/dashboard?tab=orders"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm flex items-center justify-center gap-2 transition"
          >
            <Package className="w-4 h-4" />
            <span>View in VIP Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
