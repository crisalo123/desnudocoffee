/**
 * Medios en `src/assets` para catálogo y logo.
 * Hero: misma imagen que «Natural · Castillo» (`coffee_java_wild_natural` → `img_7`), completa en el Hero.
 *
 * Catálogo: solo assets locales (`cafe`, `img_*`).
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
import img9 from '@/assets/img_9.png'

const W = 900

export const BRAND_LOGO_URL: string = logo

/** Misma bolsa Natural · Castillo que el producto `coffee_java_wild_natural` (`img_7`). */
export const HERO_POSTER_URL: string = img7

const PRODUCT_IMAGE_LOCAL: Record<string, string> = {
  coffee_community_lot: cafe,
  coffee_colombia_miel: img1,
  coffee_gesha_washed: img6,
  coffee_java_honey: img4,
  coffee_java_wild_natural: img7,
  coffee_caramel_apple_java: img5,
  coffee_caturra_esperanza: img9,
  coffee_bourbon_rosado: img2,
  coffee_ethiopian_washed: img2,
  coffee_suenios_decaf: img3,
  coffee_high_tea_gesha: img6,
  coffee_big_bag: img4,
  membership_bronze: img2,
  membership_silver: img9,
  membership_prepaid_year: img3,
  membership_weekly_sub: img7,
  chocolate_70_dark: img5,
  chocolate_50_milk: img7,
  merch_hat: cafe,
  merch_tote: img1,
  merch_tshirt: img6,
  merch_egift: img4,
}

const DEFAULT_PRODUCT_FALLBACK = img2

for (const p of CATALOG) {
  if (PRODUCT_IMAGE_LOCAL[p.id] === undefined) {
    throw new Error(
      `[product-media] Falta imagen para el producto "${p.id}". Añade una entrada en PRODUCT_IMAGE_LOCAL.`,
    )
  }
}

/** Máximo de productos que comparten la misma URL (locales; algo >2 al final del catálogo). */
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
