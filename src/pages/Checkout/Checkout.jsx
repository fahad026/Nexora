import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CreditCard,
  ShieldCheck,
  Truck,
  Lock,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  ShoppingBag,
  Smartphone,
  Wallet,
  Tag,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import confetti from 'canvas-confetti';

export default function Checkout() {
  const navigate = useNavigate();
  const {
    cartItems,
    subtotal,
    discountAmount,
    shippingCost,
    tax,
    total,
    coupon,
    shippingMethod,
    setShippingMethod,
    clearCart,
  } = useCart();
  const { user, addOrder } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    email: user?.email || 'alexander.wright@nexora.io',
    firstName: user?.name?.split(' ')[0] || 'Alexander',
    lastName: user?.name?.split(' ')[1] || 'Wright',
    phone: user?.phone || '+1 (555) 234-8901',
    address: user?.addresses?.[0]?.street || '742 Evergreen Terrace, Penthouse B',
    city: user?.addresses?.[0]?.city || 'San Francisco',
    state: user?.addresses?.[0]?.state || 'CA',
    zip: user?.addresses?.[0]?.zip || '94107',
    country: 'United States',
  });

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'apple' | 'paypal' | 'cod'
  const [cardData, setCardData] = useState({
    number: '•••• •••• •••• 4242',
    name: 'ALEXANDER WRIGHT',
    expiry: '12/28',
    cvv: '882',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // If cart is empty, redirect to cart/shop
  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          Your shopping bag is empty
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Add items before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="inline-flex px-6 py-3 rounded-2xl bg-brand-600 text-white font-bold text-sm shadow-md"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate luxury order verification & processing
    setTimeout(() => {
      setIsProcessing(false);

      const orderId = `NX-${Math.floor(10000 + Math.random() * 90000)}`;

      const newOrder = {
        id: orderId,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.discount ? item.price * (1 - item.discount / 100) : item.price,
          quantity: item.quantity,
          image: item.image,
          category: item.category,
        })),
        subtotal,
        discount: discountAmount,
        shipping: shippingCost,
        tax,
        total,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}, ${formData.country}`,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        paymentMethod: paymentMethod.toUpperCase(),
        deliveryMethod:
          shippingMethod === 'overnight'
            ? 'Overnight VIP Courier'
            : shippingMethod === 'express'
            ? 'Express Delivery (1-2 Days)'
            : 'Standard Delivery (3-5 Days)',
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(
          'en-US',
          { month: 'short', day: 'numeric', year: 'numeric' }
        ),
      };

      // Save order in AuthContext
      addOrder(newOrder);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7c3aed', '#06b6d4', '#f59e0b', '#10b981'],
        });
      } catch (err) {
        console.log('Confetti effect triggered');
      }

      // Clear the cart
      clearCart();

      // Navigate to Order Success with state
      navigate('/order-success', { state: { order: newOrder } });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Checkout Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
        <Link to="/cart" className="hover:text-brand-600 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Cart
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-bold">Secure Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Form Details (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
            {/* 1. Customer Information */}
            <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Contact Information
                </h3>
                <span className="text-xs text-slate-400">Step 1 of 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address (for order tracking)
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number (for delivery updates)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Shipping Destination
                </h3>
                <span className="text-xs text-slate-400">Step 2 of 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Street Address & Penthouse / Suite
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. 742 Evergreen Terrace, Penthouse B"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      State / Region
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      required
                      value={formData.zip}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Speed Selection inside address */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Delivery Option
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'standard', name: 'Standard Courier (3-5 Days)', price: shippingCost === 0 ? 'FREE' : '$12.00' },
                    { id: 'express', name: 'Priority Express Air (1-2 Days)', price: '$24.00' },
                    { id: 'overnight', name: 'Overnight VIP White-Glove (Next Morning)', price: '$45.00' },
                  ].map((speed) => (
                    <label
                      key={speed.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs font-semibold transition ${
                        shippingMethod === speed.id
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-900 dark:text-brand-300 ring-2 ring-brand-500/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="deliverySpeed"
                          value={speed.id}
                          checked={shippingMethod === speed.id}
                          onChange={() => setShippingMethod(speed.id)}
                          className="text-brand-600 focus:ring-brand-500"
                        />
                        <span>{speed.name}</span>
                      </div>
                      <span className="font-bold">{speed.price}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  Payment Method
                </h3>
                <span className="text-xs text-slate-400">Step 3 of 3</span>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'card', name: 'Credit Card', icon: CreditCard },
                  { id: 'apple', name: 'Apple Pay', icon: Smartphone },
                  { id: 'paypal', name: 'PayPal', icon: Wallet },
                  { id: 'cod', name: 'Cash on Delivery', icon: ShieldCheck },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                        paymentMethod === m.id
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-brand-600" />
                      <span>{m.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Card Interactive Preview & Fields */}
              {paymentMethod === 'card' && (
                <div className="pt-4 space-y-4">
                  {/* Luxury Digital Card Preview */}
                  <div className="relative w-full max-w-sm mx-auto h-44 rounded-2xl p-5 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 text-white shadow-xl flex flex-col justify-between border border-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-sm tracking-widest text-brand-400">
                        NEXORA PLATINUM
                      </span>
                      <CreditCard className="w-6 h-6 text-white/80" />
                    </div>
                    <div>
                      <p className="font-mono text-base tracking-widest text-slate-200">
                        {cardData.number}
                      </p>
                    </div>
                    <div className="flex justify-between items-end text-xs">
                      <div>
                        <span className="text-[9px] uppercase text-slate-400 block">Cardholder</span>
                        <span className="font-bold tracking-wider">{cardData.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] uppercase text-slate-400 block">Expires</span>
                        <span className="font-bold font-mono">{cardData.expiry}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        placeholder="•••• •••• •••• 4242"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                        placeholder="ALEXANDER WRIGHT"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          placeholder="12/28"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          CVV / CVC
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          placeholder="882"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'apple' && (
                <div className="p-6 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
                  <Smartphone className="w-8 h-8 mx-auto text-slate-800 dark:text-white mb-2" />
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Apple Pay Ready</p>
                  <p className="text-xs text-slate-500 mt-1">Biometric Touch ID / Face ID prompt will trigger on order submission.</p>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="p-6 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
                  <Wallet className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                  <p className="text-sm font-bold text-slate-900 dark:text-white">PayPal Instant Checkout</p>
                  <p className="text-xs text-slate-500 mt-1">You will be seamlessly connected to PayPal to finalize payment.</p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-6 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl">
                  <ShieldCheck className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Cash / Card on Delivery</p>
                  <p className="text-xs text-slate-500 mt-1">Pay with card terminal or cash when your package arrives at your door.</p>
                </div>
              )}
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-8 rounded-2xl bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-extrabold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-brand-500/30 transition-all duration-300 disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Securing Your Luxury Order...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order &bull; ${total.toFixed(2)}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Sticky Order Summary & Items List (5 cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <div className="bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Bag Summary ({cartItems.length} items)
              </h3>
              <Link to="/cart" className="text-xs font-semibold text-brand-600 hover:underline">
                Edit Bag
              </Link>
            </div>

            {/* Items Mini List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-slate-100 dark:divide-slate-800/80">
              {cartItems.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 dark:border-slate-700">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute top-0 right-0 w-4 h-4 bg-slate-900 text-white text-[10px] font-bold rounded-bl flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-400">{item.category}</p>
                  </div>
                  <div className="text-right text-xs font-bold text-slate-900 dark:text-white">
                    ${((item.discount ? item.price * (1 - item.discount / 100) : item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Breakdown */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-rose-500 font-semibold">
                  <span>Discount ({coupon?.label})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>Shipping ({shippingMethod})</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Sales Tax (8%)</span>
                <span className="font-bold text-slate-900 dark:text-white">${tax.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900 dark:text-white">Total Amount</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Guaranteed satisfaction */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Includes complete NEXORA luxury concierge warranty & tracking assurance.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
