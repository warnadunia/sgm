import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4 py-20">
      <div className="text-center">
        <p className="font-mono text-[11px] tracking-[0.4em] text-riso-pink">ERROR — 404</p>
        <h1 className="mt-4 font-display text-7xl uppercase leading-none sm:text-9xl">
          <span className="riso-offset" style={{ ["--offset-a" as string]: "#FF4D6D", ["--offset-b" as string]: "#2438D8" }}>
            Lepas
          </span>
          <br />
          <span className="text-outline">Register</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-ink-soft">
          Halaman yang kamu cari bergeser dari plat cetaknya. Coba kembali ke beranda atau susuri arsip karya.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="border-2 border-ink bg-ink px-6 py-3 font-display text-sm uppercase text-paper transition-transform hover:-translate-y-0.5">
            Beranda ↗
          </Link>
          <Link href="/arsip" className="border-2 border-ink bg-paper px-6 py-3 font-display text-sm uppercase transition-transform hover:-translate-y-0.5 hover:bg-riso-yellow">
            Arsip Karya ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
