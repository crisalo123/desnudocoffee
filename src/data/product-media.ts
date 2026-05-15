/**
 * Medios en `src/assets`: `logo.jpeg` (marca) y `img_10`–`img_16`.
 * Hero: `img_10`.
 *
 * Cafés: solo **img_10** e **img_11** comparten dos productos cada una; el resto
 * de fichas (img_12–img_14) una sola vez por café. Membresías: **img_15** (Bronze)
 * e **img_16** (Silver), sin logo en catálogo.
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

export const HERO_POSTER_URL: string = img10

const PRODUCT_IMAGE_LOCAL: Record<string, string> = {
  coffee_colombia_miel: img10,
  coffee_suenios_decaf: img10,
  coffee_community_lot: img11,
  coffee_java_honey: img11,
  coffee_gesha_washed: img14,
  coffee_ethiopian_washed: img12,
  coffee_big_bag: img13,
  membership_bronze: img15,
  membership_silver: img16,
}

const DEFAULT_PRODUCT_FALLBACK = img10

for (const p of CATALOG) {
  if (PRODUCT_IMAGE_LOCAL[p.id] === undefined) {
    throw new Error(
      `[product-media] Falta imagen para el producto "${p.id}". Añade una entrada en PRODUCT_IMAGE_LOCAL.`,
    )
  }
}

const MAX_USES_PER_SPEC_SHEET = 2

function assertMaxUsesPerSpecSheet(): void {
  const counts = new Map<string, number>()
  for (const url of Object.values(PRODUCT_IMAGE_LOCAL)) {
    counts.set(url, (counts.get(url) ?? 0) + 1)
  }
  for (const [url, n] of counts) {
    if (n > MAX_USES_PER_SPEC_SHEET) {
      throw new Error(
        `[product-media] La ficha se usa ${n} veces (máx. ${MAX_USES_PER_SPEC_SHEET}): ${url.slice(0, 80)}…`,
      )
    }
  }
}

assertMaxUsesPerSpecSheet()

export function getProductImageUrl(productId: string, _width = W): string {
  return PRODUCT_IMAGE_LOCAL[productId] ?? DEFAULT_PRODUCT_FALLBACK
}

export function isUserAdjustedProductImage(src: string): boolean {
  return /img_\d+/i.test(src)
}
