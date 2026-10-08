import React from 'react';

export default function Hero() {
  return (
    <section className="pt-16 sm:pt-20 md:pt-24 pb-8 md:pb-12 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto">
      {/* Editorial Headline */}
      <div className="text-center mb-3 md:mb-5">
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-[#181B15] leading-[1.05]">
          Browse everything.
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[#4A4E44] max-w-2xl mx-auto mt-2.5 font-normal">
          Engineering mission-critical industrial IoT hardware, edge compute nodes, and distributed telemetry platforms.
        </p>
      </div>

      {/* Hero Display: Pure Image as Specified (No Complex Inner Component) */}
      <div className="w-full mx-auto my-3 md:my-5">
        <img
          src="/images/area/hero-device.png"
          alt="Bashix industrial edge telemetry and overview dashboard"
          className="w-full h-auto rounded-3xl md:rounded-[2.75rem] shadow-sm select-none border border-[#CBD5BC]"
          loading="eager"
        />
      </div>

      {/* "Trusted by:" Industrial Partners Logo Strip */}
      <div className="mt-8 md:mt-12 pt-6 border-t border-[#E2E6DC]">
        <p className="text-xs font-mono font-medium text-[#757B6E] tracking-wider uppercase mb-5">
          Trusted by Industrial Leaders:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-85">
          {/* Logo 1 - Symmetrical loop */}
          <div className="h-7 text-[#181B15] hover:opacity-100 transition-opacity" title="Robotics Core">
            <svg className="h-6 w-auto" viewBox="0 0 110 32" fill="currentColor">
              <path d="M12 4C7.58 4 4 7.58 4 12c0 4.42 3.58 8 8 8h12c2.21 0 4-1.79 4-4s-1.79-4-4-4H12c-2.21 0-4-1.79-4-4s1.79-4 4-4h16c2.21 0 4-1.79 4-4s-1.79-4-4-4H12zm16 8c4.42 0 8-3.58 8-8s-3.58-8-8-8H16c-2.21 0-4 1.79-4 4s1.79 4 4 4h12c2.21 0 4 1.79 4 4s-1.79 4-4 4H16c-2.21 0-4 1.79-4 4s1.79 4 4 4h12z" />
            </svg>
          </div>

          {/* Logo 2 - Logoipsum Shield */}
          <div className="flex items-center gap-2 text-[#181B15] hover:opacity-100 transition-opacity" title="Industrial Automation">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 3.5c1.93 0 3.5 1.57 3.5 3.5S13.93 12.5 12 12.5 8.5 10.93 8.5 9 10.07 5.5 12 5.5z" />
            </svg>
            <span className="font-semibold text-sm tracking-tight font-mono">AUTOTECH</span>
          </div>

          {/* Logo 3 - Four Petals Hub */}
          <div className="h-7 text-[#181B15] hover:opacity-100 transition-opacity" title="Grid Telemetry">
            <svg className="h-6 w-auto" viewBox="0 0 32 32" fill="currentColor">
              <circle cx="16" cy="8" r="5" />
              <circle cx="16" cy="24" r="5" />
              <circle cx="8" cy="16" r="5" />
              <circle cx="24" cy="16" r="5" />
            </svg>
          </div>

          {/* Logo 4 - Geometric Logoipsum */}
          <div className="flex items-center gap-1.5 text-[#181B15] hover:opacity-100 transition-opacity" title="Sensor Array">
            <span className="font-display font-medium text-lg tracking-tight">KINETIC</span>
          </div>

          {/* Logo 5 - Serif LOGOIPSUM */}
          <div className="text-[#181B15] hover:opacity-100 transition-opacity" title="Deep Telemetry">
            <span className="font-serif italic text-base tracking-widest uppercase">TELEMETRY</span>
          </div>

          {/* Logo 6 - Oval Badge logoipsum */}
          <div className="bg-[#181B15] text-[#FAFAF8] px-3.5 py-1 rounded-full text-xs font-mono font-medium tracking-tight" title="System Nodes">
            SYSTEMS LAB
          </div>
        </div>
      </div>
    </section>
  );
}
