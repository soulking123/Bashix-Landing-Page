import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../services/db';
import { initialProducts } from '../data/initialProducts';
import { initialConfig } from '../data/initialConfig';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [siteConfig, setSiteConfig] = useState(initialConfig);
  const [activeView, setActiveView] = useState('landing'); // 'landing', 'store', 'admin'
  const [currency, setCurrency] = useState('IDR'); // 'IDR' or 'USD'
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
          if (loadedConfig.default_currency) {
            setCurrency(loadedConfig.default_currency);
          }
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

  const cartTotal = cart.reduce((sum, item) => {
    const unitPrice = currency === 'USD' ? (item.product.price_usd || 0) : (item.product.price_idr || 0);
    return sum + (unitPrice * item.quantity);
  }, 0);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Simulated Checkout Flow with Inventory Deduction
  const checkout = async (customerData) => {
    if (!cart || cart.length === 0) {
      throw new Error('Cart is currently empty');
    }

    // Create order record with order line items in DB
    const orderRecord = await db.orders.create(
      {
        ...customerData,
        currency,
        total_amount: cartTotal
      },
      cart
    );

    // Deduct stock for each ordered hardware item
    for (const item of cart) {
      const currentStock = item.product.stock_qty ?? 0;
      const updatedStock = Math.max(0, currentStock - item.quantity);
      await db.products.update(item.product.id, { stock_qty: updatedStock });
    }

    // Refresh products in memory
    await refreshProducts();

    // Clear cart upon successful order placement
    clearCart();

    return orderRecord;
  };

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
    if (updated.default_currency) {
      setCurrency(updated.default_currency);
    }
    return updated;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        siteConfig,
        currency,
        setCurrency,
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
        checkout,
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
