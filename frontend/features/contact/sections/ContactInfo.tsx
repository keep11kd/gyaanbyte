// features/contact/sections/ContactInfo.tsx

import React from 'react';
import { CONTACT_METHODS, SOCIAL_LINKS } from '../data';
import { ContactMethod } from '../types';

const IconMap: Record<ContactMethod['iconName'], React.FC<{ className?: string }>> = {
  building: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  'life-buoy': ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.172l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  'message-square': ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  mail: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  phone: ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
};

export const ContactInfo: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Dedicated Communication Channels
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Reach out directly to the specialized team equipped to handle your specific inquiry.
          </p>
        </div>

        {/* Contact Method Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_METHODS.map((method) => {
            const IconComponent = IconMap[method.iconName];
            return (
              <div
                key={method.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md hover:shadow-slate-100"
              >
                <div>
                  {/* Icon & Response Badge */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white transition-transform group-hover:scale-105">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    {method.badge && (
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {method.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {method.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {method.description}
                  </p>

                  {/* Direct Contact Value */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-xs font-mono font-medium text-slate-700 block truncate">
                      {method.primaryValue}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5 block">
                      Avg SLA: {method.responseTime}
                    </span>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-6 pt-2">
                  <a
                    href={method.actionHref}
                    className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 border border-slate-200/80 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200"
                  >
                    <span>{method.actionLabel}</span>
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Social Presence Bar */}
        <div className="mt-12 rounded-2xl bg-slate-50 border border-slate-100 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              Prefer real-time updates and community chat?
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Follow our engineering updates, connect on LinkedIn, or join our Discord community.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-medium text-slate-700 border border-slate-200/80 shadow-xs hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition-all"
              >
                <span>{social.label}</span>
                <svg className="h-3 w-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
