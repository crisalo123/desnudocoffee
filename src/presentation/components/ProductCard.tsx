import type { Product } from '@/domain/product.types'
import { getProductImageUrl } from '@/data/product-media'
import { useTranslation } from 'react-i18next'
import { useCart } from '@/presentation/hooks/useCart'
import { useProductPriceLabel } from '@/presentation/hooks/useProductPriceLabel'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation()
  const { addProduct, lines } = useCart()
  const line = lines.find((l) => l.productId === product.id)
  const qty = line?.quantity ?? 0

  const nameKey = `products.${product.id}.name` as const
  const imgSrc = getProductImageUrl(product.id)
  const title = t(nameKey)
  const { label: priceLabel, approximate } = useProductPriceLabel(product.id)

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent shadow-lg shadow-black/20 transition hover:border-denuded-gold/35 hover:shadow-denuded-gold/10">
      <div className="relative aspect-[5/4] overflow-hidden bg-stone-900/80">
        <img
          src={imgSrc}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0807]/90 via-transparent to-transparent opacity-90" />
        {product.featured ? (
          <span className="absolute right-3 top-3 rounded-full border border-denuded-gold/40 bg-denuded-gold/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-denuded-gold backdrop-blur-sm">
            {t('product.featured')}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 h-px w-12 bg-gradient-to-r from-denuded-gold to-transparent opacity-80" />

        <h3 className="font-display min-h-[3.25rem] text-lg leading-snug text-denuded-parchment sm:text-xl">
          {title}
        </h3>

        {priceLabel ? (
          <p className="mt-2 flex flex-wrap items-baseline gap-1.5 text-sm font-semibold tabular-nums text-denuded-gold">
            <span>{priceLabel}</span>
            {approximate ? (
              <span
                className="cursor-help text-xs font-normal text-stone-500"
                title={t('price.approx_hint')}
              >
                *
              </span>
            ) : null}
          </p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          {qty > 0 ? (
            <span className="text-sm font-medium text-denuded-gold">× {qty}</span>
          ) : (
            <span className="text-sm text-stone-600" aria-hidden>
              {' '}
            </span>
          )}
          <button
            type="button"
            onClick={() => addProduct(product.id)}
            className="rounded-full bg-denuded-gold/90 px-4 py-2 text-sm font-semibold text-stone-950 transition hover:bg-denuded-gold group-hover:shadow-lg group-hover:shadow-denuded-gold/25"
          >
            {t('product.add')}
          </button>
        </div>
      </div>
    </article>
  )
}
