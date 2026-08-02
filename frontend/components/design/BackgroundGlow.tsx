export default function BackgroundGlow() {
  return (
    <>
      {/* Left Glow */}
      <div
        aria-hidden
        className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-lime-200/30 blur-3xl"
      />

      {/* Right Glow */}
      <div
        aria-hidden
        className="absolute right-0 top-40 h-96 w-96 rounded-full bg-sky-200/20 blur-3xl"
      />
    </>
  );
}
