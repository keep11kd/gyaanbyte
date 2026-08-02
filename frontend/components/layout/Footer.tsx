import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-16 text-white">
      <Container>
        <p className="text-center">
          © {new Date().getFullYear()} GyaanByte.
          All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
