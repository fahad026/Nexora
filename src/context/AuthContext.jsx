import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

const DEFAULT_DEMO_USER = {
  id: 'usr-8921',
  name: 'Alexander Wright',
  email: 'alexander.wright@nexora.io',
  phone: '+1 (555) 234-8901',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  tier: 'Diamond VIP Member',
  joinDate: 'March 2024',
  addresses: [
    {
      id: 'addr-1',
      name: 'Alexander Wright',
      street: '742 Evergreen Terrace, Penthouse B',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
      country: 'United States',
      phone: '+1 (555) 234-8901',
      isDefault: true,
      tag: 'Home',
    },
    {
      id: 'addr-2',
      name: 'Alexander Wright (Design Studio)',
      street: '550 Howard St, Suite 400',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'United States',
      phone: '+1 (555) 987-6543',
      isDefault: false,
      tag: 'Office',
    },
  ],
  orders: [
    {
      id: 'NX-94218',
      date: '2026-09-14',
      status: 'Delivered',
      trackingNumber: 'FDX-994827103',
      items: [
        {
          id: 'prod-001',
          name: 'Nexora Studio Pro Wireless Headphones',
          price: 349.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80',
        },
      ],
      total: 349.99,
      deliveryMethod: 'Express Delivery (1-2 Days)',
    },
    {
      id: 'NX-88319',
      date: '2026-08-28',
      status: 'Delivered',
      trackingNumber: 'FDX-774019284',
      items: [
        {
          id: 'prod-002',
          name: 'AeroPulse Minimalist Chronograph Watch',
          price: 289.00,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80',
        },
        {
          id: 'prod-005',
          name: 'Botanical Ceramide Glow Elixir Serum',
          price: 68.00,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=200&q=80',
        }
      ],
      total: 425.00,
      deliveryMethod: 'Standard Shipping',
    }
  ]
};

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nexora_auth_user');
      if (saved) return JSON.parse(saved);
      // Default initial signed in user for immediate seamless exploration
      return DEFAULT_DEMO_USER;
    } catch {
      return DEFAULT_DEMO_USER;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('nexora_auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('nexora_auth_user');
      }
    } catch (e) {
      console.error('Failed to sync auth state', e);
    }
  }, [user]);

  const login = (email, password) => {
    // Mock login verification
    const loggedUser = {
      ...DEFAULT_DEMO_USER,
      email: email || DEFAULT_DEMO_USER.email,
    };
    setUser(loggedUser);
    addToast({
      type: 'success',
      title: 'Welcome Back!',
      message: `Signed in successfully as ${loggedUser.name}.`,
    });
    return { success: true };
  };

  const register = (name, email, password) => {
    const newUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: name || 'Valued Member',
      email: email,
      phone: '+1 (555) 000-0000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      tier: 'Nexora Member',
      joinDate: 'Just now',
      addresses: [],
      orders: [],
    };
    setUser(newUser);
    addToast({
      type: 'success',
      title: 'Account Created',
      message: `Welcome to NEXORA, ${newUser.name}!`,
    });
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    addToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been safely signed out.',
    });
  };

  const updateProfile = (updatedFields) => {
    if (!user) return;
    setUser(prev => ({ ...prev, ...updatedFields }));
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile changes have been saved.',
    });
  };

  const addOrder = (orderData) => {
    const newOrder = {
      id: orderData.id || `NX-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      trackingNumber: `FDX-${Math.floor(100000000 + Math.random() * 900000000)}`,
      ...orderData,
    };

    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        orders: [newOrder, ...(prev.orders || [])],
      };
    });

    return newOrder;
  };

  const addAddress = (newAddr) => {
    const address = {
      id: `addr-${Date.now()}`,
      isDefault: user?.addresses?.length === 0,
      ...newAddr,
    };
    setUser(prev => ({
      ...prev,
      addresses: [...(prev.addresses || []), address],
    }));
    addToast({
      type: 'success',
      title: 'Address Saved',
      message: 'New shipping destination has been added.',
    });
  };

  const removeAddress = (addressId) => {
    setUser(prev => ({
      ...prev,
      addresses: (prev.addresses || []).filter(a => a.id !== addressId),
    }));
    addToast({
      type: 'info',
      title: 'Address Removed',
      message: 'The shipping address was removed.',
    });
  };

  const setDefaultAddress = (addressId) => {
    setUser(prev => ({
      ...prev,
      addresses: (prev.addresses || []).map(a => ({
        ...a,
        isDefault: a.id === addressId,
      })),
    }));
    addToast({
      type: 'success',
      title: 'Default Address Updated',
      message: 'Primary shipping destination set.',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        addOrder,
        addAddress,
        removeAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
