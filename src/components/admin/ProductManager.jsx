import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import ProductFormModal from './ProductFormModal';

export default function ProductManager() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [feedbackNotice, setFeedbackNotice] = useState(null);

  const categories = ['All', 'Edge Compute', 'Telemetry Hubs', 'Robotics Motion', 'Sensors & Probes'];

  const showToast = (message) => {
    setFeedbackNotice(message);
    setTimeout(() => setFeedbackNotice(null), 3000);
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline?.toLowerCase().includes(searchQuery.toLowerCase());

    const stock = p.stock_qty ?? 0;
    let matchesStock = true;
    if (stockFilter === 'In Stock') matchesStock = stock > 15;
    if (stockFilter === 'Low Stock') matchesStock = stock > 0 && stock <= 15;
    if (stockFilter === 'Out of Stock') matchesStock = stock <= 0;

    return matchesCategory && matchesSearch && matchesStock;
  });

  const handleToggleVisibility = async (product) => {
    const newStatus = !(product.is_active !== false);
    try {
      await updateProduct(product.id, { is_active: newStatus });
      showToast(
        `${product.sku} is now ${newStatus ? 'visible on' : 'hidden from'} public storefront.`
      );
    } catch (err) {
      console.error('Failed to toggle visibility:', err);
    }
  };

  const handleQuickStockAdjust = async (product, delta) => {
    const currentStock = product.stock_qty ?? 0;
    const updatedStock = Math.max(0, currentStock + delta);
    try {
      await updateProduct(product.id, { stock_qty: updatedStock });
      showToast(`${product.sku} inventory adjusted to ${updatedStock} units.`);
    } catch (err) {
      console.error('Stock adjustment failed:', err);
    }
  };

  const handleSaveProduct = async (productPayload) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, productPayload);
      showToast(`Updated hardware specifications for ${productPayload.sku}.`);
    } else {
      await addProduct(productPayload);
      showToast(`Provisioned new hardware module ${productPayload.sku} into database.`);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;
    try {
      await deleteProduct(deletingProduct.id);
      showToast(`Deleted ${deletingProduct.sku} from inventory catalog.`);
      setDeletingProduct(null);
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {feedbackNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#364121] text-[#FFFFFF] px-4 py-3 rounded-2xl shadow-xl text-xs font-mono flex items-center gap-2 border border-[#D4DEC5] animate-in slide-in-from-bottom duration-200">
          <span className="w-2 h-2 rounded-full bg-[#D4DEC5]"></span>
          <span>{feedbackNotice}</span>
        </div>
      )}

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono font-medium text-[#55623B] tracking-wider uppercase mb-1">
            Hardware Catalog CRUD
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-[#181B15] font-medium tracking-tight">
            Physical Product Manager
          </h1>
          <p className="text-sm text-[#4A4E44] mt-0.5">
            Create, edit, toggle visibility, and monitor real-time stock across all industrial hardware.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingProduct(null);
            setIsFormOpen(true);
          }}
          className="btn-primary-pill cursor-pointer text-xs sm:text-sm self-start sm:self-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Provision New Module</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#E2E6DC] flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
        {/* Search */}
        <div className="w-full md:w-72 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search SKU or model name..."
            className="w-full pl-9 pr-3.5 py-2 text-xs font-mono rounded-xl bg-[#FAFAF8] border border-[#E2E6DC] text-[#181B15] placeholder:text-[#757B6E] focus:outline-none focus:ring-2 focus:ring-[#364121]"
          />
          <svg
            className="w-4 h-4 text-[#757B6E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs font-mono rounded-xl border border-[#E2E6DC] bg-[#FAFAF8] text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="px-3 py-2 text-xs font-mono rounded-xl border border-[#E2E6DC] bg-[#FAFAF8] text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
          >
            <option value="All">Stock: All Levels</option>
            <option value="In Stock">In Stock (&gt; 15)</option>
            <option value="Low Stock">Low Stock (1-15)</option>
            <option value="Out of Stock">Out of Stock (0)</option>
          </select>
        </div>
      </div>

      {/* Main Hardware Data Table */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E2E6DC] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#FAFAF8] text-[#364121] border-b border-[#ECEFE8]">
              <tr>
                <th className="py-3 px-4 font-semibold">Model & SKU</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Price (IDR / USD)</th>
                <th className="py-3 px-4 font-semibold">Stock Level</th>
                <th className="py-3 px-4 font-semibold text-center">Storefront Visibility</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECEFE8]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#757B6E]">
                    No hardware products match the current filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const stock = p.stock_qty ?? 0;
                  const isVisibleOnStore = p.is_active !== false;

                  return (
                    <tr key={p.id} className="hover:bg-[#FAFAF8] transition-colors">
                      {/* Product Thumbnail & Details */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-[#FAFAF8] border border-[#ECEFE8] overflow-hidden flex-shrink-0 flex items-center justify-center">
                            <img
                              src={p.image_url}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-[#181B15] truncate">{p.name}</div>
                            <div className="text-[11px] text-[#55623B] font-semibold">{p.sku}</div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-[#4A4E44]">
                        <span className="px-2 py-0.5 rounded-md bg-[#FAFAF8] border border-[#ECEFE8] text-[11px]">
                          {p.category}
                        </span>
                      </td>

                      {/* Dual Pricing */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#181B15]">
                          Rp {(p.price_idr || 0).toLocaleString('id-ID')}
                        </div>
                        <div className="text-[11px] text-[#757B6E]">
                          ${(p.price_usd || 0).toLocaleString('en-US')}
                        </div>
                      </td>

                      {/* Stock Stepper */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleQuickStockAdjust(p, -1)}
                            className="w-6 h-6 rounded border border-[#E2E6DC] flex items-center justify-center text-[#181B15] hover:bg-[#EEF2E8] cursor-pointer"
                            aria-label={`Decrease stock for ${p.sku}`}
                          >
                            -
                          </button>
                          <span
                            className={`w-10 text-center font-bold text-xs ${
                              stock <= 0
                                ? 'text-[#9A1E1E]'
                                : stock <= 15
                                ? 'text-[#9A6200]'
                                : 'text-[#364121]'
                            }`}
                          >
                            {stock}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuickStockAdjust(p, 1)}
                            className="w-6 h-6 rounded border border-[#E2E6DC] flex items-center justify-center text-[#181B15] hover:bg-[#EEF2E8] cursor-pointer"
                            aria-label={`Increase stock for ${p.sku}`}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Storefront Visibility Toggle */}
                      <td className="py-3.5 px-4 text-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isVisibleOnStore}
                            onChange={() => handleToggleVisibility(p)}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-6 bg-[#E2E6DC] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#364121] relative"></div>
                          <span className="ml-2 text-[11px] text-[#4A4E44]">
                            {isVisibleOnStore ? 'Public' : 'Hidden'}
                          </span>
                        </label>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(p);
                              setIsFormOpen(true);
                            }}
                            className="p-1.5 rounded-lg border border-[#E2E6DC] text-[#4A4E44] hover:text-[#181B15] hover:bg-[#EEF2E8] transition-colors cursor-pointer"
                            title="Edit specifications"
                            aria-label={`Edit ${p.name}`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeletingProduct(p)}
                            className="p-1.5 rounded-lg border border-[#E2E6DC] text-[#757B6E] hover:text-[#CF1322] hover:bg-[#FFF1F0] transition-colors cursor-pointer"
                            title="Delete hardware module"
                            aria-label={`Delete ${p.name}`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal (Create / Edit) */}
      <ProductFormModal
        isOpen={isFormOpen}
        product={editingProduct}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
      />

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181B15]/60 backdrop-blur-xs animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E2E6DC] shadow-2xl max-w-md w-full space-y-4">
            <h3 className="font-display text-xl font-medium text-[#181B15]">
              Confirm Hardware Module Deletion
            </h3>
            <p className="text-xs text-[#4A4E44] leading-relaxed">
              Are you sure you want to permanently delete <strong>{deletingProduct.name}</strong> ({deletingProduct.sku})? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingProduct(null)}
                className="btn-secondary-pill text-xs py-2 px-4 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-full text-xs font-mono font-medium bg-[#CF1322] text-[#FFFFFF] hover:bg-[#A8071A] transition-colors cursor-pointer"
              >
                Delete Module
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
