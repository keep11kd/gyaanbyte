// features/contact/sections/ContactHeader.tsx

import React from 'react';
import { CONTACT_PAGE_CONFIG, TRUST_METRICS } from '../data';

export const ContactHeader: React.FC = () => {
  return (
    <header className="relative overflow-hidden bg-white pt-16 pb-12 lg:pt-24 lg:pb-16 border-b border-slate-100">
      {/* Background Decorative Subtle Gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-100 via-indigo-50 to-slate-100 opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center gap-x-2 rounded-full bg-slate-100/80 px-3.5 py-1.5 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-200/80 transition-all hover:bg-slate-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{CONTACT_PAGE_CONFIG.heroBadge}</span>
          </div>

          {/* Hero Title */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl font-display">
            {CONTACT_PAGE_CONFIG.heroTitle}
          </h1>

          {/* Hero Subtitle */}
          <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl font-normal max-w-2xl mx-auto">
            {CONTACT_PAGE_CONFIG.heroSubtitle}
          </p>
        </div>

        {/* Key Operational Trust Metrics */}
        <div className="mt-16 border-t border-slate-100 pt-10">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 text-center lg:grid-cols-4">
            {TRUST_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50/50 border border-slate-100/80 shadow-xs transition-all duration-200 hover:bg-slate-50"
              >
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {metric.label}
                </dt>
                <dd className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </header>
  );
};
