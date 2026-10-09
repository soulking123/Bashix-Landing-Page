import React, { useState, useRef } from 'react';

const serviceCards = [
  {
    id: 'distributed-systems',
    number: '01',
    title: 'Distributed Systems & Cloud Fabrics',
    subtitle: 'Byzantine-resilient state machines and deterministic packet meshes',
    description:
      'Engineered for partition-tolerant deployments across harsh field networks. We design and deploy Raft consensus engines, zero-copy kernel bypass transport, and multi-region telemetry synchronization.',
    tags: ['Raft Consensus', 'Multi-Region Mesh', 'eBPF Routing', 'Zero-Copy RPC'],
    specs: [
      { label: 'Throughput', value: '1.8M msg/sec per node' },
      { label: 'Consensus Latency', value: '< 1.4ms P99' },
      { label: 'Transport Layer', value: 'Kernel bypass via DPDK & io_uring' },
    ],
  },
  {
    id: 'ai-platform',
    number: '02',
    title: 'AI Platform & Inference Engineering',
    subtitle: 'Quantized on-device neural runtimes and real-time vision pipelines',
    description:
      'Deploy deterministic intelligence directly to edge hardware modules without cloud dependence. We optimize INT8 and FP16 quantized models for local vibration anomaly detection, optical inspection, and telemetry forecasting.',
    tags: ['INT8 Quantization', 'Microsecond Jitter', 'ONNX Runtime', 'Drift Watchdogs'],
    specs: [
      { label: 'Inference Cycle', value: '4.2ms per frame' },
      { label: 'Model Footprint', value: '< 24MB quantized weight budget' },
      { label: 'Runtime Engine', value: 'Custom TensorRT & ONNX embedded' },
    ],
  },
  {
    id: 'embedded-systems',
    number: '03',
    title: 'Embedded Systems & Industrial IoT',
    subtitle: 'Rugged hardware design, custom PCB layout, and hard-real-time firmware',
    description:
      'Production-tested electronics built for violent thermal gradients and electrical interference. We build multicore RISC-V and ARM boards, optically isolated industrial interfaces, and certified RTOS drivers.',
    tags: ['Custom PCB Layout', '2.5kV Isolation', 'CAN-FD / TSN', 'RTOS Determinism'],
    specs: [
      { label: 'Galvanic Barrier', value: '2.5kV RMS optical isolation' },
      { label: 'Bus Determinism', value: 'Dual IEEE 802.1Qbv TSN GbE' },
      { label: 'Operating Thermal', value: '-40°C to +85°C validated' },
    ],
  },
  {
    id: 'devsecops-sre',
    number: '04',
    title: 'DevSecOps & SRE Hardening',
    subtitle: 'Cryptographic boot validation, kernel fuzzing, and telemetry watchdogs',
    description:
      'Mission-critical systems require mathematical certainty. We implement eBPF kernel probes, automated fuzz-testing suites, hardware cryptographic root-of-trust, and zero-downtime atomic firmware deployment pipelines.',
    tags: ['Cryptographic Boot', 'Kernel Fuzzing', 'eBPF Probes', 'Formal Verification'],
    specs: [
      { label: 'Root of Trust', value: 'Hardware TPM 2.0 & ATECC608B' },
      { label: 'Kernel Auditing', value: 'Live eBPF ring-buffer monitors' },
      { label: 'Firmware Recovery', value: 'Dual-bank A/B fail-safe rollback' },
    ],
  },
];

function TiltCard({ service }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.18s ease-out',
      }}
      className="relative rounded-2xl md:rounded-3xl bg-[#FFFFFF] border border-[#E2E6DC] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xs hover:border-[#181B15]/40 transition-colors duration-300 group"
    >
      {/* Specular Glare Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(85, 98, 59, 0.18), transparent 60%)`,
          opacity: glarePosition.opacity,
        }}
      />

      <div>
        {/* Header row: Number & Category */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#ECEFE8]">
          <span className="text-xs font-mono font-medium text-[#757B6E] tracking-wider">
            [{service.number}]
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#55623B] bg-[#EEF2E8] px-2.5 py-1 rounded-full font-medium">
            Production Grade
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="font-display text-2xl sm:text-[1.65rem] text-[#181B15] tracking-tight leading-snug mb-2 group-hover:text-[#364121] transition-colors">
          {service.title}
        </h3>
        <p className="text-xs sm:text-sm font-mono text-[#55623B] mb-3">
          {service.subtitle}
        </p>

        {/* Narrative Description */}
        <p className="text-sm text-[#4A4E44] leading-relaxed mb-6 font-normal">
          {service.description}
        </p>

        {/* Verified Capability Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#F4F6F0] border border-[#E2E6DC] text-[#181B15] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Structured Technical Specs Box */}
      <div className="pt-4 border-t border-[#ECEFE8] bg-[#FAFAF8] -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl md:rounded-b-3xl">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#757B6E] mb-2 font-medium">
          Architectural Benchmarks
        </div>
        <div className="space-y-1.5">
          {service.specs.map((spec) => (
            <div key={spec.label} className="flex items-baseline justify-between text-xs">
              <span className="text-[#4A4E44] font-normal">{spec.label}</span>
              <span className="font-mono text-[#181B15] font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto scroll-mt-20"
    >
      {/* Category Eyebrow */}
      <div className="mb-2">
        <span className="text-xs font-mono font-medium text-[#55623B] tracking-wider uppercase">
          Engineering Capabilities
        </span>
      </div>

      {/* Main Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12">
        <div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#181B15] tracking-tight">
            Built for Mission-Critical Environments.
          </h2>
          <p className="text-base sm:text-lg text-[#4A4E44] max-w-2xl mt-3 font-normal leading-relaxed">
            Our engineering practices combine physical hardware precision with high-concurrency distributed systems. Every deliverable is tested against real electrical and thermal boundaries.
          </p>
        </div>
        <div className="text-xs font-mono text-[#757B6E] shrink-0">
          <span>SLA: 99.999% Guaranteed Availability</span>
        </div>
      </div>

      {/* 4 Capability Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {serviceCards.map((service) => (
          <TiltCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
