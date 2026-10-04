import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

export default function Navbar() {
  const {
    activeView,
    setActiveView,
    cartItemCount,
    setIsCartOpen
  } = useStore();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Hardware', href: '#catalog' },
    { label: 'Architecture', href: '#schematic' },
    { label: 'Specifications', href: '#specs' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = () => {
    if (activeView !== 'landing') {
      setActiveView('landing');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-border-subtle shadow-sm py-3.5'
          : 'bg-white/80 backdrop-blur-md border-b border-border-subtle/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name (like DJI / Bambu clean header) */}
          <a
            href="#"
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-accent-primary rounded py-1 px-1.5 group"
          >
            <span className="font-heading font-extrabold text-xl tracking-tight text-text-primary group-hover:text-accent-amber transition-colors">
              /bashix
            </span>
            <span className="text-[10px] font-mono text-text-muted tracking-wider">
              .id
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors focus-visible:ring-2 focus-visible:ring-accent-primary rounded py-0.5 px-1 flex items-center gap-1"
              >
                <span>{link.label}</span>
                <span className="text-[9px] text-text-muted">▾</span>
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-mono text-text-primary transition-all flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent-primary"
              aria-label="Open Shopping Cart"
            >
              <span>Cart</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-900 text-white font-bold text-[11px]">
                {cartItemCount}
              </span>
            </button>

            {/* Pill CTA (like 'Buy now' / 'Store' in DJI & Bambu) */}
            <a
              href="#catalog"
              onClick={handleNavClick}
              className="px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-900 hover:bg-black text-white transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-accent-primary"
            >
              Order Hardware
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-2.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-text-primary"
            >
              Cart ({cartItemCount})
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-text-secondary hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent-primary"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-2xl border-b border-border-subtle px-6 py-4 flex flex-col gap-3 mt-3 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleNavClick}
              className="text-sm font-medium text-text-secondary hover:text-text-primary py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-mono text-text-muted">All prices in IDR (Rp)</span>
            <a
              href="#catalog"
              onClick={handleNavClick}
              className="text-xs font-mono px-3 py-1 rounded bg-slate-900 text-white"
            >
              Catalog
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
