import React, { useState } from 'react';
import { useStore } from './context/StoreContext';
import CanvasBg from './components/common/CanvasBg';
import Navbar from './components/common/Navbar';
import Hero from './components/landing/Hero';
import MetricsBar from './components/landing/MetricsBar';

export default function App() {
  const {
    products,
    currency,
    activeView,
    setActiveView,
    isSupabaseLive,
    addToCart,
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal
  } = useStore();

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleSimulatedCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setIsCartOpen(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-bg-main text-text-primary font-sans relative selection:bg-border-subtle selection:text-text-primary">
      {/* Subtle CAD / Technical Blueprint Grid */}
      <CanvasBg />

      {/* Structured Navigation Header */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        {activeView === 'landing' && (
          <>
            {/* Grounded Engineering Hero with Interactive I/O Viewer */}
            <Hero />

            {/* Verifiable Technical Specifications & Protocols */}
            <MetricsBar />

            {/* Physical Hardware Catalog Section */}
            <section id="catalog" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-border-subtle">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <span className="text-xs font-mono text-accent-amber font-semibold uppercase tracking-wider block mb-1">
                    Direct Factory Inventory
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-text-primary">
                    Physical Hardware Catalog
                  </h2>
                </div>
                <div className="text-xs font-mono text-text-muted flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isSupabaseLive ? 'bg-accent-emerald' : 'bg-accent-amber'}`}></span>
                  <span>{isSupabaseLive ? 'Live Database Inventory' : 'Local Inventory Active'}</span>
                </div>
              </div>

              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className="industrial-card p-5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Product Header & SKU */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-bg-main border border-border-subtle text-text-primary font-semibold">
                          {item.sku}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-main border border-border-subtle text-accent-emerald flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald"></span>
                          {item.stock_qty} in stock
                        </span>
                      </div>

                      {/* Product Title & Category */}
                      <h3 className="font-heading font-bold text-lg text-text-primary mb-1">
                        {item.name}
                      </h3>
                      <div className="text-xs text-text-muted font-mono mb-3">
                        {item.category}
                      </div>

                      <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-3">
                        {item.description}
                      </p>

                      {/* Hardware Specification List */}
                      <div className="space-y-1.5 mb-6 pt-3 border-t border-border-subtle/80">
                        {item.specs.slice(0, 3).map((spec, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs font-mono text-text-secondary">
                            <span className="text-accent-amber font-bold">›</span>
                            <span className="line-clamp-1">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & Add to Cart Action */}
                    <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-text-muted uppercase">Unit Price</div>
                        <div className="font-mono font-bold text-base text-text-primary">
                          {currency === 'USD' ? `$${item.price_usd}` : `Rp ${item.price_idr.toLocaleString()}`}
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(item, 1)}
                        className="px-3.5 py-2 rounded text-xs font-semibold bg-accent-steel text-bg-main hover:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-accent-amber"
                        aria-label={`Add ${item.name} to cart`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Direct Contact & Engineering Office Section */}
            <section id="contact" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="industrial-card p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7">
                    <span className="text-xs font-mono text-accent-amber font-semibold uppercase tracking-wider block mb-2">
                      Direct Engineering Inquiries
                    </span>
                    <h2 className="font-heading text-3xl font-extrabold text-text-primary mb-4">
                      Custom Hardware Development and Turnkey Production
                    </h2>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-xl">
                      Need custom PCB design, firmware programming, or modifications to our standard gateways? Speak directly with our hardware engineers in Jakarta. We provide full schematic reviews and prototype batches.
                    </p>

                    <div className="space-y-3 font-mono text-xs text-text-secondary">
                      <div className="flex items-center gap-3">
                        <span className="w-20 text-text-muted">Office:</span>
                        <span className="text-text-primary">Jakarta Selatan, DKI Jakarta 12430, Indonesia</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-20 text-text-muted">Email:</span>
                        <a href="mailto:engineering@bashix.id" className="text-text-primary underline hover:text-accent-amber">
                          engineering@bashix.id
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-20 text-text-muted">WhatsApp:</span>
                        <a href="https://wa.me/628118062559" target="_blank" rel="noopener noreferrer" className="text-accent-emerald hover:underline">
                          +62 811-8062-559 (B2B Engineering Desk)
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Consultation Request Form */}
                  <div className="lg:col-span-5 bg-bg-main p-6 rounded border border-border-subtle">
                    <h3 className="font-heading font-bold text-base text-text-primary mb-1">
                      Request Hardware Briefing
                    </h3>
                    <p className="text-xs text-text-muted mb-4">
                      Direct response from an engineer within 1 business day.
                    </p>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        alert('Inquiry received. A Bashix hardware engineer will respond to your email.');
                      }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="block text-xs font-mono text-text-secondary mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Budi Santoso"
                          className="w-full px-3 py-2 rounded bg-bg-card border border-border-subtle text-xs text-text-primary focus:border-accent-amber focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-text-secondary mb-1">Company Email</label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          className="w-full px-3 py-2 rounded bg-bg-card border border-border-subtle text-xs text-text-primary focus:border-accent-amber focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-text-secondary mb-1">Hardware Requirement</label>
                        <textarea
                          rows="3"
                          required
                          placeholder="Specify unit models, quantities, or custom I/O specifications..."
                          className="w-full px-3 py-2 rounded bg-bg-card border border-border-subtle text-xs text-text-primary focus:border-accent-amber focus:outline-none resize-none"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded bg-text-primary hover:bg-accent-steel text-bg-main text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-accent-amber font-mono"
                      >
                        Submit Technical Request
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Admin Portal Tab */}
        {activeView === 'admin' && (
          <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6">
            <div className="industrial-card p-8 text-center flex flex-col items-center gap-4">
              <span className="text-xs font-mono px-3 py-1 rounded bg-bg-main border border-border-subtle text-accent-amber">
                Management Portal
              </span>
              <h2 className="font-heading text-2xl font-bold text-text-primary">
                Bashix Administration Console
              </h2>
              <p className="text-text-secondary text-sm max-w-md">
                Admin dashboard analytics and full hardware CRUD tables are scheduled in Phases 5 and 6.
              </p>
              <button
                onClick={() => setActiveView('landing')}
                className="px-4 py-2 rounded bg-bg-main border border-border-subtle text-xs font-mono text-text-primary hover:border-accent-amber"
              >
                Return to Hardware Catalog
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Slide-over Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/75 transition-opacity"
            onClick={() => setIsCartOpen(false)}
          ></div>

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-bg-card border-l border-border-subtle p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                  <h3 className="font-heading font-bold text-lg text-text-primary">
                    Hardware Order ({cart.length} items)
                  </h3>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded text-text-muted hover:text-text-primary"
                    aria-label="Close cart"
                  >
                    ✕
                  </button>
                </div>

                {/* Cart Items List */}
                <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                  {cart.length === 0 ? (
                    <div className="py-12 text-center text-xs font-mono text-text-muted">
                      Your cart is empty. Add hardware units from the catalog.
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.product.id} className="p-3 rounded bg-bg-main border border-border-subtle flex items-center justify-between gap-4">
                        <div>
                          <div className="text-xs font-mono text-accent-amber">{item.product.sku}</div>
                          <div className="font-heading font-semibold text-sm text-text-primary">{item.product.name}</div>
                          <div className="text-xs font-mono text-text-muted">
                            {currency === 'USD' ? `$${item.product.price_usd}` : `Rp ${item.product.price_idr.toLocaleString()}`}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-bg-card border border-border-subtle text-xs flex items-center justify-center text-text-secondary hover:text-text-primary"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-bg-card border border-border-subtle text-xs flex items-center justify-center text-text-secondary hover:text-text-primary"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-xs text-accent-rose ml-2 hover:underline font-mono"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="pt-4 border-t border-border-subtle">
                  <div className="flex items-center justify-between text-sm font-mono mb-4">
                    <span className="text-text-muted">Estimated Total:</span>
                    <span className="font-bold text-text-primary text-base">
                      {currency === 'USD' ? `$${cartTotal}` : `Rp ${cartTotal.toLocaleString()}`}
                    </span>
                  </div>

                  {checkoutSuccess ? (
                    <div className="p-3 rounded bg-accent-emerald/10 border border-accent-emerald text-accent-emerald text-xs font-mono text-center">
                      Order dispatch request submitted. Check your email.
                    </div>
                  ) : (
                    <button
                      onClick={handleSimulatedCheckout}
                      className="w-full py-3 rounded bg-accent-steel hover:bg-white text-bg-main text-xs font-semibold font-mono transition-colors"
                    >
                      Proceed to Order Dispatch
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grounded Technical Footer */}
      <footer className="border-t border-border-subtle bg-bg-card py-8 px-6 text-xs font-mono text-text-muted">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-heading font-bold text-text-primary tracking-wide">BASHIX.ID</span>
            <span className="mx-2">•</span>
            <span>PT Bashix Engineering Indonesia</span>
          </div>
          <div>
            Hardware assembled & verified in Jakarta • All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
}
