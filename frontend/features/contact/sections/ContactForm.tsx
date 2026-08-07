// features/contact/sections/ContactForm.tsx
'use client';
import React, { useState } from 'react';
import {
  ContactFormData,
  FormFieldErrors,
  SubmissionStatus
} from '../types';
import { CATEGORY_OPTIONS, BUDGET_RANGES } from '../data';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    companyName: '',
    phone: '',
    category: 'sales',
    budgetRange: '$25,000 - $50,000',
    subject: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormFieldErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormFieldErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid work email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject line is required.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please details about your inquiry.';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters long.';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to our privacy policy to proceed.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof FormFieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus('submitting');

    try {
      // Simulated API request latency
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact-form" className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Context Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-x-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              <span>Direct Form Inquiry</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Send us a direct message
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Fill out the form and our specialized team will review your project requirements or question and get back to you within 2 business hours.
            </p>

            {/* Checklist items */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              {[
                'Strict NDA and data protection guaranteed',
                'Dedicated solutions architect review',
                'Custom SLA and enterprise pricing tailored to scale'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-x-3">
                  <div className="mt-1 flex-none rounded-full bg-emerald-50 p-1 text-emerald-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            {/* Support guarantee badge */}
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-6">
              <div className="flex items-center gap-x-4">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-slate-900 text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">SOC 2 Type II Certified</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Your communication is end-to-end encrypted and confidential.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xs">

              {status === 'success' ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Message Delivered Successfully!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you for reaching out. We have assigned a dedicated specialist to your inquiry and will respond to <strong className="text-slate-900">{formData.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        fullName: '',
                        email: '',
                        companyName: '',
                        phone: '',
                        category: 'sales',
                        budgetRange: '$25,000 - $50,000',
                        subject: '',
                        message: '',
                        consent: false,
                      });
                    }}
                    className="mt-6 inline-flex items-center rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category Selector Pills */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                      Inquiry Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {CATEGORY_OPTIONS.map((cat) => {
                        const isSelected = formData.category === cat.value;
                        return (
                          <button
                            type="button"
                            key={cat.value}
                            onClick={() => setFormData((prev) => ({ ...prev, category: cat.value }))}
                            className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left border transition-all ${
                              isSelected
                                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {cat.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-medium text-slate-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Sarah Connor"
                        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                          errors.fullName
                            ? 'border-rose-300 focus:ring-rose-500'
                            : 'border-slate-200 focus:ring-slate-900'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-rose-500">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-slate-700 mb-1">
                        Work Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sarah@company.com"
                        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                          errors.email
                            ? 'border-rose-300 focus:ring-rose-500'
                            : 'border-slate-200 focus:ring-slate-900'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Company & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="companyName" className="block text-xs font-medium text-slate-700 mb-1">
                        Company Name <span className="text-slate-400">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-slate-700 mb-1">
                        Phone Number <span className="text-slate-400">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  {/* Budget Selector (Shown for Sales/Enterprise) */}
                  {formData.category === 'sales' && (
                    <div>
                      <label htmlFor="budgetRange" className="block text-xs font-medium text-slate-700 mb-1">
                        Projected Annual Budget
                      </label>
                      <select
                        id="budgetRange"
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      >
                        {BUDGET_RANGES.map((b) => (
                          <option key={b.value} value={b.label}>
                            {b.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-medium text-slate-700 mb-1">
                      Subject Line <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Enterprise Migration Inquiry"
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                        errors.subject
                          ? 'border-rose-300 focus:ring-rose-500'
                          : 'border-slate-200 focus:ring-slate-900'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-rose-500">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message Area */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-slate-700 mb-1">
                      Project Details or Inquiry <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please share details regarding timeline, requirements, or current stack..."
                      className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                        errors.message
                          ? 'border-rose-300 focus:ring-rose-500'
                          : 'border-slate-200 focus:ring-slate-900'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-500">{errors.message}</p>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-x-3">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                    />
                    <label htmlFor="consent" className="text-xs text-slate-600 leading-normal">
                      I agree to allow Enterprise Digital Solutions to store and process my contact information in accordance with the Privacy Policy.
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="text-xs text-rose-500 -mt-3">{errors.consent}</p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-x-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-xs hover:bg-slate-800 disabled:opacity-50 transition-all"
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
