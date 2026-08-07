"use client";

import AboutHero from "./sections/AboutHero";
import AboutStory from "./sections/AboutStory";
import AboutValues from "./sections/AboutValues";
import AboutTeam from "./sections/AboutTeam";

export default function AboutPageView() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <AboutHero />
      {/* <AboutStory /> */}
      <AboutValues />
      <AboutTeam />
    </main>
  );
}
