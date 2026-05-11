import { HERO_POSTER_URL } from '@/data/product-media'
import { useTranslation } from 'react-i18next'

interface HeroProps {
  onScrollCatalog: () => void
  onWhatsApp: () => void
}

export function Hero({ onScrollCatalog, onWhatsApp }: HeroProps) {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-[42rem] w-[42rem] rounded-full bg-amber-600/15 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[36rem] w-[36rem] rounded-full bg-rose-900/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,169,98,0.12),_transparent_55%)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 pt-16 sm:gap-12 sm:px-6 sm:pb-28 sm:pt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-14">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-denuded-gold sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            {t('hero.eyebrow')}
          </p>
          <h1 className="font-display max-w-4xl text-4xl leading-[1.1] tracking-tight text-denuded-parchment sm:text-6xl md:text-7xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-stone-400 sm:text-xl">
            {t('hero.subtitle')}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onScrollCatalog}
              className="rounded-full bg-denuded-parchment px-7 py-3.5 text-sm font-semibold text-stone-950 shadow-xl shadow-black/40 transition hover:bg-white"
            >
              {t('hero.cta_catalog')}
            </button>
            <button
              type="button"
              onClick={onWhatsApp}
              className="rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-denuded-parchment backdrop-blur transition hover:border-denuded-gold/50 hover:bg-white/10"
            >
              {t('hero.cta_whatsapp')}
            </button>
          </div>

          <dl className="mt-16 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
              <dt className="text-xs font-semibold uppercase tracking-wider text-denuded-gold">
                {t('trust.direct')}
              </dt>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
              <dt className="text-xs font-semibold uppercase tracking-wider text-denuded-gold">
                {t('trust.fresh')}
              </dt>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
              <dt className="text-xs font-semibold uppercase tracking-wider text-denuded-gold">
                {t('trust.craft')}
              </dt>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
          <div className="relative flex min-h-[min(68vh,32rem)] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-[#0a0807] p-3 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.65)] ring-1 ring-white/10 sm:min-h-[min(72vh,36rem)] sm:p-5">
            <img
              src={HERO_POSTER_URL}
              alt=""
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="max-h-[min(78vh,42rem)] w-full object-contain object-center"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0807]/85 to-transparent sm:h-28" />
          </div>
          <p className="mt-3 text-center text-xs text-stone-500 lg:text-left">
            {t('hero.photo_credit')}
          </p>
        </div>
      </div>
    </section>
  )
}
