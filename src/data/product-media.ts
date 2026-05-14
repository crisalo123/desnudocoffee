/**
 * Medios en `src/assets`. Hero: `img_10` (ficha Red Honey Castillo + panel técnico), completa en Hero.
 *
 * Catálogo: `img_11`–`img_16` y `img_1`–`img_9` según empaque. Cada URL como máximo **2** productos
 * (con 22 ítems y 17 archivos hay varias parejas; se evitan triples).
 */
import { CATALOG } from '@/data/catalog'
import cafe from '@/assets/cafe.jpeg'
import logo from '@/assets/logo.jpeg'
import img1 from '@/assets/img_1.png'
import img2 from '@/assets/img_2.png'
import img3 from '@/assets/img_3.png'
import img4 from '@/assets/img_4.png'
import img5 from '@/assets/img_5.png'
import img6 from '@/assets/img_6.png'
import img7 from '@/assets/img_7.png'
import img8 from '@/assets/img_8.jpeg'
import img9 from '@/assets/img_9.png'
import img10 from '@/assets/img_10.jpeg'
import img11 from '@/assets/img_11.jpeg'
import img12 from '@/assets/img_12.jpeg'
import img13 from '@/assets/img_13.jpeg'
import img14 from '@/assets/img_14.jpeg'
import img15 from '@/assets/img_15.jpeg'
import img16 from '@/assets/img_16.jpeg'

const W = 900

export const BRAND_LOGO_URL: string = logo

/** Ficha comercial Red Honey / Castillo (`img_10`); misma línea visual que Colombia Miel en catálogo. */
export const HERO_POSTER_URL: string = img10

const PRODUCT_IMAGE_LOCAL: Record<string, string> = {
  coffee_community_lot: cafe,
  coffee_colombia_miel: img10,
  coffee_gesha_washed: img14,
  coffee_java_honey: img12,
  coffee_java_wild_natural: img11,
  coffee_caramel_apple_java: img1,
  coffee_caturra_esperanza: img15,
  coffee_bourbon_rosado: img16,
  coffee_ethiopian_washed: img4,
  coffee_suenios_decaf: img3,
  coffee_high_tea_gesha: img14,
  coffee_big_bag: img13,
  membership_bronze: img2,
  membership_silver: img9,
  membership_prepaid_year: img8,
  membership_weekly_sub: img7,
  chocolate_70_dark: img5,
  chocolate_50_milk: img6,
  merch_hat: cafe,
  merch_tote: img4,
  merch_tshirt: img6,
  merch_egift: img7,
}

const DEFAULT_PRODUCT_FALLBACK = img2

for (const p of CATALOG) {
  if (PRODUCT_IMAGE_LOCAL[p.id] === undefined) {
    throw new Error(
      `[product-media] Falta imagen para el producto "${p.id}". Añade una entrada en PRODUCT_IMAGE_LOCAL.`,
    )
  }
}

const MAX_USES_PER_PRODUCT_IMAGE = 2

function assertMaxUsesPerUrl(): void {
  const counts = new Map<string, number>()
  for (const url of Object.values(PRODUCT_IMAGE_LOCAL)) {
    counts.set(url, (counts.get(url) ?? 0) + 1)
  }
  for (const [url, n] of counts) {
    if (n > MAX_USES_PER_PRODUCT_IMAGE) {
      throw new Error(
        `[product-media] La imagen se usa ${n} veces (máx. ${MAX_USES_PER_PRODUCT_IMAGE}): ${url.slice(0, 80)}…`,
      )
    }
  }
}

assertMaxUsesPerUrl()

export function getProductImageUrl(productId: string, _width = W): string {
  return PRODUCT_IMAGE_LOCAL[productId] ?? DEFAULT_PRODUCT_FALLBACK
}

export function isUserAdjustedProductImage(src: string): boolean {
  return /img_\d+/i.test(src)
}
