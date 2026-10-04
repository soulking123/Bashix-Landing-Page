import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export default function Hero() {
  const { setActiveView } = useStore();
  const [copied, setCopied] = useState(false);

  const commandText = 'curl -sSL https://bashix.id/init | sh';

  const handleCopy = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between items-center text-center px-4 sm:px-6 lg:px-8 pt-32 pb-12 overflow-hidden">
      {/* Cinematic Full-Bleed Engineering Artwork */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/bashix-hero.jpg"
          alt="Bashix Industrial Telemetry Installation at Dusk"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
        />
        {/* Soft atmospheric vignette gradients for seamless integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-bg-main"></div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60"></div>
      </div>

      {/* Spacer for top balance */}
      <div className="w-full"></div>

      {/* Main Centered Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Authoritative Main Headline */}
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6 drop-shadow-md">
          Industrial hardware for mission-critical systems
        </h1>

        {/* Crisp Subheadline */}
        <p className="text-white/85 text-base sm:text-xl font-sans leading-relaxed max-w-2xl mb-10 drop-shadow">
          A physical computing platform engineered across edge gateways, telemetry, and neural acceleration. Rugged silicon, verifiable specs, and zero generic slop.
        </p>

        {/* Frosted Command Pill (Exact reference aesthetic) */}
        <div className="frosted-pill inline-flex items-center gap-4 px-6 py-3.5 rounded-full text-xs sm:text-sm font-mono text-white transition-all mb-8 shadow-2xl">
          <span className="font-medium tracking-wide select-all text-white/95">
            {commandText}
          </span>
          <button
            onClick={handleCopy}
            className="p-1 rounded text-white/60 hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-accent-amber"
            title="Copy Quickstart Command"
            aria-label="Copy Command"
          >
            {copied ? (
              <span className="text-accent-emerald font-bold text-xs">✓ Copied</span>
            ) : (
              <svg className="w-4 h-4 text-white/80 hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>

        {/* Quick Anchor Link to Hardware Catalog */}
        <a
          href="#catalog"
          className="text-xs font-mono text-white/70 hover:text-white transition-colors flex items-center gap-1.5 underline decoration-white/30 underline-offset-4 hover:decoration-white"
        >
          <span>Explore physical hardware units</span>
          <span>↓</span>
        </a>
      </div>

      {/* Bottom Grounded Philosophical Caption (Matching reference) */}
      <div className="relative z-10 w-full pt-8 text-center">
        <p className="text-xs sm:text-sm font-sans text-white/60 drop-shadow">
          Hardware is assembled and verified in Jakarta. Real silicon, real telemetry, and zero generic slop.
        </p>
      </div>
    </section>
  );
}
