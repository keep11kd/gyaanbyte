import Link from "next/link";

import { Button } from "@/components/primitives/Button";

import { servicesContent } from "../../data/services.data";

export default function ServicesCTA() {
  const { cta } = servicesContent;

  return (
    <div className="mt-20 overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-lime-50 px-8 py-14 shadow-sm">
      <div className="mx-auto max-w-3xl text-center">

        {/* Badge */}
        <div className="inline-flex rounded-full border border-lime-200 bg-lime-100 px-4 py-1 text-sm font-semibold text-lime-700">
          {cta.badge.text}
        </div>

        {/* Heading */}
        <h3 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
          {cta.heading.line1}

          <span className="block text-lime-600">
            {cta.heading.highlight}
          </span>
        </h3>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          {cta.description}
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href={cta.actions.primary.href}>
            <Button size="lg">
              {cta.actions.primary.label}
            </Button>
          </Link>

          <Link href={cta.actions.secondary.href}>
            <Button
              variant="outline"
              size="lg"
            >
              {cta.actions.secondary.label}
            </Button>
          </Link>
        </div>

        {/* Trust */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
          {cta.trust.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2"
            >
              <span className="text-lime-600">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
