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
  /** Sin listado exacto — rango típico microlote */
  coffee_ethiopian_washed: { cents: 2500, mode: 'unit', approximate: true },
  coffee_suenios_decaf: { cents: 2300, mode: 'unit' },
  coffee_big_bag: { cents: 9500, mode: 'unit' },

  membership_bronze: { cents: 1900, mode: 'per_bag' },
  membership_silver: { cents: 1850, mode: 'per_bag' },
}

export function getProductPriceRow(productId: string): ProductPriceRow | undefined {
  return PRODUCT_PRICES[productId]
}
