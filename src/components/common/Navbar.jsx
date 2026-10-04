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
          ? 'bg-bg-main/90 backdrop-blur-xl border-b border-border-subtle/80 shadow-2xl py-3.5'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name (like /antislop in reference) */}
          <a
            href="#"
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-accent-amber rounded py-1 px-1.5 group"
          >
            <span className="font-heading font-extrabold text-xl tracking-tight text-white group-hover:text-accent-amber transition-colors">
              /bashix
            </span>
            <span className="text-[10px] font-mono text-white/50 tracking-wider">
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
                className="text-xs font-medium text-white/80 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-accent-amber rounded py-0.5 px-1 flex items-center gap-1"
              >
                <span>{link.label}</span>
                <span className="text-[9px] text-white/40">▾</span>
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/30 text-xs font-mono text-white transition-all flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent-amber"
              aria-label="Open Shopping Cart"
            >
              <span>Cart</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-accent-amber font-bold text-[11px]">
                {cartItemCount}
              </span>
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={() => setActiveView(activeView === 'admin' ? 'landing' : 'admin')}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
                activeView === 'admin'
                  ? 'bg-accent-amber text-bg-main border-accent-amber font-bold'
                  : 'bg-black/40 backdrop-blur-md text-white/70 border-white/10 hover:text-white hover:border-white/25'
              }`}
            >
              {activeView === 'admin' ? 'Exit Admin' : 'Admin'}
            </button>

            {/* Pill CTA (like 'Install antislop' in reference) */}
            <a
              href="#catalog"
              onClick={handleNavClick}
              className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/25 hover:border-white/50 text-white hover:bg-white/20 transition-all focus-visible:ring-2 focus-visible:ring-accent-amber"
            >
              Order Hardware
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-2.5 py-1.5 rounded-full bg-black/40 border border-white/10 text-xs font-mono text-white"
            >
              Cart ({cartItemCount})
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-black/40 border border-white/10 text-white/80 hover:text-white focus-visible:ring-2 focus-visible:ring-accent-amber"
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
        <div className="sm:hidden bg-bg-main/95 backdrop-blur-2xl border-b border-border-subtle px-6 py-4 flex flex-col gap-3 mt-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleNavClick}
              className="text-sm font-medium text-white/80 hover:text-white py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-white/50">All prices in IDR (Rp)</span>
            <button
              onClick={() => {
                setActiveView(activeView === 'admin' ? 'landing' : 'admin');
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono px-3 py-1 rounded bg-white/10 border border-white/15 text-accent-amber"
            >
              {activeView === 'admin' ? 'Exit Admin' : 'Admin'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
