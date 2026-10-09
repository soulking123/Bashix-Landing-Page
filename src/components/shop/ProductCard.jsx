import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export default function ProductCard({ product, onViewDatasheet, onAddToCart }) {
  const { currency } = useStore();
  const [isAdded, setIsAdded] = useState(false);

  const stock = product.stock_qty ?? 0;
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 15;

  const handleAdd = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const formattedIdr = `Rp ${(product.price_idr || 0).toLocaleString('id-ID')}`;
  const formattedUsd = `$${(product.price_usd || 0).toLocaleString('en-US')}`;

  return (
    <article className="bg-[#FFFFFF] rounded-2xl md:rounded-3xl border border-[#E2E6DC] p-5 sm:p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group">
      <div>
        {/* Top Header: Model Tag & Stock Indicator */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-[#ECEFE8] text-[#364121] tracking-wide">
            {product.sku}
          </span>

          {isOutOfStock ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[#F1F3EE] text-[#757B6E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#757B6E]"></span>
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[#FFF6E5] text-[#9A6200]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E08A00] animate-pulse"></span>
              Low Stock ({stock} left)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[#EEF2E8] text-[#364121]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55623B]"></span>
              In Stock ({stock} units)
            </span>
          )}
        </div>

        {/* Product Visual Render */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FAFAF8] border border-[#ECEFE8] mb-4 flex items-center justify-center">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-2 right-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#FFFFFF]/90 backdrop-blur-xs text-[#55623B] border border-[#E2E6DC]">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Identity */}
        <h3 className="font-display text-xl sm:text-2xl text-[#181B15] font-medium tracking-tight mb-1 group-hover:text-[#364121] transition-colors">
          {product.name}
        </h3>

        <p className="text-xs font-mono text-[#55623B] font-medium tracking-wide mb-2">
          {product.tagline}
        </p>

        <p className="text-sm text-[#4A4E44] line-clamp-2 mb-4 font-normal">
          {product.description}
        </p>

        {/* Key Hardware Specs Chips */}
        {product.specs && product.specs.length > 0 && (
          <div className="space-y-1.5 mb-5 pt-3 border-t border-[#ECEFE8]">
            {product.specs.slice(0, 3).map((spec, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs font-mono text-[#4A4E44]">
                <span className="text-[#364121] font-bold select-none">•</span>
                <span className="line-clamp-1">{spec}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pricing & Actions */}
      <div className="pt-4 border-t border-[#ECEFE8]">
        {/* Dual Currency Price Display */}
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="text-[10px] font-mono text-[#757B6E] uppercase tracking-wider">
              Unit Price
            </div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-[#181B15]">
              {currency === 'USD' ? formattedUsd : formattedIdr}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono text-[#757B6E] uppercase tracking-wider">
              Ref Currency
            </div>
            <div className="text-xs font-mono text-[#55623B] font-medium">
              {currency === 'USD' ? formattedIdr : formattedUsd}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onViewDatasheet(product)}
            className="btn-secondary-pill w-full justify-center text-xs sm:text-sm cursor-pointer"
            aria-label={`View technical datasheet for ${product.name}`}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Datasheet</span>
          </button>

          <button
            type="button"
            onClick={handleAdd}
            disabled={isOutOfStock}
            className={`btn-primary-pill w-full justify-center text-xs sm:text-sm cursor-pointer ${
              isOutOfStock ? 'opacity-40 cursor-not-allowed hover:transform-none' : ''
            }`}
            aria-label={`Add ${product.name} to hardware order`}
          >
            {isAdded ? (
              <>
                <svg
                  className="w-3.5 h-3.5 text-[#D4DEC5]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Added ✓</span>
              </>
            ) : (
              <>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span>Add to Order</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
