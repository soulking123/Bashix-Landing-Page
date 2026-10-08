import React, { useState } from 'react';
import Navbar from './components/area/Navbar';
import Hero from './components/area/Hero';
import Benefits from './components/area/Benefits';
import BigPicture from './components/area/BigPicture';
import Specifications from './components/area/Specifications';
import TestimonialAndSteps from './components/area/TestimonialAndSteps';
import Connect from './components/area/Connect';
import Footer from './components/area/Footer';
import ContactModal from './components/area/ContactModal';
import DiscoverModal from './components/area/DiscoverModal';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#181B15] flex flex-col selection:bg-[#D4DEC5] selection:text-[#181B15]">
      {/* Navigation Header */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenContact={() => setIsContactOpen(true)} />

        {/* Benefits Section */}
        <Benefits />

        {/* Big Picture Section */}
        <BigPicture onOpenDiscover={() => setIsDiscoverOpen(true)} />

        {/* Specifications Comparison Section */}
        <Specifications onOpenDiscover={() => setIsDiscoverOpen(true)} />

        {/* Testimonial & How-To Steps Section */}
        <TestimonialAndSteps onOpenDiscover={() => setIsDiscoverOpen(true)} />

        {/* Connect with us CTA Section */}
        <Connect onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Structured Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <DiscoverModal
        isOpen={isDiscoverOpen}
        onClose={() => setIsDiscoverOpen(false)}
        onOpenContact={() => setIsContactOpen(true)}
      />
    </div>
  );
}
