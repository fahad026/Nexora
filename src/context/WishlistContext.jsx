import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { addToast } = useToast();

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('nexora_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse wishlist from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexora_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      addToast({
        type: 'info',
        title: 'Removed from Saved',
        message: `${product.name} removed from your wishlist.`,
      });
    } else {
      setWishlist(prev => [...prev, product]);
      addToast({
        type: 'success',
        title: 'Saved to Wishlist',
        message: `${product.name} has been saved to your wishlist.`,
      });
    }
  };

  const removeFromWishlist = (productId) => {
    const itemToRemove = wishlist.find(item => item.id === productId);
    setWishlist(prev => prev.filter(item => item.id !== productId));
    if (itemToRemove) {
      addToast({
        type: 'info',
        title: 'Removed from Wishlist',
        message: `${itemToRemove.name} was removed from your wishlist.`,
      });
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
