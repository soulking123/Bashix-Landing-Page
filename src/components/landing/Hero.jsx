import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export default function Hero() {
  const { siteConfig, setActiveView } = useStore();
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText('curl -sSL https://bashix.id/init.sh | sh');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden flex flex-col items-center justify-center">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent-cyan/15 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-accent-violet/15 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Eyebrow Announcement Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-bg-card/80 border border-accent-cyan/30 text-xs font-mono text-text-secondary mb-8 shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:border-accent-cyan/60 transition-all cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
          </span>
          <span className="text-white font-medium">{siteConfig.hero_badge}</span>
          <span className="text-accent-cyan font-bold">→</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          Hard Engineering. <br />
          <span className="text-gradient-cyan">Scaled to Perfection.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-text-secondary text-base sm:text-xl max-w-2xl font-sans leading-relaxed mb-10 text-balance">
          {siteConfig.hero_subtitle}
        </p>

        {/* Dual Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto">
          <a
            href="#shop"
            onClick={() => setActiveView('landing')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-heading font-bold tracking-wide bg-gradient-to-r from-accent-cyan via-accent-cyan to-accent-violet text-bg-main hover:opacity-95 transition-all shadow-[0_0_30px_rgba(0,240,255,0.35)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)] transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>Order Hardware</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          <a
            href="#estimator"
            onClick={() => setActiveView('landing')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-heading font-semibold tracking-wide bg-bg-card/80 border border-white/15 text-white hover:border-accent-cyan/50 hover:bg-bg-card transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <span>Consult Engineering Team</span>
            <span className="text-text-muted">↗</span>
          </a>
        </div>

        {/* Interactive Hero Terminal / Architecture Diagnostic Preview */}
        <div className="w-full max-w-3xl glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-accent-cyan/30 transition-all text-left">
          {/* Terminal Window Header */}
          <div className="bg-bg-main/90 px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent-rose/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-accent-amber/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-accent-emerald/80 inline-block"></span>
              <span className="ml-3 font-mono text-xs text-text-muted">bashix-telemetry-node // session active</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-accent-emerald/10 text-accent-emerald text-[11px] font-mono border border-accent-emerald/20">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse"></span>
                0.004ms JITTER
              </span>
              <button
                onClick={copyCommand}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[11px] font-mono text-text-secondary hover:text-white transition-colors flex items-center gap-1.5"
                title="Copy Quickstart Command"
              >
                <span>{copied ? 'Copied!' : 'Copy CLI'}</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 font-mono text-xs text-text-secondary space-y-2 bg-bg-card/50">
            <div className="flex items-center text-text-muted">
              <span className="text-accent-cyan mr-2 font-bold">$</span>
              <span className="text-white">bashix telemetry connect --node edgecore-02.infra.id</span>
            </div>
            <div className="text-accent-emerald pl-4">
              [OK] Authenticated via hardware TPM 2.0 • Ed25519 verified
            </div>
            <div className="text-text-muted pl-4">
              [KERNEL] Linux 6.8.0-rt (PREEMPT_RT) • Arch: RISC-V 64-bit • Cores: 4 @ 1.8GHz
            </div>
            <div className="text-text-muted pl-4 flex items-center gap-3">
              <span>[THROUGHPUT] 10,485,760 pkts/sec</span>
              <span className="text-accent-cyan">|</span>
              <span className="text-accent-cyan">eBPF Filter: Active (0 packet loss)</span>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-text-muted">
              <span>CAN-FD Bus: 8 Mbps Deterministic</span>
              <span>Memory: 1.4GB / 16GB LPDDR5</span>
              <span>Temp: 38.4°C (Fanless Passive)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
