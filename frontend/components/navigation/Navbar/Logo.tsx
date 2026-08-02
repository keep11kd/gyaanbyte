import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="GyaanByte Home"
      className="flex items-center gap-2 transition-opacity hover:opacity-90"
    >
      <span className="text-2xl font-extrabold tracking-tight text-slate-900">
        Gyaan
        <span className="text-lime-600">Byte</span>
      </span>
    </Link>
  );
}
