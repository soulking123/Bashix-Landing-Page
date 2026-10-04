export const initialProducts = [
  {
    id: "prod-1",
    sku: "BX-TITAN-AI",
    name: "Bashix Titan-Edge AI",
    tagline: "32 TOPS DIN-Rail Industrial Edge Neural Unit",
    description: "Engineered for real-time edge computer vision, eBPF telemetry pipelines, and deterministic robotic control with dual isolated Gigabit Ethernet TSN controllers.",
    category: "Edge Compute",
    price_idr: 7850000,
    price_usd: 500,
    stock_qty: 38,
    image_url: "/images/products/titan-edge.jpg",
    specs: [
      "Quad 64-bit Core @ 2.0GHz + 32 TOPS NPU",
      "Dual RJ45 Gigabit Ethernet with TSN (IEEE 802.1Qbv)",
      "9V to 36V Wide-Range DC Input with Surge Clamping",
      "Machined CNC heatsink fins with DIN-rail mount bracket",
      "Operating temperature: -40°C to +85°C"
    ],
    datasheet_url: "#specs",
    is_featured: true,
    is_active: true
  },
  {
    id: "prod-2",
    sku: "BSX-GW300",
    name: "Bashix BSX-GW300 Telemetry Gateway",
    tagline: "IP67 Ruggedized Off-Grid Telemetry Hub",
    description: "Cast-aluminum waterproof sealed enclosure designed for harsh field deployment, agricultural robotics, marine vessels, and isolated mining telemetry networks.",
    category: "Telemetry Hubs",
    price_idr: 5400000,
    price_usd: 350,
    stock_qty: 54,
    image_url: "/images/products/telemetry-gateway.jpg",
    specs: [
      "IP67 die-cast aluminum sealed housing",
      "Dual external brass SMA high-gain antenna terminals",
      "Heavy duty waterproof M12 circular connectors",
      "Optically isolated RS-485 / Modbus RTU interface",
      "Integrated GNSS & cellular telemetry failover"
    ],
    datasheet_url: "#specs",
    is_featured: true,
    is_active: true
  },
  {
    id: "prod-3",
    sku: "BX-ACU-FD",
    name: "Bashix Actuator Core",
    tagline: "Precision 30A CAN-FD Servo Drive Module",
    description: "High-density motor controller with dual CAN-FD bus communication, sub-microsecond hardware timestamping, and exposed gold-plated diagnostic test points.",
    category: "Robotics Motion",
    price_idr: 3250000,
    price_usd: 210,
    stock_qty: 62,
    image_url: "/images/products/actuator-core.jpg",
    specs: [
      "Up to 30A continuous motor phase drive",
      "Dual isolated CAN-FD channels up to 8 Mbps",
      "24V to 48V DC input with reverse polarity barrier",
      "Phoenix Contact 5.08mm high-current terminal block",
      "Sub-microsecond deterministic timing response"
    ],
    datasheet_url: "#specs",
    is_featured: true,
    is_active: true
  },
  {
    id: "prod-4",
    sku: "BX-SP-740",
    name: "Bashix SP-740 Sensor Pod",
    tagline: "Precision Stainless Submersible Sensor Transmitter",
    description: "Machined 316L stainless steel probe for high-pressure industrial fluid, vibration, and environmental telemetry with quick-disconnect M12 industrial cabling.",
    category: "Sensors & Probes",
    price_idr: 1850000,
    price_usd: 120,
    stock_qty: 90,
    image_url: "/images/products/sensor-pod.jpg",
    specs: [
      "316L precision knurled stainless steel probe body",
      "Standard industrial M12 4-pin shielded connection",
      "High-accuracy pressure, temperature, and vibration telemetry",
      "Submersible IP68 rating up to 100m water depth",
      "Direct 4-20mA or digital Modbus output"
    ],
    datasheet_url: "#specs",
    is_featured: true,
    is_active: true
  }
];
