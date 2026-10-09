import React, { useState, useMemo } from 'react';

const domains = [
  {
    id: 'iot-edge',
    name: 'Industrial IoT & Gateways',
    baseFee: 35000000,
    basePerUnit: 2850000,
    weeksToProto: '4 - 6 Weeks',
    desc: 'DIN-rail modular gateways, isolated RS-485/CAN-FD, deterministic telemetry pipelines.',
  },
  {
    id: 'dist-mesh',
    name: 'Distributed Systems & Mesh',
    baseFee: 50000000,
    basePerUnit: 3450000,
    weeksToProto: '5 - 7 Weeks',
    desc: 'Raft consensus clusters, kernel bypass eBPF routing, multi-region synchronization.',
  },
  {
    id: 'edge-ai',
    name: 'Edge AI & Neural Inference',
    baseFee: 65000000,
    basePerUnit: 4800000,
    weeksToProto: '6 - 8 Weeks',
    desc: 'Quantized INT8 on-device NPU pipelines, microsecond vibration FFT, vision inspection.',
  },
  {
    id: 'custom-hardware',
    name: 'Custom PCB & Firmware',
    baseFee: 55000000,
    basePerUnit: 3200000,
    weeksToProto: '6 - 9 Weeks',
    desc: 'High-density multi-layer electronics, RTOS board support packages, CE/FCC pre-compliance.',
  },
];

const hardeningLevels = [
  { id: 'standard', name: 'Standard Factory', multiplier: 1.0, temp: '-20°C to +70°C, 35mm DIN rail' },
  { id: 'rugged', name: 'Severe Industrial', multiplier: 1.35, temp: '-40°C to +85°C, 2.5kV optical isolation' },
  { id: 'hazardous', name: 'Hazardous Class 1 Div 2', multiplier: 1.75, temp: 'Explosion-proof enclosure, redundant rails' },
];

const throughputTiers = [
  { id: 'standard', name: 'Standard (1,000 msg/s)', cost: 0 },
  { id: 'high', name: 'High Velocity (10,000 msg/s)', cost: 12000000 },
  { id: 'ultra', name: 'Ultra High (50,000+ msg/s io_uring)', cost: 28000000 },
];

const slaTiers = [
  { id: 'standard', name: 'Standard 8x5 Engineering Support', cost: 0 },
  { id: 'critical', name: '24/7 Mission-Critical 99.999% SLA', cost: 18000000 },
];

