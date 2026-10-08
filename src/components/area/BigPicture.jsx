import React from 'react';

export default function BigPicture({ onOpenDiscover }) {
  const points = [
    {
      num: '01',
      title: 'Real-Time Signal Conditioning',
      description: 'Multi-stage active filtering and 2.5kV galvanic isolation prevent electrical ground loops.',
    },
    {
      num: '02',
      title: 'Deterministic Edge Compute',
      description: 'Run containerized telemetry and computer vision inference locally with zero cloud dependence.',
    },
    {
      num: '03',
      title: 'Hardware Security Root-of-Trust',
      description: 'Onboard cryptographic co-processors safeguard firmware keys and prevent unauthorized bus access.',
    },
    {
      num: '04',
      title: 'Monolithic Thermal Dissipation',
      description: 'Passive conduction cooling through solid aluminum billets guarantees fanless 24/7 industrial uptime.',
    },
  ];

  return (
    <section className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto">
      {/* Top Panoramic Engineering Facility Card */}
      <div className="rounded-3xl md:rounded-[2.5rem] overflow-hidden mb-8 md:mb-12 shadow-sm border border-[#E2E6DC] aspect-21/9 sm:aspect-16/7 max-h-[480px]">
        <img
          src="/images/area/engineering-lab-panorama.jpg"
          alt="Modern advanced robotics and industrial telemetry engineering laboratory"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Two-Column Feature Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Copy & Numbered Highlights */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h2 className="font-display text-4xl sm:text-5xl text-[#181B15] tracking-tight">
            See the Big Picture
          </h2>
          <p className="text-base sm:text-lg text-[#4A4E44] mt-2.5 mb-6 md:mb-8 max-w-xl font-normal leading-relaxed">
            From microvolt analog sensor nodes to high-throughput industrial edge computing, Bashix unifies your entire physical hardware stack.
          </p>

          {/* Numbered List */}
          <div className="space-y-3 mb-6">
            {points.map((pt) => (
              <div
                key={pt.num}
                className="pt-3.5 border-t border-[#E2E6DC] flex items-baseline gap-4 sm:gap-6 group"
              >
                <span className="text-xs font-mono font-medium text-[#757B6E] tracking-wider shrink-0">
                  {pt.num}
                </span>
                <p className="text-sm sm:text-base text-[#181B15] leading-snug">
                  <span className="font-medium text-[#181B15]">{pt.title}:</span>{' '}
                  <span className="text-[#4A4E44]">{pt.description}</span>
                </p>
              </div>
            ))}
          </div>

          <div>
            <button
              type="button"
              onClick={onOpenDiscover}
              className="btn-secondary-pill cursor-pointer"
            >
              Explore Specifications
            </button>
          </div>
        </div>

        {/* Right Column: Precision Hardware Module Sculpture */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="rounded-3xl md:rounded-[2.25rem] overflow-hidden border border-[#E2E6DC] bg-[#EAE8E2] shadow-sm w-full max-w-md lg:max-w-none aspect-4/3 sm:aspect-1/1">
            <img
              src="/images/area/engineering-hardware.jpg"
              alt="Precision-machined CNC anodized industrial hardware module with passive cooling heatsink"
              className="w-full h-full object-cover object-center hover:scale-102 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
