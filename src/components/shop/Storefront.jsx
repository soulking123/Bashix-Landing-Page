import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import ProductCard from './ProductCard';

export default function Storefront({ onViewDatasheet }) {
  const { products, addToCart } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Edge Compute',
    'Telemetry Hubs',
    'Robotics Motion',
    'Sensors & Probes'
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && product.is_active !== false;
  });

  return (
    <section id="hardware" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto scroll-mt-20">
      {/* Category Eyebrow */}
      <div className="text-center mb-2.5">
        <span className="text-xs font-mono font-medium text-[#55623B] tracking-wider uppercase">
          Physical Hardware Catalog
        </span>
      </div>

      {/* Main Headline */}
      <h2 className="font-display text-4xl sm:text-5xl text-[#181B15] text-center tracking-tight">
        Industrial Hardware Engineered for Extreme Environments
      </h2>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-[#4A4E44] text-center max-w-2xl mx-auto mt-2.5 mb-8 font-normal">
        CNC-machined anodized aluminum enclosures, 2.5kV galvanic isolation, and deterministic fieldbus controllers built for nonstop production.
      </p>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#FFFFFF] p-3 sm:p-4 rounded-2xl border border-[#E2E6DC]">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((category) => {
            const count =
              category === 'All'
                ? products.filter((p) => p.is_active !== false).length
                : products.filter((p) => p.category === category && p.is_active !== false).length;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-[#364121] text-[#FFFFFF]'
                    : 'bg-[#FAFAF8] text-[#4A4E44] hover:bg-[#EEF2E8] border border-[#E2E6DC]'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === category
                      ? 'bg-[#293219] text-[#D4DEC5]'
                      : 'bg-[#ECEFE8] text-[#757B6E]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="w-full md:w-64 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by SKU or model..."
            className="w-full pl-9 pr-3.5 py-1.5 text-xs font-mono rounded-full bg-[#FAFAF8] border border-[#E2E6DC] text-[#181B15] placeholder:text-[#757B6E] focus:outline-none focus:ring-2 focus:ring-[#364121]"
          />
          <svg
            className="w-4 h-4 text-[#757B6E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-[#FFFFFF] rounded-2xl border border-[#E2E6DC] p-8 space-y-3">
          <p className="font-display text-xl text-[#181B15]">No hardware modules match the selected criteria</p>
          <p className="text-xs font-mono text-[#757B6E]">
            Try adjusting your search terms or select another category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="btn-secondary-pill text-xs cursor-pointer mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDatasheet={onViewDatasheet}
              onAddToCart={(item) => addToCart(item, 1)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
