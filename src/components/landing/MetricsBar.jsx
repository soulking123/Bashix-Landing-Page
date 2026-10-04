import React, { useEffect, useState, useRef } from 'react';

export default function MetricsBar() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const metrics = [
    { value: '99.999%', label: 'Mission-Critical SLA Target', sub: 'Zero unplanned downtime' },
    { value: '< 4.8ms', label: 'P99 Edge Latency', sub: 'Sub-millisecond jitter' },
    { value: '12,400+', label: 'Hardware Units Deployed', sub: 'Field-tested worldwide' },
    { value: '10M+', label: 'Daily Telemetry Packets', sub: 'Real-time telemetry stream' }
  ];

  const ecosystemPartners = [
    { name: 'RISC-V Alliance', tag: 'Native Silicon' },
    { name: 'Linux Foundation', tag: 'PREEMPT_RT' },
    { name: 'eBPF Project', tag: 'Zero-Copy Filter' },
    { name: 'LoRaWAN Member', tag: 'Sub-GHz Mesh' },
    { name: 'PCI-SIG', tag: 'Deterministic PCIe' },
    { name: 'ISO 26262', tag: 'Automotive Ready' }
  ];

  return (
    <section ref={containerRef} className="py-12 border-y border-white/10 bg-bg-card/40 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Real-time Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {metrics.map((item, index) => (
            <div
              key={item.label}
              className={`flex flex-col items-center sm:items-start text-center sm:text-left transition-all duration-700 ${
                hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-1 text-gradient-cyan">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-text-primary tracking-wide">
                {item.label}
              </div>
              <div className="text-[11px] font-mono text-text-muted mt-0.5">
                {item.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Standards & Technical Ecosystem Ticker */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted shrink-0">
            <span className="w-2 h-2 rounded-full bg-accent-cyan"></span>
            <span>ENGINEERED TO INDUSTRY SPECIFICATIONS</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {ecosystemPartners.map((partner) => (
              <div
                key={partner.name}
                className="px-3 py-1.5 rounded-lg bg-bg-card/80 border border-white/10 text-xs font-mono text-text-secondary hover:text-white hover:border-accent-cyan/40 hover:bg-bg-card transition-all flex items-center gap-2 group cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-text-muted group-hover:bg-accent-cyan transition-colors"></span>
                <span className="font-semibold text-text-primary">{partner.name}</span>
                <span className="text-[10px] text-text-muted">({partner.tag})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
