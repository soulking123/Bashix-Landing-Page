import React, { useState } from 'react';
import { useStore } from './context/StoreContext';
import CanvasBg from './components/common/CanvasBg';
import Navbar from './components/common/Navbar';
import Hero from './components/landing/Hero';
import MetricsBar from './components/landing/MetricsBar';

export default function App() {
  const {
    products,
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

  const [activePort, setActivePort] = useState('eth');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Manual route listener (e.g. typing /#admin or /admin manually)
  React.useEffect(() => {
    const handleRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (hash === '#admin' || path === '/admin' || search.includes('admin')) {
        setActiveView('admin');
      } else if (hash === '' || hash === '#catalog' || hash === '#schematic' || hash === '#specs' || hash === '#contact') {
        if (window.location.hash !== '#admin') {
          setActiveView('landing');
        }
      }
    };
    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, [setActiveView]);

  const portDetails = {
    eth: {
      title: 'Dual Gigabit Ethernet with TSN',
      spec: '2x RJ45 10/100/1000BASE-T',
      features: [
        'Hardware IEEE 802.1Qbv Time-Sensitive Networking',
        'Independent MAC controllers on dedicated PCIe lanes',
        'Integrated 1.5kV magnetic isolation',
        'eBPF packet filtering support in kernel space'
      ],
      connector: 'Shielded RJ45 8P8C'
    },
    rs485: {
      title: 'Optically Isolated RS-485 / Modbus',
      spec: '3-Pin Pluggable Screw Terminal',
      features: [
        '2.5kV RMS galvanic isolation barrier',
        'Modbus RTU master/slave baud rates up to 115.2 kbps',
        'Built-in 15kV ESD surge protection',
        'Switchable 120 Ohm bi-directional termination resistor'
      ],
      connector: 'Phoenix Contact 3.81mm Pitch'
    },
    can: {
      title: 'Dual CAN-FD Telemetry Interface',
      spec: '2-Channel ISO 11898-1:2015',
      features: [
        'Arbitration phase up to 1 Mbps, data phase up to 8 Mbps',
        'Sub-microsecond hardware message timestamping',
        'Native Linux SocketCAN kernel driver integration',
        'Short-circuit to battery protection on CAN_H / CAN_L'
      ],
      connector: 'Terminal Block & DB9 Diagnostic Header'
    },
    power: {
      title: 'Wide-Range Industrial Power Supply',
      spec: '9V to 36V DC Input Range',
      features: [
        'Reverse polarity and overvoltage clamp protection',
        'Integrated hardware watchdog timer with reset latch',
        'Operating temperature: -40 deg C to +85 deg C',
        'Standard 35mm DIN rail mounting enclosure (EN 50022)'
      ],
      connector: '2-Pin 5.08mm High-Current Screw Terminal'
    }
  };

  const selected = portDetails[activePort];

  const handleSimulatedCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setIsCartOpen(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-bg-main text-text-primary font-sans relative selection:bg-accent-amber/30 selection:text-white">
      {/* Subtle CAD / Technical Blueprint Grid (active on sections below hero) */}
      <CanvasBg />

      {/* Transparent Floating Header (over cinematic artwork) */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        {activeView === 'landing' && (
          <>
            {/* Cinematic Full-Bleed Hero Section */}
            <Hero />

            {/* Verifiable Technical Specifications & Protocols */}
            <MetricsBar />

            {/* Interactive Hardware Architecture & I/O Schematic Viewer */}
            <section id="schematic" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-border-subtle">
              <div className="max-w-3xl mb-10">
                <span className="text-xs font-mono text-accent-amber font-semibold uppercase tracking-wider block mb-2">
                  System Architecture & Electrical Pinouts
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-text-primary mb-3">
                  Hardware Interface Inspector
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Inspect physical connectors, galvanic isolation boundaries, and deterministic fieldbus transceivers on the Bashix EdgeCore gateway architecture.
                </p>
              </div>

              <div className="industrial-card p-6 md:p-8 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-border-subtle gap-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-text-primary">
                    <span className="font-bold text-accent-amber">MODEL:</span>
                    <span>BX-GW-02 // EdgeCore v2</span>
                  </div>
                  <div className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-main border border-border-subtle text-text-muted">
                    Interactive Pinout & Transceiver Viewer
                  </div>
                </div>

                {/* Interface Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                  <button
                    onClick={() => setActivePort('eth')}
                    className={`px-4 py-2.5 rounded text-xs font-mono text-left transition-colors border ${
                      activePort === 'eth'
                        ? 'bg-bg-main text-white border-accent-amber font-bold'
                        : 'bg-bg-card text-text-secondary border-border-subtle hover:text-white'
                    }`}
                  >
                    Dual GbE TSN
                  </button>
                  <button
                    onClick={() => setActivePort('rs485')}
                    className={`px-4 py-2.5 rounded text-xs font-mono text-left transition-colors border ${
                      activePort === 'rs485'
                        ? 'bg-bg-main text-white border-accent-amber font-bold'
                        : 'bg-bg-card text-text-secondary border-border-subtle hover:text-white'
                    }`}
                  >
                    Isolated RS-485
                  </button>
                  <button
                    onClick={() => setActivePort('can')}
                    className={`px-4 py-2.5 rounded text-xs font-mono text-left transition-colors border ${
                      activePort === 'can'
                        ? 'bg-bg-main text-white border-accent-amber font-bold'
                        : 'bg-bg-card text-text-secondary border-border-subtle hover:text-white'
                    }`}
                  >
                    Dual CAN-FD
                  </button>
                  <button
                    onClick={() => setActivePort('power')}
                    className={`px-4 py-2.5 rounded text-xs font-mono text-left transition-colors border ${
                      activePort === 'power'
                        ? 'bg-bg-main text-white border-accent-amber font-bold'
                        : 'bg-bg-card text-text-secondary border-border-subtle hover:text-white'
                    }`}
                  >
                    9-36V DC Power
                  </button>
                </div>

                {/* Selected Port Specifications Display */}
                <div className="bg-bg-main p-6 rounded-lg border border-border-subtle">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                    <h3 className="font-heading font-bold text-lg text-white">
                      {selected.title}
                    </h3>
                    <span className="text-xs font-mono text-accent-amber">
                      {selected.spec}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-text-muted mb-4">
                    Connector specification: {selected.connector}
                  </div>

                  <div className="space-y-2">
                    {selected.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs font-mono text-text-secondary">
                        <span className="text-accent-amber font-bold">›</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Physical Enclosure Metrics */}
                <div className="mt-6 pt-4 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-text-muted">
                  <div>
                    <span className="block text-white font-semibold mb-0.5">Dimensions:</span>
                    142 x 98 x 42 mm
                  </div>
                  <div>
                    <span className="block text-white font-semibold mb-0.5">Enclosure:</span>
                    Anodized Aluminum Chassis
                  </div>
                  <div>
                    <span className="block text-white font-semibold mb-0.5">Mounting:</span>
                    Standard 35mm DIN Rail (EN 50022)
                  </div>
                </div>
              </div>
            </section>

            {/* Physical Hardware Catalog Section */}
            <section id="catalog" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-border-subtle">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <span className="text-xs font-mono text-accent-amber font-semibold uppercase tracking-wider block mb-1">
                    Direct Factory Inventory
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
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
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-bg-main border border-border-subtle text-white font-semibold">
                          {item.sku}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-main border border-border-subtle text-accent-emerald flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald"></span>
                          {item.stock_qty} in stock
                        </span>
                      </div>

                      {/* Product Hardware Studio Image */}
                      {item.image_url && (
                        <div className="relative w-full aspect-4/3 rounded bg-black/60 overflow-hidden mb-4 border border-border-subtle group">
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Product Title & Category */}
                      <h3 className="font-heading font-bold text-lg text-white mb-1">
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
                        <div className="font-mono font-bold text-base text-white">
                          Rp {item.price_idr.toLocaleString('id-ID')}
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(item, 1)}
                        className="px-3.5 py-2 rounded text-xs font-semibold bg-white text-bg-main hover:bg-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-accent-amber"
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
                    <h2 className="font-heading text-3xl font-extrabold text-white mb-4">
                      Custom Hardware Development and Turnkey Production
                    </h2>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-xl">
                      Need custom PCB design, firmware programming, or modifications to our standard gateways? Speak directly with our hardware engineers in Jakarta. We provide full schematic reviews and prototype batches.
                    </p>

                    <div className="space-y-3 font-mono text-xs text-text-secondary">
                      <div className="flex items-center gap-3">
                        <span className="w-20 text-text-muted">Office:</span>
                        <span className="text-white">Jakarta Selatan, DKI Jakarta 12430, Indonesia</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-20 text-text-muted">Email:</span>
                        <a href="mailto:engineering@bashix.id" className="text-white underline hover:text-accent-amber">
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
                    <h3 className="font-heading font-bold text-base text-white mb-1">
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
                          className="w-full px-3 py-2 rounded bg-bg-card border border-border-subtle text-xs text-white focus:border-accent-amber focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-text-secondary mb-1">Company Email</label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          className="w-full px-3 py-2 rounded bg-bg-card border border-border-subtle text-xs text-white focus:border-accent-amber focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-text-secondary mb-1">Hardware Requirement</label>
                        <textarea
                          rows="3"
                          required
                          placeholder="Specify unit models, quantities, or custom I/O specifications..."
                          className="w-full px-3 py-2 rounded bg-bg-card border border-border-subtle text-xs text-white focus:border-accent-amber focus:outline-none resize-none"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded bg-white hover:bg-slate-200 text-bg-main text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-accent-amber font-mono"
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
              <h2 className="font-heading text-2xl font-bold text-white">
                Bashix Administration Console
              </h2>
              <p className="text-text-secondary text-sm max-w-md">
                Admin dashboard analytics and full hardware CRUD tables are scheduled in Phases 5 and 6.
              </p>
              <button
                onClick={() => {
                  window.location.hash = '';
                  setActiveView('landing');
                }}
                className="px-4 py-2 rounded bg-bg-main border border-border-subtle text-xs font-mono text-white hover:border-accent-amber"
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
            className="absolute inset-0 bg-black/80 transition-opacity"
            onClick={() => setIsCartOpen(false)}
          ></div>

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-bg-card border-l border-border-subtle p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                  <h3 className="font-heading font-bold text-lg text-white">
                    Hardware Order ({cart.length} items)
                  </h3>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded text-text-muted hover:text-white"
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
                        <div className="flex items-center gap-3">
                          {item.product.image_url && (
                            <img
                              src={item.product.image_url}
                              alt={item.product.name}
                              className="w-12 h-12 rounded object-cover border border-border-subtle bg-black shrink-0"
                            />
                          )}
                          <div>
                            <div className="text-xs font-mono text-accent-amber">{item.product.sku}</div>
                            <div className="font-heading font-semibold text-sm text-white">{item.product.name}</div>
                            <div className="text-xs font-mono text-text-muted">
                              Rp {item.product.price_idr.toLocaleString('id-ID')}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-bg-card border border-border-subtle text-xs flex items-center justify-center text-text-secondary hover:text-white"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-bg-card border border-border-subtle text-xs flex items-center justify-center text-text-secondary hover:text-white"
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
                    <span className="font-bold text-white text-base">
                      Rp {cartTotal.toLocaleString('id-ID')}
                    </span>
                  </div>

                  {checkoutSuccess ? (
                    <div className="p-3 rounded bg-accent-emerald/10 border border-accent-emerald text-accent-emerald text-xs font-mono text-center">
                      Order dispatch request submitted. Check your email.
                    </div>
                  ) : (
                    <button
                      onClick={handleSimulatedCheckout}
                      className="w-full py-3 rounded bg-white hover:bg-slate-200 text-bg-main text-xs font-semibold font-mono transition-colors"
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
            <span className="font-heading font-bold text-white tracking-wide">BASHIX.ID</span>
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
