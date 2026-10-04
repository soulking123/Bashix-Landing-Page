import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../services/db';
import { initialProducts } from '../data/initialProducts';
import { initialConfig } from '../data/initialConfig';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [siteConfig, setSiteConfig] = useState(initialConfig);
  const [activeView, setActiveView] = useState('landing'); // 'landing', 'store', 'admin'
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('bashix_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data from DB service (Supabase or Local)
  useEffect(() => {
    const initData = async () => {
      try {
        setIsLoading(true);
        const [loadedProducts, loadedConfig] = await Promise.all([
          db.products.list(),
          db.settings.get()
        ]);
        if (loadedProducts && loadedProducts.length > 0) {
          setProducts(loadedProducts);
        }
        if (loadedConfig) {
          setSiteConfig(loadedConfig);
        }
      } catch (err) {
        console.error('Failed to initialize store data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    initData();
  }, []);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('bashix_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Cart persistence failed:', e);
    }
  }, [cart]);

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const currency = 'IDR';

  const cartTotal = cart.reduce((sum, item) => {
    return sum + (item.product.price_idr * item.quantity);
  }, 0);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Product CRUD wrappers
  const refreshProducts = async () => {
    const list = await db.products.list();
    setProducts(list);
  };

  const addProduct = async (productData) => {
    const created = await db.products.create(productData);
    await refreshProducts();
    return created;
  };

  const updateProduct = async (id, updates) => {
    const updated = await db.products.update(id, updates);
    await refreshProducts();
    return updated;
  };

  const deleteProduct = async (id) => {
    await db.products.delete(id);
    await refreshProducts();
    return true;
  };

  const updateSettings = async (newConfig) => {
    const updated = await db.settings.update(newConfig);
    setSiteConfig(updated);
    return updated;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        siteConfig,
        currency,
        activeView,
        setActiveView,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemCount,
        isLoading,
        refreshProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        updateSettings,
        isSupabaseLive: db.isLive
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
