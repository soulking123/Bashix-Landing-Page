import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

export default function Navbar() {
  const {
    activeView,
    setActiveView,
    cartItemCount,
    setIsCartOpen,
    currency,
    setCurrency
  } = useStore();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services', view: 'landing' },
    { label: 'Hardware Store', href: '#shop', view: 'landing' },
    { label: 'Architecture', href: '#architecture', view: 'landing' },
    { label: 'Case Studies', href: '#case-studies', view: 'landing' },
    { label: 'Scope Estimator', href: '#estimator', view: 'landing' }
  ];

  const handleNavClick = (link) => {
    if (activeView !== link.view) {
      setActiveView(link.view);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-main/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40 py-3.5'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-bg-card border border-accent-cyan/40 flex items-center justify-center transition-all duration-300 group-hover:border-accent-cyan group-hover:shadow-[0_0_20px_rgba(0,240,255,0.35)]">
              {/* Hexagon vector badge */}
              <svg className="w-5 h-5 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <div className="absolute inset-0 rounded-xl bg-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl tracking-wider text-white">
                  BASHIX
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent-cyan/15 text-accent-cyan font-bold border border-accent-cyan/30">
                  .id
                </span>
              </div>
              <span className="text-[10px] font-mono text-text-muted tracking-tight">
                SYSTEMS & HARDWARE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-bg-card/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link)}
                className="px-3.5 py-1.5 text-xs font-medium text-text-secondary hover:text-white hover:text-accent-cyan transition-colors rounded-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action Icons & Triggers */}
          <div className="hidden md:flex items-center gap-3">
            {/* Currency Selector */}
            <div className="flex items-center bg-bg-card border border-white/10 rounded-lg p-0.5 text-xs font-mono">
              <button
                onClick={() => setCurrency('IDR')}
                className={`px-2 py-1 rounded transition-colors ${
                  currency === 'IDR'
                    ? 'bg-accent-cyan text-bg-main font-bold shadow'
                    : 'text-text-muted hover:text-white'
                }`}
                title="Switch to Indonesian Rupiah"
              >
                IDR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded transition-colors ${
                  currency === 'USD'
                    ? 'bg-accent-cyan text-bg-main font-bold shadow'
                    : 'text-text-muted hover:text-white'
                }`}
                title="Switch to US Dollar"
              >
                USD
              </button>
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-bg-card border border-white/10 hover:border-accent-cyan/50 text-text-secondary hover:text-white transition-all focus:outline-none group"
              aria-label="Open Shopping Cart"
            >
              <svg className="w-5 h-5 text-text-secondary group-hover:text-accent-cyan transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-accent-cyan text-bg-main text-[11px] font-mono font-bold rounded-full flex items-center justify-center shadow-lg shadow-accent-cyan/40 animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Admin Portal Toggle Button */}
            <button
              onClick={() => setActiveView(activeView === 'admin' ? 'landing' : 'admin')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 border ${
                activeView === 'admin'
                  ? 'bg-accent-cyan text-bg-main border-accent-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)] font-bold'
                  : 'bg-bg-card text-text-secondary border-white/10 hover:border-accent-cyan/40 hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
              <span>{activeView === 'admin' ? 'Exit Portal' : 'Admin'}</span>
            </button>

            {/* Contact / CTA */}
            <a
              href="#estimator"
              onClick={() => setActiveView('landing')}
              className="px-4 py-2 rounded-xl text-xs font-semibold font-heading tracking-wide bg-gradient-to-r from-accent-cyan to-accent-violet text-white hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.45)] transform hover:-translate-y-0.5"
            >
              Consult Team
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg bg-bg-card border border-white/10 text-text-secondary"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-cyan text-bg-main text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-bg-card border border-white/10 text-text-secondary hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-6 py-6 flex flex-col gap-4 mt-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => handleNavClick(link)}
              className="text-sm font-medium text-text-secondary hover:text-accent-cyan py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-text-muted">Currency:</span>
              <button
                onClick={() => setCurrency('IDR')}
                className={`px-2 py-0.5 rounded ${currency === 'IDR' ? 'bg-accent-cyan text-bg-main font-bold' : 'text-text-secondary'}`}
              >
                IDR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded ${currency === 'USD' ? 'bg-accent-cyan text-bg-main font-bold' : 'text-text-secondary'}`}
              >
                USD
              </button>
            </div>
            <button
              onClick={() => {
                setActiveView(activeView === 'admin' ? 'landing' : 'admin');
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-bg-card border border-white/10 text-accent-cyan"
            >
              {activeView === 'admin' ? 'Exit Portal' : 'Admin Portal'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
