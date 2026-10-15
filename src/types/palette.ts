export type ProductCategory = "standart" | "ozel" | "ihracat" | "ikinci-el";

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  category: ProductCategory;
  featured?: boolean;
  image?: string;
  year: number;
  /** Kart / modal arka plan gradienti (CSS değeri) */
  gradient?: string;
  /** SVG palet grafiği için vurgu rengi */
  accent?: string;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  standart: "STANDART",
  ozel: "ÖZEL ÜRETİM",
  ihracat: "İHRACAT",
  "ikinci-el": "İKİNCİ EL",
};
