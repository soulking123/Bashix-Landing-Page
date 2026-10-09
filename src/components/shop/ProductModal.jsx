import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  const { currency } = useStore();
  const [activeTab, setActiveTab] = useState('diagram');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setActiveTab('diagram');
      setDownloadNotice(false);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const details = product.technical_details || {};
  const stock = product.stock_qty ?? 0;
  const isOutOfStock = stock <= 0;

  const handleAdd = () => {
    if (isOutOfStock) return;
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleDownloadDatasheet = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 3000);
  };

  const formattedIdr = `Rp ${(product.price_idr || 0).toLocaleString('id-ID')}`;
  const formattedUsd = `$${(product.price_usd || 0).toLocaleString('en-US')}`;

  const tabs = [
    { id: 'diagram', label: 'Architecture & Diagram' },
    { id: 'electrical', label: 'Electrical Ratings' },
    { id: 'pinout', label: 'Pinout Breakdown' },
    { id: 'dimensions', label: 'Dimensions & Compliance' }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#181B15]/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div
        className="bg-[#FAFAF8] text-[#181B15] rounded-2xl md:rounded-3xl border border-[#E2E6DC] shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E2E6DC] bg-[#FFFFFF] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#ECEFE8] text-[#364121]">
                {product.sku}
              </span>
              <span className="text-xs font-mono text-[#55623B] uppercase tracking-wider">
                {product.category}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#EEF2E8] text-[#364121]">
                {stock > 0 ? `${stock} units in inventory` : 'Out of stock'}
              </span>
            </div>
            <h2
              id="modal-product-title"
              className="font-display text-2xl sm:text-3xl text-[#181B15] font-medium tracking-tight"
            >
              {product.name}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#55623B] mt-0.5">
              {product.tagline}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-[#EEF2E8] text-[#4A4E44] hover:text-[#181B15] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close datasheet modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-[#E2E6DC] bg-[#FAFAF8] px-4 sm:px-6 flex overflow-x-auto gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-mono font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#364121] text-[#364121]'
                  : 'border-transparent text-[#757B6E] hover:text-[#181B15]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-8 space-y-6">
          {/* Tab 1: Architecture & Diagram */}
          {activeTab === 'diagram' && (
            <div className="space-y-6">
              {/* Product Overview Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#FFFFFF] p-5 rounded-2xl border border-[#E2E6DC]">
                <div className="md:col-span-5 aspect-[4/3] rounded-xl overflow-hidden bg-[#FAFAF8] border border-[#ECEFE8] flex items-center justify-center">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-7 space-y-3">
                  <h4 className="font-display text-xl text-[#181B15] font-medium">
                    Functional Engineering Architecture
                  </h4>
                  <p className="text-sm text-[#4A4E44] leading-relaxed">
                    {product.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="p-2.5 rounded-lg bg-[#FAFAF8] border border-[#ECEFE8]">
                      <div className="text-[10px] font-mono text-[#757B6E] uppercase">Isolation Barrier</div>
                      <div className="text-xs font-mono font-semibold text-[#181B15]">
                        {details.isolation_rating || '2.5 kV Galvanic'}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#FAFAF8] border border-[#ECEFE8]">
                      <div className="text-[10px] font-mono text-[#757B6E] uppercase">Thermal Window</div>
                      <div className="text-xs font-mono font-semibold text-[#181B15]">
                        {details.operating_temp || '-40°C to +85°C'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Functional Block Diagram Flow */}
              <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E2E6DC]">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#55623B] font-semibold mb-3">
                  Internal Block Diagram Topology
                </h4>
                {details.block_diagram && details.block_diagram.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {details.block_diagram.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#ECEFE8] relative"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-5 h-5 rounded-full bg-[#D4DEC5] text-[#181B15] font-mono text-[10px] font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="font-mono text-xs font-bold text-[#181B15]">
                            {item.block}
                          </span>
                        </div>
                        <p className="text-xs text-[#4A4E44] leading-relaxed pl-7">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#757B6E] font-mono">No diagram topology available.</p>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Electrical Ratings */}
          {activeTab === 'electrical' && (
            <div className="bg-[#FFFFFF] p-5 sm:p-6 rounded-2xl border border-[#E2E6DC] space-y-5">
              <h4 className="font-display text-xl text-[#181B15] font-medium">
                Electrical Specifications & Power Conditioning
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#ECEFE8]">
                  <span className="text-xs font-mono text-[#757B6E] block mb-1">Supply Input Voltage</span>
                  <span className="text-sm font-mono font-bold text-[#181B15]">
                    {details.power_input || '9V to 36V DC Wide Input'}
                  </span>
                  <span className="text-xs text-[#4A4E44] block mt-1">
                    Integrated TVS transient suppressor and reverse battery diode clamp.
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#ECEFE8]">
                  <span className="text-xs font-mono text-[#757B6E] block mb-1">Power Consumption</span>
                  <span className="text-sm font-mono font-bold text-[#181B15]">
                    {details.power_consumption || '12W nominal operating'}
                  </span>
                  <span className="text-xs text-[#4A4E44] block mt-1">
                    Low quiescent standby with dynamic frequency scaling.
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#ECEFE8]">
                  <span className="text-xs font-mono text-[#757B6E] block mb-1">Galvanic Isolation</span>
                  <span className="text-sm font-mono font-bold text-[#181B15]">
                    {details.isolation_rating || '2.5 kV RMS Barrier'}
                  </span>
                  <span className="text-xs text-[#4A4E44] block mt-1">
                    Complete optical and capacitive isolation between logic and field wiring.
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#FAFAF8] border border-[#ECEFE8]">
                  <span className="text-xs font-mono text-[#757B6E] block mb-1">Thermal Range</span>
                  <span className="text-sm font-mono font-bold text-[#181B15]">
                    {details.operating_temp || '-40°C to +85°C'}
                  </span>
                  <span className="text-xs text-[#4A4E44] block mt-1">
                    Zero thermal throttling within specified ambient limits.
                  </span>
                </div>
              </div>

              {/* Hardware Feature Highlights */}
              <div className="pt-3 border-t border-[#ECEFE8]">
                <h5 className="font-mono text-xs uppercase tracking-wider text-[#55623B] font-semibold mb-3">
                  Verified Engineering Specs
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.specs?.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-mono text-[#4A4E44]">
                      <span className="text-[#364121] font-bold">✓</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 3: Pinout Breakdown */}
          {activeTab === 'pinout' && (
            <div className="bg-[#FFFFFF] p-5 sm:p-6 rounded-2xl border border-[#E2E6DC] space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-xl text-[#181B15] font-medium">
                  Terminal Pinout & Signal Mapping
                </h4>
                <span className="text-xs font-mono text-[#55623B] bg-[#EEF2E8] px-2.5 py-1 rounded-md">
                  Phoenix Contact / M12 Compatible
                </span>
              </div>
              <p className="text-xs text-[#4A4E44]">
                All signal terminals are protected against continuous short-circuit to DC power rails and ground.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border border-[#ECEFE8] rounded-xl overflow-hidden">
                  <thead className="bg-[#FAFAF8] text-[#364121] border-b border-[#ECEFE8]">
                    <tr>
                      <th className="py-2.5 px-3 font-semibold">Pin</th>
                      <th className="py-2.5 px-3 font-semibold">Signal</th>
                      <th className="py-2.5 px-3 font-semibold">Type</th>
                      <th className="py-2.5 px-3 font-semibold">Level</th>
                      <th className="py-2.5 px-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ECEFE8]">
                    {details.pinout && details.pinout.length > 0 ? (
                      details.pinout.map((p, idx) => (
                        <tr key={idx} className="hover:bg-[#FAFAF8] transition-colors">
                          <td className="py-2.5 px-3 font-bold text-[#181B15]">{p.pin}</td>
                          <td className="py-2.5 px-3 text-[#364121] font-semibold">{p.signal}</td>
                          <td className="py-2.5 px-3 text-[#757B6E]">{p.type}</td>
                          <td className="py-2.5 px-3 text-[#181B15]">{p.voltage}</td>
                          <td className="py-2.5 px-3 text-[#4A4E44]">{p.description}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-4 text-center text-[#757B6E]">
                          Standard industrial terminal pinout. Contact support for wiring diagram.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 4: Dimensions & Compliance */}
          {activeTab === 'dimensions' && (
            <div className="bg-[#FFFFFF] p-5 sm:p-6 rounded-2xl border border-[#E2E6DC] space-y-5">
              <h4 className="font-display text-xl text-[#181B15] font-medium">
                Physical Geometry & Industrial Certification
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#ECEFE8]">
                  <span className="text-[10px] font-mono text-[#757B6E] uppercase block mb-1">Dimensions</span>
                  <span className="text-xs font-mono font-bold text-[#181B15] block">
                    {details.dimensions || '142 x 88 x 42 mm'}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#ECEFE8]">
                  <span className="text-[10px] font-mono text-[#757B6E] uppercase block mb-1">Unit Weight</span>
                  <span className="text-xs font-mono font-bold text-[#181B15] block">
                    {details.weight || '460 g'}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#ECEFE8]">
                  <span className="text-[10px] font-mono text-[#757B6E] uppercase block mb-1">Ingress Rating</span>
                  <span className="text-xs font-mono font-bold text-[#181B15] block">
                    {details.ingress_protection || 'IP40 / IP67 Rugged'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#55623B] font-semibold block">
                  Mounting & Thermal Dissipation
                </span>
                <p className="text-xs text-[#4A4E44] leading-relaxed">
                  Mounting: {details.mounting || 'Standard 35mm DIN-rail (EN 60715) or direct wall mount.'}
                </p>
                <p className="text-xs text-[#4A4E44] leading-relaxed">
                  Cooling: {details.cooling || 'Passive convection heatsink fins. No moving parts.'}
                </p>
              </div>

              <div className="pt-3 border-t border-[#ECEFE8]">
                <span className="text-xs font-mono uppercase tracking-wider text-[#55623B] font-semibold block mb-2">
                  Regulatory Compliance & Standards
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {details.compliance?.map((comp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-[#4A4E44]">
                      <span className="text-[#364121] font-bold">✓</span>
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-[#E2E6DC] bg-[#FFFFFF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div>
              <div className="text-[10px] font-mono text-[#757B6E] uppercase">Unit Pricing</div>
              <div className="text-xl font-mono font-bold text-[#181B15]">
                {currency === 'USD' ? formattedUsd : formattedIdr}
              </div>
            </div>
            <div className="text-xs font-mono text-[#55623B]">
              Ref: {currency === 'USD' ? formattedIdr : formattedUsd}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end flex-wrap">
            {/* Quantity Stepper */}
            <div className="inline-flex items-center border border-[#E2E6DC] rounded-full bg-[#FAFAF8] p-0.5">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#181B15] hover:bg-[#EEF2E8] cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-8 text-center font-mono text-xs font-semibold text-[#181B15]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#181B15] hover:bg-[#EEF2E8] cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Download Spec Sheet */}
            <button
              type="button"
              onClick={handleDownloadDatasheet}
              className="btn-secondary-pill text-xs cursor-pointer"
              aria-label="Download datasheet document"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Datasheet PDF</span>
            </button>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAdd}
              disabled={isOutOfStock}
              className={`btn-primary-pill text-xs cursor-pointer ${
                isOutOfStock ? 'opacity-40 cursor-not-allowed hover:transform-none' : ''
              }`}
              aria-label={`Add ${quantity} units to order`}
            >
              {isAdded ? (
                <span>Added ({quantity}) ✓</span>
              ) : (
                <span>Add to Order</span>
              )}
            </button>
          </div>
        </div>

        {/* Download Notice Toast */}
        {downloadNotice && (
          <div className="bg-[#364121] text-[#FAFAF8] text-xs font-mono py-2 px-4 text-center animate-in slide-in-from-bottom duration-200">
            Technical datasheet for {product.name} ({product.sku}) generated. Proforma datasheet bundle ready.
          </div>
        )}
      </div>
    </div>
  );
}
