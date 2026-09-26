import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('nexora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
      return [];
    }
  });

  const [coupon, setCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('nexora_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [shippingMethod, setShippingMethod] = useState('standard');

  useEffect(() => {
    try {
      localStorage.setItem('nexora_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (coupon) {
        localStorage.setItem('nexora_coupon', JSON.stringify(coupon));
      } else {
        localStorage.removeItem('nexora_coupon');
      }
    } catch (e) {
      console.error('Failed to save coupon to localStorage', e);
    }
  }, [coupon]);

  const addToCart = (product, quantity = 1, showNotification = true) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock || 99) }
            : item
        );
      }
      return [...prev, { ...product, quantity: Math.min(quantity, product.stock || 99) }];
    });

    if (showNotification) {
      addToast({
        type: 'success',
        title: 'Added to Bag',
        message: `${product.name} (x${quantity}) was added to your shopping cart.`,
      });
    }
  };

  const removeFromCart = (productId, showNotification = true) => {
    const itemToRemove = cartItems.find(item => item.id === productId);
    setCartItems(prev => prev.filter(item => item.id !== productId));

    if (showNotification && itemToRemove) {
      addToast({
        type: 'info',
        title: 'Removed from Bag',
        message: `${itemToRemove.name} has been removed from your cart.`,
      });
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const maxStock = item.stock || 99;
          const newQty = Math.min(quantity, maxStock);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'NEXORA20') {
      const newCoupon = { code: 'NEXORA20', type: 'percentage', value: 20, label: '20% Off Nexora VIP' };
      setCoupon(newCoupon);
      addToast({
        type: 'success',
        title: 'Promo Applied!',
        message: '20% discount has been applied to your order.',
      });
      return { success: true };
    } else if (cleanCode === 'WELCOME10') {
      const newCoupon = { code: 'WELCOME10', type: 'percentage', value: 10, label: '10% Welcome Gift' };
      setCoupon(newCoupon);
      addToast({
        type: 'success',
        title: 'Promo Applied!',
        message: '10% discount has been applied to your order.',
      });
      return { success: true };
    } else if (cleanCode === 'SAVE50') {
      const newCoupon = { code: 'SAVE50', type: 'fixed', value: 50, label: '$50 Off' };
      setCoupon(newCoupon);
      addToast({
        type: 'success',
        title: 'Promo Applied!',
        message: '$50 savings applied to your total.',
      });
      return { success: true };
    } else {
      addToast({
        type: 'error',
        title: 'Invalid Code',
        message: 'The coupon code entered is not valid or has expired.',
      });
      return { success: false, error: 'Invalid coupon code' };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    addToast({
      type: 'info',
      title: 'Coupon Removed',
      message: 'Promo code discount has been removed.',
    });
  };

  const calculations = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    let discountAmount = 0;
    if (coupon) {
      if (coupon.type === 'percentage') {
        discountAmount = (subtotal * coupon.value) / 100;
      } else if (coupon.type === 'fixed') {
        discountAmount = Math.min(coupon.value, subtotal);
      }
    }

    const freeShippingThreshold = 150;
    let shippingCost = 0;
    if (subtotal > 0) {
      if (shippingMethod === 'standard') {
        shippingCost = subtotal >= freeShippingThreshold ? 0 : 12.00;
      } else if (shippingMethod === 'express') {
        shippingCost = 24.00;
      } else if (shippingMethod === 'overnight') {
        shippingCost = 45.00;
      }
    }

    const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
    const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const tax = taxableAmount * 0.08; // 8% sales tax

    const total = taxableAmount + shippingCost + tax;

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return {
      subtotal,
      discountAmount,
      shippingCost,
      tax,
      total,
      cartCount,
      freeShippingThreshold,
      freeShippingProgress,
      amountForFreeShipping,
    };
  }, [cartItems, coupon, shippingMethod]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        coupon,
        applyCoupon,
        removeCoupon,
        shippingMethod,
        setShippingMethod,
        ...calculations,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
