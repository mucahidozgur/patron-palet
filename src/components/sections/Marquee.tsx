const ITEMS = [
  "SIFIR PALET",
  "2. EL ALIM SATIM",
  "İHRACAT SANDIĞI",
  "ISPM 15",
  "KAFES SANDIK",
  "ANKARA — TÜRKİYE",
];

/**
 * Hero altı yosun yeşili marquee bandı — yavaş, zarif,
 * hover'da duraklar (WCAG), hareket azaltmada statik kalır.
 */
export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <section
      aria-label="Ürün yelpazesi"
      className="relative overflow-hidden border-y border-moss/10 bg-surface/40 py-5"
    >
      <div className="group flex w-max animate-marquee will-change-transform hover:[animation-play-state:paused] motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:animate-none">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= ITEMS.length}
            className="flex items-center gap-10 px-5 font-display text-lg font-bold uppercase tracking-[0.2em] md:text-2xl"
          >
            <span className="text-outline-green">{item}</span>
            <span aria-hidden className="text-moss/70">
              ✦
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
