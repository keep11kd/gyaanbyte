import Container from "./Container";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Logo />

          <nav>
            Navigation
          </nav>
        </div>
      </Container>
    </header>
  );
}
