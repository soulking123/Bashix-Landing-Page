import React from 'react';

export default function Connect({ onOpenContact }) {
  return (
    <section id="contact" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto text-center scroll-mt-20">
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#181B15] tracking-tight">
        Connect with our Engineers
      </h2>
      <p className="text-base sm:text-lg text-[#4A4E44] max-w-xl mx-auto mt-2.5 mb-6 md:mb-8 font-normal leading-relaxed">
        Schedule a technical consultation with our hardware architects to review your schematics, power budgets, and deployment requirements.
      </p>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onOpenContact}
          className="btn-primary-pill cursor-pointer text-base px-8 py-3.5"
          aria-label="Open engineering consultation booking form"
        >
          <span>Consult Engineers</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17L17 7M17 7H9M17 7V15"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
