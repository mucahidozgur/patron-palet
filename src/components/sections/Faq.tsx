"use client";

import Reveal from "@/components/ui/Reveal";

const FAQS = [
  {
    q: "Paletlerde ısıl işlem (ISPM 15) uygulanıyor mu?",
    a: "Evet. İhracat paletlerimizde ISPM 15 standardına uygun ısıl işlem uygulanır ve sertifikalandırılır.",
  },
  {
    q: "İkinci el paletler ne durumda teslim edilir?",
    a: "2. el paletlerimiz kullanıma hazır ve taşıma kapasitesi kontrol edilmiş halde stoktan teslim edilir.",
  },
  {
    q: "Özel ölçüde palet üretimi yapıyor musunuz?",
    a: "Evet. Müşteri beklentileri doğrultusunda özel ve standart ölçülerde palet üretimi yapmaktayız.",
  },
  {
    q: "Teslimat süresi nedir?",
    a: "Stok ürünlerde hızlı teslimat; özel üretimlerde belirlenen zaman çizelgesi dahilinde teslimat yapılır.",
  },
  {
    q: "Türkiye dışına gönderim yapıyor musunuz?",
    a: "Evet. Ankara'dan Türkiye'nin her yerine ve tüm dünyaya hizmet vermekteyiz.",
  },
];

export default function Faq() {
  return (
    <section id="sss" className="bg-surface py-32 md:py-40">
      <div className="container-editorial max-w-4xl">
        <Reveal className="mb-16">
          <p className="label-industrial mb-6">
            <span className="section-num mr-3">04</span>Sık Sorulan Sorular
          </p>
          <h2 className="heading-display text-3xl text-forest drop-shadow-[0_0_18px_rgba(99,217,156,0.35)] md:text-5xl">
            Merak Edilenler
          </h2>
        </Reveal>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <Reveal key={faq.q} delay={index * 0.06}>
              <details className="group border border-ivory/10 bg-ink transition-colors duration-300 hover:border-moss/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 font-medium text-ivory transition-colors duration-300 group-open:text-moss">
                  {faq.q}
                  <span
                    aria-hidden
                    className="text-moss transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="border-t border-ivory/5 p-6 pt-5 text-sm font-light leading-relaxed text-ivory/60">
                  {faq.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
