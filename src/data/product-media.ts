/**
 * Hero: imagen principal desde el CDN de la tienda.
 * Logo y fotos: `src/assets`. Cada import se emparejó leyendo el texto del empaque:
 *
 * - `cafe.jpeg` — cerezas de café secas (natural), sin texto → microlote comunal / origen.
 * - `…56 PM (1)` — Premium Single Origin, Green Jay, grano, tueste medio.
 * - `…56 PM (2)` — Red Honey, Castillo, 500 g, ~87.25 pts.
 * - `…56 PM (3)` — Gentle Wash, Bourbon Pink, 500 g, 86.00 pts.
 * - `…56 PM (4)` — Reverso: variedad Gesha, lavado suave, datos de contacto.
 * - `…56 PM (5)` — Gentle Wash, Gesha, 500 g, ~87 pts.
 * - `…57 PM.jpeg` — Gesha, Gentle Wash, 250 g, ~87.25 pts.
 * - `…57 PM (1)` — Natural, Castillo, 500 g, ~85.75 pts.
 * - `…57 PM (2)` — Gentle Wash, Castillo, 125 g, ~85.75 pts.
 * - `…57 PM (3)` — Gentle Wash, Caturra, 250 g, ~87.25 pts.
 *
 * Membresías / chocolate / merch no tienen foto propia: se reutilizan bolsas sin duplicar
 * la misma imagen en ítems consecutivos del `CATALOG`.
 */
import { CATALOG } from '@/data/catalog'
import cafe from '@/assets/cafe.jpeg'
import logo from '@/assets/logo.jpeg'
import wa56_1 from '@/assets/WhatsApp Image 2026-05-08 at 7.58.56 PM (1).jpeg'
import wa56_2 from '@/assets/WhatsApp Image 2026-05-08 at 7.58.56 PM (2).jpeg'
import wa56_3 from '@/assets/WhatsApp Image 2026-05-08 at 7.58.56 PM (3).jpeg'
import wa56_4 from '@/assets/WhatsApp Image 2026-05-08 at 7.58.56 PM (4).jpeg'
import wa56_5 from '@/assets/WhatsApp Image 2026-05-08 at 7.58.56 PM (5).jpeg'
import wa57 from '@/assets/WhatsApp Image 2026-05-08 at 7.58.57 PM.jpeg'
import wa57_1 from '@/assets/WhatsApp Image 2026-05-08 at 7.58.57 PM (1).jpeg'
import wa57_2 from '@/assets/WhatsApp Image 2026-05-08 at 7.58.57 PM (2).jpeg'
import wa57_3 from '@/assets/WhatsApp Image 2026-05-08 at 7.58.57 PM (3).jpeg'

const W = 900

/** URL optimizada por Shopify Image API (solo hero / respaldo) */
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

const PRODUCT_IMAGE_LOCAL: Record<string, string> = {
  coffee_community_lot: cafe,
  coffee_colombia_miel: wa56_2,
  coffee_gesha_washed: wa56_5,
  coffee_java_honey: wa57_2,
  coffee_java_wild_natural: wa57_1,
  coffee_caramel_apple_java: wa56_1,
  coffee_caturra_esperanza: wa57_3,
  coffee_bourbon_rosado: wa56_3,
  coffee_ethiopian_washed: wa56_1,
  coffee_suenios_decaf: wa56_4,
  coffee_high_tea_gesha: wa57,
  coffee_big_bag: wa56_2,
  membership_bronze: wa56_3,
  membership_silver: wa56_4,
  membership_prepaid_year: wa56_5,
  membership_weekly_sub: wa57,
  chocolate_70_dark: wa57_3,
  chocolate_50_milk: wa57_1,
  merch_hat: wa57_2,
  merch_tote: wa56_1,
  merch_tshirt: wa56_5,
  merch_egift: wa56_2,
}

const DEFAULT_PRODUCT_FALLBACK = wa56_1

for (const p of CATALOG) {
  if (PRODUCT_IMAGE_LOCAL[p.id] === undefined) {
    throw new Error(
      `[product-media] Falta imagen para el producto "${p.id}". Añade una entrada en PRODUCT_IMAGE_LOCAL.`,
    )
  }
}

export function getProductImageUrl(productId: string, _width = W): string {
  return PRODUCT_IMAGE_LOCAL[productId] ?? DEFAULT_PRODUCT_FALLBACK
}
