import React from 'react';
import { useStore } from '../../context/StoreContext';

export default function AdminNav({ activeTab, onTabChange, onExit }) {
  const { isSupabaseLive, cartItemCount } = useStore();

  const tabs = [
    { id: 'analytics', label: 'Analytics' },
    { id: 'products', label: 'Hardware Products' },
    { id: 'orders', label: 'Orders & Pipeline' },
    { id: 'settings', label: 'Site Settings' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#E2E6DC] shadow-xs">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand & Database Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-medium tracking-tight text-[#181B15]">
                Bashix
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#55623B] font-semibold">
                Console
              </span>
            </div>

            {/* Persistence Status Badge */}
            <div
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium ${
                isSupabaseLive
                  ? 'bg-[#EEF2E8] text-[#364121] border border-[#D4DEC5]'
                  : 'bg-[#FAFAF8] text-[#757B6E] border border-[#E2E6DC]'
              }`}
              title={isSupabaseLive ? 'Connected to live Supabase PostgreSQL' : 'Local persistent storage fallback active'}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSupabaseLive ? 'bg-[#364121]' : 'bg-[#757B6E]'
                }`}
              ></span>
              <span>{isSupabaseLive ? 'Supabase Live' : 'Local Storage Mode'}</span>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[#FAFAF8] p-1 rounded-full border border-[#E2E6DC]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#364121] text-[#FFFFFF]'
                    : 'text-[#4A4E44] hover:text-[#181B15] hover:bg-[#EEF2E8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right Action: Back to Site */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onExit}
              className="btn-secondary-pill text-xs py-2 px-3 sm:px-4 cursor-pointer"
              aria-label="Return to public landing page"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Site</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs Row */}
        <div className="md:hidden flex overflow-x-auto gap-2 py-2.5 border-t border-[#ECEFE8]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#364121] text-[#FFFFFF]'
                  : 'bg-[#FAFAF8] text-[#4A4E44] border border-[#E2E6DC]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
