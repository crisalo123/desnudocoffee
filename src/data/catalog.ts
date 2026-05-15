import type { Product } from '@/domain/product.types'

/** Catálogo estático: identidad estable para i18n y carrito */
export const CATALOG: readonly Product[] = [
  {
    id: 'coffee_community_lot',
    category: 'coffee',
    featured: true,
  },
  {
    id: 'coffee_colombia_miel',
    category: 'coffee',
    featured: true,
  },
  {
    id: 'coffee_gesha_washed',
    category: 'coffee',
    featured: true,
  },
  {
    id: 'coffee_java_honey',
    category: 'coffee',
  },
  {
    id: 'coffee_ethiopian_washed',
    category: 'coffee',
  },
  {
    id: 'coffee_suenios_decaf',
    category: 'coffee',
    featured: true,
  },
  {
    id: 'coffee_big_bag',
    category: 'coffee',
    featured: true,
  },
  {
    id: 'membership_bronze',
    category: 'membership',
  },
  {
    id: 'membership_silver',
    category: 'membership',
    featured: true,
  },
] as const

export function getProductById(id: string): Product | undefined {
  return CATALOG.find((p) => p.id === id)
}

export function productsByCategory(
  category: Product['category'],
): readonly Product[] {
  return CATALOG.filter((p) => p.category === category)
}
