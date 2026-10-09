import React, { useState, useEffect } from 'react';

export default function ProductFormModal({ isOpen, product, onClose, onSave }) {
  const isEditing = Boolean(product && product.id);

  const initialFormState = {
    name: '',
    sku: '',
    tagline: '',
    category: 'Edge Compute',
    price_idr: 5000000,
    price_usd: 320,
    stock_qty: 25,
    image_url: '/images/products/titan-edge.jpg',
    description: '',
    specs: ['9V to 36V Wide Input DC', 'Dual TSN Gigabit Ethernet', '-40°C to +85°C Operating Temp'],
    dimensions: '142 x 88 x 42 mm',
    power_input: '9V to 36V DC',
    operating_temp: '-40°C to +85°C',
    ingress_protection: 'IP40 / IP67 Rugged',
    isolation_rating: '2.5 kV Galvanic Isolation',
    is_active: true,
    is_featured: false
  };

  const [formData, setFormData] = useState(initialFormState);
  const [newSpecBullet, setNewSpecBullet] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available image presets in project
  const imagePresets = [
    { label: 'Titan-Edge Neural Unit', value: '/images/products/titan-edge.jpg' },
    { label: 'Telemetry Gateway IP67', value: '/images/products/telemetry-gateway.jpg' },
    { label: 'Actuator Core 30A Servo', value: '/images/products/actuator-core.jpg' },
    { label: 'Sensor Pod 316L Probe', value: '/images/products/sensor-pod.jpg' },
    { label: 'Hardware Sculpture Module', value: '/images/area/engineering-hardware.jpg' },
  ];

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      if (product) {
        setFormData({
          name: product.name || '',
          sku: product.sku || '',
          tagline: product.tagline || '',
          category: product.category || 'Edge Compute',
          price_idr: product.price_idr || 0,
          price_usd: product.price_usd || 0,
          stock_qty: product.stock_qty ?? 0,
          image_url: product.image_url || '/images/products/titan-edge.jpg',
          description: product.description || '',
          specs: product.specs && product.specs.length > 0 ? [...product.specs] : [''],
          dimensions: product.technical_details?.dimensions || '142 x 88 x 42 mm',
          power_input: product.technical_details?.power_input || '9V to 36V DC',
          operating_temp: product.technical_details?.operating_temp || '-40°C to +85°C',
          ingress_protection: product.technical_details?.ingress_protection || 'IP40 / IP67',
          isolation_rating: product.technical_details?.isolation_rating || '2.5 kV Galvanic',
          is_active: product.is_active !== false,
          is_featured: Boolean(product.is_featured)
        });
      } else {
        setFormData(initialFormState);
      }
      setErrors({});
      setNewSpecBullet('');
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleAddSpecBullet = () => {
    if (!newSpecBullet.trim()) return;
    setFormData((prev) => ({
      ...prev,
      specs: [...prev.specs, newSpecBullet.trim()]
    }));
    setNewSpecBullet('');
  };

  const handleRemoveSpecBullet = (index) => {
    setFormData((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index)
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Hardware model name is required';
    if (!formData.sku.trim()) newErrors.sku = 'SKU / Model tag is required';
    if (Number(formData.price_idr) <= 0) newErrors.price_idr = 'Price in IDR must be greater than 0';
    if (Number(formData.price_usd) <= 0) newErrors.price_usd = 'Price in USD must be greater than 0';
    if (Number(formData.stock_qty) < 0) newErrors.stock_qty = 'Stock quantity cannot be negative';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const payload = {
        name: formData.name.trim(),
        sku: formData.sku.trim().toUpperCase(),
        tagline: formData.tagline.trim(),
        category: formData.category,
        price_idr: Number(formData.price_idr),
        price_usd: Number(formData.price_usd),
        stock_qty: Number(formData.stock_qty),
        image_url: formData.image_url.trim(),
        description: formData.description.trim(),
        specs: formData.specs.filter((s) => s.trim().length > 0),
        technical_details: {
          dimensions: formData.dimensions,
          power_input: formData.power_input,
          operating_temp: formData.operating_temp,
          ingress_protection: formData.ingress_protection,
          isolation_rating: formData.isolation_rating,
          compliance: [
            'EN 61000-6-2 (Industrial Immunity)',
            'EN 61000-6-4 (Emissions)',
            'RoHS 3 Compliant'
          ]
        },
        is_active: formData.is_active,
        is_featured: formData.is_featured
      };

      await onSave(payload);
      onClose();
    } catch (err) {
      console.error('Save product failed:', err);
      setErrors((prev) => ({ ...prev, general: 'Failed to save product. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#181B15]/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-form-title"
    >
      <div
        className="bg-[#FAFAF8] text-[#181B15] rounded-2xl md:rounded-3xl border border-[#E2E6DC] shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E2E6DC] bg-[#FFFFFF] flex items-center justify-between">
          <div>
            <h2 id="product-form-title" className="font-display text-2xl font-medium text-[#181B15]">
              {isEditing ? `Edit Hardware Model: ${product.name}` : 'Provision New Hardware Module'}
            </h2>
            <p className="text-xs font-mono text-[#55623B] mt-0.5">
              {isEditing ? `SKU: ${product.sku}` : 'Add a new production node into the catalog'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-[#EEF2E8] text-[#4A4E44] hover:text-[#181B15] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close form modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form id="product-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-8 space-y-6">
          {errors.general && (
            <div className="p-3.5 rounded-xl bg-[#FFF1F0] border border-[#FFCCC7] text-xs font-mono text-[#CF1322]">
              {errors.general}
            </div>
          )}

          {/* Primary Identity Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
                Hardware Model Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Bashix EdgeCore Modular"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] bg-[#FFFFFF] text-sm text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
              />
              {errors.name && <p className="text-xs font-mono text-[#CF1322] mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="sku" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
                Model SKU / Part Tag *
              </label>
              <input
                id="sku"
                name="sku"
                type="text"
                required
                value={formData.sku}
                onChange={handleChange}
                placeholder="BX-MOD-01"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] bg-[#FFFFFF] text-sm font-mono text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
              />
              {errors.sku && <p className="text-xs font-mono text-[#CF1322] mt-1">{errors.sku}</p>}
            </div>
          </div>

          {/* Category & Tagline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
                Hardware Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] bg-[#FFFFFF] text-sm text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
              >
                <option value="Edge Compute">Edge Compute</option>
                <option value="Telemetry Hubs">Telemetry Hubs</option>
                <option value="Robotics Motion">Robotics Motion</option>
                <option value="Sensors & Probes">Sensors & Probes</option>
              </select>
            </div>

            <div>
              <label htmlFor="tagline" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
                Engineering Tagline
              </label>
              <input
                id="tagline"
                name="tagline"
                type="text"
                value={formData.tagline}
                onChange={handleChange}
                placeholder="Compact DIN-Rail Compute Gateway"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] bg-[#FFFFFF] text-sm text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
              />
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FFFFFF] p-4 rounded-2xl border border-[#E2E6DC]">
            <div>
              <label htmlFor="price_idr" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
                Price IDR (Rp) *
              </label>
              <input
                id="price_idr"
                name="price_idr"
                type="number"
                min="0"
                step="50000"
                required
                value={formData.price_idr}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E2E6DC] bg-[#FAFAF8] text-sm font-mono text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
              />
              {errors.price_idr && <p className="text-xs font-mono text-[#CF1322] mt-1">{errors.price_idr}</p>}
            </div>

            <div>
              <label htmlFor="price_usd" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
                Price USD ($) *
              </label>
              <input
                id="price_usd"
                name="price_usd"
                type="number"
                min="0"
                step="5"
                required
                value={formData.price_usd}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E2E6DC] bg-[#FAFAF8] text-sm font-mono text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
              />
              {errors.price_usd && <p className="text-xs font-mono text-[#CF1322] mt-1">{errors.price_usd}</p>}
            </div>

            <div>
              <label htmlFor="stock_qty" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
                Inventory Stock (Units) *
              </label>
              <input
                id="stock_qty"
                name="stock_qty"
                type="number"
                min="0"
                required
                value={formData.stock_qty}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E2E6DC] bg-[#FAFAF8] text-sm font-mono text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
              />
              {errors.stock_qty && <p className="text-xs font-mono text-[#CF1322] mt-1">{errors.stock_qty}</p>}
            </div>
          </div>

          {/* Visual Render Image */}
          <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#E2E6DC] space-y-3">
            <label className="block text-xs font-mono font-medium text-[#4A4E44]">
              Hardware Studio Render Image
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#FAFAF8] border border-[#ECEFE8] flex-shrink-0 flex items-center justify-center">
                <img
                  src={formData.image_url}
                  alt="Preview render"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/products/titan-edge.jpg';
                  }}
                />
              </div>

              <div className="flex-1 space-y-2 w-full">
                <select
                  value={formData.image_url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-[#E2E6DC] bg-[#FAFAF8] text-[#181B15]"
                >
                  {imagePresets.map((preset) => (
                    <option key={preset.value} value={preset.value}>
                      {preset.label} ({preset.value})
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="Or enter custom URL path"
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-xl border border-[#E2E6DC] bg-[#FAFAF8] text-[#181B15]"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
              Engineering Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Engineered for real-time edge computer vision, eBPF telemetry pipelines, and deterministic robotic control."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] bg-[#FFFFFF] text-sm text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
            />
            {errors.description && <p className="text-xs font-mono text-[#CF1322] mt-1">{errors.description}</p>}
          </div>

          {/* Specification Bullets */}
          <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#E2E6DC] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-medium text-[#4A4E44]">
                Technical Specification Bullets
              </label>
              <span className="text-[10px] font-mono text-[#757B6E]">
                {formData.specs.length} bullets added
              </span>
            </div>

            <div className="space-y-2">
              {formData.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#364121] select-none">•</span>
                  <span className="text-xs font-mono text-[#181B15] flex-1 truncate">{spec}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecBullet(i)}
                    className="text-xs font-mono text-[#757B6E] hover:text-[#9A1E1E] p-1"
                    aria-label={`Remove specification ${spec}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#ECEFE8]">
              <input
                type="text"
                value={newSpecBullet}
                onChange={(e) => setNewSpecBullet(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSpecBullet();
                  }
                }}
                placeholder="Add specification bullet (e.g. 2.5kV TVS protection)"
                className="flex-1 px-3 py-1.5 text-xs font-mono rounded-xl border border-[#E2E6DC] bg-[#FAFAF8] text-[#181B15]"
              />
              <button
                type="button"
                onClick={handleAddSpecBullet}
                className="btn-secondary-pill text-xs py-1.5 px-3 cursor-pointer"
              >
                Add Spec
              </button>
            </div>
          </div>

          {/* Technical Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FFFFFF] p-4 rounded-2xl border border-[#E2E6DC]">
            <div>
              <label htmlFor="dimensions" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
                Mechanical Dimensions
              </label>
              <input
                id="dimensions"
                name="dimensions"
                type="text"
                value={formData.dimensions}
                onChange={handleChange}
                placeholder="142 x 88 x 42 mm"
                className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-[#E2E6DC] bg-[#FAFAF8]"
              />
            </div>
            <div>
              <label htmlFor="power_input" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
                Power Input Rating
              </label>
              <input
                id="power_input"
                name="power_input"
                type="text"
                value={formData.power_input}
                onChange={handleChange}
                placeholder="9V to 36V DC"
                className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-[#E2E6DC] bg-[#FAFAF8]"
              />
            </div>
            <div>
              <label htmlFor="operating_temp" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
                Operating Temperature
              </label>
              <input
                id="operating_temp"
                name="operating_temp"
                type="text"
                value={formData.operating_temp}
                onChange={handleChange}
                placeholder="-40°C to +85°C"
                className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-[#E2E6DC] bg-[#FAFAF8]"
              />
            </div>
            <div>
              <label htmlFor="isolation_rating" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
                Galvanic Isolation Barrier
              </label>
              <input
                id="isolation_rating"
                name="isolation_rating"
                type="text"
                value={formData.isolation_rating}
                onChange={handleChange}
                placeholder="2.5 kV RMS"
                className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-[#E2E6DC] bg-[#FAFAF8]"
              />
            </div>
          </div>

          {/* Visibility Toggles */}
          <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-[#FFFFFF] border border-[#E2E6DC]">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="w-4 h-4 rounded text-[#364121] focus:ring-[#364121]"
              />
              <span className="text-xs font-mono font-medium text-[#181B15]">
                Show on Public Landing Page Storefront
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="w-4 h-4 rounded text-[#364121] focus:ring-[#364121]"
              />
              <span className="text-xs font-mono font-medium text-[#181B15]">
                Mark as Featured Hardware
              </span>
            </label>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-[#E2E6DC] bg-[#FFFFFF] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary-pill text-xs py-2 px-4 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="product-form"
            disabled={isSubmitting}
            className="btn-primary-pill text-xs py-2 px-5 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Saving Changes...</span>
            ) : (
              <span>{isEditing ? 'Update Hardware Model' : 'Save & Publish to Catalog'}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
