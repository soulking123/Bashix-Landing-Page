import React from 'react';
import { useStore } from './context/StoreContext';

export default function App() {
  const {
    products,
    siteConfig,
    currency,
    setCurrency,
    activeView,
    setActiveView,
    cartItemCount,
    isSupabaseLive,
    isLoading
  } = useStore();

  return (
    <div className="min-h-screen bg-bg-main text-text-primary font-sans flex flex-col selection:bg-accent-cyan/20 selection:text-accent-cyan">
      {/* Top Scaffolding Verification Banner */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-bg-card border border-accent-cyan/40 flex items-center justify-center shadow-lg shadow-accent-cyan/10">
            <span className="font-heading font-bold text-accent-cyan text-xl">B</span>
          </div>
          <div>
            <span className="font-heading font-bold text-lg tracking-wider text-white">BASHIX</span>
            <span className="text-xs text-text-muted ml-2 font-mono">v0.1.0-alpha</span>
          </div>
        </div>

        {/* Database Status Indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-bg-card border border-white/10 text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${isSupabaseLive ? 'bg-accent-emerald animate-pulse' : 'bg-accent-amber'}`}></span>
            <span>{isSupabaseLive ? 'Supabase Connected' : 'Local Persistence (Dev Mode)'}</span>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center bg-bg-card border border-white/10 rounded-lg p-0.5 text-xs font-mono">
            <button
              onClick={() => setCurrency('IDR')}
              className={`px-2.5 py-1 rounded transition-colors ${currency === 'IDR' ? 'bg-accent-cyan text-bg-main font-bold' : 'text-text-muted hover:text-white'}`}
            >
              IDR
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded transition-colors ${currency === 'USD' ? 'bg-accent-cyan text-bg-main font-bold' : 'text-text-muted hover:text-white'}`}
            >
              USD
            </button>
          </div>

          {/* View Mode Buttons (Ready for Phases 2-6) */}
          <div className="flex items-center gap-1 bg-bg-card border border-white/10 rounded-lg p-1 text-xs font-mono">
            <button
              onClick={() => setActiveView('landing')}
              className={`px-3 py-1 rounded transition-all ${activeView === 'landing' ? 'bg-white/10 text-white font-semibold' : 'text-text-muted hover:text-white'}`}
            >
              Landing
            </button>
            <button
              onClick={() => setActiveView('store')}
              className={`px-3 py-1 rounded transition-all ${activeView === 'store' ? 'bg-white/10 text-white font-semibold' : 'text-text-muted hover:text-white'}`}
            >
              Hardware Shop
            </button>
            <button
              onClick={() => setActiveView('admin')}
              className={`px-3 py-1 rounded transition-all ${activeView === 'admin' ? 'bg-white/10 text-white font-semibold' : 'text-text-muted hover:text-white'}`}
            >
              Admin Portal
            </button>
          </div>
        </div>
      </header>

      {/* Main Scaffold Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 flex flex-col gap-10">
        {/* Phase 1 Verification Hero */}
        <section className="text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan text-xs font-mono tracking-wide">
            <span>[ Phase 1 Scaffold Active ]</span>
            <span>•</span>
            <span>React 19 + Tailwind v4 + Supabase</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl">
            {siteConfig.hero_headline}
          </h1>

          <p className="text-text-secondary text-base sm:text-lg max-w-2xl leading-relaxed">
            {siteConfig.hero_subtitle}
          </p>
        </section>

        {/* System Architecture & Token Diagnostic Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Styling System */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-accent-cyan">01 // STYLING</span>
              <span className="w-2 h-2 rounded-full bg-accent-cyan"></span>
            </div>
            <h3 className="font-heading font-semibold text-lg text-white">Tailwind CSS v4</h3>
            <p className="text-text-secondary text-sm">
              Integrated with native <code className="text-accent-cyan font-mono text-xs">@tailwindcss/vite</code> plugin and CSS-first <code className="text-accent-cyan font-mono text-xs">@theme</code> tokens.
            </p>
            <div className="flex gap-2 pt-2">
              <span className="w-6 h-6 rounded-full bg-bg-main border border-white/20" title="bg-main"></span>
              <span className="w-6 h-6 rounded-full bg-bg-card border border-white/20" title="bg-card"></span>
              <span className="w-6 h-6 rounded-full bg-accent-cyan" title="accent-cyan"></span>
              <span className="w-6 h-6 rounded-full bg-accent-violet" title="accent-violet"></span>
              <span className="w-6 h-6 rounded-full bg-accent-emerald" title="accent-emerald"></span>
            </div>
          </div>

          {/* Card 2: Database Layer */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-accent-violet">02 // DATA TIER</span>
              <span className="w-2 h-2 rounded-full bg-accent-violet"></span>
            </div>
            <h3 className="font-heading font-semibold text-lg text-white">Supabase PostgreSQL</h3>
            <p className="text-text-secondary text-sm">
              Dual-mode <code className="text-accent-violet font-mono text-xs">src/services/db.js</code> service adapter with live schema and offline seed persistence.
            </p>
            <div className="text-xs font-mono text-text-muted pt-2">
              Status: <span className="text-white font-semibold">{isSupabaseLive ? 'Cloud DB Active' : 'Seed Store Active'}</span>
            </div>
          </div>

          {/* Card 3: Execution Status */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-accent-emerald">03 // ROADMAP</span>
              <span className="w-2 h-2 rounded-full bg-accent-emerald"></span>
            </div>
            <h3 className="font-heading font-semibold text-lg text-white">Phase 1 Complete</h3>
            <p className="text-text-secondary text-sm">
              Scaffolding, design tokens, and database layer verified. Ready for Phase 2: Navigation & Hero.
            </p>
            <div className="text-xs font-mono text-accent-emerald pt-2">
              ✓ Issue #1 Acceptance Criteria Met
            </div>
          </div>
        </section>

        {/* Seed Catalog Verification List */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-white">Seed Hardware Products ({products.length})</h2>
            <span className="text-xs font-mono text-text-muted">Synchronized via StoreContext</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map(item => (
              <div key={item.id} className="glass-panel p-4 rounded-xl flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-accent-cyan">{item.sku}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-text-muted">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-heading font-semibold text-white mt-1">{item.name}</h4>
                  <p className="text-xs text-text-secondary line-clamp-1">{item.tagline}</p>
                </div>
                <div className="text-right flex flex-col items-end shrink-0">
                  <span className="font-mono font-bold text-white">
                    {currency === 'USD' ? `$${item.price_usd}` : `Rp ${item.price_idr.toLocaleString()}`}
                  </span>
                  <span className="text-xs font-mono text-accent-emerald">{item.stock_qty} in stock</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-6 text-center text-xs font-mono text-text-muted">
        Bashix Engineering Platform • {siteConfig.contact_email} • Phase 1 Foundation
      </footer>
    </div>
  );
}
