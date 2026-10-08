import React from 'react';

export default function TestimonialAndSteps({ onOpenDiscover }) {
  const steps = [
    {
      num: '01',
      title: 'Select Hardware Architecture',
      description: 'Choose from modular edge compute gateways, rugged sensor nodes, or custom breakout boards.',
    },
    {
      num: '02',
      title: 'Flash & Configure Firmware',
      description: 'Deploy customized Linux kernel images with pre-configured CAN-FD, Modbus, and eBPF telemetry pipelines.',
    },
    {
      num: '03',
      title: 'Mount to Standard DIN Rail',
      description: 'Install onto standard 35mm DIN rail and monitor real-time thermal telemetry across your entire infrastructure.',
    },
  ];

  return (
    <section id="architecture" className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto scroll-mt-20">
      {/* Testimonial Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-10 md:pb-14 border-b border-[#E2E6DC]">
        {/* Left: Precision Mechanical Gyroscope Sculpture */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="rounded-3xl md:rounded-[2.25rem] overflow-hidden border border-[#E2E6DC] bg-[#ECEEE8] shadow-sm w-full max-w-md lg:max-w-none aspect-square">
            <img
              src="/images/area/engineering-gyroscope.jpg"
              alt="Precision kinetic gyroscope mechanism representing absolute structural stability and engineering tolerance"
              className="w-full h-full object-cover object-center hover:scale-102 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Right: Editorial Quote */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <blockquote className="font-display text-2xl sm:text-3xl md:text-[2rem] text-[#181B15] leading-snug tracking-tight">
            “We deployed Bashix edge compute units across 40 distributed pumping stations and automated assembly lines. The deterministic telemetry and optically isolated bus hardware eliminated sensor dropouts entirely. It is the most reliable industrial hardware we have ever installed.”
          </blockquote>
          <div className="mt-5">
            <p className="font-medium text-[#181B15] text-base">
              Marcus Vance
            </p>
            <p className="text-xs font-mono font-medium text-[#55623B] tracking-wider mt-1 uppercase">
              VP of Automation Engineering
            </p>
          </div>
        </div>
      </div>

      {/* "Map Your Deployment" 3-Step Section */}
      <div className="pt-10 md:pt-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <h2 className="font-display text-4xl sm:text-5xl text-[#181B15] tracking-tight">
            Map Your Deployment
          </h2>
          <div>
            <button
              type="button"
              onClick={onOpenDiscover}
              className="btn-secondary-pill cursor-pointer"
            >
              Explore Specifications
            </button>
          </div>
        </div>

        {/* 3 Step Columns with Large Numerals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-8 md:mb-10">
          {steps.map((step) => (
            <div key={step.num} className="flex flex-col pt-3.5 border-t border-[#E2E6DC]">
              <span className="font-display text-5xl sm:text-6xl text-[#181B15]/25 font-light mb-3">
                {step.num}
              </span>
              <h3 className="text-lg font-medium text-[#181B15] mb-2 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-[#4A4E44] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Offshore Infrastructure Deployment Landscape Image Card */}
        <div className="rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-sm border border-[#E2E6DC] aspect-21/9 sm:aspect-16/7 max-h-[480px]">
          <img
            src="/images/area/engineering-infrastructure.jpg"
            alt="Offshore energy and industrial telemetry array illustrating field deployments"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
