import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartItemCount,
    currency,
    setCurrency,
    checkout
  } = useStore();

  const [step, setStep] = useState('cart'); // 'cart', 'checkout', 'success'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    address: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  // Close on Escape key
  useEffect(() => {
    if (!isCartOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Reset step if cart drawer closes and opens
  useEffect(() => {
    if (isCartOpen && step === 'success') {
      setStep('cart');
      setPlacedOrder(null);
    }
  }, [isCartOpen]);

  // Calculations
  const taxRate = 0.11; // 11% PPN Industrial Tax
  const taxAmount = Math.round(cartTotal * taxRate);
  const shippingFee = cart.length > 0 ? (currency === 'USD' ? 15 : 150000) : 0;
  const grandTotal = cartTotal + taxAmount + shippingFee;

  const formatPrice = (amount) => {
    if (currency === 'USD') {
      return `$${amount.toLocaleString('en-US')}`;
    }
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Corporate email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid corporate email address required';
    }
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.address.trim()) newErrors.address = 'Facility delivery address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const orderPayload = {
        customer_name: formData.name,
        email: formData.email,
        company: formData.company,
        shipping_address: formData.address,
        po_notes: formData.notes,
        subtotal: cartTotal,
        tax_amount: taxAmount,
        shipping_fee: shippingFee,
        grand_total: grandTotal
      };

      const result = await checkout(orderPayload);
      setPlacedOrder(result);
      setStep('success');
    } catch (err) {
      console.error('Order submission failed:', err);
      setErrors((prev) => ({ ...prev, general: 'Failed to complete order. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDrawer = () => {
    setIsCartOpen(false);
    if (step === 'success') {
      setStep('cart');
      setPlacedOrder(null);
    }
  };

  if (!isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-[#181B15]/50 backdrop-blur-xs animate-in fade-in duration-300"
      onClick={handleCloseDrawer}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-heading"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <aside
          className="w-screen max-w-md bg-[#FAFAF8] text-[#181B15] shadow-2xl flex flex-col border-l border-[#E2E6DC] animate-in slide-in-from-right duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#E2E6DC] bg-[#FFFFFF] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 id="cart-drawer-heading" className="font-display text-xl sm:text-2xl font-medium text-[#181B15]">
                Hardware Order Queue
              </h2>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-[#EEF2E8] text-[#364121]">
                {cartItemCount}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Currency Switcher */}
              <div className="inline-flex items-center rounded-full bg-[#FAFAF8] border border-[#E2E6DC] p-0.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setCurrency('IDR')}
                  className={`px-2 py-1 rounded-full transition-colors cursor-pointer ${
                    currency === 'IDR'
                      ? 'bg-[#364121] text-[#FFFFFF] font-bold'
                      : 'text-[#4A4E44] hover:text-[#181B15]'
                  }`}
                  aria-label="Set currency to Indonesian Rupiah"
                >
                  IDR
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-2 py-1 rounded-full transition-colors cursor-pointer ${
                    currency === 'USD'
                      ? 'bg-[#364121] text-[#FFFFFF] font-bold'
                      : 'text-[#4A4E44] hover:text-[#181B15]'
                  }`}
                  aria-label="Set currency to US Dollars"
                >
                  USD
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="p-2 rounded-full hover:bg-[#EEF2E8] text-[#4A4E44] hover:text-[#181B15] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Close cart drawer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {/* Step 1: Cart Items */}
            {step === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="text-center py-12 px-4 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#EEF2E8] text-[#55623B] mx-auto flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <p className="font-display text-lg text-[#181B15] font-medium">
                        Order queue is currently empty
                      </p>
                      <p className="text-xs font-mono text-[#757B6E] max-w-xs mx-auto">
                        Select industrial IoT edge gateways, sensor pods, or servo modules from our catalog.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        handleCloseDrawer();
                        const catalog = document.getElementById('hardware');
                        if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn-secondary-pill text-xs cursor-pointer"
                    >
                      Browse Hardware Catalog
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => {
                      const itemStock = item.product.stock_qty ?? 0;
                      const unitPrice = currency === 'USD' ? item.product.price_usd : item.product.price_idr;
                      const itemSubtotal = unitPrice * item.quantity;

                      return (
                        <div
                          key={item.product.id}
                          className="bg-[#FFFFFF] p-3.5 sm:p-4 rounded-2xl border border-[#E2E6DC] flex gap-3 sm:gap-4 items-center justify-between"
                        >
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#FAFAF8] border border-[#ECEFE8] flex-shrink-0 flex items-center justify-center">
                            <img
                              src={item.product.image_url}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className="font-mono text-[10px] text-[#55623B] font-semibold">
                              {item.product.sku}
                            </span>
                            <h4 className="font-display text-sm font-medium text-[#181B15] truncate">
                              {item.product.name}
                            </h4>
                            <div className="font-mono text-xs font-bold text-[#181B15] mt-0.5">
                              {formatPrice(unitPrice)}
                            </div>

                            {/* Stepper & Remove */}
                            <div className="flex items-center gap-3 mt-2">
                              <div className="inline-flex items-center border border-[#E2E6DC] rounded-full bg-[#FAFAF8] p-0.5">
                                <button
                                  type="button"
                                  onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#181B15] hover:bg-[#EEF2E8] cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  -
                                </button>
                                <span className="w-6 text-center font-mono text-xs font-semibold">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (item.quantity < itemStock) {
                                      updateCartQuantity(item.product.id, item.quantity + 1);
                                    }
                                  }}
                                  disabled={item.quantity >= itemStock}
                                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[#181B15] hover:bg-[#EEF2E8] cursor-pointer ${
                                    item.quantity >= itemStock ? 'opacity-30 cursor-not-allowed' : ''
                                  }`}
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-xs font-mono text-[#757B6E] hover:text-[#9A1E1E] transition-colors p-1"
                                aria-label={`Remove ${item.product.name} from order`}
                              >
                                Remove
                              </button>
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <span className="font-mono text-xs font-bold text-[#181B15] block">
                              {formatPrice(itemSubtotal)}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={clearCart}
                        className="text-xs font-mono text-[#757B6E] hover:text-[#181B15] transition-colors cursor-pointer"
                      >
                        Clear entire queue
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Step 2: Simulated Checkout Form */}
            {step === 'checkout' && (
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#ECEFE8]">
                  <h3 className="font-display text-lg font-medium text-[#181B15]">
                    Delivery & Corporate Credentials
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="text-xs font-mono text-[#55623B] hover:underline cursor-pointer"
                  >
                    Back to items
                  </button>
                </div>

                {errors.general && (
                  <div className="p-3 rounded-xl bg-[#FFF1F0] border border-[#FFCCC7] text-xs font-mono text-[#CF1322]">
                    {errors.general}
                  </div>
                )}

                <div>
                  <label htmlFor="customer-name" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
                    Contact Engineer / Lead *
                  </label>
                  <input
                    id="customer-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Faiz Albar Risi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] bg-[#FFFFFF] text-sm text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
                  />
                  {errors.name && <p className="text-xs font-mono text-[#CF1322] mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="customer-email" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
                    Corporate Email *
                  </label>
                  <input
                    id="customer-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="engineering@enterprise.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] bg-[#FFFFFF] text-sm text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
                  />
                  {errors.email && <p className="text-xs font-mono text-[#CF1322] mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="customer-company" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
                    Enterprise / Organization *
                  </label>
                  <input
                    id="customer-company"
                    name="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="GeoTelemetry Nusantara Ltd."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] bg-[#FFFFFF] text-sm text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
                  />
                  {errors.company && <p className="text-xs font-mono text-[#CF1322] mt-1">{errors.company}</p>}
                </div>

                <div>
                  <label htmlFor="customer-address" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
                    Facility Delivery Address *
                  </label>
                  <textarea
                    id="customer-address"
                    name="address"
                    rows={3}
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Industrial Zone Plot B4, Cikarang Dry Port, West Java 17530"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] bg-[#FFFFFF] text-sm text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
                  />
                  {errors.address && <p className="text-xs font-mono text-[#CF1322] mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label htmlFor="customer-notes" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
                    Purchase Order Ref / Integration Notes
                  </label>
                  <input
                    id="customer-notes"
                    name="notes"
                    type="text"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="PO-2026-OCT-881 (Pre-flashed with RTOS image)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] bg-[#FFFFFF] text-sm text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary-pill w-full justify-center cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Validating and Recording Order...</span>
                    ) : (
                      <span>Place Hardware Order ({formatPrice(grandTotal)})</span>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Success Confirmation */}
            {step === 'success' && placedOrder && (
              <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E2E6DC] text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-[#EEF2E8] text-[#364121] mx-auto flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#55623B] font-semibold">
                    Order Confirmed & Logged
                  </span>
                  <h3 className="font-display text-2xl font-medium text-[#181B15] mt-1">
                    Order Ref #{placedOrder.order_number || placedOrder.id}
                  </h3>
                  <p className="text-xs font-mono text-[#757B6E] mt-1">
                    Recorded in warehouse fulfillment database.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#ECEFE8] text-left text-xs font-mono space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#757B6E]">Client:</span>
                    <span className="font-semibold text-[#181B15]">{placedOrder.customer_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#757B6E]">Organization:</span>
                    <span className="font-semibold text-[#181B15]">{placedOrder.company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#757B6E]">Total Invoiced:</span>
                    <span className="font-bold text-[#364121]">{formatPrice(grandTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#757B6E]">Status:</span>
                    <span className="text-[#55623B] font-semibold">Pending Fulfillment</span>
                  </div>
                </div>

                <p className="text-xs text-[#4A4E44] leading-relaxed">
                  Hardware inventory has been deducted in real time. Our engineering logistics hub will dispatch shipping tracking directly to {placedOrder.email}.
                </p>

                <button
                  type="button"
                  onClick={handleCloseDrawer}
                  className="btn-primary-pill w-full justify-center text-xs cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>

          {/* Footer Financial Summary (Only in 'cart' view when items exist) */}
          {step === 'cart' && cart.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-[#E2E6DC] bg-[#FFFFFF] space-y-3">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[#757B6E]">
                  <span>Equipment Subtotal:</span>
                  <span className="text-[#181B15] font-semibold">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-[#757B6E]">
                  <span>Value Added Tax (11% PPN):</span>
                  <span className="text-[#181B15]">{formatPrice(taxAmount)}</span>
                </div>
                <div className="flex justify-between text-[#757B6E]">
                  <span>Industrial Freight & Courier:</span>
                  <span className="text-[#181B15]">{formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-[#ECEFE8] font-bold text-[#181B15]">
                  <span>Estimated Total:</span>
                  <span className="text-base text-[#364121]">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="btn-primary-pill w-full justify-center text-sm cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
