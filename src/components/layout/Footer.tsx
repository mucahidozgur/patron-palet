import Image from "next/image";

const LINKS = [
  { label: "ÜRÜNLER", href: "#urunler" },
  { label: "ÜRETİM", href: "#uretim" },
  { label: "HAKKINDA", href: "#hakkimizda" },
  { label: "REFERANSLAR", href: "#referanslar" },
  { label: "İLETİŞİM", href: "#iletisim" },
];

export default function Footer() {
  return (
    <footer
      id="iletisim"
      className="relative overflow-hidden border-t border-electric/20 bg-void"
    >
      <div className="container-industrial py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Logo + tagline */}
          <div>
            <a href="#top" className="group flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center border border-pure/15 bg-ash/50 p-2 transition-colors duration-300 group-hover:border-electric/60">
                <Image
                  src="/logopatron-alpha.png"
                  alt="TR Patron Palet"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="flex items-center gap-2">
                <span className="border border-electric/70 bg-electric/10 px-2 py-1 font-display text-xs font-bold tracking-[0.25em] text-electric">
                  TR
                </span>
                <span className="font-display text-base font-bold tracking-[0.3em]">
                  PATRON PALET
                </span>
              </span>
            </a>
            <p className="mt-6 max-w-xs text-base leading-relaxed text-smoke">
              Ahşabın ham gücü, mühendisliğin hassasiyeti. Lisanslı üretim,
              zamanında teslim.
            </p>
          </div>

          {/* Hızlı linkler */}
          <nav aria-label="Hızlı linkler">
            <p className="label-tech text-sm">HIZLI LİNKLER</p>
            <ul className="mt-6 space-y-4">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-sm uppercase tracking-[0.2em] text-pure/80 transition-colors duration-300 hover:text-electric"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* İletişim */}
          <div>
            <p className="label-tech text-sm">İLETİŞİM</p>
            <address className="mt-6 space-y-4 not-italic">
              <p className="text-base leading-relaxed text-smoke">
                <span className="block font-mono text-xs uppercase tracking-[0.2em] text-pure/60">
                  MERKEZ
                </span>
                <span className="mt-1 block">
                  Saray Mah. Adnan Menderes Bulvarı 10. Cadde No: 7,
                  Kahramankazan / ANKARA
                </span>
              </p>
              <p className="text-base leading-relaxed text-smoke">
                <span className="block font-mono text-xs uppercase tracking-[0.2em] text-pure/60">
                  ŞUBE
                </span>
                <span className="mt-1 block">
                  İvedik Mah. İvedik Küme Evleri No: 38/8, Yenimahalle / ANKARA
                </span>
              </p>
              <p className="text-base text-pure">
                <a
                  href="tel:+905434329951"
                  className="transition-colors duration-300 hover:text-electric"
                >
                  +90 (543) 432 99 51
                </a>
                <span className="ml-3 font-mono text-sm text-smoke">
                  09:00 — 17:00
                </span>
              </p>
              <p className="text-base text-pure">
                <a
                  href="mailto:info@tepeahsappalet.com"
                  className="transition-colors duration-300 hover:text-electric"
                >
                  info@tepeahsappalet.com
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Dev filigran — Flux tarzı kapanış imzası */}
      <div
        aria-hidden
        className="select-none overflow-hidden border-t border-pure/10"
      >
        <p className="heading-display translate-y-[18%] text-center text-[15vw] leading-[0.75] text-pure/[0.045]">
          PATRON
        </p>
      </div>

      <div className="border-t border-pure/10">
        <div className="container-industrial flex flex-col justify-between gap-3 py-6 md:flex-row md:items-center">
          <p className="font-mono text-sm text-smoke">
            © 2025 Patron Palet. Tüm hakları saklıdır.
          </p>
          <p className="font-mono text-sm text-smoke">MMXXV — ANKARA</p>
        </div>
      </div>
    </footer>
  );
}
