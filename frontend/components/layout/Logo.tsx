import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="text-2xl font-bold">
      Gyaan<span className="text-lime-500">Byte</span>
    </Link>
  );
}
