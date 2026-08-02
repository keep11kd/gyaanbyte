export default function GradientBlob() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute left-1/4 top-10 h-96 w-96 rounded-full bg-lime-100/30 blur-[120px]" />

      <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-sky-100/20 blur-[100px]" />
    </div>
  );
}
