import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()
  const instagramUrl = (
    import.meta.env.VITE_INSTAGRAM_URL as string | undefined
  )?.trim()

  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-display text-xl text-denuded-parchment">
              {t('brand')}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-500">
              {t('footer.rights', { year })}
            </p>
            {instagramUrl ? (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-denuded-gold hover:text-denuded-parchment"
              >
                {t('footer.instagram')}
                <span aria-hidden>↗</span>
              </a>
            ) : null}
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-400">
              {t('footer.locations_title')}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-stone-500">
              {t('locations.body')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
