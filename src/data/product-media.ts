/**
 * Imágenes tomadas del CDN público de Shopify usado en desnudocoffee.com.
 * Sirven para dar forma visual a la vitrina; las rutas pueden cambiar si el cliente actualiza la tienda.
 */
const W = 900

/** URL optimizada por Shopify Image API */
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

export const BRAND_LOGO_URL = shopifyFileUrl('DesnudoBlue.png?v=1706815299', 320)

export const HERO_POSTER_URL = shopifyFileUrl(
  'Desnudo-205.jpg?v=1769144876',
  1600,
)

/**
 * Mapa productId → archivo en CDN (misma tienda que la web oficial).
 */
export const PRODUCT_IMAGE_FILES: Readonly<Record<string, string>> = {
  coffee_community_lot: 'IMG_1844-2.jpg?v=1776370024',
  coffee_colombia_miel: 'WhatsApp_Image_2025-01-05_at_15.24.16.jpg?v=1776370313',
  coffee_gesha_washed: 'Desnudo-223.jpg?v=1776370338',
  coffee_java_honey:
    'Screenshot_2026-04-29_at_5.37.31_PM.png?v=1777502262',
  coffee_java_wild_natural: '2.1Beto_y_flor.jpg?v=1776370702',
  coffee_caramel_apple_java: 'unnamed-1.jpg?v=1776370371',
  coffee_caturra_esperanza: 'IMG_1869-2.jpg?v=1776370024',
  coffee_bourbon_rosado: 'Desnudo-216.jpg?v=1776609629',
  coffee_ethiopian_washed:
    'WhatsApp_Image_2025-01-05_at_15.35.12_1.jpg?v=1776370313',
  coffee_suenios_decaf:
    '0_7a9cc3c1-85a6-4cab-b14e-8be0d658af23.jpg?v=1776371141',
  coffee_high_tea_gesha: 'Desnudo-187_19ae8379-5f97-4cc5-9776-3b001337def3.jpg?v=1776370338',
  coffee_big_bag:
    'WhatsApp_Image_2024-08-29_at_11.21.09_1.jpg?v=1773627519',

  membership_bronze:
    'WhatsApp_Image_2024-08-28_at_16.20.36_1.jpg?v=1767120460',
  membership_silver:
    'Desnudo-186_26265633-71bd-48e9-8785-31e13230c182.jpg?v=1769144631',
  membership_prepaid_year: 'Instagram_post_-_5.jpg?v=1704483173',
  membership_weekly_sub: 'Desnudo-205.jpg?v=1769144876',

  chocolate_70_dark: 'Desnudo-20.jpg?v=1767970528',
  chocolate_50_milk: 'Desnudo-24.jpg?v=1767970182',

  merch_hat: 'IMG_7716.jpg?v=1767121700',
  merch_tote:
    '777ef0d6-d70d-41ff-9790-8211a9c383ca.jpg?v=1767121800',
  merch_tshirt: 'Farm_WhiteBG.png?v=1776446917',
  merch_egift:
    'Screenshot_2026-02-26_at_5.31.19_PM.png?v=1772217629',
}

export function getProductImageUrl(productId: string, width = W): string {
  const file = PRODUCT_IMAGE_FILES[productId]
  if (!file) return shopifyFileUrl('IMG_1844-2.jpg?v=1776370024', width)
  return shopifyFileUrl(file, width)
}
