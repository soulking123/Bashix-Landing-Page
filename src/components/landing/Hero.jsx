import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export default function Hero() {
  const { siteConfig, setActiveView } = useStore();
  const [activePort, setActivePort] = useState('eth');

  const portDetails = {
    eth: {
      title: 'Dual Gigabit Ethernet with TSN',
      spec: '2x RJ45 10/100/1000BASE-T',
      features: [
        'Hardware IEEE 802.1Qbv Time-Sensitive Networking',
        'Independent MAC controllers on dedicated PCIe lanes',
        'Integrated 1.5kV magnetic isolation',
        'eBPF packet filtering support in kernel space'
      ],
      connector: 'Shielded RJ45 8P8C'
    },
    rs485: {
      title: 'Optically Isolated RS-485 / Modbus',
      spec: '3-Pin Pluggable Screw Terminal',
      features: [
        '2.5kV RMS galvanic isolation barrier',
        'Modbus RTU master/slave baud rates up to 115.2 kbps',
        'Built-in 15kV ESD surge protection',
        'Switchable 120 Ohm bi-directional termination resistor'
      ],
      connector: 'Phoenix Contact 3.81mm Pitch'
    },
    can: {
      title: 'Dual CAN-FD Telemetry Interface',
      spec: '2-Channel ISO 11898-1:2015',
      features: [
        'Arbitration phase up to 1 Mbps, data phase up to 8 Mbps',
        'Sub-microsecond hardware message timestamping',
        'Native Linux SocketCAN kernel driver integration',
        'Short-circuit to battery protection on CAN_H / CAN_L'
      ],
      connector: 'Terminal Block & DB9 Diagnostic Header'
    },
    power: {
      title: 'Wide-Range Industrial Power Supply',
      spec: '9V to 36V DC Input Range',
      features: [
        'Reverse polarity and overvoltage clamp protection',
        'Integrated hardware watchdog timer with reset latch',
        'Operating temperature: -40 deg C to +85 deg C',
        'Standard 35mm DIN rail mounting enclosure (EN 50022)'
      ],
      connector: '2-Pin 5.08mm High-Current Screw Terminal'
    }
  };

  const selected = portDetails[activePort];

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 border-b border-border-subtle relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Clear Value Proposition */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="text-xs font-mono uppercase tracking-wider text-accent-amber font-semibold mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-amber"></span>
              Jakarta, Indonesia // Hardware Engineering
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.15] mb-6">
              Industrial IoT Hardware and Embedded Computing Systems
            </h1>

            <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              We design, assemble, and support ruggedized edge compute gateways, environmental telemetry nodes, and neural acceleration hardware. Built for factory automation, energy grids, and field telemetry.
            </p>

            {/* Direct Functional Actions */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#catalog"
                onClick={() => setActiveView('landing')}
                className="px-6 py-3 rounded text-sm font-semibold bg-text-primary text-bg-main hover:bg-accent-steel transition-colors focus-visible:ring-2 focus-visible:ring-accent-amber shadow-sm"
              >
                Browse Hardware Catalog
              </a>

              <a
                href="#schematic"
                onClick={() => setActiveView('landing')}
                className="px-6 py-3 rounded text-sm font-semibold bg-bg-card border border-border-subtle text-text-primary hover:border-text-secondary hover:bg-bg-card-hover transition-colors focus-visible:ring-2 focus-visible:ring-accent-amber"
              >
                View Interface Architecture
              </a>
            </div>

            {/* Hardware Delivery Notice */}
            <div className="mt-8 pt-6 border-t border-border-subtle/80 w-full flex items-center gap-4 text-xs font-mono text-text-muted">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-emerald"></span>
                Units in stock for dispatch
              </span>
              <span>•</span>
              <span>Direct B2B invoicing available</span>
            </div>
          </div>

          {/* Right Column: Interactive Hardware Interface Inspector */}
          <div id="schematic" className="lg:col-span-6 w-full">
            <div className="industrial-card p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle">
                <div className="flex items-center gap-2 font-mono text-xs text-text-primary">
                  <span className="font-bold text-accent-amber">MODEL:</span>
                  <span>BX-GW-02 // EdgeCore v2</span>
                </div>
                <div className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-main border border-border-subtle text-text-muted">
                  Interactive Pinout Viewer
                </div>
              </div>

              {/* Interface Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                <button
                  onClick={() => setActivePort('eth')}
                  className={`px-3 py-2 rounded text-xs font-mono text-left transition-colors border ${
                    activePort === 'eth'
                      ? 'bg-bg-main text-text-primary border-accent-amber font-bold'
                      : 'bg-bg-card text-text-secondary border-border-subtle hover:text-text-primary'
                  }`}
                >
                  Dual GbE TSN
                </button>
                <button
                  onClick={() => setActivePort('rs485')}
                  className={`px-3 py-2 rounded text-xs font-mono text-left transition-colors border ${
                    activePort === 'rs485'
                      ? 'bg-bg-main text-text-primary border-accent-amber font-bold'
                      : 'bg-bg-card text-text-secondary border-border-subtle hover:text-text-primary'
                  }`}
                >
                  Isolated RS-485
                </button>
                <button
                  onClick={() => setActivePort('can')}
                  className={`px-3 py-2 rounded text-xs font-mono text-left transition-colors border ${
                    activePort === 'can'
                      ? 'bg-bg-main text-text-primary border-accent-amber font-bold'
                      : 'bg-bg-card text-text-secondary border-border-subtle hover:text-text-primary'
                  }`}
                >
                  Dual CAN-FD
                </button>
                <button
                  onClick={() => setActivePort('power')}
                  className={`px-3 py-2 rounded text-xs font-mono text-left transition-colors border ${
                    activePort === 'power'
                      ? 'bg-bg-main text-text-primary border-accent-amber font-bold'
                      : 'bg-bg-card text-text-secondary border-border-subtle hover:text-text-primary'
                  }`}
                >
                  9-36V DC Power
                </button>
              </div>

              {/* Selected Port Specifications Display */}
              <div className="bg-bg-main p-5 rounded border border-border-subtle">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-bold text-base text-text-primary">
                    {selected.title}
                  </h3>
                  <span className="text-[11px] font-mono text-accent-amber">
                    {selected.spec}
                  </span>
                </div>

                <div className="text-xs font-mono text-text-muted mb-4">
                  Connector type: {selected.connector}
                </div>

                <div className="space-y-2">
                  {selected.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-mono text-text-secondary">
                      <span className="text-accent-amber font-bold">›</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Physical Enclosure Metrics */}
              <div className="mt-4 pt-4 border-t border-border-subtle grid grid-cols-3 gap-2 text-[11px] font-mono text-text-muted">
                <div>
                  <span className="block text-text-primary font-semibold">Dimensions:</span>
                  142 x 98 x 42 mm
                </div>
                <div>
                  <span className="block text-text-primary font-semibold">Enclosure:</span>
                  Anodized Aluminum
                </div>
                <div>
                  <span className="block text-text-primary font-semibold">Mounting:</span>
                  DIN Rail 35mm
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
