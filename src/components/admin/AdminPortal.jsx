import React, { useState } from 'react';
import AdminNav from './AdminNav';
import AnalyticsView from './AnalyticsView';
import ProductManager from './ProductManager';
import OrdersTable from './OrdersTable';
import SiteSettings from './SiteSettings';
import { useStore } from '../../context/StoreContext';

export default function AdminPortal() {
  const { setActiveView } = useStore();
  const [activeTab, setActiveTab] = useState('analytics');

  const handleExit = () => {
    window.location.hash = '';
    setActiveView('landing');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#181B15] flex flex-col selection:bg-[#D4DEC5] selection:text-[#181B15]">
      {/* Top Admin Header */}
      <AdminNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onExit={handleExit}
      />

      {/* Main Admin View Container */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'analytics' && (
          <AnalyticsView onNavigateTab={(tab) => setActiveTab(tab)} />
        )}
        {activeTab === 'products' && <ProductManager />}
        {activeTab === 'orders' && <OrdersTable />}
        {activeTab === 'settings' && <SiteSettings />}
      </main>

      {/* Admin Footer */}
      <footer className="py-6 border-t border-[#E2E6DC] bg-[#FFFFFF] text-center text-xs font-mono text-[#757B6E]">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Bashix Mission-Critical Engineering Platform &bull; Admin Console</span>
          <span>Security Level: Operational Staff</span>
        </div>
      </footer>
    </div>
  );
}
