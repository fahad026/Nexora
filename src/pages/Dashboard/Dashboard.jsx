import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  ExternalLink,
  Plus,
  Trash2,
  Check,
  Sparkles,
  ArrowRight,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import ProductCard from '../../components/ProductCard/ProductCard';

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'profile';
  const { user, isAuthenticated, logout, updateProfile, addAddress, removeAddress, setDefaultAddress } = useAuth();
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Profile edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || 'Alexander Wright');
  const [profileEmail, setProfileEmail] = useState(user?.email || 'alexander.wright@nexora.io');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '+1 (555) 234-8901');

  // Address modal state
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('');
  const [newAddrZip, setNewAddrZip] = useState('');
  const [newAddrTag, setNewAddrTag] = useState('Home');

  // Selected order details modal
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto mb-6">
          <User className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Sign In to Access Dashboard
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          You need to be authenticated to view your VIP dashboard and order history.
        </p>
        <Link
          to="/login"
          className="inline-flex px-8 py-3.5 rounded-2xl bg-brand-600 text-white font-bold text-sm shadow-md"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  const setTab = (tab) => {
    setSearchParams({ tab });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
    });
    setIsEditingProfile(false);
  };

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    if (!newAddrStreet || !newAddrCity) return;
    addAddress({
      name: user.name,
      street: newAddrStreet,
      city: newAddrCity,
      state: newAddrState || 'CA',
      zip: newAddrZip || '90210',
      country: 'United States',
      phone: user.phone,
      tag: newAddrTag,
    });
    setIsAddressModalOpen(false);
    setNewAddrStreet('');
    setNewAddrCity('');
    setNewAddrState('');
    setNewAddrZip('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Banner / User Hero Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 mb-8 shadow-xl border border-brand-800/40">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-500/30 border border-brand-400/40 text-[11px] font-bold text-brand-200">
                  {user.tier || 'Diamond VIP'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{user.email}</p>
              <p className="text-[11px] text-brand-300/80 mt-1">Member since {user.joinDate || '2024'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/shop"
              className="px-5 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition shadow"
            >
              Browse Catalog
            </Link>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Tabs on left (4 cols), Tab View on right (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-4 bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-sm space-y-1">
          {[
            { id: 'profile', label: 'Personal Profile', icon: User },
            { id: 'orders', label: `My Orders (${user.orders?.length || 0})`, icon: Package },
            { id: 'wishlist', label: `Saved Wishlist (${wishlist.length})`, icon: Heart },
            { id: 'addresses', label: `Shipping Destinations (${user.addresses?.length || 0})`, icon: MapPin },
            { id: 'settings', label: 'Account Settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
            );
          })}
        </div>

        {/* Tab Content Column */}
        <div className="lg:col-span-8 bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          {/* TAB 1: Profile */}
          {currentTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Profile Details</h3>
                  <p className="text-xs text-slate-500">Manage your contact credentials and VIP privileges.</p>
                </div>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 transition"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                      Full Legal Name
                    </span>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                      Email Address
                    </span>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{user.email}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                      Phone Number
                    </span>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{user.phone || 'Not added'}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                      Membership Tier
                    </span>
                    <p className="text-sm font-bold text-brand-600 dark:text-brand-400">{user.tier || 'Diamond VIP'}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Orders */}
          {currentTab === 'orders' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Order History</h3>
                <p className="text-xs text-slate-500">Track current consignments, download commercial invoices, or review past acquisitions.</p>
              </div>

              {(!user.orders || user.orders.length === 0) ? (
                <div className="py-12 text-center">
                  <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No Orders Placed Yet</p>
                  <p className="text-xs text-slate-400 mt-1 mb-4">When you acquire items from NEXORA, your tracking credentials will appear here.</p>
                  <Link to="/shop" className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-md">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {user.orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md transition-shadow bg-slate-50/40 dark:bg-slate-900/30 space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800 gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-slate-900 dark:text-white font-mono">
                              #{ord.id}
                            </span>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : 'bg-brand-100 text-brand-800 dark:bg-brand-950/60 dark:text-brand-300'
                            }`}>
                              {ord.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">Ordered on {ord.date}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-black text-slate-900 dark:text-white">
                            ${ord.total?.toFixed(2)}
                          </span>
                          <p className="text-[11px] text-slate-400">{ord.deliveryMethod}</p>
                        </div>
                      </div>

                      {/* Items mini strip */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 overflow-x-auto py-1">
                          {ord.items?.map((it, idx) => (
                            <img
                              key={idx}
                              src={it.image}
                              alt={it.name}
                              title={it.name}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                            />
                          ))}
                        </div>

                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-card hover:bg-slate-50 text-xs font-bold text-slate-800 dark:text-slate-200 shrink-0 transition"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Wishlist in dashboard */}
          {currentTab === 'wishlist' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Saved Wishlist</h3>
                  <p className="text-xs text-slate-500">Quickly inspect or move your curated favorites to your shopping bag.</p>
                </div>
                <Link to="/wishlist" className="text-xs font-bold text-brand-600 hover:underline">
                  Full Wishlist View
                </Link>
              </div>

              {wishlist.length === 0 ? (
                <div className="py-12 text-center">
                  <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No Saved Items</p>
                  <Link to="/shop" className="inline-block mt-3 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-md">
                    Explore Catalog
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {wishlist.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Addresses */}
          {currentTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Saved Shipping Addresses</h3>
                  <p className="text-xs text-slate-500">Manage multiple delivery destinations for frictionless 1-click checkout.</p>
                </div>
                <button
                  onClick={() => setIsAddressModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-brand-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Destination</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.addresses?.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-5 rounded-2xl border transition relative flex flex-col justify-between ${
                      addr.isDefault
                        ? 'border-brand-500 bg-brand-50/40 dark:bg-brand-950/30'
                        : 'border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {addr.tag || 'Residence'}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 bg-brand-100/70 dark:bg-brand-900/50 px-2 py-0.5 rounded-full">
                            Primary
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{addr.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{addr.street}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {addr.city}, {addr.state} {addr.zip}, {addr.country}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{addr.phone}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80">
                      {!addr.isDefault && (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
                        >
                          Set as Default
                        </button>
                      )}
                      <button
                        onClick={() => removeAddress(addr.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Account Settings */}
          {currentTab === 'settings' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Account Settings & Security</h3>
                <p className="text-xs text-slate-500">Configure appearance preferences, notifications, and credentials.</p>
              </div>

              <div className="space-y-4">
                {/* Theme toggle row */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Display Theme</h4>
                    <p className="text-xs text-slate-500">Choose between light luxury canvas and deep dark mode.</p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 transition"
                  >
                    Current: {theme === 'dark' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}
                  </button>
                </div>

                {/* Email notifications */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Order Tracking Telemetry</h4>
                    <p className="text-xs text-slate-500">Instant SMS and email notifications upon courier milestones.</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10 animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Order Details #{selectedOrder.id}
                </h3>
                <p className="text-xs text-slate-400">Placed on {selectedOrder.date}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tracking Code:</span>
                  <span className="font-mono font-bold text-brand-600 dark:text-brand-400">{selectedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Courier:</span>
                  <span className="font-bold">{selectedOrder.deliveryMethod}</span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedOrder.items?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 dark:text-white truncate">{item.name}</p>
                      <p className="text-slate-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline text-sm">
                <span className="font-bold">Total Paid</span>
                <span className="text-xl font-black">${selectedOrder.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddressModalOpen(false)} />
          <div className="relative bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl z-10 animate-in zoom-in-95 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Add New Shipping Destination
            </h3>
            <form onSubmit={handleAddNewAddress} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={newAddrStreet}
                  onChange={(e) => setNewAddrStreet(e.target.value)}
                  placeholder="e.g. 100 Main St, Apt 4B"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddrCity}
                    onChange={(e) => setNewAddrCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={newAddrState}
                    onChange={(e) => setNewAddrState(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Destination Tag
                </label>
                <select
                  value={newAddrTag}
                  onChange={(e) => setNewAddrTag(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-semibold"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Studio">Studio</option>
                  <option value="Vacation Residence">Vacation Residence</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-md"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
