import React from 'react';
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
    addToCart
  } = useStore();

  return (
    <div className="min-h-screen bg-bg-main text-text-primary font-sans relative selection:bg-accent-cyan/20 selection:text-accent-cyan">
      {/* Interactive Particle Constellation Background */}
      <CanvasBg />

      {/* Floating Glassmorphic Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="relative z-10">
        {activeView === 'landing' && (
          <>
            {/* Hero Section */}
            <Hero />

            {/* Real-time Telemetry & Ecosystem Bar */}
            <MetricsBar />

            {/* Quick Preview of Hardware Catalog (Anchored for #shop) */}
            <section id="shop" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-accent-cyan uppercase tracking-wider mb-2">
                    <span>// PHYSICAL HARDWARE CATALOG</span>
                  </div>
                  <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                    Turnkey Engineering Systems
                  </h2>
                </div>
                <div className="text-xs font-mono text-text-muted flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isSupabaseLive ? 'bg-accent-emerald animate-pulse' : 'bg-accent-amber'}`}></span>
                  <span>{isSupabaseLive ? 'Supabase Live Catalog' : 'Local Seed Catalog Active'}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:border-accent-cyan/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-[0_10px_30px_rgba(0,240,255,0.15)]"
                  >
                    <div>
                      {/* Product Header Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan font-semibold">
                          {item.sku}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald">
                          {item.stock_qty} in stock
                        </span>
                      </div>

                      {/* Product Name & Tagline */}
                      <h3 className="font-heading font-bold text-lg text-white group-hover:text-accent-cyan transition-colors mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-text-muted line-clamp-2 mb-4">
                        {item.tagline}
                      </p>

                      {/* Specs bullets preview */}
                      <div className="space-y-1.5 mb-6">
                        {item.specs.slice(0, 2).map((spec, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px] font-mono text-text-secondary">
                            <span className="text-accent-cyan">›</span>
                            <span className="line-clamp-1">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-text-muted">Direct Price</span>
                        <span className="font-mono font-bold text-sm text-white">
                          {currency === 'USD' ? `$${item.price_usd}` : `Rp ${item.price_idr.toLocaleString()}`}
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(item, 1)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-accent-cyan/15 hover:bg-accent-cyan text-accent-cyan hover:text-bg-main border border-accent-cyan/40 hover:border-accent-cyan transition-all flex items-center gap-1.5"
                      >
                        <span>Add</span>
                        <span>+</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Admin Portal Placeholder (Phases 5-6) */}
        {activeView === 'admin' && (
          <div className="pt-32 pb-24 max-w-5xl mx-auto px-6">
            <div className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center gap-4">
              <span className="px-3 py-1 rounded-full bg-accent-cyan/15 border border-accent-cyan/30 text-accent-cyan text-xs font-mono">
                [ Admin Portal Scaffold ]
              </span>
              <h2 className="font-heading text-3xl font-bold text-white">Admin Management System</h2>
              <p className="text-text-secondary text-sm max-w-lg">
                Phase 2 Navigation & Hero complete. Full analytics dashboards, product CRUD management, and CMS editors will be attached in Phases 5 & 6.
              </p>
              <button
                onClick={() => setActiveView('landing')}
                className="mt-2 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
              >
                Return to Landing Page
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <footer className="border-t border-white/10 bg-bg-card/30 relative z-10 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div className="flex items-center gap-3">
            <span className="font-heading font-bold text-white tracking-wider">BASHIX.ID</span>
            <span>•</span>
            <span>Hard Engineering & Physical Systems</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
            <span>All Systems Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
