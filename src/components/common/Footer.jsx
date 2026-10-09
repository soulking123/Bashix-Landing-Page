import React from 'react';
import { useStore } from '../../context/StoreContext';

export default function Footer() {
  const { siteConfig } = useStore();

  const primaryNavLinks = [
    { label: 'Capabilities', href: '#services' },
    { label: 'Hardware Catalog', href: '#hardware' },
    { label: 'The Engine', href: '#engine' },
    { label: 'Methodology', href: '#methodology' },
    { label: 'Case Studies', href: '#cases' },
    { label: 'Specifications', href: '#specifications' },
    { label: 'Scope Estimator', href: '#estimator' },
  ];

  const techStackTags = [
    'Rust',
    'Go',
    'eBPF',
    'TSN GbE',
    'CAN-FD',
    'Linux RTOS',
    'RISC-V',
    'Modbus RTU'
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Supply', href: '#' },
    { label: 'Security & Compliance', href: '#' },
    { label: 'Hardware Warranty', href: '#' },
  ];

  const email = siteConfig?.contact_email || 'engineering@bashix.id';
  const phone = siteConfig?.contact_phone || '+62 21 8062 5590';

  return (
    <footer className="pt-12 md:pt-16 pb-10 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto border-t border-[#E2E6DC]">
      {/* Top Row: Operational Status Beacon & Contact Hotline */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#ECEFE8]">
        {/* Operational Status Beacon */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E2E6DC] shadow-xs">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#55623B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#364121]"></span>
          </span>
          <span className="text-xs font-mono font-medium text-[#181B15]">
            All Systems Operational
          </span>
          <span className="text-[10px] font-mono text-[#55623B] border-l border-[#E2E6DC] pl-2">
            Global Telemetry 99.999%
          </span>
        </div>

        {/* Contact Hotline & Support Email */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#4A4E44]">
          <a
            href={`mailto:${email}`}
            className="hover:text-[#181B15] transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{email}</span>
          </a>

          <span className="text-[#E2E6DC] hidden sm:inline">&bull;</span>

          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{phone}</span>
          </span>
        </div>
      </div>

      {/* Grid: Navigation, Tech Stack, Legal */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        {/* Brand Column (Col 4) */}
        <div className="md:col-span-4 space-y-3">
          <span className="font-display text-2xl font-medium tracking-tight text-[#181B15]">
            Bashix
          </span>
          <p className="text-xs text-[#4A4E44] leading-relaxed max-w-sm">
            High-reliability distributed engineering platforms, industrial IoT telemetry hubs, and edge compute accelerators. Designed and manufactured for extreme industrial uptime.
          </p>

          {/* Core Tech Stack Chips */}
          <div className="pt-2">
            <div className="text-[10px] font-mono uppercase text-[#757B6E] tracking-wider mb-2">
              Engineering Architecture Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {techStackTags.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md bg-[#FAFAF8] border border-[#E2E6DC] text-[10px] font-mono text-[#364121]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Columns (Col 5) */}
        <div className="md:col-span-5 space-y-3">
          <div className="text-xs font-mono uppercase text-[#55623B] font-semibold tracking-wider">
            Platform Navigation
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {primaryNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#4A4E44] hover:text-[#181B15] transition-colors py-0.5"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Governance & Links (Col 3) */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-xs font-mono uppercase text-[#55623B] font-semibold tracking-wider">
            Governance & Legal
          </div>
          <div className="flex flex-col gap-1.5 text-xs">
            {legalLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[#4A4E44] hover:text-[#181B15] transition-colors py-0.5"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#admin"
              className="text-[#364121] hover:underline font-mono text-xs pt-1 inline-flex items-center gap-1"
              title="Access Admin Management Portal"
            >
              <span>Operator Console</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Identity Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#ECEFE8] text-xs font-mono text-[#757B6E]">
        <div className="flex items-center gap-3">
          {/* Engineering Human Glyph */}
          <svg
            className="w-4 h-7 text-[#181B15]"
            viewBox="0 0 20 36"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="10" cy="5" r="2.5" fill="currentColor" stroke="none" />
            <line x1="10" y1="8" x2="10" y2="20" />
            <line x1="4" y1="13" x2="10" y2="10" />
            <line x1="10" y1="10" x2="16" y2="13" />
            <line x1="10" y1="20" x2="5" y2="33" />
            <line x1="10" y1="20" x2="15" y2="33" />
          </svg>

          <span>&copy; {new Date().getFullYear()} Bashix Engineering Platform. All Rights Reserved.</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <a
            href="https://github.com/soulking123/Bashix-Landing-Page"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#181B15] transition-colors"
          >
            GitHub Repository
          </a>
          <span>&bull;</span>
          <span>ISO 9001 Quality Assured</span>
          <span>&bull;</span>
          <span>CE / FCC Industrial</span>
        </div>
      </div>
    </footer>
  );
}
