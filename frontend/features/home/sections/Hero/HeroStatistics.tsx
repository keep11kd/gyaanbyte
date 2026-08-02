import { heroContent } from "../../data/home.data";

export default function HeroStatistics() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
      {heroContent.statistics.map((item) => (
        <div key={item.label}>
          <h3 className="text-3xl font-bold text-lime-600">
            {item.value}
          </h3>

          <p className="mt-1 text-sm text-slate-600">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
