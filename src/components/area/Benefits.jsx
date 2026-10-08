import React from 'react';

export default function Benefits() {
  const capabilities = [
    {
      title: 'Edge Telemetry & Acquisition',
      description:
        'Acquire real-time sensor streams with deterministic sub-millisecond precision across isolated RS-485, CAN-FD, and analog channels.',
      icon: (
        <svg className="w-5 h-5 text-[#181B15]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={1.75} />
          <rect x="8" y="8" width="8" height="8" rx="1" strokeWidth={1.75} />
          <path strokeLinecap="round" strokeWidth={1.75} d="M1 9h3M1 15h3M20 9h3M20 15h3M9 1v3M15 1v3M9 20v3M15 20v3" />
        </svg>
      ),
    },
    {
      title: 'Industrial-Grade Hardening',
      description:
        'CNC-milled anodized aluminum chassis, 35mm DIN-rail mounting, and operational reliability tested from -40°C to +85°C.',
      icon: (
        <svg className="w-5 h-5 text-[#181B15]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 2l7 4v6c0 5.5-3.8 10.7-7 12-3.2-1.3-7-6.5-7-12V6l7-4z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Open Linux & RTOS Stacks',
      description:
        'Full developer control with native Linux SocketCAN drivers, containerized eBPF telemetry pipelines, and zero vendor lock-in.',
      icon: (
        <svg className="w-5 h-5 text-[#181B15]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 9l3 3-3 3M13 15h3" />
          <rect x="3" y="4" width="18" height="16" rx="3" strokeWidth={1.75} />
        </svg>
      ),
    },
    {
      title: 'Fleet Telemetry & OTA Sync',
      description:
        'Monitor thermal dissipation, bus health, and power budgets remotely with cryptographic secure boot and seamless OTA firmware updates.',
      icon: (
        <svg className="w-5 h-5 text-[#181B15]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  return (
    <section id="capabilities" className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto scroll-mt-20">
      {/* Category Eyebrow */}
      <div className="mb-2">
        <span className="text-xs font-mono font-medium text-[#55623B] tracking-wider uppercase">
          Capabilities
        </span>
      </div>

      {/* Main Headline */}
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#181B15] tracking-tight">
        We’ve cracked the code.
      </h2>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-[#4A4E44] max-w-2xl mt-2.5 mb-8 md:mb-10 font-normal">
        Bashix delivers turnkey physical industrial IoT hardware, edge compute units, and precision telemetry.
      </p>

      {/* 4-Column Feature Grid with Top Hairline Borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {capabilities.map((item) => (
          <div
            key={item.title}
            className="pt-6 border-t border-[#E2E6DC] flex flex-col justify-between group hover:border-[#181B15] transition-colors"
          >
            <div>
              <div className="mb-5 p-2 w-fit rounded-lg bg-[#EEF2E8] text-[#181B15] group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-medium text-[#181B15] mb-2.5 tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-[#4A4E44] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
