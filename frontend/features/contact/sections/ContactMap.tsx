// features/contact/sections/ContactMap.tsx
'use client';
import React, { useState } from 'react';
import { OFFICE_LOCATIONS } from '../data';
import { OfficeLocation } from '../types';

export const ContactMap: React.FC = () => {
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation>(
    OFFICE_LOCATIONS[0]
  );

  return (
    <section className="py-16 bg-slate-50/50 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-x-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 mb-3">
              <span>Global Presence</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-display">
              Our Innovation Hubs
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-xl">
              Visit or connect with our physical engineering and leadership hubs operating across key international business regions.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden sm:flex items-center gap-x-4 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex -space-x-2 overflow-hidden">
              {OFFICE_LOCATIONS.map((office) => (
                <img
                  key={office.id}
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src={office.image}
                  alt={office.city}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-slate-700">
              4 Regional Head Offices
            </span>
          </div>
        </div>

        {/* Interactive Location Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {OFFICE_LOCATIONS.map((office) => {
            const isSelected = selectedOffice.id === office.id;
            return (
              <button
                key={office.id}
                onClick={() => setSelectedOffice(office)}
                className={`flex items-center gap-x-2.5 px-4 py-3 rounded-2xl text-xs font-semibold whitespace-nowrap border transition-all duration-200 ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                }`}
              >
                <span>{office.city}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-500'
                }`}>
                  {office.region}
                </span>
              </button>
            );
          })}
        </div>

        {/* Office Detail Grid + Interactive Map Representation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Selected Office Information Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
            <div>
              {/* Card Image Banner */}
              <div className="relative h-48 w-full overflow-hidden rounded-2xl mb-6">
                <img
                  src={selectedOffice.image}
                  alt={selectedOffice.city}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {selectedOffice.isHeadquarters && (
                  <span className="absolute top-3 left-3 bg-slate-900/90 text-white backdrop-blur-md text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    Global HQ
                  </span>
                )}
              </div>

              {/* Title & Address */}
              <h3 className="text-2xl font-bold text-slate-900">
                {selectedOffice.city}, {selectedOffice.country}
              </h3>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed font-mono">
                {selectedOffice.address}, {selectedOffice.postalCode}
              </p>

              {/* Operational Specs */}
              <dl className="mt-6 space-y-4 border-t border-slate-100 pt-6 text-xs">
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500 font-medium">Business Hours</dt>
                  <dd className="font-semibold text-slate-900">{selectedOffice.hours}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500 font-medium">Time Zone</dt>
                  <dd className="font-semibold text-slate-900">{selectedOffice.timezone}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500 font-medium">Direct Telephone</dt>
                  <dd className="font-mono font-medium text-slate-900">{selectedOffice.phone}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-slate-500 font-medium">Email Inquiry</dt>
                  <dd className="font-mono font-medium text-blue-600">{selectedOffice.email}</dd>
                </div>
              </dl>
            </div>

            {/* Action Link */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <a
                href={`https://maps.google.com/?q=${selectedOffice.coordinates.lat},${selectedOffice.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-x-2 rounded-xl bg-slate-100 px-4 py-3 text-xs font-semibold text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-200"
              >
                <span>Get Directions via Google Maps</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Interactive Visual Map Card */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full rounded-3xl border border-slate-200/80 bg-slate-100 overflow-hidden flex flex-col items-center justify-center p-6 text-center">

            {/* Map Canvas Background Vector Graphic */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Simulated Geographic Location Marker Card */}
            <div className="relative z-10 max-w-sm rounded-2xl bg-white/95 backdrop-blur-md p-6 border border-slate-200 shadow-xl text-left">
              <div className="flex items-center gap-x-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Active Coordinates Selected
                </span>
              </div>
              <p className="text-xs font-mono text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                Lat: {selectedOffice.coordinates.lat} | Lng: {selectedOffice.coordinates.lng}
              </p>
              <p className="mt-3 text-xs text-slate-500 leading-normal">
                High-density secure enterprise facility with on-site solution engineering, security operations, and client meeting spaces.
              </p>
            </div>

            {/* Map Frame Watermark */}
            <div className="absolute bottom-4 right-4 z-10 text-[10px] font-mono text-slate-400 bg-white/80 px-2 py-1 rounded border border-slate-200/60">
              Interactive Map Module
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
