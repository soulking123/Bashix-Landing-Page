import React, { useState } from 'react';

const stages = [
  {
    step: '01',
    title: 'Discovery & Stress Modeling',
    timeline: 'Weeks 1 - 2',
    subtitle: 'Thermal simulation, electromagnetic budgeting, and bus protocol profiling',
    description:
      'We begin by analyzing your field operating conditions. Our engineers map electrical boundaries, transient surges, ambient thermal extremes, and bus throughput requirements to establish a verifiable baseline before routing a single trace.',
    milestones: [
      'Finite element thermal dissipation analysis',
      'Electromagnetic compatibility (EMC) pre-layout budgeting',
      'Industrial bus protocol profiling (CAN-FD, Modbus, TSN)',
      'Hardware safety factor & isolation boundary review',
    ],
    deliverable: 'System Architecture Document & Electrical Tolerance Budget',
    badge: 'Phase Initiation',
  },
  {
    step: '02',
    title: 'Rapid Engineering Prototyping',
    timeline: 'Weeks 3 - 5',
    subtitle: 'High-density multi-layer PCB bring-up and hard-real-time kernel drivers',
    description:
      'We fabricate 4-layer to 8-layer controlled-impedance boards and populate them with precision SMT components in our laboratory. Oscilloscope waveforms, power rail ripples, and RTOS context switches are verified on the benchtop.',
    milestones: [
      'High-speed PCB layout with matched differential pairs',
      'SMT assembly and benchtop power sequencing bring-up',
      'Custom FreeRTOS and Linux SocketCAN driver bring-up',
      'Benchtop logic analyzer and eye-diagram validation',
    ],
    deliverable: 'Functional Hardware Prototypes & Low-Level Driver Suite',
    badge: 'Physical Validation',
  },
  {
    step: '03',
    title: 'Environmental Production Hardening',
    timeline: 'Weeks 6 - 8',
    subtitle: 'Climatic chamber stress, 2.5kV galvanic barrier testing, and kernel fuzzing',
    description:
      'Hardware prototypes are pushed beyond rated limits in our environmental test chambers. Units undergo continuous thermal cycling from -40°C to +85°C, high-voltage ESD pulses, and simulated packet floods to ensure fail-safe resilience.',
    milestones: [
      'Climatic chamber testing from -40°C to +85°C ambient',
      '2.5kV RMS optical galvanic barrier surge validation',
      'eBPF kernel probe fuzzing under network saturation',
      'Vibration shaker table stress and mechanical joint inspection',
    ],
    deliverable: 'Pre-Compliance Test Dossier & Bill-of-Materials Freeze',
    badge: 'Stress Qualification',
  },
  {
    step: '04',
    title: 'Turnkey Field Deployment',
    timeline: 'Weeks 9 - 12',
    subtitle: 'Automated test fixtures, cryptographic key injection, and 24/7 fleet telemetry',
    description:
      'We manage volume production using automated bed-of-nails test fixtures. Each production unit receives cryptographically signed firmware with individual hardware root-of-trust keys before shipping for DIN-rail field commissioning.',
    milestones: [
      'Automated production test jigs with 100% boundary testing',
      'Hardware cryptographic key provisioning (ATECC608B / TPM 2.0)',
      'Standard 35mm DIN-rail industrial enclosure packaging',
      'Zero-touch fleet telemetry activation and OTA cloud bridge',
    ],
    deliverable: 'Commissioned Field Hardware & Live Operational Dashboard',
    badge: 'Fleet Launch',
  },
];

export default function Process() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section
      id="methodology"
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto scroll-mt-20"
    >
      {/* Category Eyebrow */}
      <div className="mb-2">
        <span className="text-xs font-mono font-medium text-[#55623B] tracking-wider uppercase">
          Methodology Pipeline
        </span>
      </div>

      {/* Main Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12">
        <div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#181B15] tracking-tight">
            Precision Execution Lifecycle.
          </h2>
          <p className="text-base sm:text-lg text-[#4A4E44] max-w-2xl mt-3 font-normal leading-relaxed">
            From thermal simulation to production test fixtures, every phase follows a rigorous verification gateway. We eliminate field recalls through aggressive early-stage stress testing.
          </p>
        </div>
        <div className="text-xs font-mono text-[#757B6E] shrink-0">
          <span>Zero Field Recalls Across 12,000+ Units</span>
        </div>
      </div>

      {/* Stepper Navigation Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {stages.map((stage, idx) => {
          const isActive = idx === activeStage;
          return (
            <button
              key={stage.step}
              type="button"
              onClick={() => setActiveStage(idx)}
              className={`text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#FFFFFF] border-[#364121] shadow-sm ring-1 ring-[#364121]'
                  : 'bg-[#FAFAF8] border-[#E2E6DC] hover:border-[#181B15]/40 hover:bg-[#FFFFFF]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-semibold ${isActive ? 'text-[#364121]' : 'text-[#757B6E]'}`}>
                  STAGE {stage.step}
                </span>
                <span className="text-[11px] font-mono text-[#55623B] bg-[#EEF2E8] px-2 py-0.5 rounded-md font-medium">
                  {stage.timeline}
                </span>
              </div>
              <h3 className="font-medium text-sm sm:text-base text-[#181B15] leading-snug truncate">
                {stage.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Detailed Stage Showcase Card */}
      <div className="bg-[#FFFFFF] rounded-2xl md:rounded-3xl border border-[#E2E6DC] p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#ECEFE8]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-display text-4xl sm:text-5xl text-[#181B15]/20 font-light">
                {stages[activeStage].step}
              </span>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#55623B] bg-[#EEF2E8] px-2.5 py-1 rounded-full font-medium">
                  {stages[activeStage].badge}
                </span>
                <span className="ml-2 text-xs font-mono text-[#757B6E]">
                  Timeline: {stages[activeStage].timeline}
                </span>
              </div>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-[#181B15] tracking-tight">
              {stages[activeStage].title}
            </h3>
            <p className="text-sm font-mono text-[#55623B] mt-1">
              {stages[activeStage].subtitle}
            </p>
          </div>
        </div>

        {/* Narrative and Milestones Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Narrative Column */}
          <div className="lg:col-span-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#55623B] font-medium mb-3">
              Phase Overview & Execution
            </h4>
            <p className="text-sm sm:text-base text-[#4A4E44] leading-relaxed mb-6 font-normal">
              {stages[activeStage].description}
            </p>

            <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E2E6DC]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#757B6E] block mb-1">
                Formal Stage Deliverable:
              </span>
              <span className="font-medium text-sm text-[#181B15]">
                {stages[activeStage].deliverable}
              </span>
            </div>
          </div>

          {/* Verification Checklist Column */}
          <div className="lg:col-span-6 bg-[#FAFAF8] p-6 rounded-2xl border border-[#E2E6DC]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#55623B] font-medium mb-4">
              Key Engineering Milestones
            </h4>
            <div className="space-y-3.5">
              {stages[activeStage].milestones.map((milestone, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#181B15]">
                  <span className="w-5 h-5 rounded-full bg-[#EEF2E8] text-[#364121] flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="leading-snug">{milestone}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#E2E6DC] flex items-center justify-between text-xs font-mono text-[#757B6E]">
              <span>ISO 9001 & CE Compliance Ready</span>
              <span>100% Boundary Inspection</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
