import React, { useState, useEffect, useRef } from 'react';

const architectureTabs = [
  {
    id: 'mesh',
    title: 'Distributed Mesh',
    badge: 'Raft Consensus',
    subtitle: 'Zero-trust multi-master node cluster with sub-millisecond heartbeat routing',
    metrics: [
      { label: 'Cluster Throughput', value: '2.48 GB/s', trend: '+12% bus head' },
      { label: 'P99 Quorum Latency', value: '1.24 ms', trend: 'Deterministic' },
      { label: 'Partition Tolerance', value: '3/7 Quorum', trend: 'Byzantine Safe' },
      { label: 'Active Edge Nodes', value: '128 / 128', trend: '100% Online' },
    ],
    cli: 'bashix init --cluster --quorum=raft --nodes=128',
    topology: [
      { name: 'Gateway Alpha (Leader)', role: 'Raft Leader', ip: '10.240.0.12', ping: '0.4ms', status: 'SYNCHRONIZED' },
      { name: 'Node Beta (Follower)', role: 'Raft Follower', ip: '10.240.0.13', ping: '0.8ms', status: 'SYNCHRONIZED' },
      { name: 'Node Gamma (Follower)', role: 'Raft Follower', ip: '10.240.0.14', ping: '0.7ms', status: 'SYNCHRONIZED' },
      { name: 'Sentinel Delta (Witness)', role: 'Arbiter / Quorum', ip: '10.240.0.15', ping: '1.1ms', status: 'SYNCHRONIZED' },
    ],
    features: [
      'Kernel bypass transport via io_uring socket rings',
      'eBPF packet filtering prior to TCP stack overhead',
      'Dynamic leader election in < 12ms during network faults',
      'End-to-end ChaCha20-Poly1305 frame encryption',
    ],
  },
  {
    id: 'neural',
    title: 'Neural Inference',
    badge: 'Quantized INT8',
    subtitle: 'Sub-5ms local tensor evaluation with zero cloud dependency',
    metrics: [
      { label: 'Frame Evaluation', value: '3.82 ms', trend: 'Zero Cloud Roundtrip' },
      { label: 'Memory Allocation', value: '18.4 MB', trend: 'L1/L2 SRAM Bound' },
      { label: 'Inference Precision', value: '99.42%', trend: 'INT8 Post-Training' },
      { label: 'Thermal Budget', value: '4.2W Draw', trend: 'Passive Heatsink' },
    ],
    cli: 'bashix model deploy --runtime=int8 --device=edge-npu --input=vibration_fft',
    topology: [
      { name: 'Sensor Frontend', role: 'Analog ADC 24-bit', ip: 'SPI0:0', ping: '0.1ms', status: 'STREAMING' },
      { name: 'Tensor Accelerator', role: 'Dual NPU Cores', ip: 'MMIO:0x4000', ping: '0.2ms', status: 'COMPUTING' },
      { name: 'Vibration Classifier', role: 'Quantized CNN', ip: 'SRAM:Bank1', ping: '0.3ms', status: 'INSPECTING' },
      { name: 'Actuator Trip Line', role: 'Relay Safety Cut', ip: 'GPIO:Opto4', ping: '0.05ms', status: 'ARMED' },
    ],
    features: [
      'Zero round-trip latency for safety-critical trip signals',
      'Automated drift monitoring against baseline spectral harmonics',
      'Self-contained weights stored on cryptographically locked flash',
      'Validated over 100M continuous inference cycles without memory leak',
    ],
  },
  {
    id: 'gateway',
    title: 'Edge Gateway',
    badge: '2.5kV Opto-Isolated',
    subtitle: 'Physical fieldbus translation between legacy machinery and high-speed telemetry',
    metrics: [
      { label: 'Bus Jitter', value: '< 2.1 µs', trend: 'IEEE 802.1Qbv' },
      { label: 'Isolation Rating', value: '2.5 kV RMS', trend: 'Galvanic Barrier' },
      { label: 'Operating Voltage', value: '9V to 36V DC', trend: 'Surge Suppressed' },
      { label: 'CAN-FD Bitrate', value: '5.0 Mbps', trend: 'CRC Protected' },
    ],
    cli: 'bashix telemetry attach --node=gw-04 --bus=can0 --filter=all',
    topology: [
      { name: 'Isolated CAN-FD A', role: 'Powertrain Bus', ip: 'can0:5Mbps', ping: '0.2ms', status: 'ACTIVE' },
      { name: 'RS-485 Modbus RTU', role: 'PLC Substation', ip: 'ttyS2:115200', ping: '1.4ms', status: 'POLLING' },
      { name: 'Dual TSN Ethernet', role: 'Time-Sensitive Net', ip: 'eth0/eth1', ping: '0.3ms', status: 'LINK 1000M' },
      { name: 'Hardware Watchdog', role: 'Supervisory MCU', ip: 'I2C1:0x34', ping: '0.1ms', status: 'HEALTHY' },
    ],
    features: [
      'Dual Gigabit Ethernet with hardware timestamping (PTP/IEEE 1588)',
      'Isolated RS-485 and Dual CAN-FD with 120-ohm switchable termination',
      'Wide-range power supply with reverse-polarity and surge clamping',
      'Solid-state DIN-rail mounting with passive thermal conduction billet',
    ],
  },
];

