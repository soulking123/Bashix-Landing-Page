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
    technical_details: {
      dimensions: "142 x 88 x 42 mm",
      weight: "460 g",
      power_input: "9V to 36V DC (Wide input with reverse polarity protection)",
      power_consumption: "12W nominal / 28W maximum peak computation",
      operating_temp: "-40°C to +85°C ambient",
      ingress_protection: "IP40 enclosure rating (Optional IP67 protective outer chassis)",
      isolation_rating: "2.5 kV RMS galvanic isolation across Ethernet and fieldbus",
      cooling: "Passive convection via CNC-machined 6061-T6 aluminum heatsink fins",
      mounting: "Standard 35mm DIN-rail (EN 60715) or direct M4 chassis wall mount",
      compliance: [
        "EN 61000-6-2 (Industrial Immunity Standard)",
        "EN 61000-6-4 (Industrial Emissions)",
        "RoHS 3 (EU 2015/863)",
        "CE / FCC Class A Industrial"
      ],
      block_diagram: [
        { block: "Primary Power Stage", description: "9V-36V buck-boost regulation with 2.5kV TVS transient suppression" },
        { block: "Neural Compute Core", description: "Quad 64-bit ARM Cortex @ 2.0GHz coupled with dedicated 32 TOPS INT8 NPU" },
        { block: "Deterministic PHY", description: "Dual TSN Gigabit Ethernet transceivers with IEEE 802.1Qbv time-aware shaper" },
        { block: "Fieldbus Transceiver", description: "Isolated CAN-FD and RS-485 interfaces with hardware timestamping" }
      ],
      pinout: [
        { pin: "1", signal: "VIN+", type: "Power", voltage: "9-36V DC", description: "Main DC positive power supply terminal" },
        { pin: "2", signal: "GND", type: "Power", voltage: "0V Ref", description: "Common system ground and DC return" },
        { pin: "3", signal: "CAN_H", type: "Differential", voltage: "2.5V-3.5V", description: "CAN-FD high signal line (ISO 11898-2)" },
        { pin: "4", signal: "CAN_L", type: "Differential", voltage: "1.5V-2.5V", description: "CAN-FD low signal line (ISO 11898-2)" },
        { pin: "5", signal: "RS485_A", type: "Differential", voltage: "-7V to +12V", description: "Isolated RS-485 non-inverting terminal" },
        { pin: "6", signal: "RS485_B", type: "Differential", voltage: "-7V to +12V", description: "Isolated RS-485 inverting terminal" },
        { pin: "7", signal: "EARTH", type: "Chassis", voltage: "Earth Ground", description: "Chassis shield earth grounding lug" }
      ]
    },
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
    technical_details: {
      dimensions: "168 x 112 x 54 mm",
      weight: "720 g",
      power_input: "10V to 30V DC (Solar and vehicle battery compatible)",
      power_consumption: "4.5W average operating / 14W during transmission bursts",
      operating_temp: "-40°C to +80°C ambient",
      ingress_protection: "IP67 waterproof immersion up to 1m for 30 minutes",
      isolation_rating: "1.5 kV galvanic isolation on serial bus channels",
      cooling: "Passive radiation via cast aluminum housing rib structure",
      mounting: "Pole-mount clamp bracket (32-50mm diameter) or wall bracket",
      compliance: [
        "IEC 60529 (IP67 Ingress Certification)",
        "EN 301 489-1 (Radio Equipment Directive)",
        "MIL-STD-810H (Vibration and Shock Resistance)",
        "RoHS 3 Compliant"
      ],
      block_diagram: [
        { block: "Solar / DC PMIC", description: "Integrated MPPT solar charger circuit with broad input acceptance" },
        { block: "Telemetry Modem", description: "Multi-band LTE Cat-M1 / NB-IoT with GNSS high-precision positioning" },
        { block: "Modbus Controller", description: "Optically decoupled RS-485 bus master supporting up to 32 field nodes" },
        { block: "Failover Buffer", description: "16GB onboard industrial eMMC telemetry cache during link outages" }
      ],
      pinout: [
        { pin: "1", signal: "V_BATT+", type: "Power", voltage: "10-30V DC", description: "Positive battery or external solar DC supply" },
        { pin: "2", signal: "V_BATT-", type: "Power", voltage: "0V Ref", description: "Negative supply return reference" },
        { pin: "3", signal: "MODBUS_A", type: "Differential", voltage: "RS-485", description: "Non-inverting Modbus RTU transceiver line" },
        { pin: "4", signal: "MODBUS_B", type: "Differential", voltage: "RS-485", description: "Inverting Modbus RTU transceiver line" },
        { pin: "5", signal: "DIG_IN1", type: "Digital", voltage: "0-24V DC", description: "Opto-isolated digital dry-contact input" },
        { pin: "6", signal: "SHIELD", type: "Chassis", voltage: "Chassis Ground", description: "M12 metallic cable shield bond" }
      ]
    },
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
    technical_details: {
      dimensions: "96 x 64 x 28 mm",
      weight: "210 g",
      power_input: "24V to 48V DC nominal (Supports regenerative braking up to 58V)",
      power_consumption: "30A continuous phase current / 60A peak for 3 seconds",
      operating_temp: "-30°C to +75°C ambient",
      ingress_protection: "IP20 open module (Integrated into robot chassis or enclosure)",
      isolation_rating: "2.0 kV isolation between logic and motor power stages",
      cooling: "Thermal pad to robot chassis or auxiliary 40mm fan mount",
      mounting: "M3 standoff mounting pattern (88 x 56 mm)",
      compliance: [
        "EN 61800-5-1 (Adjustable Speed Electrical Power Drive Systems)",
        "EN 61000-6-2 (Industrial Electromagnetic Immunity)",
        "RoHS 3 Compliant"
      ],
      block_diagram: [
        { block: "FET Inverter Stage", description: "Automotive-grade 3-phase MOSFET bridge with low Rds(on) silicon" },
        { block: "FOC Motion Engine", description: "Hard-real-time Field-Oriented Control DSP loop executing at 20 kHz" },
        { block: "CAN-FD Dual PHY", description: "Redundant dual CAN-FD transceivers supporting 8 Mbps payload throughput" },
        { block: "Current Sensing", description: "Inline shunt amplifiers with 16-bit simultaneous ADC conversion" }
      ],
      pinout: [
        { pin: "1", signal: "V_MOTOR+", type: "Power", voltage: "24-48V DC", description: "High current motor bus positive terminal" },
        { pin: "2", signal: "PWR_GND", type: "Power", voltage: "0V High Current", description: "High current ground return for power stage" },
        { pin: "3", signal: "PHASE_U", type: "Motor Output", voltage: "PWM AC", description: "Motor Phase U winding drive output" },
        { pin: "4", signal: "PHASE_V", type: "Motor Output", voltage: "PWM AC", description: "Motor Phase V winding drive output" },
        { pin: "5", signal: "PHASE_W", type: "Motor Output", voltage: "PWM AC", description: "Motor Phase W winding drive output" },
        { pin: "6", signal: "CAN1_H", type: "Signal", voltage: "CAN-FD", description: "Channel 1 CAN-FD high line" },
        { pin: "7", signal: "CAN1_L", type: "Signal", voltage: "CAN-FD", description: "Channel 1 CAN-FD low line" }
      ]
    },
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
    technical_details: {
      dimensions: "118 mm length x 26 mm outer diameter",
      weight: "340 g",
      power_input: "12V to 30V DC loop-powered or auxiliary DC input",
      power_consumption: "0.8W maximum (at full telemetry reporting rate)",
      operating_temp: "-40°C to +105°C fluid and ambient temperature range",
      ingress_protection: "IP68 continuous immersion rating up to 10 bar (100m)",
      isolation_rating: "500V galvanic barrier between sensor housing and telemetry signal",
      cooling: "Direct conduction through 316L stainless steel body to process medium",
      mounting: "1/4-inch NPT or G1/2 industrial process thread adapter",
      compliance: [
        "IEC 60529 (IP68 Continuous Immersion Standard)",
        "NACE MR0175 (Corrosive and sour gas environmental suitability)",
        "RoHS 3 Compliant",
        "CE Certified"
      ],
      block_diagram: [
        { block: "316L Piezoresistive Cell", description: "Isolated stainless steel diaphragm with oil-filled piezoresistive element" },
        { block: "Analog Conditioning", description: "24-bit delta-sigma instrumentation amplifier with factory calibration curve" },
        { block: "Current Loop DAC", description: "Industrial precision 4-20mA current transmitter circuit (NAMUR NE 43)" },
        { block: "Modbus Processor", description: "Ultra-low-power digital telemetry controller communicating via RS-485" }
      ],
      pinout: [
        { pin: "1", signal: "LOOP_VCC", type: "Power", voltage: "12-30V DC", description: "Positive power supply / 4-20mA loop positive" },
        { pin: "2", signal: "LOOP_OUT", type: "Current", voltage: "4-20 mA", description: "Current output signal return" },
        { pin: "3", signal: "RS485_A", type: "Digital", voltage: "RS-485", description: "Modbus digital telemetry A line" },
        { pin: "4", signal: "RS485_B", type: "Digital", voltage: "RS-485", description: "Modbus digital telemetry B line" }
      ]
    },
    datasheet_url: "#specs",
    is_featured: true,
    is_active: true
  }
];
