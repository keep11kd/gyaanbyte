'use client';

import React, { useState } from 'react';
import { CONTACT_FAQS } from '../data';

export const ContactCTA: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(CONTACT_FAQS[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* FAQ Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">

          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-x-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 mb-4">
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-display">
              Everything you need to know
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Have questions about SLA agreements, custom integrations, or scheduling an executive briefing? Find quick answers here or contact our team directly.
            </p>
            <div className="mt-6 pt-6 border-t border-slate-100">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-x-2 text-xs font-semibold text-slate-900 hover:text-blue-600 transition-colors"
              >
                <span>Have a specific security question?</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {CONTACT_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-slate-200/80 bg-white transition-all duration-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm font-semibold text-slate-900">
                      {faq.question}
                    </span>
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform duration-200">
                      <svg
                        className={`h-4 w-4 transform transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs leading-relaxed text-slate-600 border-t border-slate-100/80 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Final Conversion Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 sm:px-12 sm:py-16 text-center shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Ready to accelerate your enterprise tech stack?
            </h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Join leading global corporations running high-concurrency workloads on our platform. Schedule a custom platform demonstration today.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-x-2 rounded-xl bg-white px-6 py-3 text-xs font-semibold text-slate-900 shadow-xs hover:bg-slate-100 transition-all"
              >
                <span>Request Executive Demo</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                href="tel:+14158901200"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-x-2 rounded-xl bg-slate-800 px-6 py-3 text-xs font-semibold text-white border border-slate-700 hover:bg-slate-700 transition-all"
              >
                <span>Call +1 (415) 890-1200</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
