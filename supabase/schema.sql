-- ====================================================================
-- BASHIX ENGINEERING PLATFORM: SUPABASE POSTGRESQL SCHEMA MIGRATION
-- Project: bashix.id
-- Description: Complete schema for physical hardware store, orders,
--              consultation leads, and landing page CMS settings.
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Hardware Products Table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    description TEXT,
    category VARCHAR(64) NOT NULL, -- 'Industrial IoT', 'Edge AI', 'Sensors', 'Bus Adapters'
    price_idr NUMERIC(15, 2) NOT NULL,
    price_usd NUMERIC(10, 2) NOT NULL,
    stock_qty INTEGER NOT NULL DEFAULT 0,
    image_url TEXT,
    specs JSONB DEFAULT '[]'::jsonb, -- Array of bullet specifications
    datasheet_url TEXT,
    is_featured BOOLEAN DEFAULT true, -- Show on Landing Page
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Customer Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(32) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(64),
    shipping_address TEXT NOT NULL,
    currency VARCHAR(8) DEFAULT 'IDR',
    total_amount NUMERIC(15, 2) NOT NULL,
    status VARCHAR(32) DEFAULT 'Pending', -- 'Pending', 'Processing', 'Dispatched', 'Completed', 'Cancelled'
    payment_status VARCHAR(32) DEFAULT 'Pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Order Line Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price NUMERIC(15, 2) NOT NULL,
    subtotal NUMERIC(15, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Consultation & Estimator Leads Table
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    domain VARCHAR(64), -- 'Cloud', 'AI', 'Embedded', 'SRE'
    estimated_scale VARCHAR(64),
    message TEXT,
    status VARCHAR(32) DEFAULT 'New', -- 'New', 'Contacted', 'Proposal Sent', 'Closed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Landing Page CMS Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(64) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Products: Everyone can read active products; Authenticated users can perform all operations
CREATE POLICY "Public read active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Admin manage products" ON products FOR ALL TO authenticated USING (true);

-- Site Settings: Everyone can read site settings; Authenticated users can update
CREATE POLICY "Public read site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin manage site settings" ON site_settings FOR ALL TO authenticated USING (true);

-- Orders: Public can create orders (checkout); Authenticated users can view & manage orders
CREATE POLICY "Public create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin manage orders" ON orders FOR ALL TO authenticated USING (true);

-- Order Items: Public can create order items; Authenticated users can view & manage
CREATE POLICY "Public create order items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin manage order items" ON order_items FOR ALL TO authenticated USING (true);

-- Leads: Public can submit inquiries & scope estimations; Authenticated users can manage
CREATE POLICY "Public submit leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin manage leads" ON leads FOR ALL TO authenticated USING (true);

-- ====================================================================
-- SEED DATA (Default Hardware Catalog & Settings)
-- ====================================================================

INSERT INTO products (sku, name, tagline, description, category, price_idr, price_usd, stock_qty, image_url, specs, is_featured)
VALUES
(
    'BX-GW-02',
    'Bashix EdgeCore v2',
    'Industrial Edge Telemetry & IoT Gateway',
    'Engineered for harsh industrial environments, EdgeCore v2 provides real-time telemetry processing, zero-jitter CAN-FD communication, and hardware-accelerated eBPF protocol translation.',
    'Industrial IoT',
    4850000,
    310,
    42,
    '/products/edgecore-v2.png',
    '["Quad RISC-V 64-bit @ 1.8GHz", "Dual Gigabit Ethernet with TSN support", "Optically Isolated RS-485 / Modbus", "Hardware eBPF packet filter engine", "DIN-rail IP40 anodized aluminum chassis"]'::jsonb,
    true
),
(
    'BX-AI-40',
    'Bashix NeuralNode 400',
    '32 TOPS Edge AI Inference Accelerator',
    'Ultra-low power neural computing module designed for mission-critical computer vision, anomaly detection, and autonomous edge robotics with zero cloud dependency.',
    'Edge AI',
    12500000,
    799,
    18,
    '/products/neuralnode-400.png',
    '["32 TOPS INT8 / 16 TFLOPS FP16 NPU", "16GB LPDDR5 6400 MT/s Unified RAM", "Dual MIPI-CSI 4-lane camera inputs", "PCIe Gen 4 x4 M.2 2280 form factor", "Passive cooling under 15W TDP"]'::jsonb,
    true
),
(
    'BX-SN-01',
    'Bashix SensorGrid Pro',
    'Industrial Environmental & Vibration Telemetry Node',
    'Precision tri-axis high-g vibration monitoring, ambient pressure, humidity, and temperature diagnostics with dual LoRaWAN long-range and WiFi 6 edge mesh.',
    'Sensors',
    1950000,
    125,
    85,
    '/products/sensorgrid-pro.png',
    '["Tri-axis MEMS accelerometer (±16g / 10kHz)", "IP67 sealed ruggedized enclosure", "LoRaWAN 868/915 MHz + WiFi 6 BLE 5.3", "Up to 5-year internal LiSOCl2 battery", "End-to-end AES-256 telemetry encryption"]'::jsonb,
    true
),
(
    'BX-BR-08',
    'Bashix CAN-FD PCIe Bridge',
    'Deterministic Dual CAN-FD + LIN Telemetry Interface',
    'Low-latency industrial bus analyzer and transceiver card with sub-microsecond hardware timestamping for automotive diagnostics and aerospace avionics.',
    'Bus Adapters',
    3200000,
    205,
    24,
    '/products/canfd-bridge.png',
    '["Dual isolated CAN-FD channels up to 8 Mbps", "Single LIN 2.2 / K-Line interface", "Hardware microsecond timestamping engine", "Low-profile PCIe x1 form factor", "Full Linux SocketCAN driver support"]'::jsonb,
    true
)
ON CONFLICT (sku) DO NOTHING;

INSERT INTO site_settings (key, value)
VALUES
(
    'landing_cms',
    '{
        "hero_badge": "Hardware v2.4 // EdgeCore Modular Gateway Live",
        "hero_headline": "Hard Engineering. Scaled to Perfection.",
        "hero_subtitle": "We engineer mission-critical distributed architectures, industrial IoT telemetry, edge AI acceleration, and manufacture high-reliability physical engineering hardware.",
        "announcement_active": true,
        "contact_email": "engineering@bashix.id",
        "contact_phone": "+62 21 8062 5590",
        "default_currency": "IDR"
    }'::jsonb
)
ON CONFLICT (key) DO NOTHING;