export default function Estimator({ onBookConsultation }) {
  const [selectedDomain, setSelectedDomain] = useState('iot-edge');
  const [nodeCount, setNodeCount] = useState(25);
  const [hardening, setHardening] = useState('rugged');
  const [throughput, setThroughput] = useState('high');
  const [sla, setSla] = useState('standard');

  const domainObj = domains.find((d) => d.id === selectedDomain) || domains[0];
  const hardeningObj = hardeningLevels.find((h) => h.id === hardening) || hardeningLevels[1];
  const throughputObj = throughputTiers.find((t) => t.id === throughput) || throughputTiers[1];
  const slaObj = slaTiers.find((s) => s.id === sla) || slaTiers[0];

  const calculation = useMemo(() => {
    const baseEngineering = domainObj.baseFee;
    const unitHardwareCost = Math.round(domainObj.basePerUnit * hardeningObj.multiplier);
    const totalHardware = unitHardwareCost * nodeCount;
    const throughputCost = throughputObj.cost;
    const slaCost = slaObj.cost;
    const totalEstimate = baseEngineering + totalHardware + throughputCost + slaCost;

    return {
      baseEngineering,
      unitHardwareCost,
      totalHardware,
      throughputCost,
      slaCost,
      totalEstimate,
    };
  }, [domainObj, hardeningObj, throughputObj, slaObj, nodeCount]);

  const formatIDR = (num) => {
    return 'Rp ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleLaunchConsultation = () => {
    const summary = {
      domain: domainObj.name,
      nodeCount,
      hardening: hardeningObj.name,
      throughput: throughputObj.name,
      sla: slaObj.name,
      estimatedBudget: formatIDR(calculation.totalEstimate),
      timeline: domainObj.weeksToProto,
    };
    if (onBookConsultation) {
      onBookConsultation(summary);
    }
  };

  return (
    <section
      id="estimator"
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto scroll-mt-20"
    >
      {/* Category Eyebrow */}
      <div className="mb-2">
        <span className="text-xs font-mono font-medium text-[#55623B] tracking-wider uppercase">
          Scope & Budget Estimator
        </span>
      </div>

      {/* Main Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12">
        <div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#181B15] tracking-tight">
            Calculate Deployment Scope.
          </h2>
          <p className="text-base sm:text-lg text-[#4A4E44] max-w-2xl mt-3 font-normal leading-relaxed">
            Configure target hardware scale, electrical hardening grade, and telemetry volume for an instant transparent engineering budget.
          </p>
        </div>
        <div className="text-xs font-mono text-[#757B6E] shrink-0">
          <span>Fixed-Price Milestone Guarantees</span>
        </div>
      </div>

      {/* Estimator Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Controls (7 Columns) */}
        <div className="lg:col-span-7 bg-[#FFFFFF] rounded-2xl md:rounded-3xl border border-[#E2E6DC] p-6 sm:p-8 shadow-xs space-y-6 sm:space-y-8">
          {/* Step 1: Target Domain */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#55623B] font-medium mb-3">
              1. Engineering Domain
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {domains.map((dom) => {
                const isSelected = dom.id === selectedDomain;
                return (
                  <button
                    key={dom.id}
                    type="button"
                    onClick={() => setSelectedDomain(dom.id)}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#364121] bg-[#F4F7EE] ring-1 ring-[#364121]'
                        : 'border-[#E2E6DC] bg-[#FAFAF8] hover:border-[#181B15]/40'
                    }`}
                  >
                    <div className="font-medium text-sm text-[#181B15] mb-1">
                      {dom.name}
                    </div>
                    <div className="text-xs text-[#4A4E44] line-clamp-2">
                      {dom.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Node Scale Slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="node-slider" className="text-xs font-mono uppercase tracking-wider text-[#55623B] font-medium">
                2. Target Node Volume
              </label>
              <span className="font-mono text-sm font-semibold text-[#181B15] bg-[#EEF2E8] px-3 py-1 rounded-full">
                {nodeCount} Hardware Units
              </span>
            </div>
            <input
              id="node-slider"
              type="range"
              min="5"
              max="250"
              step="5"
              value={nodeCount}
              onChange={(e) => setNodeCount(Number(e.target.value))}
              className="w-full accent-[#364121] cursor-pointer"
            />
            <div className="flex justify-between text-xs font-mono text-[#757B6E] mt-1.5">
              <span>5 Units (Pilot)</span>
              <span>100 Units (Facility)</span>
              <span>250 Units (Fleet)</span>
            </div>
          </div>

          {/* Step 3: Hardening Level */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#55623B] font-medium mb-3">
              3. Electrical & Environmental Hardening
            </label>
            <div className="space-y-2.5">
              {hardeningLevels.map((lvl) => {
                const isSelected = lvl.id === hardening;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setHardening(lvl.id)}
                    className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#364121] bg-[#F4F7EE] ring-1 ring-[#364121]'
                        : 'border-[#E2E6DC] bg-[#FAFAF8] hover:border-[#181B15]/40'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-sm text-[#181B15]">
                        {lvl.name}
                      </div>
                      <div className="text-xs font-mono text-[#757B6E]">
                        {lvl.temp}
                      </div>
                    </div>
                    <span className="text-xs font-mono font-medium text-[#55623B]">
                      {lvl.multiplier === 1.0 ? 'Base Spec' : `+${Math.round((lvl.multiplier - 1) * 100)}%`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Telemetry Throughput & SLA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#55623B] font-medium mb-2">
                4. Ingestion Throughput
              </label>
              <select
                value={throughput}
                onChange={(e) => setThroughput(e.target.value)}
                className="w-full text-xs font-mono p-3 rounded-xl border border-[#E2E6DC] bg-[#FAFAF8] text-[#181B15] focus:outline-none focus:ring-1 focus:ring-[#364121]"
              >
                {throughputTiers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#55623B] font-medium mb-2">
                5. SLA & Support Tier
              </label>
              <select
                value={sla}
                onChange={(e) => setSla(e.target.value)}
                className="w-full text-xs font-mono p-3 rounded-xl border border-[#E2E6DC] bg-[#FAFAF8] text-[#181B15] focus:outline-none focus:ring-1 focus:ring-[#364121]"
              >
                {slaTiers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Output Summary Card (5 Columns) */}
        <div className="lg:col-span-5 bg-[#FFFFFF] rounded-2xl md:rounded-3xl border border-[#E2E6DC] p-6 sm:p-8 shadow-sm flex flex-col justify-between sticky top-28">
          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#ECEFE8]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#55623B] font-medium">
                Scope Summary
              </span>
              <span className="text-xs font-mono text-[#757B6E]">
                IDR Standard Pricing
              </span>
            </div>

            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#757B6E] block mb-1">
                Estimated Project Total
              </span>
              <div className="font-mono text-3xl sm:text-4xl font-bold text-[#181B15] tracking-tight">
                {formatIDR(calculation.totalEstimate)}
              </div>
              <p className="text-xs font-mono text-[#55623B] mt-1.5">
                Includes all engineering milestones and volume hardware assembly.
              </p>
            </div>

            {/* Line Items Breakdown */}
            <div className="space-y-3 py-4 border-y border-[#ECEFE8] text-xs font-mono">
              <div className="flex justify-between items-center text-[#4A4E44]">
                <span>Base Engineering & Bring-up:</span>
                <span className="text-[#181B15] font-medium">{formatIDR(calculation.baseEngineering)}</span>
              </div>
              <div className="flex justify-between items-center text-[#4A4E44]">
                <span>Hardware Units ({nodeCount} × {formatIDR(calculation.unitHardwareCost)}):</span>
                <span className="text-[#181B15] font-medium">{formatIDR(calculation.totalHardware)}</span>
              </div>
              {calculation.throughputCost > 0 && (
                <div className="flex justify-between items-center text-[#4A4E44]">
                  <span>Kernel Bypass Infrastructure:</span>
                  <span className="text-[#181B15] font-medium">{formatIDR(calculation.throughputCost)}</span>
                </div>
              )}
              {calculation.slaCost > 0 && (
                <div className="flex justify-between items-center text-[#4A4E44]">
                  <span>24/7 Mission-Critical SLA:</span>
                  <span className="text-[#181B15] font-medium">{formatIDR(calculation.slaCost)}</span>
                </div>
              )}
            </div>

            {/* Delivery Timeline Pill */}
            <div className="my-6 p-4 rounded-xl bg-[#FAFAF8] border border-[#E2E6DC] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#757B6E] block">
                  Prototype Delivery Window
                </span>
                <span className="font-medium text-sm text-[#181B15]">
                  {domainObj.weeksToProto}
                </span>
              </div>
              <span className="text-xs font-mono text-[#364121] bg-[#EEF2E8] px-2.5 py-1 rounded-md font-medium">
                Milestone Guaranteed
              </span>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleLaunchConsultation}
              className="btn-primary-pill w-full justify-center text-sm cursor-pointer py-3.5"
            >
              <span>Consult Engineering on this Scope</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <p className="text-[11px] font-mono text-center text-[#757B6E] mt-3">
              Zero obligation. Complete NDA signed before schematic exchange.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
