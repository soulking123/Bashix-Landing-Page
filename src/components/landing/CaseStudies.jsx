import React, { useState } from 'react';

const caseStudiesData = [
  {
    id: 'port-crane-telemetry',
    category: 'Heavy Industry & Logistics',
    title: 'Container Terminal Gantry Telemetry',
    client: 'Maritime Port Authority Automation Terminal',
    metrics: [
      { label: 'Bus Throughput Gain', value: '+400%', subtext: 'via dual TSN SocketCAN' },
      { label: 'P99 Latency', value: '< 1.2ms', subtext: 'deterministic timing' },
      { label: 'Ground Loop Faults', value: '0 Faults', subtext: 'over 18 months exposure' },
    ],
    problem:
      'High-voltage motor inverters and 48V auxiliary crane drives generated massive electromagnetic interference (EMI) along gantry rails. Common-mode voltage differences caused frequent CAN bus frame dropouts, triggering emergency stops that delayed ship turnarounds.',
    solution:
      'Engineered and installed custom Bashix Edge Gateways equipped with 2.5kV galvanic optical isolation, dual IEEE 802.1Qbv TSN Gigabit Ethernet, and Linux SocketCAN kernel bypass pipelines within IP67 DIN-rail enclosures.',
    result:
      'Eliminated sensor dropouts across 24 container cranes. Bus throughput increased by 400%, maintaining deterministic sub-1.2ms telemetry packet delivery during maximum crane acceleration.',
    tags: ['2.5kV Optical Isolation', 'TSN GbE', 'CAN-FD', 'IP67 Enclosure'],
  },
  {
    id: 'offshore-wind-ai',
    category: 'Offshore Energy',
    title: 'Offshore Turbine Anomaly Classifier',
    client: 'North Sea Wind Array Operator',
    metrics: [
      { label: 'Trip Response Time', value: '< 4.2ms', subtext: 'versus 800ms satellite lag' },
      { label: 'Classification Precision', value: '99.42%', subtext: 'INT8 quantized model' },
      { label: 'Autonomous Uptime', value: '100%', subtext: 'zero cloud dependency' },
    ],
    problem:
      'Offshore wind turbines operate over satellite links with variable latencies between 600ms and 1200ms. High-frequency gearbox bearing vibrations required instantaneous trip commands to prevent mechanical destruction, which cloud-based algorithms could not deliver.',
    solution:
      'Deployed ruggedized Bashix edge inference compute modules running quantized INT8 convolutional neural networks directly inside turbine nacelles. Telemetry models analyze 24-bit analog vibration spectra in microsecond cycles.',
    result:
      'Autonomous shutdown triggers execute in under 4.2ms locally, preventing catastrophic bearing seizure events while transmitting compressed telemetry summaries over satellite uplinks.',
    tags: ['Edge Neural Inference', 'INT8 Quantization', 'Vibration FFT', 'Satellite Gateway'],
  },
  {
    id: 'rail-transit-telemetry',
    category: 'Rail & Transportation',
    title: 'High-Speed Rail Bogie Monitoring',
    client: 'Intercity Rail Transit Corporation',
    metrics: [
      { label: 'Shock Tolerance', value: '50G / 11ms', subtext: 'EN 50155 certified' },
      { label: 'Multi-Car Jitter', value: '< 10µs', subtext: 'PTP IEEE 1588 sync' },
      { label: 'Continuous Operating Hours', value: '12,400 hrs', subtext: 'zero hardware resets' },
    ],
    problem:
      'Commercial IoT gateways failed under violent track vibrations and sudden ambient temperature shifts (-30°C in mountain passes to +70°C in direct summer sun). Cracked solder joints and thermal throttling caused erratic wheel bearing telemetry.',
    solution:
      'Built monolithic CNC-milled anodized aluminum enclosures with direct conduction heatsink dissipation and conformal-coated multi-layer PCBs. Dual redundant power inputs accommodate 14.4V to 36V train battery fluctuations.',
    result:
      'Surpassed 12,400 continuous hours of operational testing across 16 trainsets without a single hardware reset, delivering synchronized bearing temperature telemetry across all passenger cars.',
    tags: ['EN 50155 Standards', 'PTP IEEE 1588', 'Passive Thermal Billet', 'Conformal Coated'],
  },
];

const categories = ['All Domains', 'Heavy Industry & Logistics', 'Offshore Energy', 'Rail & Transportation'];

export default function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState('All Domains');

  const filteredStudies =
    selectedCategory === 'All Domains'
      ? caseStudiesData
      : caseStudiesData.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="cases"
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto scroll-mt-20"
    >
      {/* Category Eyebrow */}
      <div className="mb-2">
        <span className="text-xs font-mono font-medium text-[#55623B] tracking-wider uppercase">
          Empirical Case Studies
        </span>
      </div>

      {/* Main Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12">
        <div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#181B15] tracking-tight">
            Field-Proven Engineering Outcomes.
          </h2>
          <p className="text-base sm:text-lg text-[#4A4E44] max-w-2xl mt-3 font-normal leading-relaxed">
            Real hardware deployments, audited boundary metrics, and quantified reliability gains across extreme industrial operating environments.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-mono font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#364121] text-white shadow-xs'
                    : 'bg-[#FFFFFF] border border-[#E2E6DC] text-[#4A4E44] hover:bg-[#EEF2E8] hover:text-[#181B15]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Studies Cards Stack */}
      <div className="space-y-8 md:space-y-10">
        {filteredStudies.map((study) => (
          <div
            key={study.id}
            className="rounded-2xl md:rounded-3xl bg-[#FFFFFF] border border-[#E2E6DC] p-6 sm:p-8 lg:p-10 shadow-xs hover:border-[#181B15]/40 transition-colors"
          >
            {/* Header: Category & Client */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-6 border-b border-[#ECEFE8]">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#55623B] bg-[#EEF2E8] px-2.5 py-1 rounded-full font-medium">
                  {study.category}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-[#181B15] tracking-tight mt-2.5">
                  {study.title}
                </h3>
              </div>
              <div className="text-xs font-mono text-[#757B6E]">
                Client: {study.client}
              </div>
            </div>

            {/* Metrics Highlights Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {study.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E2E6DC] flex flex-col justify-between"
                >
                  <span className="text-xs font-mono text-[#757B6E] uppercase tracking-wider">
                    {m.label}
                  </span>
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-[#181B15] my-1">
                    {m.value}
                  </span>
                  <span className="text-xs font-mono text-[#55623B]">
                    {m.subtext}
                  </span>
                </div>
              ))}
            </div>

            {/* Problem / Solution / Result Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E2E6DC]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#C0392B] font-semibold mb-2">
                  Operating Challenge
                </h4>
                <p className="text-xs sm:text-sm text-[#4A4E44] leading-relaxed">
                  {study.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E2E6DC]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#55623B] font-semibold mb-2">
                  Engineering Architecture
                </h4>
                <p className="text-xs sm:text-sm text-[#4A4E44] leading-relaxed">
                  {study.solution}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F4F7EE] border border-[#D4DEC5]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#364121] font-semibold mb-2">
                  Audited Outcome
                </h4>
                <p className="text-xs sm:text-sm text-[#181B15] leading-relaxed font-medium">
                  {study.result}
                </p>
              </div>
            </div>

            {/* Tags Footer */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#ECEFE8]">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#FAFAF8] border border-[#E2E6DC] text-[#181B15] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
