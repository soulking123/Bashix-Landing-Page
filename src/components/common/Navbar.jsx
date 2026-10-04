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
    { label: 'Hardware Catalog', href: '#catalog' },
    { label: 'I/O & Architecture', href: '#schematic' },
    { label: 'Technical Specifications', href: '#specs' },
    { label: 'Contact Office', href: '#contact' }
  ];

  const handleNavClick = () => {
    if (activeView !== 'landing') {
      setActiveView('landing');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-bg-main/95 border-b border-border-subtle shadow-md py-3'
          : 'bg-bg-main/80 border-b border-border-subtle/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#"
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-accent-amber rounded p-1"
          >
            <div className="w-8 h-8 rounded bg-bg-card border border-border-subtle flex items-center justify-center text-text-primary font-mono font-bold text-sm">
              BX
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-lg tracking-wider text-text-primary">
                  BASHIX
                </span>
                <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-border-subtle text-text-secondary">
                  .id
                </span>
              </div>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                Industrial Systems & Hardware
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors focus-visible:ring-2 focus-visible:ring-accent-amber rounded px-1 py-0.5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Currency Switcher */}
            <div className="flex items-center bg-bg-card border border-border-subtle rounded p-0.5 text-xs font-mono">
              <button
                onClick={() => setCurrency('IDR')}
                className={`px-2 py-1 rounded transition-colors ${
                  currency === 'IDR'
                    ? 'bg-border-subtle text-text-primary font-bold'
                    : 'text-text-muted hover:text-text-primary'
                }`}
                title="Display prices in Indonesian Rupiah"
              >
                IDR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 rounded transition-colors ${
                  currency === 'USD'
                    ? 'bg-border-subtle text-text-primary font-bold'
                    : 'text-text-muted hover:text-text-primary'
                }`}
                title="Display prices in US Dollars"
              >
                USD
              </button>
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-3 py-2 rounded bg-bg-card border border-border-subtle hover:border-text-secondary text-xs font-mono text-text-primary transition-colors flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent-amber"
              aria-label="Open Shopping Cart"
            >
              <span>Cart</span>
              <span className="px-1.5 py-0.2 rounded bg-bg-main border border-border-subtle text-accent-amber font-bold text-[11px]">
                {cartItemCount}
              </span>
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={() => setActiveView(activeView === 'admin' ? 'landing' : 'admin')}
              className={`px-3 py-2 rounded text-xs font-mono transition-colors border ${
                activeView === 'admin'
                  ? 'bg-accent-amber text-bg-main border-accent-amber font-bold'
                  : 'bg-bg-card text-text-secondary border-border-subtle hover:text-text-primary hover:border-border-subtle/80'
              }`}
            >
              {activeView === 'admin' ? 'Exit Admin' : 'Admin'}
            </button>

            {/* Contact Action */}
            <a
              href="#contact"
              onClick={handleNavClick}
              className="px-3.5 py-2 rounded text-xs font-semibold bg-accent-primary text-bg-main hover:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-accent-amber"
            >
              Contact Sales
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-2.5 py-1.5 rounded bg-bg-card border border-border-subtle text-xs font-mono text-text-primary"
            >
              Cart ({cartItemCount})
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded bg-bg-card border border-border-subtle text-text-secondary hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent-amber"
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
        <div className="sm:hidden bg-bg-card border-b border-border-subtle px-6 py-4 flex flex-col gap-3 mt-3">
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
          <div className="pt-3 border-t border-border-subtle flex items-center justify-between">
            <div className="flex items-center gap-1 font-mono text-xs">
              <span className="text-text-muted mr-1">Currency:</span>
              <button
                onClick={() => setCurrency('IDR')}
                className={`px-2 py-0.5 rounded ${currency === 'IDR' ? 'bg-border-subtle text-text-primary font-bold' : 'text-text-secondary'}`}
              >
                IDR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded ${currency === 'USD' ? 'bg-border-subtle text-text-primary font-bold' : 'text-text-secondary'}`}
              >
                USD
              </button>
            </div>
            <button
              onClick={() => {
                setActiveView(activeView === 'admin' ? 'landing' : 'admin');
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono px-3 py-1 rounded bg-bg-main border border-border-subtle text-accent-amber"
            >
              {activeView === 'admin' ? 'Exit Admin' : 'Admin'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
