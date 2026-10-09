import React, { useState, useEffect } from 'react';
import Navbar from './components/area/Navbar';
import Hero from './components/area/Hero';
import Benefits from './components/area/Benefits';
import Services from './components/landing/Services';
import TechShowcase from './components/landing/TechShowcase';
import Storefront from './components/shop/Storefront';
import Process from './components/landing/Process';
import BigPicture from './components/area/BigPicture';
import CaseStudies from './components/landing/CaseStudies';
import Specifications from './components/area/Specifications';
import Estimator from './components/landing/Estimator';
import TestimonialAndSteps from './components/area/TestimonialAndSteps';
import Connect from './components/area/Connect';
import Footer from './components/area/Footer';
import ContactModal from './components/area/ContactModal';
import DiscoverModal from './components/area/DiscoverModal';
import ProductModal from './components/shop/ProductModal';
import CartDrawer from './components/shop/CartDrawer';
import AdminPortal from './components/admin/AdminPortal';
import { useStore } from './context/StoreContext';

export default function App() {
  const { addToCart, activeView, setActiveView } = useStore();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [contactPrefill, setContactPrefill] = useState(null);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  // Manual route & hotkey listener for admin view
  useEffect(() => {
    const handleRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();

      if (hash === '#admin' || path === '/admin' || search.includes('admin')) {
        setActiveView('admin');
      } else if (hash === '' || hash.startsWith('#')) {
        if (hash !== '#admin' && activeView === 'admin') {
          setActiveView('landing');
        }
      }
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);

    // Operator console shortcut: Ctrl+Shift+A or Cmd+Shift+A
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setActiveView((prev) => (prev === 'admin' ? 'landing' : 'admin'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeView, setActiveView]);

  const handleOpenContact = (prefill = null) => {
    setContactPrefill(prefill);
    setIsContactOpen(true);
  };

  const handleOpenDatasheet = (product) => {
    setSelectedProductForModal(product);
  };

  // If in Admin Management Console View (Phase 6)
  if (activeView === 'admin') {
    return <AdminPortal />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#181B15] flex flex-col selection:bg-[#D4DEC5] selection:text-[#181B15]">
      {/* Navigation Header */}
      <Navbar onOpenContact={() => handleOpenContact(null)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenContact={() => handleOpenContact(null)} />

        {/* Benefits Section */}
        <Benefits />

        {/* Engineering Services Capability Cards (Phase 3) */}
        <Services />

        {/* The Bashix Engine Interactive Tech Showcase (Phase 3) */}
        <TechShowcase />

        {/* Physical Hardware Storefront (Phase 5) */}
        <Storefront onViewDatasheet={handleOpenDatasheet} />

        {/* Precision Engineering Lifecycle Methodology (Phase 4) */}
        <Process />

        {/* Big Picture Section */}
        <BigPicture onOpenDiscover={() => setIsDiscoverOpen(true)} />

        {/* Field-Proven Empirical Case Studies (Phase 4) */}
        <CaseStudies />

        {/* Specifications Comparison Section */}
        <Specifications onOpenDiscover={() => setIsDiscoverOpen(true)} />

        {/* Interactive Scope & Budget Estimator (Phase 4) */}
        <Estimator onBookConsultation={(scopeData) => handleOpenContact(scopeData)} />

        {/* Testimonial & How-To Steps Section */}
        <TestimonialAndSteps onOpenDiscover={() => setIsDiscoverOpen(true)} />

        {/* Connect with us CTA Section */}
        <Connect onOpenContact={() => handleOpenContact(null)} />
      </main>

      {/* Structured Footer */}
      <Footer />

      {/* Hardware E-Commerce Modals & Slide-over Drawer (Phase 5) */}
      <ProductModal
        product={selectedProductForModal}
        isOpen={Boolean(selectedProductForModal)}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={(product, qty) => addToCart(product, qty)}
      />
      <CartDrawer />

      {/* Consultation & Discovery Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => {
          setIsContactOpen(false);
          setContactPrefill(null);
        }}
        prefillData={contactPrefill}
      />
      <DiscoverModal
        isOpen={isDiscoverOpen}
        onClose={() => setIsDiscoverOpen(false)}
        onOpenContact={() => handleOpenContact(null)}
      />
    </div>
  );
}
