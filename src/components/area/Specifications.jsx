import React from 'react';

export default function Specifications({ onOpenDiscover }) {
  const comparisonRows = [
    {
      bashix: 'Deterministic RTOS & Linux',
      bashixPass: true,
      legacy: 'Proprietary ladder logic',
      legacyPass: false,
      consumer: 'Standard desktop Linux',
      consumerPass: true,
    },
    {
      bashix: 'Optically isolated I/O (2.5kV)',
      bashixPass: true,
      legacy: 'Optically isolated I/O',
      legacyPass: true,
      consumer: 'Unprotected 3.3V GPIO pins',
      consumerPass: false,
    },
    {
      bashix: 'Dual TSN Gigabit Ethernet',
      bashixPass: true,
      legacy: '100Mbps legacy fieldbus',
      legacyPass: false,
      consumer: 'Single shared USB Ethernet',
      consumerPass: false,
    },
    {
      bashix: 'Wide 9V to 36V DC power',
      bashixPass: true,
      legacy: '24V DC fixed power',
      legacyPass: true,
      consumer: 'Fragile 5V USB-C power',
      consumerPass: false,
    },
    {
      bashix: '-40°C to +85°C thermal rating',
      bashixPass: true,
      legacy: '0°C to +55°C ambient rating',
      legacyPass: false,
      consumer: 'Throttles at +45°C ambient',
      consumerPass: false,
    },
    {
      bashix: 'Open source SDK & eBPF drivers',
      bashixPass: true,
      legacy: 'Expensive per-seat software',
      legacyPass: false,
      consumer: 'Community tutorials only',
      consumerPass: false,
    },
  ];

  return (
    <section id="specifications" className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto scroll-mt-20">
      {/* Category Eyebrow */}
      <div className="text-center mb-2">
        <span className="text-xs font-mono font-medium text-[#55623B] tracking-wider uppercase">
          Specs
        </span>
      </div>

      {/* Main Headline */}
      <h2 className="font-display text-4xl sm:text-5xl text-[#181B15] text-center tracking-tight">
        Why Choose Bashix?
      </h2>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-[#4A4E44] text-center max-w-2xl mx-auto mt-2.5 mb-5 font-normal">
        You need hardware that never halts on the factory floor. That’s why we engineered Bashix with true industrial isolation and open firmware.
      </p>

      {/* Discover More CTA Button */}
      <div className="flex justify-center mb-6 md:mb-8">
        <button
          type="button"
          onClick={onOpenDiscover}
          className="btn-secondary-pill cursor-pointer"
        >
          Explore Specifications
        </button>
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[680px] grid grid-cols-12 gap-0 items-start">
          {/* Column 1: Bashix (Highlighted Card) */}
          <div className="col-span-4 bg-[#FFFFFF] rounded-2xl md:rounded-3xl border border-[#E2E6DC] shadow-md p-6 sm:p-8 z-10">
            <h3 className="text-xl sm:text-2xl font-display font-medium text-[#181B15] text-center pb-6 border-b border-[#ECEFE8]">
              Bashix
            </h3>
            <div className="divide-y divide-[#ECEFE8]">
              {comparisonRows.map((row, i) => (
                <div key={i} className="py-4 flex items-center gap-3 text-xs sm:text-sm font-mono text-[#181B15]">
                  <span className="text-[#364121] font-bold">✓</span>
                  <span>{row.bashix}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Legacy PLC */}
          <div className="col-span-4 px-6 sm:px-8 pt-6">
            <h3 className="text-lg sm:text-xl font-display font-medium text-[#757B6E] text-center pb-6 border-b border-[#E2E6DC]">
              Legacy PLC
            </h3>
            <div className="divide-y divide-[#E2E6DC]">
              {comparisonRows.map((row, i) => (
                <div key={i} className="py-4 flex items-center gap-3 text-xs sm:text-sm font-mono text-[#4A4E44]">
                  {row.legacyPass ? (
                    <span className="text-[#55623B] font-medium">✓</span>
                  ) : (
                    <span className="text-[#757B6E]">✕</span>
                  )}
                  <span>{row.legacy}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Consumer SBC */}
          <div className="col-span-4 px-6 sm:px-8 pt-6">
            <h3 className="text-lg sm:text-xl font-display font-medium text-[#757B6E] text-center pb-6 border-b border-[#E2E6DC]">
              Consumer SBC
            </h3>
            <div className="divide-y divide-[#E2E6DC]">
              {comparisonRows.map((row, i) => (
                <div key={i} className="py-4 flex items-center gap-3 text-xs sm:text-sm font-mono text-[#4A4E44]">
                  {row.consumerPass ? (
                    <span className="text-[#55623B] font-medium">✓</span>
                  ) : (
                    <span className="text-[#757B6E]">✕</span>
                  )}
                  <span>{row.consumer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
