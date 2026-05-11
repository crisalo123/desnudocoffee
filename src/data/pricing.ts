/**
 * Precios de referencia en USD (orientativos en vitrina).
 * Los centavos siguen el modelo de Shopify (entero = centavos).
 *
 * Donde no hay título idéntico en catálogo, se usa el microlote más cercano
 * y se marca `approximate` (asterisco en UI).
 */
export type PriceMode = 'unit' | 'per_bag' | 'from'

export interface ProductPriceRow {
  readonly cents: number
  readonly mode: PriceMode
  readonly approximate?: boolean
}

export const PRODUCT_PRICES: Readonly<Record<string, ProductPriceRow>> = {
  coffee_community_lot: { cents: 1900, mode: 'unit' },
  coffee_colombia_miel: { cents: 2000, mode: 'unit' },
  /** En tienda figura como “High Tea Gesha | Washed …” — mismo escalón Gesha */
  coffee_gesha_washed: { cents: 3100, mode: 'unit', approximate: true },
  coffee_java_honey: { cents: 2800, mode: 'unit' },
  coffee_java_wild_natural: { cents: 2800, mode: 'unit' },
  coffee_caramel_apple_java: { cents: 2800, mode: 'unit' },
  /** Sin coincidencia exacta en scrape — mismo rango que otros microlotes $25 */
  coffee_caturra_esperanza: { cents: 2500, mode: 'unit', approximate: true },
  /** Aproximado al perfil “Pink Bourbon” ($25) */
  coffee_bourbon_rosado: { cents: 2500, mode: 'unit', approximate: true },
  /** Sin listado exacto — rango típico microlote */
  coffee_ethiopian_washed: { cents: 2500, mode: 'unit', approximate: true },
  coffee_suenios_decaf: { cents: 2300, mode: 'unit' },
  coffee_high_tea_gesha: { cents: 3100, mode: 'unit' },
  coffee_big_bag: { cents: 9500, mode: 'unit' },

  membership_bronze: { cents: 1900, mode: 'per_bag' },
  membership_silver: { cents: 1850, mode: 'per_bag' },
  membership_prepaid_year: { cents: 1750, mode: 'per_bag' },
  membership_weekly_sub: { cents: 1900, mode: 'per_bag' },

  chocolate_70_dark: { cents: 700, mode: 'unit' },
  chocolate_50_milk: { cents: 700, mode: 'unit' },

  merch_hat: { cents: 2000, mode: 'unit' },
  merch_tote: { cents: 3500, mode: 'unit' },
  merch_tshirt: { cents: 3000, mode: 'unit' },
  /** Varias denominaciones; mostramos el mínimo ($15) */
  merch_egift: { cents: 1500, mode: 'from' },
}

export function getProductPriceRow(productId: string): ProductPriceRow | undefined {
  return PRODUCT_PRICES[productId]
}
