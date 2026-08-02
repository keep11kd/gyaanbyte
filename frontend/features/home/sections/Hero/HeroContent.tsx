import { heroContent } from "../../data/home.data";

export default function HeroContent() {
  return (
    <div className="mt-8 max-w-3xl">
      <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-7xl">
        {heroContent.heading.line1}
        <br />
        {heroContent.heading.line2}
        <br />
        <span className="text-lime-600">
          {heroContent.heading.highlight}
        </span>
      </h1>

      <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
        {heroContent.description}
      </p>
    </div>
  );
}
