export default function LaptopMockup() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
      {/* Browser Header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>

        <span className="text-sm font-medium text-slate-500">
          gyaanbyte.com
        </span>
      </div>

      {/* Screen */}
      <div className="space-y-6 p-8">
        {/* Heading */}
        <div>
          <div className="mb-3 h-5 w-40 rounded bg-slate-900" />

          <div className="h-3 w-64 rounded bg-slate-200" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-lime-50 p-4">
            <div className="mb-2 h-4 w-20 rounded bg-lime-600" />

            <div className="h-2 w-full rounded bg-lime-200" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-sky-50 p-4">
            <div className="mb-2 h-4 w-20 rounded bg-sky-600" />

            <div className="h-2 w-full rounded bg-sky-200" />
          </div>
        </div>

        {/* Code Lines */}
        <div className="space-y-3">
          <div className="h-3 w-full rounded bg-slate-200" />
          <div className="h-3 w-11/12 rounded bg-slate-200" />
          <div className="h-3 w-10/12 rounded bg-slate-200" />
          <div className="h-3 w-9/12 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
