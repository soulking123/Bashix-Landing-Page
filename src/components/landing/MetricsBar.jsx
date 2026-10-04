import React from 'react';

export default function MetricsBar() {
  const hardwareSpecs = [
    {
      title: 'Operating Temperature',
      value: '-40°C to +85°C',
      detail: 'Industrial grade fanless passive thermal dissipation'
    },
    {
      title: 'Supply Voltage',
      value: '9V to 36V DC',
      detail: 'Wide-tolerance input with reverse polarity protection'
    },
    {
      title: 'Enclosure Standard',
      value: 'DIN Rail 35mm',
      detail: 'EN 50022 standard anodized aluminum chassis'
    },
    {
      title: 'Compute Architecture',
      value: '64-bit Quad RISC-V',
      detail: '1.8 GHz with dedicated hardware watchdog timer'
    }
  ];

  const supportedProtocols = [
    'Modbus RTU / TCP',
    'CAN 2.0B & CAN-FD',
    'MQTT / Sparkplug B',
    'Linux SocketCAN',
    'LoRaWAN 868 / 915 MHz',
    'IEEE 802.1Qbv TSN'
  ];

  return (
    <section id="specs" className="py-14 bg-bg-main border-b border-border-subtle relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Hardware Electrical & Environmental Ratings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {hardwareSpecs.map((spec) => (
            <div
              key={spec.title}
              className="p-5 rounded-xl bg-slate-50 border border-border-subtle flex flex-col justify-between hover:border-slate-300 hover:bg-white shadow-xs hover:shadow-sm transition-all"
            >
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-medium">
                  {spec.title}
                </span>
                <div className="font-mono font-bold text-xl sm:text-2xl text-text-primary mt-1.5 mb-1.5">
                  {spec.value}
                </div>
              </div>
              <p className="text-xs text-text-secondary leading-normal">
                {spec.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Verified Protocols Row */}
        <div className="pt-6 border-t border-border-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-xs font-mono text-text-muted flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-amber"></span>
            <span className="font-semibold">SUPPORTED INDUSTRIAL PROTOCOLS:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {supportedProtocols.map((protocol) => (
              <span
                key={protocol}
                className="px-2.5 py-1 rounded-md bg-white border border-border-subtle text-xs font-mono text-text-secondary hover:text-text-primary hover:border-slate-400 transition-colors shadow-2xs"
              >
                {protocol}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
