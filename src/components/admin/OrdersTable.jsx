import React, { useState, useEffect } from 'react';
import { db } from '../../services/db';

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [feedbackNotice, setFeedbackNotice] = useState(null);

  const statuses = ['All', 'Pending', 'Received', 'Processing', 'Dispatched', 'Completed'];

  const showToast = (msg) => {
    setFeedbackNotice(msg);
    setTimeout(() => setFeedbackNotice(null), 3000);
  };

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const list = await db.orders.list();
      setOrders(list || []);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await db.orders.updateStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
      );
      showToast(`Order status updated to "${newStatus}".`);
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      order.order_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notice */}
      {feedbackNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#364121] text-[#FFFFFF] px-4 py-3 rounded-2xl shadow-xl text-xs font-mono flex items-center gap-2 border border-[#D4DEC5] animate-in slide-in-from-bottom duration-200">
          <span className="w-2 h-2 rounded-full bg-[#D4DEC5]"></span>
          <span>{feedbackNotice}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="text-xs font-mono font-medium text-[#55623B] tracking-wider uppercase mb-1">
          Fulfillment Logistics & Telemetry
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-[#181B15] font-medium tracking-tight">
          Customer Orders Pipeline
        </h1>
        <p className="text-sm text-[#4A4E44] mt-0.5">
          Real-time order statuses, customer shipping addresses, and equipment fulfillment queues.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#FFFFFF] p-4 rounded-2xl border border-[#E2E6DC] flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
        {/* Search */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order ref, customer, company..."
            className="w-full pl-9 pr-3.5 py-2 text-xs font-mono rounded-xl bg-[#FAFAF8] border border-[#E2E6DC] text-[#181B15] placeholder:text-[#757B6E] focus:outline-none focus:ring-2 focus:ring-[#364121]"
          />
          <svg
            className="w-4 h-4 text-[#757B6E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {statuses.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-[#364121] text-[#FFFFFF]'
                  : 'bg-[#FAFAF8] text-[#4A4E44] border border-[#E2E6DC] hover:bg-[#EEF2E8]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E2E6DC] shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-12 text-center text-xs font-mono text-[#757B6E]">
            Loading order fulfillment records...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <p className="font-display text-lg text-[#181B15]">No customer orders found</p>
            <p className="text-xs font-mono text-[#757B6E]">
              Orders placed in the storefront cart will automatically appear here in real time.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#FAFAF8] text-[#364121] border-b border-[#ECEFE8]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Order Number</th>
                  <th className="py-3 px-4 font-semibold">Customer & Enterprise</th>
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 font-semibold">Invoiced Total</th>
                  <th className="py-3 px-4 font-semibold">Fulfillment Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECEFE8]">
                {filteredOrders.map((order) => {
                  const isExpanded = expandedOrderId === order.id;
                  const total = Number(order.total_amount) || Number(order.grand_total) || 0;

                  return (
                    <React.Fragment key={order.id}>
                      <tr className="hover:bg-[#FAFAF8] transition-colors">
                        {/* Order Number */}
                        <td className="py-3.5 px-4 font-bold text-[#181B15]">
                          <span className="px-2 py-0.5 rounded bg-[#EEF2E8] text-[#364121]">
                            {order.order_number || order.id}
                          </span>
                        </td>

                        {/* Customer & Enterprise */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#181B15]">{order.customer_name}</div>
                          <div className="text-[11px] text-[#757B6E]">{order.company}</div>
                          <div className="text-[10px] text-[#55623B]">{order.email}</div>
                        </td>

                        {/* Date */}
                        <td className="py-3.5 px-4 text-[#757B6E]">
                          {order.created_at ? new Date(order.created_at).toLocaleString() : 'Recent'}
                        </td>

                        {/* Total */}
                        <td className="py-3.5 px-4 font-bold text-[#181B15]">
                          Rp {total.toLocaleString('id-ID')}
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-3.5 px-4">
                          <select
                            value={order.status || 'Pending'}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg border border-[#E2E6DC] bg-[#FAFAF8] text-[#181B15] focus:outline-none focus:ring-2 focus:ring-[#364121]"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Received">Received</option>
                            <option value="Processing">Processing</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>

                        {/* View Details Toggle */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                            className="text-xs font-mono text-[#364121] hover:underline cursor-pointer"
                          >
                            {isExpanded ? 'Hide Specs ▲' : 'Inspect ▼'}
                          </button>
                        </td>
                      </tr>

                      {/* Expanded Order Line Items Row */}
                      {isExpanded && (
                        <tr className="bg-[#FAFAF8]">
                          <td colSpan={6} className="p-4 sm:p-6 border-b border-[#ECEFE8]">
                            <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E2E6DC] space-y-4">
                              <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-[#ECEFE8] pb-3">
                                <div>
                                  <div className="text-[10px] uppercase text-[#757B6E] font-bold">
                                    Delivery Facility Address
                                  </div>
                                  <div className="text-xs text-[#181B15] mt-0.5">
                                    {order.shipping_address || 'No specific facility address specified.'}
                                  </div>
                                </div>

                                {order.po_notes && (
                                  <div>
                                    <div className="text-[10px] uppercase text-[#757B6E] font-bold">
                                      Purchase Order / Integration Notes
                                    </div>
                                    <div className="text-xs text-[#181B15] mt-0.5">
                                      {order.po_notes}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Itemized Hardware List */}
                              <div>
                                <div className="text-[10px] uppercase text-[#55623B] font-bold mb-2">
                                  Ordered Hardware Items & Modules
                                </div>
                                {order.items && order.items.length > 0 ? (
                                  <div className="space-y-1.5">
                                    {order.items.map((it, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAFAF8] text-xs"
                                      >
                                        <div className="flex items-center gap-2">
                                          <span className="font-bold text-[#364121]">
                                            {it.quantity}x
                                          </span>
                                          <span className="font-medium text-[#181B15]">
                                            {it.product_name || it.product?.name || 'Hardware Unit'}
                                          </span>
                                          {it.product?.sku && (
                                            <span className="text-[10px] text-[#757B6E]">
                                              ({it.product.sku})
                                            </span>
                                          )}
                                        </div>
                                        <span className="font-bold text-[#181B15]">
                                          Rp{' '}
                                          {(
                                            (it.unit_price || it.product?.price_idr || 0) * it.quantity
                                          ).toLocaleString('id-ID')}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="text-xs text-[#757B6E]">
                                    Standard production package bundle.
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
