import React, { useEffect, useRef } from 'react';

export default function DiscoverModal({ isOpen, onClose, onOpenContact }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const features = [
    {
      title: '2.5kV Galvanic Isolation Barriers',
      detail:
        'Optically isolated transceivers protect sensitive microcontroller silicon from high-voltage inductive spikes and ground loops across long industrial fieldbuses.',
    },
    {
      title: 'Deterministic IEEE 802.1Qbv TSN Networking',
      detail:
        'Time-Sensitive Networking guarantees hard real-time packet delivery across industrial Ethernet loops with sub-microsecond hardware timestamping.',
    },
    {
      title: 'Native Linux Kernel & eBPF Telemetry',
      detail:
        'Full upstream Linux support with SocketCAN drivers, open source device trees, and in-kernel eBPF packet filters for zero-overhead telemetry collection.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="discover-modal-title"
    >
      <div
        ref={modalRef}
        className="bg-[#FFFFFF] border border-[#E2E6DC] rounded-3xl shadow-2xl w-full max-w-xl p-6 sm:p-8 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#757B6E] hover:text-[#181B15] hover:bg-[#F0F2EB] transition-colors focus-visible:ring-2 focus-visible:ring-[#364121]"
          aria-label="Close dialog"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <span className="text-xs font-mono font-medium text-[#55623B] uppercase tracking-wider">
            Architecture & Datasheet
          </span>
          <h3 id="discover-modal-title" className="font-display text-2xl sm:text-3xl text-[#181B15] mt-1 tracking-tight">
            Engineered for Zero Downtime
          </h3>
          <p className="text-sm text-[#4A4E44] mt-2 leading-relaxed">
            Every layer of the Bashix platform is built to withstand extreme thermal, electrical, and vibrational transients on factory floors.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {features.map((feat) => (
            <div key={feat.title} className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E2E6DC]">
              <h4 className="text-sm font-medium text-[#181B15] mb-1">
                {feat.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#4A4E44] leading-relaxed">
                {feat.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#ECEFE8]">
          <span className="text-xs font-mono text-[#757B6E]">
            Hardware Architecture v2.4 // Rev C
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[#4A4E44] hover:text-[#181B15] transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="btn-primary-pill cursor-pointer"
            >
              <span>Consult Engineers</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H9M17 7V15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
