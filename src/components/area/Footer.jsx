import React from 'react';

export default function Footer() {
  const footerLinks = [
    { label: 'Capabilities', href: '#services' },
    { label: 'Hardware', href: '#hardware' },
    { label: 'Specifications', href: '#specifications' },
    { label: 'Architecture', href: '#engine' },
    { label: 'Methodology', href: '#methodology' },
    { label: 'Case Studies', href: '#cases' },
  ];

  return (
    <footer className="pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto border-t border-[#E2E6DC]">
      {/* Top Links Row */}
      <div className="flex flex-wrap items-center gap-6 md:gap-8 mb-8 md:mb-10">
        {footerLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm font-medium text-[#181B15] hover:text-[#55623B] transition-colors focus-visible:ring-2 focus-visible:ring-[#364121] rounded-xs"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Bottom Legal & Identity Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#ECEFE8]">
        {/* Left: Minimal Human Logo Mark & Copyright */}
        <div className="flex items-center gap-4 text-xs font-mono text-[#55623B]">
          {/* Minimal Area Human / Engineering Glyph */}
          <svg
            className="w-5 h-8 text-[#181B15]"
            viewBox="0 0 20 36"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* Head */}
            <circle cx="10" cy="5" r="2.5" fill="currentColor" stroke="none" />
            {/* Body Spine */}
            <line x1="10" y1="8" x2="10" y2="20" />
            {/* Arms */}
            <line x1="4" y1="13" x2="10" y2="10" />
            <line x1="10" y1="10" x2="16" y2="13" />
            {/* Left Leg */}
            <line x1="10" y1="20" x2="5" y2="33" />
            {/* Right Leg */}
            <line x1="10" y1="20" x2="15" y2="33" />
          </svg>

          <span>&copy; Bashix Engineering. 2025</span>
        </div>

        {/* Right: Console Access & Rights Reserved */}
        <div className="flex items-center gap-4 text-xs font-mono text-[#55623B]">
          <a
            href="#admin"
            className="hover:text-[#181B15] transition-colors underline-offset-4 hover:underline"
            title="Administrator Management Console"
          >
            Admin Console
          </a>
          <span className="text-[#ECEFE8]">&bull;</span>
          <span className="tracking-wider uppercase">
            All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
