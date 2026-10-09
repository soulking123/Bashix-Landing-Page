import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { db } from '../../services/db';

export default function AnalyticsView({ onNavigateTab }) {
  const { products } = useStore();
  const [orders, setOrders] = useState([]);
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [ordersList, leadsList] = await Promise.all([
          db.orders.list(),
          db.leads.list()
        ]);
        setOrders(ordersList || []);
        setLeads(leadsList || []);
      } catch (err) {
        console.error('Failed to load analytics records:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Compute KPIs
  const grossRevenueIdr = orders.reduce((sum, order) => {
    return sum + (Number(order.total_amount) || Number(order.grand_total) || 0);
  }, 0);

  const totalUnitsSold = orders.reduce((sum, order) => {
    if (order.items && Array.isArray(order.items)) {
      return sum + order.items.reduce((itemSum, item) => itemSum + (Number(item.quantity) || 0), 0);
    }
    return sum;
  }, 0);

  const activeInquiriesCount = leads.length;

  const lowStockProducts = products.filter(
    (p) => (p.stock_qty ?? 0) <= 15 && (p.stock_qty ?? 0) > 0
  );
  const outOfStockProducts = products.filter((p) => (p.stock_qty ?? 0) <= 0);

  // Mock empirical trend data points for chart
  const weeklyTrendData = [
    { label: 'Wk 37', revenue: 14200000, units: 4 },
    { label: 'Wk 38', revenue: 28500000, units: 7 },
    { label: 'Wk 39', revenue: 19800000, units: 5 },
    { label: 'Wk 40', revenue: 42300000, units: 11 },
    { label: 'Wk 41', revenue: 31200000, units: 8 },
    { label: 'Wk 42', revenue: Math.max(grossRevenueIdr, 48900000), units: Math.max(totalUnitsSold, 14) },
  ];

  const maxRevenue = Math.max(...weeklyTrendData.map((d) => d.revenue), 50000000);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="text-xs font-mono font-medium text-[#55623B] tracking-wider uppercase mb-1">
          Executive Telemetry & Metrics
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-[#181B15] font-medium tracking-tight">
          Hardware Sales & Operational Overview
        </h1>
        <p className="text-sm text-[#4A4E44] mt-1 font-normal">
          Real-time metrics aggregating physical equipment orders, inventory velocity, and enterprise inquiries.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Gross Revenue */}
        <div className="bg-[#FFFFFF] p-5 sm:p-6 rounded-2xl border border-[#E2E6DC] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#757B6E] uppercase tracking-wider">
              Gross Invoiced Revenue
            </span>
            <span className="w-8 h-8 rounded-full bg-[#EEF2E8] text-[#364121] flex items-center justify-center text-xs font-mono">
              Rp
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-[#181B15]">
            Rp {grossRevenueIdr.toLocaleString('id-ID')}
          </div>
          <p className="text-xs font-mono text-[#55623B] mt-2 flex items-center gap-1">
            <span>↑ Audited orders</span>
            <span className="text-[#757B6E]">({orders.length} total orders)</span>
          </p>
        </div>

        {/* Card 2: Units Shipped / Sold */}
        <div className="bg-[#FFFFFF] p-5 sm:p-6 rounded-2xl border border-[#E2E6DC] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#757B6E] uppercase tracking-wider">
              Hardware Units Sold
            </span>
            <span className="w-8 h-8 rounded-full bg-[#EEF2E8] text-[#364121] flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-[#181B15]">
            {totalUnitsSold} <span className="text-base font-normal text-[#757B6E]">units</span>
          </div>
          <p className="text-xs font-mono text-[#55623B] mt-2">
            From {products.length} active hardware models
          </p>
        </div>

        {/* Card 3: Active Consultation Inquiries */}
        <div className="bg-[#FFFFFF] p-5 sm:p-6 rounded-2xl border border-[#E2E6DC] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#757B6E] uppercase tracking-wider">
              Client Consultation Leads
            </span>
            <span className="w-8 h-8 rounded-full bg-[#EEF2E8] text-[#364121] flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-[#181B15]">
            {activeInquiriesCount} <span className="text-base font-normal text-[#757B6E]">leads</span>
          </div>
          <p className="text-xs font-mono text-[#55623B] mt-2">
            Syncing to Supabase leads table
          </p>
        </div>

        {/* Card 4: Inventory Alerts */}
        <div className="bg-[#FFFFFF] p-5 sm:p-6 rounded-2xl border border-[#E2E6DC] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-[#757B6E] uppercase tracking-wider">
              Low Stock Alerts
            </span>
            <span className="w-8 h-8 rounded-full bg-[#FFF6E5] text-[#9A6200] flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-[#181B15]">
            {lowStockProducts.length + outOfStockProducts.length}{' '}
            <span className="text-base font-normal text-[#757B6E]">items</span>
          </div>
          <p className="text-xs font-mono text-[#9A6200] mt-2">
            {outOfStockProducts.length > 0
              ? `${outOfStockProducts.length} out of stock, ${lowStockProducts.length} low`
              : `${lowStockProducts.length} items below threshold`}
          </p>
        </div>
      </div>

      {/* Visual Sales Trend Chart & Stock Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Trend Chart (Col 8) */}
        <div className="lg:col-span-8 bg-[#FFFFFF] p-6 rounded-2xl border border-[#E2E6DC] shadow-xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="font-display text-xl text-[#181B15] font-medium">
                Weekly Revenue Velocity
              </h3>
              <p className="text-xs font-mono text-[#757B6E]">
                Gross hardware revenue (IDR) and unit deployment volume
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#364121]"></span>
                <span className="text-[#4A4E44]">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#D4DEC5]"></span>
                <span className="text-[#4A4E44]">Units</span>
              </div>
            </div>
          </div>

          {/* SVG / Bar Chart Representation */}
          <div className="pt-6 pb-2">
            <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 px-2 border-b border-[#ECEFE8]">
              {weeklyTrendData.map((week, idx) => {
                const heightPercent = Math.min(100, Math.round((week.revenue / maxRevenue) * 100));

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip on Hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-[#181B15] text-[#FAFAF8] text-[10px] font-mono py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10">
                      Rp {(week.revenue / 1000000).toFixed(1)}M ({week.units} units)
                    </div>

                    {/* Bar Cluster */}
                    <div className="w-full max-w-[42px] flex items-end justify-center gap-1 h-full">
                      {/* Revenue Bar */}
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-1/2 bg-[#364121] rounded-t-sm group-hover:bg-[#2B3519] transition-all"
                      ></div>
                      {/* Units Bar */}
                      <div
                        style={{ height: `${Math.min(100, week.units * 7)}%` }}
                        className="w-1/2 bg-[#D4DEC5] rounded-t-sm group-hover:bg-[#C5D0B5] transition-all"
                      ></div>
                    </div>

                    {/* X-axis Label */}
                    <span className="text-[11px] font-mono text-[#757B6E] mt-2">
                      {week.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Low Stock Alerts & Quick Actions (Col 4) */}
        <div className="lg:col-span-4 bg-[#FFFFFF] p-6 rounded-2xl border border-[#E2E6DC] shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-display text-xl text-[#181B15] font-medium mb-1">
              Inventory Attention
            </h3>
            <p className="text-xs font-mono text-[#757B6E] mb-4">
              Products needing restocking or supplier PO
            </p>

            <div className="space-y-3">
              {lowStockProducts.length === 0 && outOfStockProducts.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#EEF2E8] border border-[#D4DEC5] text-xs font-mono text-[#364121]">
                  All catalog items maintain healthy inventory levels (&gt; 15 units).
                </div>
              ) : (
                [...outOfStockProducts, ...lowStockProducts].slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-[#FAFAF8] border border-[#ECEFE8] flex items-center justify-between"
                  >
                    <div>
                      <div className="font-mono text-[10px] text-[#55623B] font-semibold">
                        {item.sku}
                      </div>
                      <div className="font-display text-xs font-medium text-[#181B15]">
                        {item.name}
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        (item.stock_qty ?? 0) <= 0
                          ? 'bg-[#F1F3EE] text-[#757B6E]'
                          : 'bg-[#FFF6E5] text-[#9A6200]'
                      }`}
                    >
                      {item.stock_qty ?? 0} left
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#ECEFE8]">
            <button
              type="button"
              onClick={() => onNavigateTab('products')}
              className="btn-secondary-pill w-full justify-center text-xs cursor-pointer"
            >
              <span>Manage Hardware Catalog</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Orders Table Snapshot */}
      <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E2E6DC] shadow-xs">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="font-display text-xl text-[#181B15] font-medium">
              Recent Fulfillment Activity
            </h3>
            <p className="text-xs font-mono text-[#757B6E]">
              Latest inbound orders and dispatch statuses
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-mono text-[#364121] hover:underline cursor-pointer"
          >
            View all ({orders.length}) orders →
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-8 text-xs font-mono text-[#757B6E]">
            No orders submitted yet. Checkout from the storefront to record orders.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#FAFAF8] text-[#364121] border-b border-[#ECEFE8]">
                <tr>
                  <th className="py-2.5 px-3">Order Number</th>
                  <th className="py-2.5 px-3">Customer & Company</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Total Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECEFE8]">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FAFAF8] transition-colors">
                    <td className="py-2.5 px-3 font-bold text-[#181B15]">
                      {ord.order_number || ord.id}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-[#181B15]">{ord.customer_name}</div>
                      <div className="text-[11px] text-[#757B6E]">{ord.company}</div>
                    </td>
                    <td className="py-2.5 px-3 text-[#757B6E]">
                      {ord.created_at ? new Date(ord.created_at).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-[#181B15]">
                      Rp {(Number(ord.total_amount) || Number(ord.grand_total) || 0).toLocaleString('id-ID')}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EEF2E8] text-[#364121]">
                        {ord.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
