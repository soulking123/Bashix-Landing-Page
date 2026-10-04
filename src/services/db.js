import { supabase, isSupabaseConfigured } from './supabase';
import { initialProducts } from '../data/initialProducts';
import { initialConfig } from '../data/initialConfig';

const LOCAL_STORAGE_KEYS = {
  PRODUCTS: 'bashix_products',
  ORDERS: 'bashix_orders',
  LEADS: 'bashix_leads',
  SETTINGS: 'bashix_settings'
};

// LocalStorage helpers for offline/dev fallback
const getLocalData = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.warn(`LocalStorage read failed for ${key}:`, e);
    return fallback;
  }
};

const setLocalData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`LocalStorage write failed for ${key}:`, e);
  }
};

// Initialize local defaults if empty
if (!localStorage.getItem(LOCAL_STORAGE_KEYS.PRODUCTS)) {
  setLocalData(LOCAL_STORAGE_KEYS.PRODUCTS, initialProducts);
}
if (!localStorage.getItem(LOCAL_STORAGE_KEYS.SETTINGS)) {
  setLocalData(LOCAL_STORAGE_KEYS.SETTINGS, initialConfig);
}
if (!localStorage.getItem(LOCAL_STORAGE_KEYS.ORDERS)) {
  setLocalData(LOCAL_STORAGE_KEYS.ORDERS, []);
}
if (!localStorage.getItem(LOCAL_STORAGE_KEYS.LEADS)) {
  setLocalData(LOCAL_STORAGE_KEYS.LEADS, []);
}

export const db = {
  isLive: isSupabaseConfigured,

  products: {
    async list() {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data;
      }
      return getLocalData(LOCAL_STORAGE_KEYS.PRODUCTS, initialProducts);
    },

    async getById(id) {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        if (!error && data) return data;
      }
      const list = getLocalData(LOCAL_STORAGE_KEYS.PRODUCTS, initialProducts);
      return list.find(p => p.id === id) || null;
    },

    async create(product) {
      const newProduct = {
        ...product,
        id: product.id || `prod-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('products')
          .insert([newProduct])
          .select()
          .single();
        if (!error && data) return data;
      }

      const list = getLocalData(LOCAL_STORAGE_KEYS.PRODUCTS, initialProducts);
      const updated = [newProduct, ...list];
      setLocalData(LOCAL_STORAGE_KEYS.PRODUCTS, updated);
      return newProduct;
    },

    async update(id, updates) {
      const timestamped = { ...updates, updated_at: new Date().toISOString() };

      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('products')
          .update(timestamped)
          .eq('id', id)
          .select()
          .single();
        if (!error && data) return data;
      }

      const list = getLocalData(LOCAL_STORAGE_KEYS.PRODUCTS, initialProducts);
      const updated = list.map(p => p.id === id ? { ...p, ...timestamped } : p);
      setLocalData(LOCAL_STORAGE_KEYS.PRODUCTS, updated);
      return updated.find(p => p.id === id);
    },

    async delete(id) {
      if (isSupabaseConfigured) {
        await supabase.from('products').delete().eq('id', id);
      }
      const list = getLocalData(LOCAL_STORAGE_KEYS.PRODUCTS, initialProducts);
      const updated = list.filter(p => p.id !== id);
      setLocalData(LOCAL_STORAGE_KEYS.PRODUCTS, updated);
      return true;
    }
  },

  orders: {
    async list() {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*)')
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      }
      return getLocalData(LOCAL_STORAGE_KEYS.ORDERS, []);
    },

    async create(orderData, items) {
      const orderNumber = `BX-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder = {
        ...orderData,
        id: `ord-${Date.now()}`,
        order_number: orderNumber,
        status: 'Pending',
        payment_status: 'Pending',
        created_at: new Date().toISOString()
      };

      if (isSupabaseConfigured) {
        const { data: createdOrder, error } = await supabase
          .from('orders')
          .insert([newOrder])
          .select()
          .single();
        
        if (!error && createdOrder) {
          const lineItems = items.map(item => ({
            order_id: createdOrder.id,
            product_id: item.product.id,
            product_name: item.product.name,
            quantity: item.quantity,
            unit_price: item.product.price_idr,
            subtotal: item.quantity * item.product.price_idr
          }));
          await supabase.from('order_items').insert(lineItems);
          return { ...createdOrder, items: lineItems };
        }
      }

      const orders = getLocalData(LOCAL_STORAGE_KEYS.ORDERS, []);
      const completeOrder = { ...newOrder, items };
      setLocalData(LOCAL_STORAGE_KEYS.ORDERS, [completeOrder, ...orders]);
      return completeOrder;
    },

    async updateStatus(id, status) {
      if (isSupabaseConfigured) {
        await supabase
          .from('orders')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('id', id);
      }
      const orders = getLocalData(LOCAL_STORAGE_KEYS.ORDERS, []);
      const updated = orders.map(o => o.id === id ? { ...o, status } : o);
      setLocalData(LOCAL_STORAGE_KEYS.ORDERS, updated);
      return true;
    }
  },

  leads: {
    async create(leadData) {
      const newLead = {
        ...leadData,
        id: `lead-${Date.now()}`,
        status: 'New',
        created_at: new Date().toISOString()
      };

      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('leads')
          .insert([newLead])
          .select()
          .single();
        if (!error && data) return data;
      }

      const leads = getLocalData(LOCAL_STORAGE_KEYS.LEADS, []);
      setLocalData(LOCAL_STORAGE_KEYS.LEADS, [newLead, ...leads]);
      return newLead;
    },

    async list() {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      }
      return getLocalData(LOCAL_STORAGE_KEYS.LEADS, []);
    }
  },

  settings: {
    async get() {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'landing_cms')
          .single();
        if (!error && data && data.value) return data.value;
      }
      return getLocalData(LOCAL_STORAGE_KEYS.SETTINGS, initialConfig);
    },

    async update(newSettings) {
      if (isSupabaseConfigured) {
        await supabase
          .from('site_settings')
          .upsert({ key: 'landing_cms', value: newSettings, updated_at: new Date().toISOString() });
      }
      setLocalData(LOCAL_STORAGE_KEYS.SETTINGS, newSettings);
      return newSettings;
    }
  }
};
