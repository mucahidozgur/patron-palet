# PALET SİTESİ — Konsept B: Dynamic Showcase

## Proje Özeti
Yüksek kontrast, cesur tipografi, video odaklı palet vitrin sitesi.
Flux Pixel Studios estetiğinden ilham alır. Hedef: kreatif ajanslar ve dijital ürün ekipleri.

## Tasarım Sistemi
- **Zemin:** #FFFFFF (saf beyaz) / #000000 (saf siyah alternatif bölümler)
- **Metin:** #000000 / #FFFFFF
- **Vurgu:** #FF3D00 (elektrik turuncu)
- **İkincil vurgu:** #00E5FF (cyan)
- **Başlık fontu:** Space Grotesk (kalın, geometrik)
- **Gövde fontu:** Inter
- **Kenar boşlukları:** 80px (masaüstü), 20px (mobil)

## Teknoloji Yığını
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- GSAP + ScrollTrigger (animasyonlar)
- Vercel deployment

## Kod Kuralları
- Bileşenler `src/components/` altında, modüler yapıda
- Palet verileri `src/data/palettes.ts` içinde
- Animasyonlar GSAP timeline ile yönetilir
- Her palet kartı kendi renk paletini gösterir
- Karanlık/açık mod desteği (opsiyonel)

## Özel Talimatlar
- Hero bölümünde büyük, kinetik tipografi animasyonu
- Palet geçişlerinde sayfa kaydırma efektleri (scroll-jacking YOK)
- Numara verilmiş koleksiyonlar (01, 02, 03...)
- "Nasıl Çalışır" bölümü: 4 adımlı süreç anlatımı
- Sosyal medya paylaşım butonları her palet kartında

## Yapılmayacaklar
- Aşırı animasyon (kullanıcıyı yorma)
- Düşük kontrast metin (WCAG ihlali)
- Otomatik oynayan ses
- Pop-up reklamlar