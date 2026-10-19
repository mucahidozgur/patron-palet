const ITEMS = [
  "EURO PALET",
  "EPAL PALET",
  "SIFIR PALET",
  "İKİNCİ EL",
  "CP PALET",
  "YARIM PALET",
  "AĞIR YÜK",
  "KAFES SANDIK",
  "TAHTA KASA",
];

const ITEMS_ALT = [
  "ISPM 15",
  "ISI KONTROL",
  "4 YÖNLÜ GİRİŞ",
  "LİSANSLI ÜRETİM",
  "ÇEVRE DOSTU",
  "ZAMANINDA TESLİMAT",
  "ANKARA — TÜRKİYE GENELİ",
];

interface TrackProps {
  items: string[];
  reverse?: boolean;
  outlined?: boolean;
}

/**
 * Sonsuz kayan şerit — içerik iki kez yazılır, -50% kaydırma
 * kusursuz döngü sağlar. Klon yarısı ekran okuyuculardan gizlidir.
 * Hover'da duraklar (WCAG: 5 sn'den uzun hareket duraklatılabilir olmalı).
 */
function Track({ items, reverse = false, outlined = false }: TrackProps) {
  const doubled = [...items, ...items];
  return (
    <div
      className={`flex w-max will-change-transform ${
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      } group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center`}
    >
      {doubled.map((item, i) => (
        <span
          key={`${item}-${i}`}
          aria-hidden={i >= items.length}
          className={`flex items-center gap-8 px-4 font-display text-2xl font-bold uppercase tracking-tight md:text-4xl ${
            outlined ? "text-outline" : ""
          }`}
        >
          {item}
          <span
            aria-hidden
            className={reverse ? "text-pure/30" : "text-void/40"}
          >
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Ürün yelpazesi" className="relative overflow-hidden py-6">
      {/* Hafif eğik bant — sayfaya enerji katan diyagonal */}
      <div className="-rotate-2 scale-[1.05]">
        {/* Ana şerit — electric zemin */}
        <div className="group overflow-hidden bg-electric py-4 text-void [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <Track items={ITEMS} />
        </div>
        {/* Ters şerit — dış hatlı tipografi */}
        <div className="group overflow-hidden border-y border-pure/10 bg-void py-3 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <Track items={ITEMS_ALT} reverse outlined />
        </div>
      </div>
    </section>
  );
}
