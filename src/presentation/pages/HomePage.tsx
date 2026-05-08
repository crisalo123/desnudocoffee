import { useCallback, useRef, useState } from 'react'
import { CartDrawer } from '@/presentation/components/CartDrawer'
import { ScrollAmbience } from '@/presentation/components/ScrollAmbience'
import { Footer } from '@/presentation/components/Footer'
import { Header } from '@/presentation/components/Header'
import { Hero } from '@/presentation/components/Hero'
import { ProductSection } from '@/presentation/components/ProductSection'
import { useWhatsAppOrder } from '@/presentation/hooks/useWhatsAppOrder'

export function HomePage() {
  const [cartOpen, setCartOpen] = useState(false)
  const catalogRef = useRef<HTMLElement | null>(null)
  const { openOrder } = useWhatsAppOrder()

  const scrollToCatalog = useCallback(() => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleHeroWhatsApp = useCallback(() => {
    openOrder()
  }, [openOrder])

  return (
    <div className="relative min-h-screen bg-[#0a0807]">
      <ScrollAmbience />

      <div className="relative z-10">
        <Header onOpenCart={() => setCartOpen(true)} />

        <Hero
          onScrollCatalog={scrollToCatalog}
          onWhatsApp={handleHeroWhatsApp}
        />

        <main ref={catalogRef} id="catalog">
          <ProductSection category="coffee" />
          <ProductSection category="membership" />
          <ProductSection category="chocolate" />
          <ProductSection category="merch" />
        </main>

        <Footer />

        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </div>
  )
}
