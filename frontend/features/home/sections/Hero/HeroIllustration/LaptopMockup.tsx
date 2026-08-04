"use client";

import React, { useState } from "react";
import {
  Bot,
  CheckCircle2,
  Code2,
  Globe,
  Layers3,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Terminal,
  Copy,
  Check,
} from "lucide-react";

export default function ProfessionalLaptopMockup() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-8 select-none">
      {/* Outer Glow Wrapper */}
      <div className="relative group">
        <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-lime-500/20 via-sky-500/20 to-orange-500/20 opacity-50 blur-xl transition duration-1000 group-hover:opacity-75 group-hover:duration-200" />

        {/* Laptop Screen Frame */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-950 p-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10">

          {/* Display Screen */}
          <div className="overflow-hidden rounded-[1.4rem] bg-slate-900/95 text-slate-100 backdrop-blur-xl">

            {/* Window Top Navigation / Browser Bar */}
            <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-4 py-2.5 backdrop-blur-md">
              {/* macOS Traffic Lights */}
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-500/80 transition-transform hover:scale-110" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80 transition-transform hover:scale-110" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80 transition-transform hover:scale-110" />
              </div>

              {/* Secure Address Bar */}
              <div className="flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/90 px-4 py-1 text-xs text-slate-400 shadow-inner">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span className="font-mono text-slate-200">gyaanbyte.com</span>
                <span className="text-slate-600">/workspace</span>
              </div>

              {/* System Heartbeat Badge */}
              <div className="flex items-center gap-2 rounded-full border border-slate-800/60 bg-slate-900/40 px-3 py-1 text-[11px] text-slate-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="hidden font-medium text-slate-300 sm:inline">
                  v2.4 Active
                </span>
              </div>
            </div>

            {/* Application Workspace Main Container */}
            <div className="p-5 sm:p-6 space-y-5">

              {/* Header & Control Bar */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/60 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-lime-500/20 bg-lime-500/10 px-3 py-0.5 text-[11px] font-semibold text-lime-400">
                    <Sparkles className="h-3.5 w-3.5" />
                    Engineering Studio
                  </div>
                  <h3 className="mt-1.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
                    Development Dashboard
                  </h3>
                </div>

                {/* Performance Metrics Header Strip */}
                <div className="flex items-center gap-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-1.5 text-center shadow-sm">
                    <p className="text-[10px] font-medium text-slate-400">Uptime</p>
                    <p className="text-xs font-bold text-slate-100">99.98%</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-1.5 text-center shadow-sm">
                    <p className="text-[10px] font-medium text-slate-400">Latency</p>
                    <p className="text-xs font-bold text-lime-400">&lt; 120ms</p>
                  </div>
                  <button className="flex items-center gap-1.5 rounded-xl bg-lime-400 px-3.5 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-lime-500/20 transition-all hover:bg-lime-300 hover:shadow-lime-500/30 active:scale-95">
                    <Zap className="h-3.5 w-3.5 fill-current" />
                    <span>Deploy</span>
                  </button>
                </div>
              </div>

              {/* Grid Layout: Core Services (Left - 3 cols) vs Activity & Code (Right - 2 cols) */}
              <div className="grid gap-4 sm:grid-cols-5">

                {/* Left Column: Interactive Service Modules */}
                <div className="space-y-2.5 sm:col-span-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Core Stack Capabilities
                    </span>
                    <span className="text-[11px] text-slate-500">3 Services Active</span>
                  </div>

                  {/* Web Platform Card */}
                  <div className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/40 p-3.5 transition-all duration-300 hover:border-lime-500/40 hover:bg-slate-800/30 hover:shadow-md hover:shadow-lime-500/5">
                    <div className="flex items-center gap-3.5">
                      <div className="rounded-xl border border-lime-500/20 bg-lime-500/10 p-2.5 text-lime-400 transition-transform group-hover:scale-105">
                        <Globe size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-lime-300 transition-colors">
                          Website Development
                        </h4>
                        <p className="text-xs text-slate-400">
                          Next.js, Tailwind CSS & High-Performance E-Commerce
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime-400" />
                  </div>

                  {/* AI Solutions Card */}
                  <div className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/40 p-3.5 transition-all duration-300 hover:border-sky-500/40 hover:bg-slate-800/30 hover:shadow-md hover:shadow-sky-500/5">
                    <div className="flex items-center gap-3.5">
                      <div className="rounded-xl border border-sky-500/20 bg-sky-500/10 p-2.5 text-sky-400 transition-transform group-hover:scale-105">
                        <Bot size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                          AI Solutions
                        </h4>
                        <p className="text-xs text-slate-400">
                          LLM Agents, Autonomous Chatbots & Automation
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-400" />
                  </div>

                  {/* Backend Card */}
                  <div className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/40 p-3.5 transition-all duration-300 hover:border-orange-500/40 hover:bg-slate-800/30 hover:shadow-md hover:shadow-orange-500/5">
                    <div className="flex items-center gap-3.5">
                      <div className="rounded-xl border border-orange-500/20 bg-orange-500/10 p-2.5 text-orange-400 transition-transform group-hover:scale-105">
                        <Code2 size={18} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                          Java Backend Systems
                        </h4>
                        <p className="text-xs text-slate-400">
                          Spring Boot Microservices & Enterprise Security
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-400" />
                  </div>
                </div>

                {/* Right Column: Activity Stream & Mini Code Console */}
                <div className="flex flex-col justify-between space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 sm:col-span-2">
                  <div>
                    <div className="mb-3 flex items-center justify-between border-b border-slate-800/60 pb-2">
                      <div className="flex items-center gap-2">
                        <Layers3 size={16} className="text-lime-400" />
                        <h4 className="text-xs font-semibold text-white">Live Activity Log</h4>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">Real-time</span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-lime-400" />
                        <div>
                          <p className="font-medium text-slate-200">Business Platform Delivered</p>
                          <p className="text-[11px] text-slate-500">Client verification completed</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-sky-400" />
                        <div>
                          <p className="font-medium text-slate-200">AI Assistant Deployed</p>
                          <p className="text-[11px] text-slate-500">Trained on knowledge base</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-orange-400" />
                        <div>
                          <p className="font-medium text-slate-200">Spring API Security Live</p>
                          <p className="text-[11px] text-slate-500">OAuth2 & Rate limits active</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Micro Terminal / IDE Preview */}
                  <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90 p-2.5 font-mono text-[10px] shadow-inner">
                    <div className="mb-1.5 flex items-center justify-between text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Terminal size={12} className="text-sky-400" />
                        <span>server.config.java</span>
                      </div>
                      <button onClick={handleCopy} className="hover:text-slate-300">
                        {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      </button>
                    </div>
                    <code className="block leading-relaxed text-slate-300">
                      <span className="text-purple-400">@SpringBootApp</span>{"\n"}
                      GyaanByte.<span className="text-emerald-400">init</span>();
                    </code>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Realistic Laptop Hinge & Base */}
        <div className="relative mx-auto h-3 w-4/5 rounded-b-2xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-xl sm:w-2/3">
          <div className="absolute left-1/2 top-0 h-1.5 w-16 -translate-x-1/2 rounded-b-md bg-slate-600/80 shadow-inner" />
        </div>
      </div>
    </div>
  );
}