const mockLogPool = [
  '[TSN_SYNC] Master clock synchronization converged: jitter=1.4us',
  '[eBPF_TRACE] Ingress frame filter passed: 1420 bytes, zero copy to buffer',
  '[RAFT_MESH] Heartbeat broadcast to 4 peers: all ACKs received in 0.8ms',
  '[CAN_BUS] Frame 0x18FF42 received: telemetry status OK, payload verified',
  '[INFERENCE] INT8 model evaluated frame #948211 in 3.7ms: anomaly=0.002',
  '[WATCHDOG] Internal supply rail nominal: 24.02V DC, thermal=41.2C',
  '[CRYPTO] Boot verification hash validated: SHA-256 signature intact',
  '[TELEMETRY] Packet stream dispatch: 12,400 msg/sec to local edge buffer',
];

export default function TechShowcase() {
  const [activeTab, setActiveTab] = useState('mesh');
  const [isStreaming, setIsStreaming] = useState(true);
  const [logs, setLogs] = useState([
    '[INIT] Bashix Engine runtime loaded v2.4.1',
    '[RAFT_MESH] Heartbeat broadcast to 4 peers: all ACKs received in 0.8ms',
    '[eBPF_TRACE] Ingress frame filter passed: 1420 bytes, zero copy to buffer',
    '[INFERENCE] INT8 model evaluated frame #948210 in 3.8ms: anomaly=0.001',
  ]);
  const [copiedSnippet, setCopiedSnippet] = useState(null);
  const logContainerRef = useRef(null);

  const currentTab = architectureTabs.find((t) => t.id === activeTab) || architectureTabs[0];

  // Live streaming log simulation
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const randomLine = mockLogPool[Math.floor(Math.random() * mockLogPool.length)];
      const timestamp = new Date().toISOString().substring(11, 23);
      const formattedLog = `[${timestamp}] ${randomLine}`;

      setLogs((prev) => {
        const next = [...prev, formattedLog];
        return next.length > 30 ? next.slice(next.length - 30) : next;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCopyCli = (command) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(command);
    }
    setCopiedSnippet(command);
    setTimeout(() => {
      setCopiedSnippet(null);
    }, 2800);
  };

  return (
    <section
      id="engine"
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto scroll-mt-20"
    >
      {/* Category Eyebrow */}
      <div className="mb-2">
        <span className="text-xs font-mono font-medium text-[#55623B] tracking-wider uppercase">
          Architecture Viewer
        </span>
      </div>

      {/* Section Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-10">
        <div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#181B15] tracking-tight">
            The Bashix Engine
          </h2>
          <p className="text-base sm:text-lg text-[#4A4E44] max-w-2xl mt-3 font-normal leading-relaxed">
            Inspect our core runtime architecture, live distributed topologies, and hardware telemetry channels in real time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#55623B] animate-pulse" />
          <span className="text-xs font-mono text-[#55623B] font-medium tracking-wide">
            LIVE ENGINE TELEMETRY
          </span>
        </div>
      </div>

      {/* Main Console Container */}
      <div className="bg-[#FFFFFF] rounded-2xl md:rounded-3xl border border-[#E2E6DC] shadow-sm overflow-hidden">
        {/* Top Control Bar: Tab Switcher & Status */}
        <div className="bg-[#F8F9F5] border-b border-[#E2E6DC] px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Tab Navigation Pill Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {architectureTabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-xs sm:text-sm font-mono font-medium px-3 sm:px-4 py-2 rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#364121] text-white shadow-xs'
                      : 'bg-transparent text-[#4A4E44] hover:bg-[#EEF2E8] hover:text-[#181B15]'
                  }`}
                >
                  [{tab.title}]
                </button>
              );
            })}
          </div>

          {/* Quick CLI Snippet with Interactive Copy Button */}
          <div className="flex items-center gap-2 bg-[#FFFFFF] border border-[#E2E6DC] rounded-lg px-3 py-1.5 text-xs font-mono">
            <span className="text-[#757B6E] select-none">$</span>
            <code className="text-[#181B15] font-medium truncate max-w-[220px] sm:max-w-xs">
              {currentTab.cli}
            </code>
            <button
              type="button"
              onClick={() => handleCopyCli(currentTab.cli)}
              className="ml-2 text-xs font-mono font-medium px-2 py-0.5 rounded bg-[#EEF2E8] text-[#364121] hover:bg-[#D4DEC5] transition-colors cursor-pointer"
              title="Copy snippet to clipboard"
            >
              {copiedSnippet === currentTab.cli ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 sm:p-8 lg:p-10">
          {/* Headline for Active Tab */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-8 border-b border-[#ECEFE8]">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-display text-2xl sm:text-3xl text-[#181B15] tracking-tight">
                  {currentTab.title}
                </h3>
                <span className="text-xs font-mono uppercase tracking-wider text-[#55623B] bg-[#EEF2E8] px-2.5 py-1 rounded-full font-medium">
                  {currentTab.badge}
                </span>
              </div>
              <p className="text-sm text-[#4A4E44] mt-1.5 font-normal">
                {currentTab.subtitle}
              </p>
            </div>
          </div>

          {/* Real-time Metric Gauges Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {currentTab.metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E2E6DC] flex flex-col justify-between"
              >
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#757B6E] mb-1">
                  {metric.label}
                </div>
                <div className="font-mono text-xl sm:text-2xl font-semibold text-[#181B15] my-1">
                  {metric.value}
                </div>
                <div className="text-[11px] font-mono text-[#55623B] font-medium">
                  {metric.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Split Section: Topology Nodes & Architecture Features */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Left: Interactive Node Topology List */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="text-xs font-mono uppercase tracking-wider text-[#55623B] font-medium mb-3">
                Target Node Topologies
              </div>
              <div className="space-y-2.5">
                {currentTab.topology.map((node) => (
                  <div
                    key={node.name}
                    className="p-3.5 rounded-xl border border-[#E2E6DC] bg-[#FFFFFF] flex items-center justify-between gap-4 hover:border-[#181B15]/40 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="font-medium text-sm text-[#181B15] truncate">
                        {node.name}
                      </div>
                      <div className="text-xs font-mono text-[#757B6E]">
                        {node.role} · <span className="text-[#4A4E44]">{node.ip}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono text-[#4A4E44]">
                        {node.ping}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#EEF2E8] text-[#364121] font-medium">
                        {node.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technical Guarantee Checklist */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#FAFAF8] p-6 rounded-2xl border border-[#E2E6DC]">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#55623B] font-medium mb-3">
                  Technical Specifications
                </div>
                <ul className="space-y-3">
                  {currentTab.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#181B15]">
                      <span className="text-[#364121] font-mono font-bold mt-0.5">✓</span>
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E6DC]">
                <div className="text-[11px] font-mono text-[#757B6E]">
                  Verified on Linux Kernel 6.6 LTS & FreeRTOS v10.5
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Mock Telemetry Log Console */}
          <div className="rounded-2xl border border-[#181B15]/10 bg-[#141712] text-[#E2E6DC] overflow-hidden shadow-inner">
            {/* Console Bar Header */}
            <div className="px-4 py-2.5 bg-[#1B1F18] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E5484D]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#F5B041]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#55623B]" />
                <span className="text-xs font-mono text-white/70 ml-2">
                  bashix-telemetry-daemon --stream
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsStreaming(!isStreaming)}
                  className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                >
                  {isStreaming ? 'Pause Stream' : 'Resume Stream'}
                </button>
                <button
                  type="button"
                  onClick={() => handleCopyCli(currentTab.cli)}
                  className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#D4DEC5] text-[#181B15] font-medium hover:bg-white transition-colors cursor-pointer"
                >
                  Copy CLI Command
                </button>
              </div>
            </div>

            {/* Console Log Body */}
            <div
              ref={logContainerRef}
              className="p-4 font-mono text-xs text-[#C5CCBD] h-48 overflow-y-auto space-y-1 select-text"
            >
              {logs.map((log, idx) => (
                <div key={idx} className="leading-relaxed hover:bg-white/5 px-1 rounded">
                  <span className="text-[#8B987C]">{log.substring(0, 15)}</span>
                  <span className="text-white/90">{log.substring(15)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Copy Feedback Toast */}
      {copiedSnippet && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#181B15] text-white text-xs font-mono px-4 py-3 rounded-xl shadow-lg border border-white/20 flex items-center gap-3 animate-fade-in">
          <span className="text-[#D4DEC5] font-bold">✓</span>
          <span>Snippet copied to clipboard:</span>
          <span className="text-[#D4DEC5] font-medium">{copiedSnippet}</span>
        </div>
      )}
    </section>
  );
}
