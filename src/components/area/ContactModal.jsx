import React, { useState, useEffect, useRef } from 'react';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: 'Industrial IoT & Telemetry',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const modalRef = useRef(null);
  const initialFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => initialFocusRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setStatus('idle');
      setErrorMessage('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus('error');
      setErrorMessage('Please provide both your name and engineering contact email.');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        ref={modalRef}
        className="bg-[#FFFFFF] border border-[#E2E6DC] rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative animate-in zoom-in-95 duration-200"
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

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-[#D4DEC5] text-[#364121] flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 id="contact-modal-title" className="font-display text-2xl text-[#181B15] mb-2">
              Engineering Inquiry Received
            </h3>
            <p className="text-sm text-[#4A4E44] max-w-xs mx-auto mb-6">
              Thank you, {formData.name}. Our systems engineering team will review your specifications and reply to {formData.email} within 24 hours.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="btn-primary-pill mx-auto"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-mono font-medium text-[#55623B] uppercase tracking-wider">
                Technical Consultation
              </span>
              <h3 id="contact-modal-title" className="font-display text-2xl sm:text-3xl text-[#181B15] mt-1 tracking-tight">
                Review Your Hardware Scope
              </h3>
              <p className="text-sm text-[#4A4E44] mt-2">
                Connect with our hardware architects to evaluate bus protocols, power budgets, and field deployment requirements.
              </p>
            </div>

            {status === 'error' && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name-input" className="block text-xs font-medium text-[#181B15] mb-1.5">
                  Full Name
                </label>
                <input
                  id="name-input"
                  ref={initialFocusRef}
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Alex Mercer"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] text-sm text-[#181B15] bg-[#FAFAF8] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#364121]"
                />
              </div>

              <div>
                <label htmlFor="email-input" className="block text-xs font-medium text-[#181B15] mb-1.5">
                  Work / Engineering Email
                </label>
                <input
                  id="email-input"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex.mercer@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] text-sm text-[#181B15] bg-[#FAFAF8] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#364121]"
                />
              </div>

              <div>
                <label htmlFor="domain-input" className="block text-xs font-medium text-[#181B15] mb-1.5">
                  Engineering Domain
                </label>
                <select
                  id="domain-input"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] text-sm text-[#181B15] bg-[#FAFAF8] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#364121]"
                >
                  <option value="Industrial IoT & Telemetry">Industrial IoT & Telemetry</option>
                  <option value="Edge Computing & AI">Edge Computing & AI Acceleration</option>
                  <option value="Robotics & Motion Control">Robotics & Field Motion Control</option>
                  <option value="Custom Electronic Design">Custom Electronic Design & Schematics</option>
                </select>
              </div>

              <div>
                <label htmlFor="message-input" className="block text-xs font-medium text-[#181B15] mb-1.5">
                  Deployment Specifications & Architecture Notes
                </label>
                <textarea
                  id="message-input"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Specify operating voltages, bus protocols (CAN-FD, RS-485, TSN), or environmental conditions..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] text-sm text-[#181B15] bg-[#FAFAF8] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#364121] resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-sm font-medium text-[#4A4E44] hover:text-[#181B15] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary-pill cursor-pointer"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit Scope ↗'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
