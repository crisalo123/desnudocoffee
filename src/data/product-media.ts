/**
 * Medios en `src/assets`: solo `logo.jpeg`, `img_10`–`img_16`.
 * Hero: `img_10` (ficha Red Honey Castillo + panel técnico).
 *
 * Catálogo: cada producto usa una de esas fichas; como máximo **3** productos
 * comparten la misma URL (22 ítems y 7 fichas + logo en merch).
 */
import { CATALOG } from '@/data/catalog'
import logo from '@/assets/logo.jpeg'
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
  coffee_community_lot: img11,
  coffee_colombia_miel: img10,
  coffee_gesha_washed: img14,
  coffee_java_honey: img12,
  coffee_java_wild_natural: img11,
  coffee_caramel_apple_java: img12,
  coffee_caturra_esperanza: img15,
  coffee_bourbon_rosado: img16,
  coffee_ethiopian_washed: img13,
  coffee_suenios_decaf: img10,
  coffee_high_tea_gesha: img14,
  coffee_big_bag: img13,
  membership_bronze: img15,
  membership_silver: img16,
  membership_prepaid_year: img10,
  membership_weekly_sub: img11,
  chocolate_70_dark: img12,
  chocolate_50_milk: img13,
  merch_hat: logo,
  merch_tote: img14,
  merch_tshirt: img16,
  merch_egift: img15,
}

const DEFAULT_PRODUCT_FALLBACK = img10

for (const p of CATALOG) {
  if (PRODUCT_IMAGE_LOCAL[p.id] === undefined) {
    throw new Error(
      `[product-media] Falta imagen para el producto "${p.id}". Añade una entrada en PRODUCT_IMAGE_LOCAL.`,
    )
  }
}

const MAX_USES_PER_PRODUCT_IMAGE = 3

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
