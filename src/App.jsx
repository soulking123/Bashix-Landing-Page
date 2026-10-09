import React, { useState } from 'react';
import Navbar from './components/area/Navbar';
import Hero from './components/area/Hero';
import Benefits from './components/area/Benefits';
import Services from './components/landing/Services';
import TechShowcase from './components/landing/TechShowcase';
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

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [contactPrefill, setContactPrefill] = useState(null);

  const handleOpenContact = (prefill = null) => {
    setContactPrefill(prefill);
    setIsContactOpen(true);
  };

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

      {/* Interactive Modals */}
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
