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
    id: 'coffee_java_wild_natural',
    category: 'coffee',
  },
  {
    id: 'coffee_caramel_apple_java',
    category: 'coffee',
  },
  {
    id: 'coffee_caturra_esperanza',
    category: 'coffee',
  },
  {
    id: 'coffee_bourbon_rosado',
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
    id: 'coffee_high_tea_gesha',
    category: 'coffee',
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
  {
    id: 'membership_prepaid_year',
    category: 'membership',
  },
  {
    id: 'membership_weekly_sub',
    category: 'membership',
    featured: true,
  },
  {
    id: 'chocolate_70_dark',
    category: 'chocolate',
  },
  {
    id: 'chocolate_50_milk',
    category: 'chocolate',
  },
  {
    id: 'merch_hat',
    category: 'merch',
  },
  {
    id: 'merch_tote',
    category: 'merch',
  },
  {
    id: 'merch_tshirt',
    category: 'merch',
  },
  {
    id: 'merch_egift',
    category: 'merch',
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
