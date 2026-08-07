"use client";

import { Phone, Mail, Award, CheckCircle2 } from "lucide-react";
import Container from "@/components/layout/Container";
import { aboutContent } from "../data";

export default function AboutTeam() {
  const { team, targetAudience, values } = aboutContent;

  return (
    <section id="team" className="bg-slate-900 py-20 text-white lg:py-28">
      <Container size="xl">
        {/* Section Header */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-lime-400">Leadership</span>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Mentors Behind GyaanByte
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
            Engineers and academicians dedicated to guiding students through enterprise-level software engineering and university research implementations.
          </p>
        </div>

        {/* Team Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-6 transition-all duration-300 hover:border-lime-400/50 hover:shadow-lg hover:shadow-lime-500/10"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md border border-lime-400/30 bg-lime-400/10 px-2.5 py-1 text-xs font-semibold text-lime-400">
                    {member.qualification}
                  </span>
                  <Award className="h-5 w-5 text-slate-600 group-hover:text-lime-400" />
                </div>

                <h3 className="mt-4 text-xl font-bold text-white group-hover:text-lime-400">
                  {member.name}
                </h3>
                <p className="text-xs font-medium text-slate-400">{member.role}</p>

                <p className="mt-4 text-xs leading-relaxed text-slate-300">
                  {member.bio}
                </p>
              </div>

              {/* Direct Phone Contact */}
              <div className="mt-6 border-t border-slate-800/80 pt-4">
                <a
                  href={`tel:${member.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-lime-400 hover:text-lime-300"
                >
                  <Phone className="h-4 w-4" />
                  <span>{member.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Target Audience & Core Commitments */}
        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Target Programs */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white">Who We Mentors & Support</h3>
            <p className="mt-1 text-xs text-slate-400">Tailored solutions for students across university tech curricula:</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {targetAudience.map((degree) => (
                <div key={degree} className="flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900 py-3 text-sm font-bold text-white shadow-xs">
                  {degree}
                </div>
              ))}
            </div>
          </div>

          {/* Trust Points */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white">Our Commitments</h3>
            <p className="mt-1 text-xs text-slate-400">Why hundreds of students rely on GyaanByte:</p>
            <div className="mt-4 space-y-3">
              {values.map((v) => (
                <div key={v.id} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lime-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{v.title}</h4>
                    <p className="text-xs text-slate-400">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
