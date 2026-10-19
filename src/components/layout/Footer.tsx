const LINKS = [
  { label: "Ürünler", href: "#urunler" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "Sık Sorulan Sorular", href: "#sss" },
];

export default function Footer() {
  return (
    <footer className="border-t border-tan/10 bg-ink">
      <div className="container-editorial py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Logo + tagline */}
          <div>
            <span className="flex items-center gap-3 text-lg md:text-xl">
              <span className="tr-badge shrink-0">TR</span>
              <span className="logo-shimmer bg-gradient-to-r from-tan via-white to-tan bg-clip-text font-display font-bold tracking-[0.2em] text-transparent drop-shadow-[0_0_16px_rgba(212,163,115,0.45)]">
                PATRON PALET
              </span>
            </span>
            <p className="mt-4 max-w-xs text-base font-light text-white/60">
              Sıfır ahşap palet üretimi, ikinci el palet alım satımı ve ihracat
              sandığı imalatı.
            </p>
          </div>

          {/* Hızlı linkler */}
          <div>
            <p className="label-industrial mb-6 text-sm">Hızlı Linkler</p>
            <ul className="space-y-3 text-base text-white/70">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors duration-300 hover:text-tan"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <p className="label-industrial mb-6 text-sm">İletişim</p>
            <ul className="space-y-3 text-base text-white/70">
              <li>
                <a
                  href="tel:+905434329951"
                  className="transition-colors duration-300 hover:text-tan"
                >
                  +90 (543) 432 99 51
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@tepeahsappalet.com"
                  className="transition-colors duration-300 hover:text-tan"
                >
                  info@tepeahsappalet.com
                </a>
              </li>
              <li className="pt-2 text-sm font-light leading-relaxed text-white/50">
                Saray Mah. Adnan Menderes Bulvarı 10. Cadde No: 7,
                Kahramankazan / ANKARA
              </li>
              <li className="text-sm font-light leading-relaxed text-white/50">
                İvedik Mah. İvedik Küme Evleri No: 38/8, Yenimahalle / ANKARA
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 text-center text-sm text-white/50">
          © 2026 Patron Palet. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
