/**
 * Medios en `src/assets` para catálogo y logo.
 * Hero: foto principal del CDN público de desnudocoffee.com (Shopify).
 *
 * Catálogo: cada URL de imagen aparece como máximo **2 veces** (como mucho un duplicado por archivo).
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

const W = 900

export function shopifyFileUrl(
  filenameWithQuery: string,
  width = W,
): string {
  const base = `https://desnudocoffee.com/cdn/shop/files/${filenameWithQuery}`
  if (/[?&]width=\d/.test(filenameWithQuery)) {
    return base
  }
  const sep = filenameWithQuery.includes('?') ? '&' : '?'
  return `${base}${sep}width=${width}`
}

export const BRAND_LOGO_URL: string = logo

export const HERO_POSTER_URL = shopifyFileUrl(
  'Desnudo-205.jpg?v=1769144876',
  1600,
)

/** Rellenos CDN (distintos del trío del hero); cada uno como máximo 2 usos en el mapa. */
const SHOP_CHOC_70 = shopifyFileUrl('Desnudo-20.jpg?v=1767970528', 900)
const SHOP_CHOC_50 = shopifyFileUrl('Desnudo-24.jpg?v=1767970182', 900)
const SHOP_MEMBERSHIP = shopifyFileUrl(
  'Desnudo-186_26265633-71bd-48e9-8785-31e13230c182.jpg?v=1769144631',
  900,
)
const SHOP_MERCH = shopifyFileUrl('Farm_WhiteBG.png?v=1776446917', 900)

const PRODUCT_IMAGE_LOCAL: Record<string, string> = {
  coffee_community_lot: cafe,
  coffee_colombia_miel: img1,
  coffee_gesha_washed: img6,
  coffee_java_honey: img4,
  coffee_java_wild_natural: img7,
  coffee_caramel_apple_java: img5,
  coffee_caturra_esperanza: img9,
  coffee_bourbon_rosado: img2,
  coffee_ethiopian_washed: img8,
  coffee_suenios_decaf: img3,
  coffee_high_tea_gesha: img6,
  coffee_big_bag: img4,
  membership_bronze: img2,
  membership_silver: img9,
  membership_prepaid_year: SHOP_MEMBERSHIP,
  membership_weekly_sub: SHOP_CHOC_50,
  chocolate_70_dark: SHOP_CHOC_70,
  chocolate_50_milk: SHOP_CHOC_50,
  merch_hat: img8,
  merch_tote: SHOP_MEMBERSHIP,
  merch_tshirt: SHOP_MERCH,
  merch_egift: SHOP_CHOC_70,
}

const DEFAULT_PRODUCT_FALLBACK = img2

for (const p of CATALOG) {
  if (PRODUCT_IMAGE_LOCAL[p.id] === undefined) {
    throw new Error(
      `[product-media] Falta imagen para el producto "${p.id}". Añade una entrada en PRODUCT_IMAGE_LOCAL.`,
    )
  }
}

/** Comprueba en desarrollo que ninguna URL se use más de 2 veces. */
function assertMaxTwoUsesPerUrl(): void {
  const counts = new Map<string, number>()
  for (const url of Object.values(PRODUCT_IMAGE_LOCAL)) {
    counts.set(url, (counts.get(url) ?? 0) + 1)
  }
  for (const [url, n] of counts) {
    if (n > 2) {
      throw new Error(
        `[product-media] La imagen se usa ${n} veces (máx. 2): ${url.slice(0, 80)}…`,
      )
    }
  }
}

assertMaxTwoUsesPerUrl()

export function getProductImageUrl(productId: string, _width = W): string {
  return PRODUCT_IMAGE_LOCAL[productId] ?? DEFAULT_PRODUCT_FALLBACK
}

/**
 * Imágenes que ajustaste en `src/assets` (`img_1`, `img_2`, …).
 * Vite publica rutas tipo `…/img_1-abc123.png` — usamos esto para no recortarlas en la UI.
 */
export function isUserAdjustedProductImage(src: string): boolean {
  return /img_\d+/i.test(src)
}
