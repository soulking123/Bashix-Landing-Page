export const initialProducts = [
  {
    id: "prod-1",
    sku: "BX-GW-02",
    name: "Bashix EdgeCore v2",
    tagline: "Industrial Edge Telemetry & IoT Gateway",
    description: "Engineered for harsh industrial environments, EdgeCore v2 provides real-time telemetry processing, zero-jitter CAN-FD communication, and hardware-accelerated eBPF protocol translation.",
    category: "Industrial IoT",
    price_idr: 4850000,
    price_usd: 310,
    stock_qty: 42,
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    specs: [
      "Quad RISC-V 64-bit @ 1.8GHz",
      "Dual Gigabit Ethernet with TSN support",
      "Optically Isolated RS-485 / Modbus",
      "Hardware eBPF packet filter engine",
      "DIN-rail IP40 anodized aluminum chassis"
    ],
    datasheet_url: "#",
    is_featured: true,
    is_active: true
  },
  {
    id: "prod-2",
    sku: "BX-AI-40",
    name: "Bashix NeuralNode 400",
    tagline: "32 TOPS Edge AI Inference Accelerator",
    description: "Ultra-low power neural computing module designed for mission-critical computer vision, anomaly detection, and autonomous edge robotics with zero cloud dependency.",
    category: "Edge AI",
    price_idr: 12500000,
    price_usd: 799,
    stock_qty: 18,
    image_url: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80",
    specs: [
      "32 TOPS INT8 / 16 TFLOPS FP16 NPU",
      "16GB LPDDR5 6400 MT/s Unified RAM",
      "Dual MIPI-CSI 4-lane camera inputs",
      "PCIe Gen 4 x4 M.2 2280 form factor",
      "Passive cooling under 15W TDP"
    ],
    datasheet_url: "#",
    is_featured: true,
    is_active: true
  },
  {
    id: "prod-3",
    sku: "BX-SN-01",
    name: "Bashix SensorGrid Pro",
    tagline: "Industrial Environmental & Vibration Telemetry Node",
    description: "Precision tri-axis high-g vibration monitoring, ambient pressure, humidity, and temperature diagnostics with dual LoRaWAN long-range and WiFi 6 edge mesh.",
    category: "Sensors",
    price_idr: 1950000,
    price_usd: 125,
    stock_qty: 85,
    image_url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    specs: [
      "Tri-axis MEMS accelerometer (±16g / 10kHz)",
      "IP67 sealed ruggedized enclosure",
      "LoRaWAN 868/915 MHz + WiFi 6 BLE 5.3",
      "Up to 5-year internal LiSOCl2 battery",
      "End-to-end AES-256 telemetry encryption"
    ],
    datasheet_url: "#",
    is_featured: true,
    is_active: true
  },
  {
    id: "prod-4",
    sku: "BX-BR-08",
    name: "Bashix CAN-FD PCIe Bridge",
    tagline: "Deterministic Dual CAN-FD + LIN Telemetry Interface",
    description: "Low-latency industrial bus analyzer and transceiver card with sub-microsecond hardware timestamping for automotive diagnostics and aerospace avionics.",
    category: "Bus Adapters",
    price_idr: 3200000,
    price_usd: 205,
    stock_qty: 24,
    image_url: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80",
    specs: [
      "Dual isolated CAN-FD channels up to 8 Mbps",
      "Single LIN 2.2 / K-Line interface",
      "Hardware microsecond timestamping engine",
      "Low-profile PCIe x1 form factor",
      "Full Linux SocketCAN driver support"
    ],
    datasheet_url: "#",
    is_featured: true,
    is_active: true
  }
];
