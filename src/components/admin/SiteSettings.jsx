import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';

export default function SiteSettings() {
  const { siteConfig, updateSettings, currency, setCurrency } = useStore();
  const [formData, setFormData] = useState(siteConfig || {});
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (siteConfig) {
      setFormData(siteConfig);
    }
  }, [siteConfig]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await updateSettings(formData);
      if (formData.default_currency) {
        setCurrency(formData.default_currency);
      }
      setToastMessage('Landing page configuration updated successfully.');
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err) {
      console.error('Failed to update site settings:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-3xl">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#364121] text-[#FFFFFF] px-4 py-3 rounded-2xl shadow-xl text-xs font-mono flex items-center gap-2 border border-[#D4DEC5] animate-in slide-in-from-bottom duration-200">
          <span className="w-2 h-2 rounded-full bg-[#D4DEC5]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="text-xs font-mono font-medium text-[#55623B] tracking-wider uppercase mb-1">
          Content & System Preferences
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-[#181B15] font-medium tracking-tight">
          Landing Page CMS Settings
        </h1>
        <p className="text-sm text-[#4A4E44] mt-0.5">
          Configure live landing page announcement copy, contact endpoints, and currency default.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#E2E6DC] shadow-xs space-y-6">
        {/* Announcement Badge */}
        <div>
          <label htmlFor="hero_badge" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
            Hero Eyebrow Announcement Badge
          </label>
          <input
            id="hero_badge"
            name="hero_badge"
            type="text"
            value={formData.hero_badge || ''}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] bg-[#FAFAF8] text-sm text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
          />
        </div>

        {/* Hero Headline */}
        <div>
          <label htmlFor="hero_headline" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
            Main Hero Headline
          </label>
          <input
            id="hero_headline"
            name="hero_headline"
            type="text"
            value={formData.hero_headline || ''}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] bg-[#FAFAF8] text-sm text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
          />
        </div>

        {/* Hero Subtitle */}
        <div>
          <label htmlFor="hero_subtitle" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
            Hero Value Proposition Subtitle
          </label>
          <textarea
            id="hero_subtitle"
            name="hero_subtitle"
            rows={3}
            value={formData.hero_subtitle || ''}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] bg-[#FAFAF8] text-sm text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
          />
        </div>

        {/* Contact Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact_email" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
              Engineering Support Email
            </label>
            <input
              id="contact_email"
              name="contact_email"
              type="email"
              value={formData.contact_email || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] bg-[#FAFAF8] text-sm text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
            />
          </div>

          <div>
            <label htmlFor="contact_phone" className="block text-xs font-mono font-medium text-[#4A4E44] mb-1">
              Hotline / WhatsApp Endpoint
            </label>
            <input
              id="contact_phone"
              name="contact_phone"
              type="text"
              value={formData.contact_phone || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E6DC] bg-[#FAFAF8] text-sm text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
            />
          </div>
        </div>

        {/* Currency Switcher Default */}
        <div className="pt-2 border-t border-[#ECEFE8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-medium text-[#181B15]">
              Default Storefront Currency
            </div>
            <div className="text-xs text-[#757B6E]">
              Selected currency displays as primary across product cards and checkout.
            </div>
          </div>

          <div className="inline-flex rounded-full bg-[#FAFAF8] p-1 border border-[#E2E6DC]">
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, default_currency: 'IDR' }))}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer ${
                formData.default_currency === 'IDR'
                  ? 'bg-[#364121] text-[#FFFFFF]'
                  : 'text-[#4A4E44] hover:text-[#181B15]'
              }`}
            >
              IDR (Rp)
            </button>
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, default_currency: 'USD' }))}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer ${
                formData.default_currency === 'USD'
                  ? 'bg-[#364121] text-[#FFFFFF]'
                  : 'text-[#4A4E44] hover:text-[#181B15]'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-[#ECEFE8] flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="btn-primary-pill text-xs py-2 px-6 cursor-pointer"
          >
            {isSaving ? 'Applying Settings...' : 'Save Configuration'}
          </button>
        </div>
      </form>
    </div>
  );
}
