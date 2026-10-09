import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

export default function Navbar({ onOpenContact }) {
  const { cartItemCount, setIsCartOpen } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'The Engine', href: '#engine' },
    { label: 'Hardware', href: '#hardware' },
    { label: 'Methodology', href: '#methodology' },
    { label: 'Case Studies', href: '#cases' },
    { label: 'Estimator', href: '#estimator' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[#E2E6DC] py-3.5 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="text-2xl font-display font-medium tracking-tight text-[#181B15] hover:opacity-80 transition-opacity"
          aria-label="Bashix Engineering Home"
        >
          Bashix
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#181B15] hover:text-[#55623B] transition-colors focus-visible:ring-2 focus-visible:ring-[#364121] rounded-xs"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA & Cart Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Shopping Cart Drawer Trigger */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full text-[#181B15] hover:bg-[#EEF2E8] border border-[#E2E6DC] transition-colors flex items-center justify-center cursor-pointer min-w-[44px] min-h-[44px]"
            aria-label={`Open shopping cart with ${cartItemCount} items`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#364121] text-[#FFFFFF] text-[10px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {cartItemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenContact}
            className="btn-primary-pill cursor-pointer"
            aria-label="Consult engineering team"
          >
            <span>Consult Engineers</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7H9M17 7V15"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Header Actions */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Cart Trigger */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full text-[#181B15] hover:bg-[#EAECE6] border border-[#E2E6DC] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={`Open shopping cart with ${cartItemCount} items`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#364121] text-[#FFFFFF] text-[10px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-lg text-[#181B15] hover:bg-[#EAECE6] transition-colors focus-visible:ring-2 focus-visible:ring-[#364121] min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAFAF8] border-b border-[#E2E6DC] px-6 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-[#181B15] hover:text-[#55623B] py-2 transition-colors border-b border-[#EAECE6] last:border-b-0"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="btn-secondary-pill w-full justify-center"
              >
                <span>Hardware Order Queue ({cartItemCount})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="btn-primary-pill w-full justify-center"
              >
                <span>Consult Engineers</span>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17L17 7H9M17 7V15"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
